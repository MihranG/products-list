import { categoryApi } from '../gateways/CategoryApi';

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

const receiveCategories = (json) => ({
  type: RECEIVE_CATEGORIES,
  categories: json.map(category => category),
});

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories());
  const json = categoryApi.getCategories();
  dispatch(receiveCategories(json));
};
