import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
// background images
import bg1Img from 'assets/background/bg1.png'
import bg2Img from 'assets/background/bg2.png'
import bg3Img from 'assets/background/bg3.png'
import bg4Img from 'assets/background/bg4.png'
import bg5Img from 'assets/background/bg5.png'

export default function GridImages({ selectedImage, setSelectedImage }: { selectedImage: number; setSelectedImage: (index: number) => void }) {
  const bgImages = [bg1Img, bg2Img, bg3Img, bg4Img, bg5Img]
  return (
    <Grid
      container
      spacing={1}>
      <Grid
        item
        xs={4}>
        <div
          style={{
            width: 93,
            height: 92,
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            border: '1px dashed rgba(0,0,0,0.1)',
            borderRadius: 8,
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
          <div>
            <PlusIcon style={{ width: 18, height: 18 }} />
            <br />
            <Typography
              variant="caption"
              sx={{ mt: 0.5 }}>
              Add new
            </Typography>
          </div>
        </div>
      </Grid>
      {bgImages.map((img, index) => (
        <Grid
          item
          key={img}
          xs={4}>
          <Box
            sx={{
              position: 'relative',
              [`& .check_${index}`]: {
                display: selectedImage === index ? 'block' : 'none'
              }
            }}>
            <CheckCircleIcon
              style={{ width: 16, height: 16, position: 'absolute', top: 4, right: 4 }}
              className={`check_${index}`}
            />
            <img
              src={img}
              alt="img"
              onClick={() => setSelectedImage(index)}
              style={{
                width: 93,
                height: 92,
                maxHeight: 92,
                objectFit: 'contain',
                borderRadius: 8,
                cursor: 'pointer',
                border: `2px solid ${index === selectedImage ? 'black' : 'transparent'}`
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
