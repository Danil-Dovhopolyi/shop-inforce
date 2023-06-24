import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ProductFormModalAdd from '../../components/ProductFormModalAdd';
import { IProduct } from '../../store/typesProduct';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { deleteProduct } from '../../store/products/productActions';
import ProductFormModalEdit from '../../components/ProductFormModalEdit';

interface ProductTableProps {
  products: IProduct[];
  updateProducts: (newProducts: IProduct[]) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  updateProducts,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [selectedFilter, setSelectedFilter] = useState<string>('alphabetic');
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  const handleEdit = (productId: number) => {
    const updatedProduct = products.find((product) => product.id === productId);
    if (updatedProduct) {
      setSelectedProductId(productId);
      setIsFormOpen(true);
    }
  };

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));

    // Optional: Update the products list after deleting the product
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    updateProducts(updatedProducts);
  };

  const handleCloseEditForm = () => {
    setSelectedProductId(null);
    setIsFormOpen(false);
  };

  const handOpenAddForm = () => {
    setIsFormOpen(true);
  };
  const handleAddProduct = (newProduct: IProduct) => {
    // Update products list with the new product
    const updatedProducts = [...products, newProduct];
    updateProducts(updatedProducts);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const filterValue = event.target.value;
    setSelectedFilter(filterValue);

    let filteredProducts = [...products];

    if (filterValue === 'alphabetic') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterValue === 'count') {
      filteredProducts.sort((a, b) => b.count - a.count);
    }

    updateProducts(filteredProducts);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handOpenAddForm}>
        Add Product
      </Button>

      {/* Dropdown menu */}
      <Select
        value={selectedFilter}
        onChange={handleFilterChange}
        style={{ marginLeft: '10px' }}
      >
        <MenuItem value="alphabetic">Alphabetic</MenuItem>
        <MenuItem value="count">Count</MenuItem>
      </Select>

      <ProductFormModalAdd
        open={isFormOpen}
        onClose={handleCloseForm}
        handleAddProduct={handleAddProduct}
      />
      {selectedProductId !== null && (
        <ProductFormModalEdit
          open={isFormOpen}
          onClose={handleCloseEditForm}
          editProductId={selectedProductId}
          product={
            products.find((p) => p.id === selectedProductId) || ({} as IProduct)
          }
          products={products}
          updateProducts={updateProducts}
        />
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.count}</TableCell>
                <TableCell>
                  {product.size.width} x {product.size.height}
                </TableCell>
                <TableCell>{product.weight}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Link to={`/cards/${product.id}`}>Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTable;
