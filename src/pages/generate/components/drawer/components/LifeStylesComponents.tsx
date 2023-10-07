import { Box, Divider, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import GridImages from './GridImages'

export default function LifeStylesComponents({ ratio, handleSelectRatio }: { ratio: string; handleSelectRatio: (e: any) => void }) {
  const [viewMore, setViewMore] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(0)

  const handleViewMore = () => setViewMore(!viewMore)
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <InputLabel>Aspect ratio</InputLabel>
        <Select
          fullWidth
          value={ratio}
          size="small"
          onChange={handleSelectRatio}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value="1:1">Instagram Post (1:1)</MenuItem>
          <MenuItem value="16:9">Instagram Post (16:9)</MenuItem>
          <MenuItem value="9:16">Instagram Post (9:16)</MenuItem>
        </Select>
      </div>
      <Divider sx={{ my: 2 }} />
      <div style={{ marginBottom: 24 }}>
        <InputLabel>Reference image</InputLabel>
        <Box
          py={1}
          mb={1}
          display="flex"
          justifyContent="space-between"
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 600 }}
          >
            Images
          </Typography>
          <Typography
            onClick={handleViewMore}
            variant="caption"
            sx={{ fontWeight: 400, color: 'text.color-text-clickable', textDecoration: 'underline', cursor: 'pointer' }}
          >
            View more
          </Typography>
        </Box>
        <GridImages
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>

      <Divider sx={{ my: 2 }} />
      <div style={{ marginBottom: 24 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Scene composition
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          Placement
        </Typography>
        <Select
          fullWidth
          value={10}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={10}>Standing</MenuItem>
          <MenuItem value={20}>Another</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          Shadow
        </Typography>
        <Select
          fullWidth
          value={10}
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={10}>Any</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </div>
    </div>
  )
}
