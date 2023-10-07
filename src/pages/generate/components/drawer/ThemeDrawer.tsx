import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material'
import React from 'react'

//images
import theme_1_img from 'assets/themes/theme_1.png'
import theme_2_img from 'assets/themes/theme_2.png'
import theme_3_img from 'assets/themes/theme_3.png'
import theme_4_img from 'assets/themes/theme_4.png'
import theme_5_img from 'assets/themes/theme_5.png'
import theme_6_img from 'assets/themes/theme_6.png'
import theme_7_img from 'assets/themes/theme_7.png'

export default function ThemeDrawer() {
  const [open, setOpen] = React.useState(false)
  const [selectedTheme, setSelectedTheme] = React.useState(0)
  const themeImages = [theme_1_img, theme_2_img, theme_3_img, theme_4_img, theme_5_img, theme_6_img, theme_7_img]
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onAbort={() => setOpen(false)}
        maxWidth="xs">
        <DialogContent>
          <Typography
            variant="h4"
            sx={{ mb: 2 }}>
            Set a theme
          </Typography>
          <Typography variant="subtitle1">This will overwrite your current progress in the Create section. Are you sure you want to do this?</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button>Cancel</Button>
          <Button
            fullWidth
            sx={{ bgcolor: 'background.color-brand-background' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        variant="h4"
        sx={{ mb: 2 }}>
        Themes
      </Typography>
      <Grid
        container
        spacing={1}>
        {themeImages.map((image, index) => (
          <Grid
            item
            key={index}
            sx={{ textAlign: 'center' }}
            xs={4}>
            <Box
              onClick={() => {
                setOpen(true)
                setSelectedTheme(index)
              }}
              sx={{
                borderRadius: '8px',
                borderColor: selectedTheme === index ? 'text.color-text-secondary' : 'transparent',
                borderWidth: '2px',
                borderStyle: 'solid',
                '&:hover': {
                  borderColor: 'text.color-text-secondary'
                },
                cursor: 'pointer'
              }}>
              <img
                alt="theme"
                style={{ width: 95, height: 95, marginBottom: 2 }}
                src={image}
              />
              <Typography
                color="text.color-text-secondary"
                variant="caption">
                River
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
