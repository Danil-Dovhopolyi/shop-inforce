import { ADD_PRODUCT, DELETE_PRODUCT } from './products/productActions';
export interface IProduct {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
}

// Define the shape of your product state
export interface ProductState {
  products: IProduct[];
}

// Define the possible action types for products
export interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: IProduct;
}

export interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  payload: number; // ID of the deleted product
}

export type ProductActionTypes = AddProductAction | DeleteProductAction;
