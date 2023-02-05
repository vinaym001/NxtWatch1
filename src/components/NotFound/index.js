import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaHome, FaFire, FaWindowClose, FaSearch} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {
  UnOrListContainer,
  SideBar,
  ListItems,
  ContactDiv,
  ContentDiv,
  ViewContainer,
  EmptyView,
} from './styledComponents'

import Header from '../Header'
import './index.css'

const sideBarData = [
  {
    id: 0,
    text: 'Home',
    icon: <FaHome />,
    link: '/',
  },
  {
    id: 1,
    text: 'Trending',
    icon: <FaFire />,
    link: '/trending',
  },
  {
    id: 2,
    text: 'Gaming',
    icon: <SiYoutubegaming />,
    link: '/gaming',
  },
  {
    id: 3,
    text: 'Saved videos',
    icon: <CgPlayListAdd />,
    link: '/saved-videos',
  },
]

class NotFound extends Component {
  renderSideBar = () => (
    <SideBar>
      <nav>
        <UnOrListContainer>
          {sideBarData.map(item => (
            <Link className="link-txt" to={item.link}>
              <ListItems key={item.id}>
                <span className="icon-prop">{item.icon}</span>
                <p className="link-text">{item.text}</p>
              </ListItems>
            </Link>
          ))}
        </UnOrListContainer>
      </nav>
      <ContactDiv>
        <h1 className="con-hea">CONTACT US</h1>
        <div className="contact-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="contact-logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="contact-logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="contact-logo"
          />
        </div>
        <p className="con-par">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </ContactDiv>
    </SideBar>
  )

  renderEmptyView = () => (
    <EmptyView>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
        className="empty-logo"
      />
      <h1>Page Not Found</h1>
      <p> we are sorry, the page you requested could not be found.</p>
    </EmptyView>
  )

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <ContentDiv>
          {this.renderSideBar()}
          <ViewContainer>{this.renderEmptyView()}</ViewContainer>
        </ContentDiv>
      </div>
    )
  }
}

export default NotFound
