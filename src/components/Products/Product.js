import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem , Button} from 'reactstrap';
import moment from 'moment'
import { connect } from 'react-redux';


import {deleteProduct} from '../../actions/products'


const shortDateFormat = 'MM/DD/YYYY';
const longDateFormat = 'MM/DD/YYYY hh:mm a';

const ProductDisconnected = ({ product , history, handleDelete}) => {
  const receiptDate =  product.receiptDate ? moment(product.receiptDate).format(shortDateFormat) : '-';
  const expirationDate =  product.expirationDate ? moment(product.expirationDate).format(shortDateFormat) : '-';
  const createdAt = product.createdAt ? moment(product.createdAt).format(longDateFormat) : '-';
  const handleEdit = () => {
    history.push(`/edit/${product.id}`)
  }

  return (
    <Card>
      <CardBody>
        <CardTitle>{product.name}</CardTitle>
        <div className="text-center " style={{margin: 5}}>
          <Button className={'center'} style={{margin:' 0 5px'}} onClick={handleEdit}>Edit</Button>
          <Button className={'center'} style={{margin:' 0 5px'}} onClick={()=>handleDelete(product.id)}>Delete</Button>
        </div>
        <CardText tag="div">
          <ListGroup>
            <ListGroupItem>Brand: {product.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
            <ListGroupItem>Created At: {createdAt}</ListGroupItem>
          </ListGroup>
        </CardText>
      </CardBody>
    </Card>
  );
}

ProductDisconnected.propTypes = {
  product: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch,state)=>({
  handleDelete: (id)=>dispatch((_,getState)=>{
    const products = getState().products;
    const indexOfProduct = products.findIndex(p=>p.id === id)
      dispatch(deleteProduct(indexOfProduct))
    }
  )
})

const Product = connect(null, mapDispatchToProps)(ProductDisconnected)
export default Product;
