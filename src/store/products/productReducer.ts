import { ADD_PRODUCT, DELETE_PRODUCT } from './productActions';
import { ProductState, ProductActionTypes } from '../typesProduct';
import { IProduct } from '../typesProduct';
const initialState: ProductState = {
  products: [],
};

const productReducer = (
  state = initialState,
  action: ProductActionTypes
): ProductState => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product: IProduct) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
