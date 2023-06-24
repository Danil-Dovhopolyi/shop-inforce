import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductTable from './pages/ProductsTable/ProductTable';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import { IProduct } from './store/typesProduct';

function App() {
  const [cards, setCards] = useState<IProduct[]>([]);

  const updateProducts = (newProducts: IProduct[]) => {
    setCards(newProducts);
  };

  useEffect(() => {
    fetch('http://localhost:3001/cards')
      .then((response) => response.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProductTable products={cards} updateProducts={updateProducts} />
        }
      />
      <Route path="/cards/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
