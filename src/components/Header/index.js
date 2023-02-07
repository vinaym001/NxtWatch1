import {BsBrightnessHigh} from 'react-icons/bs'
import {FaMoon} from 'react-icons/fa'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HeaderDiv, LogOutButton} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isNightModeOn, changeTheme} = value
      const onToggleIcon = () => {
        changeTheme()
      }

      const bgColorForDiv = isNightModeOn && '#313131'
      const btnBGColor = isNightModeOn ? '#313131' : '#3b82f6'
      const btnBorder = isNightModeOn ? 'white solid 1px' : 'none'
      const logoImageUrl = isNightModeOn
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const icontype = isNightModeOn ? (
        <BsBrightnessHigh className="icons-light-header" />
      ) : (
        <FaMoon className="icons-header" />
      )

      return (
        <HeaderDiv backgroundColor={bgColorForDiv}>
          <div>
            <Link to="/">
              <img
                src={logoImageUrl}
                alt="website logo"
                className="theme-logo"
              />
            </Link>
          </div>
          <div className="icons-container">
            <button
              className="icon-btn"
              onClick={onToggleIcon}
              type="button"
              data-testid="theme"
            >
              {icontype}
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile-logo"
            />
            <LogOutButton
              type="button"
              onClick={onLogout}
              btnBGColor={btnBGColor}
              btnBorder={btnBorder}
            >
              Logout
            </LogOutButton>
          </div>
        </HeaderDiv>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
