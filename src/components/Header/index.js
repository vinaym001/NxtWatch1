import {BsBrightnessHigh} from 'react-icons/bs'
import {FaMoon} from 'react-icons/fa'
import {HeaderDiv, LogOutButton} from './styledComponents'

// import {MdOutlineLightMode} from 'react-icons/md'

import './index.css'

const Header = () => (
  <HeaderDiv>
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="theme"
        className="theme-logo"
      />
    </div>
    <div className="icons-container">
      <BsBrightnessHigh className="icons-header" />
      <FaMoon className="icons-header" />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
        alt="profile"
        className="profile-logo"
      />
      <LogOutButton type="button">Logout</LogOutButton>
    </div>
  </HeaderDiv>
)

export default Header
