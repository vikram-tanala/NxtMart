import {useState, useContext} from 'react'
import './index.css'
import CartContext from '../../Context/CartContext.jsx'

const ProductCard = ({details}) => {
  const [quantity, setQuantity] = useState(0)
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    addCartItem,
  } = useContext(CartContext)

  const {id, name, weight, price, image} = details

  const onClickAdd = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + 1
      addCartItem({...details, quantity: newQuantity})
      return newQuantity
    })
  }

  const onDecrementQuantity = () => {
    if (quantity >= 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
      decrementCartItemQuantity(id)
    }
  }

  const onIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
    incrementCartItemQuantity(id)
  }

  return (
    <li className="product-card" >
      <img src={image} alt={name} className="image" />
      <div className="product-details">
        <div className="info">
          <p className="product-name">{name}</p>
          <p className="product-weight">{weight}</p>
          <p className="product-price">{price}</p>
        </div>
        {quantity > 0 ? (
          <div className="controls">
            <button
              type="button"
              className="control-btn"
              onClick={onDecrementQuantity}
            >
              -
            </button>
            <p className="quantity" >
              {quantity}
            </p>
            <button
              type="button"
              className="control-btn"
              onClick={onIncrementQuantity}
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={onClickAdd}
          >
            Add
          </button>
        )}
      </div>
    </li>
  )
}

export default ProductCard
