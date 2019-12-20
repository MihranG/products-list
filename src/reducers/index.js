import { combineReducers } from 'redux';
import { categories } from './categories';
import { products } from './products';
import { reducer as form } from 'redux-form'


export default combineReducers({
  categories,
  products,
  form
});
