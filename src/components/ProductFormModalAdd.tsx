import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormHelperText,
} from '@mui/material';
import { addProduct } from '../store/products/productActions';
import { IProduct } from '../store/typesProduct';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  handleAddProduct: (product: IProduct) => void;
}

const initialProduct: IProduct = {
  id: 0,
  imageUrl: '',
  name: '',
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: '',
};

const ProductFormModalAdd: React.FC<ProductFormModalProps> = ({
  open,
  onClose,
  handleAddProduct,
}) => {
  const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    count: Yup.number()
      .required('Count is required')
      .positive('Count must be a positive number'),
    size: Yup.object().shape({
      width: Yup.number()
        .required('Width is required')
        .positive('Width must be a positive number'),
      height: Yup.number()
        .required('Height is required')
        .positive('Height must be a positive number'),
    }),
    weight: Yup.string().required('Weight is required'),
  });

  const handleFormSubmit = (
    values: IProduct,
    { resetForm }: { resetForm: () => void }
  ) => {
    dispatch(addProduct(values));

    // Call the handleAddProduct function passed as a prop
    handleAddProduct(values);

    resetForm();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {/* Render the Formik component */}
      <Formik
        initialValues={initialProduct}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {/* Render the form using the Formik components */}
        <Form>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogContent>
            <Field
              name="name"
              as={TextField}
              label="Name"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="name" component={FormHelperText} />

            <Field
              name="count"
              as={TextField}
              label="Count"
              type="number"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="count" component={FormHelperText} />

            <Field
              name="size.width"
              as={TextField}
              label="Width"
              type="number"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="size.width" component={FormHelperText} />

            <Field
              name="size.height"
              as={TextField}
              label="Height"
              type="number"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="size.height" component={FormHelperText} />

            <Field
              name="weight"
              as={TextField}
              label="Weight"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="weight" component={FormHelperText} />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default ProductFormModalAdd;
