import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import productReducer from './products/productReducer';
import commentsReducer from './comments/commentsReducer';

const rootReducer = combineReducers({
  product: productReducer,
  comment: commentsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
