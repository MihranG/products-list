import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

import Header from '../Header/Header';
import ProductsList from './ProductsList';
import { fetchCategories } from '../../actions/categories';
import { fetchProducts } from '../../actions/products';
import { getCategoriesById } from '../../reducers/categories';


class ProductsContainer extends Component {
  

  componentDidMount() {
    const { dispatch } = this.props;
    if(this.props.categories.length === 0){
      dispatch(fetchCategories());
    }

    if(this.props.products.length === 0){
      dispatch(fetchProducts());
    }
  }

  addProductHandler = ()=>{
    this.props.history.push('/new')
  }

  render() {
    const { products } = this.props;

    return (
      <Fragment>
        <Header name="Products"/>
        <div className="text-center " style={{margin: 5}}>
          <Button color="primary" onClick={this.addProductHandler}>+ Add new</Button>
        </div>
        <ProductsList products={products} history={this.props.history} />
      </Fragment>
    );
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const categoriesById = getCategoriesById(state);

  const products = state.products.map(product => {
    const categories =  product.categories.map(id => categoriesById[id])

    return {
      ...product,
      categories
    };
  });

  return {
    products,
    categories: state.categories
  }
};

export default connect(mapStateToProps)(ProductsContainer);
