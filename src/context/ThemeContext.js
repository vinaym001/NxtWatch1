import React from 'react'

const ThemeContext = React.createContext({
  isNightModeOn: '',
  changeTheme: () => {},
  savedVideosList: [],
  addToSaveList: () => {},
  isLogoutClicked: '',
  onLogoutClicked: () => {},
})

export default ThemeContext
