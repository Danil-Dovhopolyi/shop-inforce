import axios from 'axios';
import { Dispatch } from 'redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IProduct } from '../typesProduct';

// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';

// Action creators
export const addProduct = (
  product: IProduct
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: Dispatch) => {
    // Perform the API call to add the product
    axios
      .post('http://localhost:3001/cards', product)
      .then((response) => {
        // Dispatch the action if the API call is successful
        dispatch({
          type: ADD_PRODUCT,
          payload: response.data,
        });
      })
      .catch((error) => {
        // Handle the error if the API call fails
        console.error('Error adding product:', error);
      });
  };
};

export const deleteProduct = (
  productId: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: Dispatch) => {
    // Perform the API call to delete the product
    axios
      .delete(`http://localhost:3001/cards/${productId}`)
      .then(() => {
        // Dispatch the action if the API call is successful
        dispatch({
          type: DELETE_PRODUCT,
          payload: productId,
        });
      })
      .catch((error) => {
        // Handle the error if the API call fails
        console.error('Error deleting product:', error);
      });
  };
};
export const editProduct = (
  product: IProduct
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: Dispatch) => {
    // Perform the API call to update the product
    axios
      .put(`http://localhost:3001/cards/${product.id}`, product)
      .then(() => {
        // Dispatch the action if the API call is successful
        dispatch({
          type: EDIT_PRODUCT,
          payload: product,
        });
      })
      .catch((error) => {
        // Handle the error if the API call fails
        console.error('Error editing product:', error);
      });
  };
};
