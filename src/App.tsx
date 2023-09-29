import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes/Routes'
import ThemeProvider from 'theme'
import { Box } from '@mui/material'
import TestContextProvider from 'context/TestContext'

function App() {
  return (
    <div className="App">
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
    </div>
  )
}

export default App
