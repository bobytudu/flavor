import { useMediaQuery, useTheme } from '@mui/material'

interface ScreenSize {
  xl: boolean
  lg: boolean
  md: boolean
  sm: boolean
  xs: boolean
}

export default function useScreenSize() {
  const theme = useTheme()
  const xl = useMediaQuery(theme.breakpoints.up('xl'))
  const lg = useMediaQuery(theme.breakpoints.up('lg'))
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const xs = useMediaQuery(theme.breakpoints.up('xs'))

  const sizes: ScreenSize = {
    xl,
    lg,
    md,
    sm,
    xs
  }

  return sizes
}
