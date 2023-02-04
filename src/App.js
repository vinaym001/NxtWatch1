import './App.css'

import {Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'

const App = () => (
  <div>
    <Route path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/trending" component={Trending} />
    <Route exact path="/gaming" component={Gaming} />
    <Route exact path="/videos/:id" component={VideoItemDetails} />
  </div>
)

export default App
