import * as productsActions from '../actions/products';

export function products(state = [], action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCTS:
      return [
        ...action.products,
      ];
    case productsActions.ADD_PRODUCT:{
      return [
        ...state, 
        action.product
      ];}

    case productsActions.EDIT_PRODUCT:{
      const {id, product} = action;
      return [
        ...state.slice(0,id), 
        product,
        ...state.slice(id+1, state.length)
      ];}

    case productsActions.DELETE_PRODUCT:{
      const {id} = action;
      return[
        ...state.slice(0,id),
        ...state.slice(id+1, state.length)
      ]}
    default:
      return state;
  }
}

