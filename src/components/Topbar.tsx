import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import logoImg from 'assets/logo/logo.png'

import { Link, NavLink } from 'react-router-dom'
import { Bars3Icon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

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

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: 'white', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
      <Container maxWidth="xl">
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
              {pages.map((page) => (
                <MenuItem
                  key={page}
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
            {links.map((link) => (
              <NavLink to={link.path}>
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
            ))}
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
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
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
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Topbar
