import {Component} from 'react'
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import Loader from 'react-loader-spinner'
import {FaHome, FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {
  UnOrListContainer,
  SideBar,
  ListItems,
  ContactDiv,
  VideoUL,
  VideoLI,
  ContentDiv,
  ViewContainer,
  EmptyView,
  VideoThumbnail,
  VideoDetails,
  VideoChannelLogo,
  VideoContentDetails,
  LoaderContainer,
  VideoListContainer,
  TrendingLogoContainer,
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

const apiStatusConstant = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  fail: 'FAIL',
}
class Trending extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.renderTrendingVideos()
  }

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

  renderTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstant.progress})
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/videos/trending', option)
    const data = await response.json()
    const videosData = data.videos.map(eachItem => ({
      channel: eachItem.channel,
      id: eachItem.id,
      publishedAt: eachItem.published_at,
      thumbnailUrl: eachItem.thumbnail_url,
      title: eachItem.title,
      viewCount: eachItem.view_count,
    }))
    if (response.ok === true) {
      this.setState({
        videosList: videosData,
        apiStatus: apiStatusConstant.success,
      })
    } else if (data.status === 400) {
      this.setState({apiStatus: apiStatusConstant.fail})
    }
  }

  renderFailView = () => {
    const onRetry = () => {
      this.setState(
        {apiStatus: apiStatusConstant.progress},
        this.renderTrendingVideos,
      )
    }
    return (
      <EmptyView>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="empty-logo"
        />
        <h1>No Search results found </h1>
        <p>Try different keywords or remove search filter</p>
        <button type="button" onClick={onRetry} className="retry-btn">
          Retry
        </button>
      </EmptyView>
    )
  }

  renderEmptyView = () => {
    const onRetry = () => {
      this.setState(
        {apiStatus: apiStatusConstant.progress},
        this.renderTrendingVideos,
      )
    }
    return (
      <EmptyView>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="empty-logo"
        />
        <h1>No Search results found </h1>
        <p>Try different keywords or remove search filter</p>
        <button type="button" onClick={onRetry} className="retry-btn">
          Retry
        </button>
      </EmptyView>
    )
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="threeDots" height={50} width={50} />
    </LoaderContainer>
  )

  renderSuccessView = () => {
    const {videosList} = this.state
    const isEmpty = videosList.length === 0
    return (
      <VideoUL>
        {isEmpty
          ? this.renderEmptyView()
          : videosList.map(item => {
              const timeDiff = formatDistanceToNow(new Date(item.publishedAt))
              const {id} = item
              return (
                <Link className="link-txt" to={`/videos/${id}`}>
                  <VideoLI key={item.id}>
                    <VideoListContainer>
                      <VideoThumbnail
                        src={item.thumbnailUrl}
                        alt="video thumbnail"
                      />
                      <VideoDetails>
                        <VideoChannelLogo
                          src={item.channel.profile_image_url}
                          alt="channel logo"
                        />
                        <VideoContentDetails>
                          <p className="p">{item.title}</p>
                          <p className="p">{item.channel.name}</p>
                          <p className="p">
                            {item.viewCount} views {timeDiff} ago
                          </p>
                        </VideoContentDetails>
                      </VideoDetails>
                    </VideoListContainer>
                  </VideoLI>
                </Link>
              )
            })}
      </VideoUL>
    )
  }

  renderApiData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.progress:
        return this.renderLoader()
      case apiStatusConstant.fail:
        return this.renderFailView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.renderTrendingVideos)
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <ContentDiv>
          {this.renderSideBar()}
          <ViewContainer>
            <TrendingLogoContainer>
              <FaFire className="fire-icon" /> Trending
            </TrendingLogoContainer>
            {this.renderApiData()}
          </ViewContainer>
        </ContentDiv>
      </div>
    )
  }
}

export default Trending
