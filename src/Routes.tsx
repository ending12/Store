import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Category } from './components/admin/AddCategory'
import { AddProduct } from './components/admin/AddProduct'
import { AdminRoute } from './components/admin/AdminRoute'
import { Dashboard } from './components/admin/Dashboard'
import { DashboardAdmin } from './components/admin/DashboardAdmin'
import  Order  from './components/admin/Order'
import { PrivateRoute } from './components/admin/PrivateRoute'
import { Cart } from './components/core/Cart'
import { Home } from './components/core/Home'
import { Product } from './components/core/Product'
import { Shop } from './components/core/Shop'
import { Signin } from './components/core/Signin'
import Signup  from './components/core/Signup'
import { Success } from './components/core/Success'
export const Routes = () => {
    //注册路由 :productId 接收id参数
  return ( 
      <HashRouter>
          <Switch>
              <Route path="/" component={Home} exact></Route>
              <Route path="/shop" component={Shop}></Route>
              <Route path="/signin" component={Signin}></Route>
              <Route path="/signup" component={Signup}></Route>
              <Route path="/cart" component={Cart}></Route>
              <Route path="/paysuccess" component={Success} />

              {/* <Route path="/user/dashboard" component={Dashboard}></Route> */}

              <PrivateRoute path="/user/dashboard" component={Dashboard}></PrivateRoute>
              <AdminRoute path="/admin/dashboard" component={DashboardAdmin}></AdminRoute>
              <AdminRoute path="/create/category" component={Category}></AdminRoute>
              <AdminRoute path="/create/product" component={AddProduct}></AdminRoute>
              <AdminRoute path="/admin/orders" component={Order}></AdminRoute>
              <AdminRoute path="/product/:productId" component={Product}></AdminRoute>
          </Switch>
      </HashRouter>
   )
}
