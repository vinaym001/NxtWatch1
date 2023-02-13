import {Component} from 'react'
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import Loader from 'react-loader-spinner'
import {FaHome, FaFire, FaWindowClose, FaSearch} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import ThemeContext from '../../context/ThemeContext'
import {
  UnOrListContainer,
  SideBar,
  ListItems,
  ContactDiv,
  VideoUL,
  VideoLI,
  BannerContainer,
  BannerButton,
  ContentDiv,
  DisplayBannerRow,
  IconButton,
  ViewContainer,
  EmptyView,
  VideoThumbnail,
  VideoDetails,
  VideoChannelLogo,
  VideoContentDetails,
  LoaderContainer,
  VideoListContainer,
  TitleText,
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
class Home extends Component {
  state = {
    videosList: [],
    showBanner: true,
    searchInput: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.renderTrendingVideos()
  }

  renderSideBar = isNightModeOn => {
    const bgColor = isNightModeOn && '#383838'
    const fontColor = isNightModeOn && 'white'
    return (
      <SideBar bgColor={bgColor} fontColor={fontColor}>
        <nav>
          <UnOrListContainer>
            {sideBarData.map(item => (
              <Link className="link-txt" to={item.link}>
                <ListItems key={item.id} fontColor={fontColor}>
                  <span className="icon-prop">{item.icon}</span>
                  <p className="link-text">{item.text}</p>
                </ListItems>
              </Link>
            ))}
          </UnOrListContainer>
        </nav>
        <ContactDiv fontColor={fontColor}>
          <p className="con-hea">CONTACT US</p>
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
  }

  renderTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstant.progress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searchInput}`,
      option,
    )
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
    } else {
      this.setState({apiStatus: apiStatusConstant.fail})
    }
  }

  renderFailView = isNightModeOn => {
    const onRetry = () => {
      this.setState(
        {apiStatus: apiStatusConstant.progress},
        this.renderTrendingVideos,
      )
      const url = isNightModeOn
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

      return (
        <EmptyView>
          <img src={url} alt="failure view" className="empty-logo" />
          <h1>Oops! Something Went Wrong </h1>
          <p>
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button type="button" onClick={onRetry} className="retry-btn">
            Retry
          </button>
        </EmptyView>
      )
    }
  }

  onCloseBanner = () => {
    this.setState({showBanner: false})
  }

  renderBannerView = isNightModeOn => {
    const bannerImg = isNightModeOn
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
    return (
      <BannerContainer data-testid="banner">
        <DisplayBannerRow>
          <img
            src={bannerImg}
            alt="nxt watch logo"
            className="nxt watch logo"
          />
          <IconButton
            type="button"
            onClick={this.onCloseBanner}
            data-testid="close"
          >
            <FaWindowClose />
          </IconButton>
        </DisplayBannerRow>
        <p>
          Buy Nxt Watch Premium prepaid plans with <br /> UPI
        </p>
        <BannerButton type="button">GET IT NOW</BannerButton>
      </BannerContainer>
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
        <p>Try different key words or remove search filter</p>
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

  renderSuccessView = isNightModeOn => {
    const bgColor = isNightModeOn && '#313131'
    const fontColor = isNightModeOn ? 'dark' : 'light'
    const {videosList} = this.state
    const isEmpty = videosList.length === 0
    return (
      <VideoUL bgColor={bgColor}>
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
                          <p className={fontColor}>{item.title}</p>
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

  renderApiData = isNightModeOn => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.progress:
        return this.renderLoader()
      case apiStatusConstant.fail:
        return this.renderFailView(isNightModeOn)
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
    const {showBanner, searchInput} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isNightModeOn} = value
          const bgColor = isNightModeOn ? '#181818' : '#f8fafc'
          const borderColor = isNightModeOn ? ' #606060' : '#d7dfe9'
          const color = isNightModeOn ? '#f1f1f1' : '#212121'
          return (
            <>
              <div className="home-bg-container">
                <Header />
                <ContentDiv>
                  {this.renderSideBar(isNightModeOn)}
                  <ViewContainer bgColor={bgColor}>
                    {showBanner && this.renderBannerView(isNightModeOn)}
                    <div className="search-div">
                      <input
                        type="search"
                        className="input-search"
                        placeholder="Search"
                        onChange={this.onSearchInput}
                      />
                      <button
                        className="search-iconb"
                        onClick={this.onClickSearchIcon}
                        type="button"
                        data-testid="searchButton"
                      >
                        <FaSearch
                          className="search-icon"
                          data-testid="searchButton"
                          value={searchInput}
                        />
                      </button>
                    </div>
                    {this.renderApiData(isNightModeOn)}
                  </ViewContainer>
                </ContentDiv>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
