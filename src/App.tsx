import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes/Routes'
import ThemeProvider from 'theme'
import { Box } from '@mui/material'
import { Provider } from 'react-redux'
import TestContextProvider from 'context/TestContext'
import store from 'redux/store'

declare global {
  interface Window {
    amplitude: any // Use the appropriate type if you have it
  }
}


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider>
          <Box
            sx={{
              bgcolor: 'background.color-background-grey',
              minHeight: '100vh'
            }}>
            <BrowserRouter>
              <TestContextProvider>
                <Routes />
              </TestContextProvider>
            </BrowserRouter>
          </Box>
        </ThemeProvider>
      </Provider>
    </div>
  )
}

export default App
