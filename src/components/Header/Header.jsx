import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Login from '../Login/Login.jsx'
import './index.css'
import { useNavigate } from "react-router-dom"


const Header = () => {
   const navigate = useNavigate()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate("/login", { replace: true })  }
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dezjxjqqp/image/upload/v1709916866/Logo_n8bguh.png"
          alt="website logo"
          className="website-logo"
          width="80"
        />
      </Link>
      <div className="nav-links">
        <Link to="/" className="Links">
          Home
        </Link>
        <Link to="/cart" className="Links">
          <button type="button" className="cart-btn">
            Cart
          </button>
        </Link>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default Header
