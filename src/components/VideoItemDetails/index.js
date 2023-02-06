import {Component} from 'react'
import Cookies from 'js-cookie'

import {BiLike, BiDislike} from 'react-icons/bi'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {FaHome, FaFire} from 'react-icons/fa'
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
  ContentDiv,
  ViewContainer,
  EmptyView,
  VideoThumbnail,
  VideoDetails,
  VideoChannelLogo,
  VideoContentDetails,
  LoaderContainer,
  VideoListContainer,
  GamingLogoContainer,
  DislikeButton,
  LikeButton,
  SaveButton,
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
class VideoItemDetails extends Component {
  state = {
    videoInfo: {},
    apiStatus: apiStatusConstant.initial,
    isLikeClicked: false,
    isDislikeClicked: false,
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
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstant.progress})
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, option)
    const data = await response.json()
    console.log(data)
    const videosData = data.video_details
    const formattedData = {
      channel: videosData.channel,
      description: videosData.description,
      id: videosData.id,
      publishedAt: videosData.published_at,
      thumbnailUrl: videosData.thumbnail_url,
      title: videosData.title,
      viewCount: videosData.view_count,
      videoUrl: videosData.video_url,
    }
    if (response.ok === true) {
      this.setState({
        videoInfo: formattedData,
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

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="threeDots" height={50} width={50} />
    </LoaderContainer>
  )

  onLike = () => {
    const {isDislikeClicked} = this.state
    if (isDislikeClicked === true) {
      this.setState(prevState => ({
        isLikeClicked: !prevState.isLikeClicked,
        isDislikeClicked: false,
      }))
    } else {
      this.setState(prevState => ({
        isLikeClicked: !prevState.isLikeClicked,
      }))
    }
  }

  onDislike = () => {
    const {isLikeClicked} = this.state
    if (isLikeClicked === true) {
      this.setState(prevState => ({
        isDislikeClicked: !prevState.isDislikeClicked,
        isLikeClicked: false,
      }))
    } else {
      this.setState(prevState => ({
        isDislikeClicked: !prevState.isDislikeClicked,
      }))
    }
  }

  renderSuccessView = (isNightModeOn, addToSaveList, savedVideosList) => {
    const {videoInfo, isLikeClicked, isDislikeClicked} = this.state
    const {
      id,
      description,
      publishedAt,
      videoUrl,
      title,
      viewCount,
      channel,
    } = videoInfo

    const likeColor = isLikeClicked ? '#3b82f6' : '#212121'
    const dislikeColor = isDislikeClicked ? '#ff0000' : '#212121'
    const isSaved =
      savedVideosList.filter(item => item.id === videoInfo.id).length !== 0
    const saveBtnText = isSaved ? 'Saved' : 'Save'
    const saveBtnColor = isSaved && '#2563eb'

    const onSave = () => {
      addToSaveList(videoInfo)
    }
    const timeDiff = formatDistanceToNow(new Date(publishedAt))
    const titleColor = isNightModeOn ? 'white' : '#212121'
    const textColor = isNightModeOn ? '#94a3b8' : '#64748b'
    const descColor = isNightModeOn ? 'white' : '#616e7c'

    return (
      <div>
        <ReactPlayer url={videoUrl} width={900} height={500} controls />
        <p>{title}</p>
        <div className="flex">
          <p className="video-player-count">
            {viewCount} views. {timeDiff} ago
          </p>
          <div>
            <LikeButton type="button" onClick={this.onLike} color={likeColor}>
              <BiLike /> Like
            </LikeButton>
            <DislikeButton
              type="button"
              onClick={this.onDislike}
              color={dislikeColor}
            >
              <BiDislike /> Dislike
            </DislikeButton>
            <SaveButton type="button" onClick={onSave} color={saveBtnColor}>
              <CgPlayListAdd />
              {saveBtnText}
            </SaveButton>
          </div>
        </div>
        <hr width={1000} />
        <div className="flex-ns">
          <img
            src={channel.profile_image_url}
            alt="channel logo"
            className="channel-logo"
          />
          <div>
            <p className="channel-name">{channel.name}</p>
            <p className="sub-count">{channel.subscriber_count} subscribers</p>
          </div>
        </div>
        <p>{description}</p>
      </div>
    )
  }

  renderApiData = (isNightModeOn, addToSaveList, savedVideosList) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.progress:
        return this.renderLoader()
      case apiStatusConstant.fail:
        return this.renderFailView()
      case apiStatusConstant.success:
        return this.renderSuccessView(
          isNightModeOn,
          addToSaveList,
          savedVideosList,
        )
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isNightModeOn, addToSaveList, savedVideosList} = value
          const bgColor = isNightModeOn ? '#0f0f0f' : '#f8fafc'
          return (
            <div className="home-bg-container">
              <Header />
              <ContentDiv color={bgColor}>
                {this.renderSideBar()}
                <ViewContainer color={bgColor}>
                  {this.renderApiData(
                    isNightModeOn,
                    addToSaveList,
                    savedVideosList,
                  )}
                </ViewContainer>
              </ContentDiv>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
