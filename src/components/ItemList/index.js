import {useState} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const ItemList = props => {
  const {tableDetails} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    addonCat,
  } = tableDetails

  const [quantity, setQuantity] = useState(0)
  const [addCart, setAddCart] = useState('')

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const addToCart = () => {
          if (quantity !== 0) {
            setQuantity(0)
            addCartItem({...tableDetails, quantity})
            setAddCart('Your Food Add Your Cart')
            setTimeout(() => setAddCart(''), 3000)
          } else {
            setAddCart('Please Add quantity')
            setTimeout(() => setAddCart(''), 3000)
          }
        }
        console.log(addCart)
        return (
          <li key={dishId} className="item-container">
            <div className="left-item-container">
              <div
                className={
                  dishType === 1 ? 'non-veg-mark' : 'non-veg-mark veg-mark'
                }
              >
                <p className={dishType === 1 ? 'non-veg' : 'non-veg veg'}> </p>
              </div>
              <div>
                <div className="dishdetails-container">
                  <h3 className="dish-name" data-testid={`dish-name-${dishId}`}>
                    {dishName}
                  </h3>
                  <p
                    className="dish-price"
                    data-testid={`${dishCurrency} ${dishPrice}`}
                  >{`${dishCurrency} ${dishPrice}`}</p>
                  <p className="dish-description">{dishDescription}</p>
                </div>
                <div className="buttons-container">
                  {dishAvailability ? (
                    <div>
                      <div className="count-container">
                        <button
                          type="button"
                          className="in-de-button"
                          onClick={() =>
                            setQuantity(prevQuantity =>
                              prevQuantity < 1 ? 0 : prevQuantity - 1,
                            )
                          }
                        >
                          -
                        </button>
                        <p
                          className="count"
                          data-testid={`item-quantity-${dishId}`}
                        >
                          {quantity || 0}
                        </p>
                        <button
                          type="button"
                          className="in-de-button"
                          onClick={() =>
                            setQuantity(prevQuantity => prevQuantity + 1)
                          }
                          data-testid={`increment-quantity-${dishId}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="login-button"
                        onClick={addToCart}
                        data-testid={`add-to-cart-${dishId}`}
                      >
                        ADD TO CART
                      </button>
                      <span className="add-cart-msg">{addCart}</span>
                    </div>
                  ) : (
                    <p className="not-available">Not available</p>
                  )}
                  {addonCat.length > 0 && (
                    <p className="customization">Customizations available</p>
                  )}
                </div>
              </div>
            </div>
            <div className="right-item-container">
              <p className="calories">{`${dishCalories} calories`}</p>
              <img
                src={dishImage}
                alt={dishName}
                className="item-img"
                data-testid={`dish-image-${dishId}`}
              />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default ItemList
