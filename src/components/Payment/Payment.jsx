import { useContext } from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../Context/CartContext.jsx'
import './index.css'

const Payment = () =>{ 
  const { removeAllCartItems } = useContext(CartContext)
  const onConfirmOrder = () => { 
    removeAllCartItems()
    
  }
  return(
  <div className="success-container">
    <img
      src="https://res.cloudinary.com/dezjxjqqp/image/upload/v1709987763/success_x9ndwy.png"
      alt="success"
      width="70"
    />
    <h1 className="text">Payment Successful</h1>
    <p className="info">Thank you for ordering</p>
    <p className="info">Your payment is successfully completed.</p>
    <Link to="/" className="link-to-home">
      <button type="button" className="return-btn" onClick={onConfirmOrder}>
        Return to Homepage
      </button>
    </Link>
  </div>
)}
export default Payment