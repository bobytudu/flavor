import React from 'react'
import {
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  Divider,
  Container,
  Box,
  IconButton,
  Typography,
  SxProps,
  Tooltip,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material'
import { Link } from 'react-router-dom'
import logoImg from 'assets/logo/logo.png'
import { ArrowLeftIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

interface FullScreenDialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
  contentProps?: SxProps
}

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
export default function FullScreenDialog({ open, onClose, children, title, contentProps }: FullScreenDialogProps) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <Dialog
      open={open}
      fullScreen>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: 'white', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', display: 'flex' }}>
        <Container
          maxWidth="xl"
          style={{ paddingLeft: 16 }}>
          <Toolbar disableGutters>
            <Link to="/">
              <img
                src={logoImg}
                alt="brand_logo"
                style={{ width: 100, height: 20 }}
              />
            </Link>
            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              sx={{ mx: 2 }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1
              }}>
              <IconButton onClick={onClose}>
                <ArrowLeftIcon style={{ width: 20, height: 20 }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ ml: 2, display: 'inline', color: 'text.primary' }}>
                {title}
              </Typography>
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
      <DialogContent sx={{ bgcolor: 'background.color-background-grey', ...contentProps }}>{children}</DialogContent>
    </Dialog>
  )
}
