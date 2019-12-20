import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import { Container, Row, Col } from 'reactstrap'
import { chunk } from 'lodash'

const ProductList = ({ products, history ,dispatch}) => {
  const productsGroups = chunk(products, 3)

  return (
    <Container>
      {productsGroups.map((productsGroup, index) => (
        <Row key={index} className="mb-5">
          {productsGroup.map(product => (
            <Col sm="4" key={product.id} >
              <Product product={product} history={history} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
