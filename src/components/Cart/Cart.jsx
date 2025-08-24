import Header from '../Header/Header.jsx'
import CartListView from '../CartListView/CartListView.jsx'
import CartContext from '../../Context/CartContext.jsx'
import EmptyCartView from '../EmptyCartView/EmptyCartView.jsx'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />  
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">Items</h1>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>
                <CartListView />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
