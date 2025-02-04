import {Component} from 'react'
import {Switch, BrowserRouter, Route} from 'react-router-dom'

import Restaurant from './components/Restaurant'
import Login from './components/Login'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(cart => id !== cart.dishId),
    }))

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState

      if (cartList.find(item => item.dishId === product.dishId)) {
        return {
          cartList: cartList.map(item =>
            item.dishId === product.dishId
              ? {...item, quantity: item.quantity + product.quantity}
              : item,
          ),
        }
      }
      return {cartList: [...cartList, product]}
    })
  }

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = id => {
    console.log('increase')
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dishId === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dishId === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    }))

  render() {
    const {cartList} = this.state
    console.log({cartList})
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            removeAllCartItems: this.removeAllCartItems,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/" component={Restaurant} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}
export default App
