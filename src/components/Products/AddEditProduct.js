import React ,{Component} from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button ,Spinner} from 'reactstrap';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import moment from 'moment';
import {compose} from 'redux';

import { fetchCategories } from '../../actions/categories';
import {addProduct, editProduct, fetchProducts} from '../../actions/products'

class AddEditProductDisconnected extends Component {
    state ={loading:true}
    componentDidMount(){
      if(this.props.categories.length === 0){
        this.props.fetchCategories();
      }   

      if(this.props.products.length === 0){
        this.props.fetchProducts().then(data=>{
          this.setState({loading:false})
        });
      }else{
        this.setState({loading: false})
      }
    }

    addEditNewProductToStore = (fields)=>{
      const productFields = {
        ...fields,
        featured: !!fields.rating && fields.rating>8,
        createdAt: moment(),
        id: this.props.isEdit ? fields.id :this.props.products[this.props.products.length-1].id+1,
        categories: fields.categories.map(c=>Number(c))
      };
      this.props.isEdit ? this.props.editProduct(this.props.productIndex, productFields): this.props.addProduct(productFields);
      this.props.history.push('/')
    }

    handleSubmit = (e)=>{
      e.preventDefault();
      this.addEditNewProductToStore(this.props.formValues);
    }

    render(){
      const {loading} = this.state
      return loading ? (<Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /> )     : (
        <Form onSubmit={this.handleSubmit}>
          <Field name='name' title='Name' component={renderInputField}/>
          <Field name='rating' title='Rating' component={renderInputField}/>
          <Field name='categories' title='Categories' categories={this.props.categories} component={renderInputField}/>
          <Field name='expirationDate' title='Expiration' isEdit={this.props.isEdit} component={renderInputField}/>
          <Field name='receiptDate' title='Receipt Date' component={renderInputField}/>
          <Field name='itemsInStock' title='Items In Stock' component={renderInputField}/>
          <Field name='brand' title='Brand' component={renderInputField} />
          <Button disabled={this.props.isThereValidationErrors}>Submit</Button>
        </Form>)
      
    }
}



const validate = formValues =>{
    const errors = {};
    const {name, rating, categories, expirationDate} = formValues;   
    const ratingNumber = Number(rating);
    if( !name || name.length > 200){
        errors.brand =  "Name should have not been longer than 200"
    }
    if(!Number.isInteger(ratingNumber) || (ratingNumber < 0 || ratingNumber > 10)){
        errors.rating =  "Rating should be an integer between 0 and 10"
    }
    if(!categories || (categories.length < 1 || categories.length > 5)){
      errors.categories = "Please provide categories from 1 to 5"
    }

    if(expirationDate){
      const today = moment();
      const expirationDateMoment = moment(expirationDate).startOf('day');
      const diffDays = expirationDateMoment.diff(today.startOf('day'), 'day' );

      if(diffDays < 30){
        errors.expirationDate = "Expiration should not be earlier than 30 days"
      }
    }

    return errors;
}
const renderInputField = (field)=>{
    const { meta: { touched, error } ,input,categories, isEdit} = field;

      switch(input.name){
        case 'name':
          return(
            <FormGroup>
                <Label for="name">Name</Label>
                <Input valid={touched && !error}  invalid={touched && !!error} id="name" {...field.input}/>
                <FormFeedback>{error}</FormFeedback>
                <FormText>*required (should not exceed 200 symbols)</FormText>
            </FormGroup>
          )
        case 'rating':
          return (
            <FormGroup>
                <Label for="rating">Rating</Label>
                <Input valid={touched && !error} invalid={touched && !!error} id="rating" {...field.input}/>
                <FormFeedback>{error}</FormFeedback>
                <FormText>*required integer between 1 and 10(including)</FormText>
            </FormGroup>
          )
        case 'categories':
          return (
              <FormGroup>
                <Label for="categories">Select Multiple</Label>
                <Input 
                    valid={touched && !error} invalid={touched && !!error}  
                    type="select" name="categories" id="categories" multiple {...field.input} >
                    {categories.map(category=>{
                      const {id, name} = category;
                      return (<option key={`${id}_${name}`} value={id}>{`${id}. ${name}`}</option>)
                    })}
                </Input>
                <FormText>*required from 1 to 5. Select multiple by pressing CMD/CTRL</FormText>
                <FormFeedback>{error}</FormFeedback>
              </FormGroup>
          )
        case 'expirationDate':
          return (
            <FormGroup>
                <Label for="expirationDate">Expiration date</Label>
                <Input valid={touched && !error} invalid={(touched && !!error)|| (!!isEdit && !!error) } id="expirationDate" {...field.input}  type="date"
                    name="expirationDate"
                    placeholder="date placeholder"/>
                <FormText>*required integer between 1 and 10(including)</FormText>
                <FormFeedback>{error}</FormFeedback>
            </FormGroup>
          )
        case 'brand' : 
            return (
              <FormGroup>
                <Label for="brand">Brand</Label>
                <Input id="brand" {...field.input}/>
              </FormGroup>
            )

        case 'receiptDate' : 
            return (
              <FormGroup>
                <Label for="receiptDate">Receipt date</Label>
                <Input id="receiptDate" {...field.input}  type="date"
                    name="receiptDate"
                    placeholder="date placeholder"/>
            </FormGroup>
            )
        case 'itemsInStock':
          return (
            <FormGroup>
                <Label for="itemsInStock">Items In Stock</Label>
                <Input id="itemsInStock" {...field.input}/>
            </FormGroup>
          )
          default:
            return null
      }

 }
const mapStateToProps = (state, ownProps)=>{
  const isEdit = ownProps.match.path.indexOf('edit') !== -1;
  const id = isEdit ? ownProps.match.params.id : undefined;
  const productIndex = isEdit ? state.products.findIndex(e=>{
    return (e.id === parseInt(id))}) : undefined;
  const product = state.products[productIndex]
  const initialValues = isEdit ? 
    product ? {...product} : undefined 
    : {categories: []}

  return({
    isEdit,
    categories: state.categories,
    products: state.products,
    productIndex: isEdit ? productIndex : undefined,
    isThereValidationErrors: 
      !state.form.add_product || (state.form.add_product.syncErrors && Object.keys(state.form.add_product.syncErrors).length>0),
    formValues: state.form.add_product && state.form.add_product.values,
    initialValues
})}

const mapDispatchToProps = (dispatch,ownProps)=>({
  fetchCategories: ()=>dispatch(fetchCategories()),
  fetchProducts: ()=>dispatch(fetchProducts()),
  addProduct: (product)=>{dispatch(addProduct(product))},
  editProduct: (id,product)=>{dispatch(editProduct(id, product))},
})


const AddEditProduct = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    validate,
    form: 'add_product'
  })
)(AddEditProductDisconnected)


export default AddEditProduct