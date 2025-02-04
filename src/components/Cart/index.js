import {Link} from 'react-router-dom'

import {IoIosCloseCircleOutline} from 'react-icons/io'
import CartContext from '../../context/CartContext'

import Header from '../Header'

import './index.css'

// const {
//   dishId,
//   dishName,
//   dishPrice,
//   dishImage,
//   dishCurrency,
//   dishCalories,
//   dishDescription,
//   dishAvailability,
//   dishType,
//   addonCat,
// } = tableDetails

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      return (
        <div className="cart-bg-container">
          <Header />
          <hr />
          <div className="cart-main-container" data-testid="cart">
            <h1 className="cart-heading">My Cart</h1>

            <div className="cart-full-container">
              {cartList.length !== 0 ? (
                <div className="cart-container">
                  <button
                    type="button"
                    onClick={() => removeAllCartItems()}
                    className="remove-all"
                    data-testid="remove-all"
                  >
                    Remove All
                  </button>
                  <ul className="cart-list">
                    {cartList.map(cartItem => (
                      <li key={cartItem.dishId} className="carts">
                        <div className="dish-details">
                          <h5 className="cart-dish-name">
                            {cartItem.dishName}
                          </h5>
                          <p className="cart-dish-description">
                            {cartItem.dishDescription}
                          </p>
                          <p className="cart-calories">
                            Calories : {cartItem.dishCalories}
                          </p>

                          {cartItem.addonCat.length > 0 && (
                            <p className="cart-customization">
                              Customizations available
                            </p>
                          )}
                        </div>
                        <div className="count-container increase-decrease-container">
                          <button
                            type="button"
                            className="in-de-button"
                            onClick={() =>
                              decrementCartItemQuantity(cartItem.dishId)
                            }
                            data-testid={`decreament-quantity-${cartItem.dishId}`}
                          >
                            -
                          </button>
                          <p className="count">{cartItem.quantity || 0}</p>
                          <button
                            type="button"
                            className="in-de-button"
                            onClick={() =>
                              incrementCartItemQuantity(cartItem.dishId)
                            }
                            data-testid={`increment-quantity-${cartItem.dishId}`}
                          >
                            +
                          </button>
                        </div>
                        <img
                          src={cartItem.dishImage}
                          alt={cartItem.dishName}
                          className="item-img"
                        />
                        <button
                          type="button"
                          onClick={() => removeCartItem(cartItem.dishId)}
                          className="close-button"
                          data-testid="closeButton"
                        >
                          <IoIosCloseCircleOutline className="close-icon" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="empty-cart-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                    alt="empty cart"
                    className="empty-cart-image"
                    data-testid="empty-cart"
                  />
                  <p className="cart-dish-name">Your Cart Is Empty</p>
                  <Link to="/">
                    <button type="button" className="login-button">
                      Order Food
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
