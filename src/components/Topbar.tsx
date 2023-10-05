import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import logoImg from 'assets/logo/logo.png'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, Bars3Icon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { useTestData } from 'context/TestContext'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'redux/reducers/auth.reducer'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from 'service/firebase'
import { useAppSelector } from 'redux/hooks'

const pages = ['Home', 'Projects', 'Images', 'Assets']
const links = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Projects',
    path: '/projects'
  },
  {
    name: 'Images',
    path: '/images'
  },
  {
    name: 'Assets',
    path: '/assets'
  }
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function Topbar() {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { state, screenTitle, setState } = useTestData()
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = (type?: string) => {
    setAnchorElUser(null)
    if (type === 'Logout') {
      signOut(firebaseAuth).then(() => {
        localStorage.clear()
        dispatch(logout())
      })
    }
  }

  function goBack() {
    navigate(-1)
    setState(false)
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        px: 4
      }}>
      <Toolbar disableGutters>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}>
            <Bars3Icon style={{ width: 30, color: 'black' }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}>
            {pages.map((page, index) => (
              <MenuItem
                key={`page_${index}`}
                onClick={handleCloseNavMenu}>
                <Link to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}>
                  <Typography
                    textAlign="center"
                    sx={{ textDecoration: 'none', color: 'text.primary' }}>
                    {page}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            flexGrow: { xs: 1, md: 0 }
          }}>
          <Link to="/">
            <img
              src={logoImg}
              alt="brand_logo"
              style={{ width: 100, height: 20 }}
            />
          </Link>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, flexGrow: 1 }}>
          {state ? (
            links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}>
                {({ isActive }) => (
                  <Button
                    disableRipple
                    key={link.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: isActive ? 'text.primary' : 'text.disabled',
                      display: 'block',
                      fontWeight: 600,
                      fontSize: 16,
                      background: 'transparent',
                      '&:hover': {
                        background: 'transparent',
                        color: 'text.primary'
                      }
                    }}>
                    {link.name}
                  </Button>
                )}
              </NavLink>
            ))
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1
              }}>
              <IconButton onClick={goBack}>
                <ArrowLeftIcon style={{ width: 20, height: 20 }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ ml: 2, display: 'inline', color: 'text.primary' }}>
                {screenTitle}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="subtitle2"
            color="text.color-text-clickable"
            sx={{
              display: { xs: 'none', md: 'block' },
              textDecoration: 'underline'
            }}>
            101 Credits left
          </Typography>
          <IconButton sx={{ mx: 1 }}>
            <EllipsisHorizontalIcon style={{ width: 25 }} />
          </IconButton>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}>
              <Avatar
                style={{ width: 35, height: 35 }}
                alt={`${user?.displayName}`}
                src={`${user?.photoURL}`}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={() => handleCloseUserMenu()}>
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default Topbar
