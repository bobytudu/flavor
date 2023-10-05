import React from 'react'
import projectImg from 'assets/project.png'
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  TableCell,
  TableRow,
  Typography,
  Button,
  Box
} from '@mui/material'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

interface ProjectCardPropTypes {
  title: string
  description: string
  created: string
  view: 'grid' | 'list'
}

export default function ProjectCard(props: ProjectCardPropTypes) {
  const menuItems = ['Rename', 'Remove']
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)
  const handleCloseEditMenu = () => setOpenEdit(false)
  const handleCloseDeleteMenu = () => setOpenDelete(false)
  const handleCloseUserMenu = (type: string) => {
    setAnchorElUser(null)
    if (type === 'Rename') setOpenEdit(true)
    else if (type === 'Remove') setOpenDelete(true)
  }
  return (
    <>
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}>
        <DialogContent>
          <Typography
            variant="h6"
            sx={{ mb: 2 }}>
            Rename Project
          </Typography>
          <InputLabel>Name</InputLabel>
          <OutlinedInput
            fullWidth
            value="Orange Peel"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseEditMenu}>Cancel</Button>
          <Button
            onClick={handleCloseEditMenu}
            fullWidth
            variant="contained">
            Rename Project
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        maxWidth="xs"
        open={openDelete}
        onClose={() => setOpenEdit(false)}>
        <DialogContent sx={{ maxWidth: 400 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2 }}>
            Delete Project
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2 }}>
            This will delete this project. This action cannot be undone. Are you sure you want to do this?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseDeleteMenu}>Cancel</Button>
          <Button
            onClick={handleCloseDeleteMenu}
            fullWidth
            color="error"
            sx={{ background: '#D31510', color: 'white' }}>
            Delete Project
          </Button>
        </DialogActions>
      </Dialog>
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
        {menuItems.map((setting) => (
          <MenuItem
            key={setting}
            onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
      {props.view === 'grid' ? (
        <Box
          sx={{
            maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: 310 },
            maxHeight: 500,
            cursor: 'pointer',
            '& .overlay_img': {
              border: '1px solid rgba(0, 0, 0, 0)'
            },
            '&:hover': {
              '& .overlay_img': {
                border: '1px solid rgba(0, 0, 0, 0.267)'
              }
            }
          }}>
          <img
            src={projectImg}
            alt={props.title}
            className="overlay_img"
            style={{ width: '100%', marginBottom: 16, height: 'auto', objectFit: 'cover', borderRadius: '8px', overflow: 'hidden' }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600 }}>
                {props.title}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary">
                {props.description}
              </Typography>
            </div>
            <IconButton onClick={handleOpenUserMenu}>
              <EllipsisHorizontalIcon style={{ width: 20 }} />
            </IconButton>
          </div>
        </Box>
      ) : (
        <TableRow
          sx={{
            cursor: 'pointer',
            '&:last-child td, &:last-child th': { border: 0 },
            '& .MuiTableCell-root': {
              border: 'none'
            },
            '&:hover': {
              '& .MuiTableCell-root:first-child': {
                background: 'rgba(234, 246, 192, 1)',
                borderRadius: '8px 0px 0px 8px'
              },
              '& .MuiTableCell-root': {
                background: 'rgba(234, 246, 192, 1)'
              },
              '& .MuiTableCell-root:last-child': {
                background: 'rgba(234, 246, 192, 1)',
                borderRadius: '0px 8px 8px 0px'
              }
            }
          }}>
          <TableCell>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={projectImg}
                alt="project"
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />
              <Typography
                variant="body2"
                sx={{ color: 'text.primary', ml: 2, fontWeight: 600 }}>
                {props.title}
              </Typography>
            </div>
          </TableCell>
          <TableCell>
            <Typography
              variant="body2"
              sx={{ color: 'text.primary', fontWeight: 400 }}>
              {props.description}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body2"
              sx={{ color: 'text.primary', fontWeight: 400 }}>
              {props.created}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <IconButton onClick={handleOpenUserMenu}>
              <EllipsisHorizontalIcon style={{ width: 20 }} />
            </IconButton>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
