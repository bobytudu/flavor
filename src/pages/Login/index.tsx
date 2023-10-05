import React from 'react'
import LoginForm from './LoginForm'
import Page from 'components/Page'
import { Box } from '@mui/material'
// import styles from '../styles/login.module.css'
import styles from 'styles/login.module.css'

function Login() {
  return (
    <Page
      title="Login"
      description="Login">
      <Box className={styles.loginPage}>
        <LoginForm />
      </Box>
    </Page>
  )
}

export default Login
