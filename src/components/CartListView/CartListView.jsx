import { useContext } from 'react'
import CartItem from '../CartItem/CartItem.jsx'
import CartContext from '../../Context/CartContext.jsx'
import Payment from '../Payment/Payment.jsx'
import {Link} from 'react-router-dom'
import './index.css'

const CartListView = () => {
  const { cartList } = useContext(CartContext)

  let total = 0
  cartList.forEach(eachCartItem => {
    total += eachCartItem.price.replace('₹', '') * eachCartItem.quantity
  })

  const onClickCheckout = () => {
    return <Payment />
  }

  return (
    <ul className="cart-list">
      {cartList.map(eachCartItem => (
        <CartItem
          key={eachCartItem.id}
          cartItemDetails={eachCartItem}
        />
      ))}
      <div className="cart-summary-container">
        <h1 className="order-total-value">
          Total ({cartList.length} Items): <p>{total}</p>
        </h1>
        <Link to="/payment" className="link-to-payment" >
        <button
          type="button"
          className="checkout-button"
          onClick={onClickCheckout}
        >
          Checkout
        </button>
        </Link>
      </div>
    </ul>
  )
}

export default CartListView
