import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Cart from './components/Cart/Cart.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import CartContext from './Context/CartContext.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import Payment from './components/Payment/Payment.jsx'
import './App.css'

class App extends Component {
  state = { cartList: [] }

  componentDidMount() {
    const storedData = JSON.parse(localStorage.getItem('cartData'))
    if (storedData) {
      this.setState({ cartList: storedData })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartList !== this.state.cartList) {
      localStorage.setItem('cartData', JSON.stringify(this.state.cartList))
    }
  }

  removeAllCartItem = () => {
    this.setState({ cartList: [] })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem =>
        id === eachCartItem.id
          ? { ...eachCartItem, quantity: eachCartItem.quantity + 1 }
          : eachCartItem
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    const { cartList } = this.state
    const product = cartList.find(item => item.id === id)
    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem =>
          id === eachCartItem.id
            ? { ...eachCartItem, quantity: eachCartItem.quantity - 1 }
            : eachCartItem
        ),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const { cartList } = this.state
    const updatedCart = cartList.filter(item => item.id !== id)
    this.setState({ cartList: updatedCart })
  }

  addCartItem = product => {
    const { cartList } = this.state
    const existingProduct = cartList.find(item => item.id === product.id)
    if (existingProduct) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  render() {
    const { cartList } = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItem,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    )
  }
}

export default App
