import './App.css'
import {Component} from 'react'

import {Route, Redirect, Switch} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ThemeContext from './context/ThemeContext'

class App extends Component {
  state = {isNightModeOn: false, savedVideosList: []}

  changeTheme = () => {
    this.setState(prevState => ({
      isNightModeOn: !prevState.isNightModeOn,
    }))
  }

  addToSaveList = videoInfor => {
    const {savedVideosList} = this.state
    const isPresent =
      savedVideosList.filter(item => item.id === videoInfor.id).length !== 0
    if (isPresent) {
      this.setState(prevState => ({
        savedVideosList: prevState.savedVideosList.filter(
          eachItem => eachItem.id !== videoInfor.id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, videoInfor],
      }))
    }
  }

  render() {
    const {savedVideosList, isNightModeOn} = this.state

    return (
      <ThemeContext.Provider
        value={{
          savedVideosList,
          addToSaveList: this.addToSaveList,
          isNightModeOn,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
