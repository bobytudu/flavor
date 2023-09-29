import { Box, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import prodImg from 'assets/img8.png'
import img7 from 'assets/img7.png'
import img from 'assets/img4.png'
import Draggable from 'react-draggable'
import size1Img from 'assets/sizes/size_1.png'
import size2Img from 'assets/sizes/size_2.png'
import size3Img from 'assets/sizes/size_3.png'
interface ImageType {
  id: string
  position: { x: number; y: number }
}

export default function Projects() {
  const colors = ['#2291FF', '#FFC700', '#FF0000', '#00FF00', '#0000FF']
  const [image, setImage] = React.useState<ImageType>({
    id: Math.random().toString(),
    position: { x: 0, y: 0 }
  })

  const handleDrag = (newPosition: { x: number; y: number }) => {
    setImage((prev) => ({ ...prev, position: newPosition }))
  }

  return (
    <div>
      <div
        style={{
          width: '100%',
          position: 'relative'
        }}>
        {/* left drawer */}
        <Box
          sx={{
            height: 'calc(100vh - 64px)',
            width: 400,
            position: 'absolute',
            left: 0,
            top: 0,
            background: 'white',
            p: 3,
            overflowY: 'auto'
          }}>
          <div style={{ marginBottom: 24 }}>
            <InputLabel>Propmt</InputLabel>
            <TextField
              multiline
              fullWidth
              rows={4}
              placeholder="Scene composition"
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <InputLabel>Shadow</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <InputLabel>Image selector</InputLabel>
            <Grid
              container
              spacing={1}>
              <Grid
                item
                xs={4}>
                <img
                  src={prodImg}
                  alt="img"
                  style={{ width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 8 }}
                />
              </Grid>
              <Grid
                item
                xs={4}>
                <img
                  src={prodImg}
                  alt="img"
                  style={{ width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 8 }}
                />
              </Grid>
              <Grid
                item
                xs={4}>
                <img
                  src={prodImg}
                  alt="img"
                  style={{ width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 8 }}
                />
              </Grid>
            </Grid>
          </div>
          <div style={{ marginBottom: 24 }}>
            <InputLabel>Colors</InputLabel>
            <Grid
              container
              columns={10}
              spacing={2}>
              {colors.map((color) => (
                <Grid
                  item
                  key={color}
                  sx={{}}
                  xs={2}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      backgroundColor: color
                    }}></div>
                </Grid>
              ))}
            </Grid>
          </div>
          <div style={{ marginBottom: 24 }}>
            <InputLabel>Aspect ration</InputLabel>
            <Grid
              container
              spacing={1}>
              <Grid
                item
                xs={4}>
                <img
                  src={size1Img}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
                  alt="size"
                />
              </Grid>
              <Grid
                item
                xs={4}>
                <img
                  src={size2Img}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
                  alt="size"
                />
              </Grid>
              <Grid
                item
                xs={4}>
                <img
                  src={size3Img}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
                  alt="size"
                />
              </Grid>
            </Grid>
          </div>
        </Box>

        <div
          style={{
            width: '100%',
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: '#E5E5E5',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
          <Draggable
            position={image.position}
            onStop={(e, data) => handleDrag({ x: data.x, y: data.y })}>
            <div>
              <Typography
                variant="subtitle1"
                sx={{ ml: 1, color: '#2291FF' }}>
                Dimensions: Instagram Post (1:1)
              </Typography>
              <img
                src={prodImg}
                style={{ width: 320, height: 320 }}
                alt="prod_img"
              />
            </div>
          </Draggable>
        </div>

        {/* right drawer */}
        <Box
          sx={{
            height: 'calc(100vh - 64px)',
            width: 400,
            position: 'absolute',
            right: 0,
            top: 0,
            background: 'white',
            p: 3,
            overflowY: 'auto'
          }}>
          <div style={{ marginBottom: 24 }}>
            <InputLabel>Recents</InputLabel>
            <Typography
              sx={{ mb: 1 }}
              color="text.secondary"
              variant="subtitle2">
              Instagram Post (1:1): A bottle of cosmetics stands on a rock in the middle of the jungle
            </Typography>
            <Grid
              container
              spacing={1}>
              {[1, 2, 3, 4].map((item) => (
                <Grid
                  item
                  xs={6}
                  key={item}>
                  <img
                    src={img}
                    alt="img"
                    style={{}}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <div style={{ marginBottom: 24 }}>
            <Typography
              sx={{ mb: 1 }}
              color="text.secondary"
              variant="subtitle2">
              Facebook Post (16:9): A bottle of cosmetics stands on a rock in the middle of the river
            </Typography>
            <Grid
              container
              spacing={1}>
              {[1, 2, 3, 4].map((item) => (
                <Grid
                  item
                  xs={6}
                  key={item}>
                  <img
                    src={img7}
                    alt="img"
                    style={{}}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <div style={{ marginBottom: 24 }}>
            <Typography
              sx={{ mb: 1 }}
              color="text.secondary"
              variant="subtitle2">
              Facebook Post (9:16): A bottle of cosmetics stands on a rock in the middle of the desert:
            </Typography>
            <Grid
              container
              spacing={1}>
              {[1, 2, 3, 4].map((item) => (
                <Grid
                  item
                  xs={6}
                  key={item}>
                  <img
                    src={img7}
                    alt="img"
                    style={{}}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
      </div>
    </div>
  )
}
