import { Box, Button, Grid, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material'
import React from 'react'
import prodImg from 'assets/img8.png'
import img7 from 'assets/img7.png'
import img from 'assets/img4.png'
import size1Img from 'assets/sizes/size_1.png'
import size2Img from 'assets/sizes/size_2.png'
import size3Img from 'assets/sizes/size_3.png'
import { DocumentTextIcon, PaintBrushIcon, PhotoIcon, SparklesIcon } from '@heroicons/react/24/solid'

export default function Projects() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const colors = ['#2291FF', '#FFC700', '#FF0000', '#00FF00', '#0000FF']
  React.useEffect(() => {
    const img = document.getElementById('prod_img')
    if (img) {
      img.addEventListener('scroll', (e) => {
        console.log(e)
      })
    }
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          width: 80,
          height: 'calc(100vh - 75px)'
        }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          TabIndicatorProps={{ style: { display: 'none' } }}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ '& .Mui-selected': { background: 'white' } }}>
          <Tab
            sx={{ py: 2 }}
            label={
              <>
                <DocumentTextIcon style={{ width: 14, height: 16 }} />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 400 }}>
                  Theme
                </Typography>
              </>
            }
          />
          <Tab
            sx={{ py: 2 }}
            label={
              <>
                <PaintBrushIcon style={{ width: 14, height: 16 }} />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 400 }}>
                  Custom
                </Typography>
              </>
            }
          />
          <Tab
            sx={{ py: 2 }}
            label={
              <>
                <PhotoIcon style={{ width: 14, height: 16 }} />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 400 }}>
                  Assets
                </Typography>
              </>
            }
          />
        </Tabs>
      </div>
      {/* left drawer */}
      <Box
        sx={{
          height: 'calc(100vh - 75px)',
          width: 340,
          background: 'white',
          p: 3,
          overflowY: 'auto',
          zIndex: 10
        }}>
        <div style={{ marginBottom: 24 }}>
          <InputLabel sx={{ fontSize: 20, fontWeight: 600 }}>Custom</InputLabel>
          <div style={{ display: 'flex' }}>
            <Button
              size="small"
              color="primary"
              sx={{ fontWeight: 400, border: '1px solid #E5E5E5' }}
              variant="outlined">
              Studio
            </Button>
            <Button
              color="primary"
              sx={{ ml: 1, fontWeight: 400, border: '1px solid #E5E5E5' }}
              size="small"
              variant="outlined">
              Lifestyle
            </Button>
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <InputLabel>Prompt</InputLabel>
          <TextField
            multiline
            fullWidth
            rows={4}
            placeholder="Scene composition"
          />
          <Button
            fullWidth
            sx={{ mt: 2, background: '#C1D443' }}
            startIcon={<SparklesIcon style={{ color: 'black', width: 18, height: 18 }} />}>
            Generate
          </Button>
        </div>
        <div style={{ marginBottom: 24 }}>
          <InputLabel>Aspect ratio</InputLabel>
          <Select
            fullWidth
            value={10}
            labelId="demo-simple-select-label"
            id="demo-simple-select">
            <MenuItem value={10}>Instagram Post (1:1)</MenuItem>
            <MenuItem value={20}>Instagram Post (16:9)</MenuItem>
            <MenuItem value={30}>Instagram Post (9:16)</MenuItem>
          </Select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <InputLabel>Shadow</InputLabel>
          <Select
            fullWidth
            value={10}
            labelId="demo-simple-select-label"
            id="demo-simple-select">
            <MenuItem value={10}>Any</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <InputLabel>Reference image</InputLabel>
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
          <InputLabel sx={{ fontSize: 20, fontWeight: 600 }}>Colors</InputLabel>
          <Grid
            container
            columns={10}
            spacing={2}>
            {colors.map((color) => (
              <Grid
                item
                key={color}
                xs={2}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    backgroundColor: color
                  }}></div>
              </Grid>
            ))}
          </Grid>
        </div>
        <div style={{ marginBottom: 24 }}>
          <InputLabel sx={{ fontSize: 20, fontWeight: 600 }}>Aspect ration</InputLabel>
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
          minHeight: 'calc(100vh - 75px)',
          backgroundColor: '#E5E5E5',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          flex: 1,
          padding: 56
        }}>
        <div style={{ textAlign: 'left' }}>
          <Typography
            variant="subtitle1"
            sx={{ ml: 1, color: '#2291FF' }}>
            Dimensions: Instagram Post (1:1)
          </Typography>
          <img
            id="prod_img"
            src={prodImg}
            style={{ width: 608, height: 608 }}
            alt="prod_img"
          />
        </div>
      </div>

      {/* right drawer */}
      <Box
        sx={{
          height: 'calc(100vh - 75px)',
          minWidth: '340px',
          width: '340px',
          maxWidth: '340px',
          background: 'white',
          p: 1,
          overflowY: 'auto'
        }}>
        <div style={{ marginBottom: 24 }}>
          <InputLabel sx={{ fontSize: 20, fontWeight: 600 }}>Recents</InputLabel>
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
                  style={{
                    minWidth: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: 8
                  }}
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
                  style={{
                    minWidth: '150px',
                    height: '85px',
                    objectFit: 'cover',
                    borderRadius: 8
                  }}
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
                  style={{
                    minWidth: '150px',
                    height: '267px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: 8
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
    </div>
  )
}
