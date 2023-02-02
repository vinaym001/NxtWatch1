import './App.css'

import {Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'

const App = () => (
  <div>
    <Route path="/login" component={Login} />
    <Route exact path="/" component={Home} />
  </div>
)

export default App
