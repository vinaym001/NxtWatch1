import styled from 'styled-components/macro'

export const UnOrListContainer = styled.ul`
  padding: 5px;
`
export const SideBar = styled.div`
  width: 20%;
  padding: 15px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.bgColor};
  color: ${props => props.fontColor};
`
export const ListItems = styled.li`
  list-style: none;
  margin-bottom: 5px;
  font-size: 18px;
  align-items: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${props => props.fontColor};
`
export const ContactDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${props => props.fontColor};
`
export const VideoUL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  background-color: ${props => props.bgColor};
`
export const VideoLI = styled.li`
  list-style: none;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`
export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 40vh;
  width: 100%;
  padding: 20px;
`
export const BannerButton = styled.button`
  background: transparent;
  border: 1px solid black;
  padding: 10px;
`
export const ContentDiv = styled.div`
  display: flex;
  padding-right: 10px;
  padding-left: 0px;
  margin: 0px;
`
export const DisplayBannerRow = styled.div`
  display: flex;
  justify-content: space-between;
`
export const HomeContainer = styled.div`
  padding: 10px;
`
export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`
export const ViewContainer = styled.div`
  background-color: ${props => props.bgColor};
  width: 80vw;
`
export const EmptyView = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const VideoThumbnail = styled.img`
  height: 150px;
  width: 280px;
  margin-right: 5px;
`
export const VideoChannelLogo = styled.img`
  height: 40px;
  width: 40px;
`
export const VideoDetails = styled.div`
  display: flex;
`
export const VideoContentDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px;
`
export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const VideoListContainer = styled.div`
  display: flex;
  padding: 2px;
`
export const TrendingLogoContainer = styled.h1`
  background-color: #f4f4f4;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  color: #231f20;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
`
export const TitleText = styled.p`
    color:${props => props.color}
    margin:5px;
`

export const TitlePara = styled.p`
    color:${props => props.color}
    margin:5px;
`
