import { useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const onClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 300 })
    navigate('/', { replace: true })
  }

  const onSubmitFailure = errorMsg => {
    setShowError(true)
    setErrorMsg(errorMsg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-filed"
        value={username}
        onChange={onChangeUsername}
      />
    </>
  )

  const renderPasswordField = () => (
    <>
      <label className="input-label">
        PASSWORD
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        className="password-input-filed"
        value={password}
        onChange={onChangePassword}
      />
    </>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <div className="bg-container">
      <form onSubmit={onSubmitForm} className="form-container">
        <img
          src="https://res.cloudinary.com/dezjxjqqp/image/upload/v1708872734/Logo_1_shlmtf.jpg"
          alt="login website logo"
          className="website-logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <div className="checkbox-container">
          <input
            className="check-box"
            type="checkbox"
            id="checkbox"
            onChange={onClickShowPassword}
          />
          <label>Show Password</label>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
