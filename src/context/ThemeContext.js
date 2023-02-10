import React from 'react'

const ThemeContext = React.createContext({
  isNightModeOn: '',
  changeTheme: () => {},
  savedVideosList: [],
  addToSaveList: () => {},
})

export default ThemeContext
