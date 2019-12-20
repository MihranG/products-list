import React from 'react'
import { BrowserRouter , Switch, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import ProductsContainer from './components/Products/ProductsContainer'
import NewProduct from './components/Products/AddEditProduct'
import NotFound from './components/NotFound/NotFound'

export function getRoutes() {
  return (
    <BrowserRouter>
      <Main>
        <Switch>
          <Route exact path="/" component={ProductsContainer}/>,
          <Route path="/new" component={NewProduct}/>,
          <Route path="/edit/:id" component={NewProduct}/>,
          <Route path="*" component={NotFound}/>,
        </Switch>
      </Main>
    </BrowserRouter >
  )
}

export default getRoutes
