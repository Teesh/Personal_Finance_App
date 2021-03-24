import React, { Component } from 'react'
import './App.css'
import Header from './layouts/Header'
import Content from './layouts/Content'
import Dashboard from './components/Dashboard'
import Footer from './layouts/Footer'
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
})

class App extends Component {
  public render () {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Header />
          <Content>
            <Dashboard />
          </Content>
          <Footer />
        </ThemeProvider>    
      </div>
    )
  }
}

export default App
