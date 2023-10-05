import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from '../../styles/login.module.css'
import brandLogo from 'assets/images/brandLogo.svg'
import googleLogo from 'assets/images/googleLogo.svg'
import { getAuth, signInWithPopup, GoogleAuthProvider, sendSignInLinkToEmail } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
// import config from 'utils/config/env'
import { COLORS } from 'utils/colorConstant'
// import { init, identify, Identify, track } from '@amplitude/analytics-node'
import get from 'lodash/get'

// init(`${config.REACT_APP_AMPLITUDE_KEY}`)

function LoginForm() {
  const [email, setEmail] = useState('')
  const [emailLinkSent, setemailLinkSent] = useState(false)
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [emailError, setEmailError] = useState('')

  const firebaseConfig = {
    // Add your Firebase configuration here
    apiKey: 'AIzaSyC0m-3rojKkJRCTsUgLFnujKNzXDi0eVwc',
    authDomain: 'affi-86ea9.firebaseapp.com',
    projectId: 'affi-86ea9',
    storageBucket: 'affi-86ea9.appspot.com',
    messagingSenderId: '988546629610',
    appId: '1:988546629610:web:8486daf52f3b53a6e27c93',
    measurementId: 'G-S0F677RK44'
  }

  // Initialize Firebase app
  const firebaseApp = initializeApp(firebaseConfig)

  const auth = getAuth(firebaseApp)
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user
        // Save the access token and refresh token in local storage
        localStorage.setItem('time', new Date().toISOString())
        localStorage.setItem('accessToken', get(user, 'accessToken', ''))
        localStorage.setItem('refreshToken', user.refreshToken)
        localStorage.setItem('email', `${user.email}`)
        localStorage.setItem('name', `${user.displayName}`)
        localStorage.setItem('userId', user.uid)
        window.location.href = '/'
        window.amplitude.identify({ user_id: user.email })
        window.amplitude.track('Session started', { email: user.email })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const actionCodeSettings = {
    url: 'https://app.getflavor.ai/signin?email=' + email,
    handleCodeInApp: true
  }
  const handleContinue = () => {
    let mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/
    if (email.match(mailformat)) {
      setEmailError('')
    } else {
      setEmailError('Please enter valid email')
      return
    }
    setIsSubmittingEmail(true)
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('email', email)
        // const identifyObj = new Identify()
        // identify(identifyObj, {
        //   user_id: email
        // })
        // track('Sign in link sent', { email: email })
        setemailLinkSent(true)
        setIsSubmittingEmail(false)
      })
      .catch((error) => {
        console.log(error.message)
        setIsSubmittingEmail(false)
      })
  }

  const handleContinueAgain = () => {
    let mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/
    if (email.match(mailformat)) {
      setEmailError('')
    } else {
      setEmailError('Please enter valid email')
      return
    }
    setemailLinkSent(false)
    setIsSubmittingEmail(true)
    window.localStorage.setItem('email', '')
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('email', email)
        setemailLinkSent(true)
        setIsSubmittingEmail(false)
      })
      .catch((error) => {
        console.log(error.message)
        setIsSubmittingEmail(false)
      })
  }

  return (
    <Box className={styles.loginForm}>
      <Box className={styles.logoImageBox}>
        <img
          src={brandLogo}
          alt="brand logo"
          className={styles.logoImage}
        />
      </Box>
      <Typography className={styles.beautifulText}>Beautiful product photos in seconds</Typography>
      <Typography className={styles.loginText}>Log in or Sign up</Typography>
      <Box
        className={styles.googleBox}
        sx={{ cursor: 'pointer' }}
        onClick={handleGoogleSignIn}>
        <img
          src={googleLogo}
          alt="google logo"
        />
        <Typography className={styles.googleText}>Continue with Google</Typography>
      </Box>
      <Typography className={styles.orText}>or</Typography>
      <TextField
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        className={styles.inputEmail}
        size="medium"
        label="Email"
        helperText={emailError}
        sx={{
          '.MuiInputBase-input': {
            background: '#fff',
            borderRadius: '10px'
          }
        }}
      />
      {/* <Typography className={styles.oneTimeCodeText}>
        We sent you an email with a one-time code
      </Typography>
      <TextField
        fullWidth
        value={code}
        onChange={(e) => setCode(e.target.value)}
        variant="outlined"
        className={styles.inputCode}
        size="medium"
        label="Paste the 6-digit code here to log in"
      /> */}
      {emailLinkSent ? (
        <Button
          variant="contained"
          size="large"
          fullWidth
          className={styles.continueBtn}
          onClick={handleContinueAgain}
          disabled={!email || isSubmittingEmail}
          sx={{
            color: COLORS.black,
            backgroundColor: COLORS.greenishYellow,
            '&:enabled': {
              backgroundColor: COLORS.greenishYellow
            }
          }}>
          {isSubmittingEmail ? 'Sending Email' : 'Resend Email'}
        </Button>
      ) : (
        <Button
          variant="contained"
          size="large"
          fullWidth
          className={styles.continueBtn}
          onClick={handleContinue}
          disabled={!email || isSubmittingEmail}
          sx={{
            color: COLORS.black,
            backgroundColor: COLORS.greenishYellow,
            '&:enabled': {
              backgroundColor: COLORS.greenishYellow
            }
          }}>
          {isSubmittingEmail ? 'Sending Email' : 'Continue'}
        </Button>
      )}
      {emailLinkSent && (
        <Typography
          className={styles.acknowledgeText}
          textAlign="center">
          Please check your email for the login link.{' '}
        </Typography>
      )}
      <Typography className={styles.acknowledgeText}>
        By continuing, you acknowledge that you agree to Flavor’s{' '}
        <a
          className={styles.linkStyle}
          href={'/terms-of-service'}
          target="_blank"
          rel="noreferrer">
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          className={styles.linkStyle}
          href={'/privacy-policy'}
          target="_blank"
          rel="noreferrer">
          Privacy Policy
        </a>
        .
      </Typography>
    </Box>
  )
}

export default LoginForm
