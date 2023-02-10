import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FormButton} from './styledComponents'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errMsg: '',
  }

  onEnterUserName = event => {
    this.setState({username: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  onCheckBox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailLogin = errrMsg => {
    this.setState({errMsg: errrMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', option)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessLogin(data.jwt_token)
    } else {
      const data = await response.json()
      this.onFailLogin(data.error_msg)
    }
  }

  render() {
    const {username, password, showPassword, errMsg} = this.state
    const isError = errMsg !== ''
    const inputType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="form" onSubmit={this.onSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="img-logo"
            alt="logo"
          />
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            className="input"
            onChange={this.onEnterUserName}
            value={username}
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            id="password"
            type={inputType}
            placeholder="Enter Password"
            className="input"
            onChange={this.onEnterPassword}
            value={password}
          />
          <div className="checkbox-label-container">
            <input type="checkbox" id="checkBox" onChange={this.onCheckBox} />
            <label htmlFor="checkBox" className="checkbox-label">
              show password
            </label>
          </div>
          <FormButton type="submit">Login</FormButton>
          {isError && <p className="error-msg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
