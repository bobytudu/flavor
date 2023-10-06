import { SparklesIcon } from '@heroicons/react/24/solid'
import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React from 'react'
import prodImg from 'assets/img8.png'
import size1Img from 'assets/sizes/size_1.png'
import size2Img from 'assets/sizes/size_2.png'
import size3Img from 'assets/sizes/size_3.png'

const colors = ['#2291FF', '#FFC700', '#FF0000', '#00FF00', '#0000FF']
export default function DefaultDrawer({ ratio, handleSelectRatio }: { ratio: string; handleSelectRatio: (e: SelectChangeEvent) => void }) {
  return (
    <div>
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
          value={ratio}
          onChange={handleSelectRatio}
          labelId="demo-simple-select-label"
          id="demo-simple-select">
          <MenuItem value="1:1">Instagram Post (1:1)</MenuItem>
          <MenuItem value="16:9">Instagram Post (16:9)</MenuItem>
          <MenuItem value="9:16">Instagram Post (9:16)</MenuItem>
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
                }}
              />
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
    </div>
  )
}
