import { ArrowLeftIcon, CheckCircleIcon, EyeDropperIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Box, Button, IconButton, InputLabel, SelectChangeEvent, Typography } from '@mui/material'
import React from 'react'

import { ColorChangeHandler, ColorResult, SketchPicker } from 'react-color'
import capitalize from 'lodash/capitalize'
import GridImages from './components/GridImages'
import StudioComponents from './components/StudioComponents'
import LifeStylesComponents from './components/LifeStylesComponents'

const types = ['studio', 'lifestyle']
interface DefaultDrawerProps {
  ratio: string
  handleSelectRatio: (e: SelectChangeEvent) => void
}

export default function CreateDrawer({ ratio, handleSelectRatio }: DefaultDrawerProps) {
  const [viewMore, setViewMore] = React.useState(false)
  const [type, setType] = React.useState('studio')
  const [colorType, setColorType] = React.useState('HEX')
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [color, setColor] = React.useState('#ffffff')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleChange: ColorChangeHandler = (color: ColorResult) => setColor(color.hex)
  const handleViewMore = () => setViewMore(!viewMore)
  const handleOpenPicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <div>
      {viewMore ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <IconButton onClick={handleViewMore}>
              <ArrowLeftIcon style={{ width: 24, height: 24, color: 'black', fontWeight: 600 }} />
            </IconButton>
            <Typography variant="h4">Reference Images</Typography>
          </div>
          <GridImages
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 24 }}>
            <InputLabel sx={{ fontSize: 20, fontWeight: 600 }}>Create</InputLabel>
            <div style={{ display: 'flex' }}>
              {types.map((t) => (
                <Button
                  size="small"
                  key={t}
                  color="primary"
                  onClick={() => setType(t)}
                  sx={{
                    fontWeight: 400,
                    color: type === t ? 'white' : 'text.color-text-clickable',
                    border: '1px solid #E5E5E5',
                    mr: 1,
                    bgcolor: type === t ? 'text.color-text-clickable' : 'white',
                    '&:hover': {
                      bgcolor: type === t ? 'text.color-text-clickable' : 'white',
                      color: type === t ? 'white' : 'text.color-text-clickable'
                    }
                  }}>
                  {capitalize(t)}
                </Button>
              ))}
            </div>
          </div>

          {type === 'studio' && (
            <StudioComponents
              ratio={ratio}
              handleSelectRatio={handleSelectRatio}
            />
          )}
          {type === 'lifestyle' && (
            <LifeStylesComponents
              ratio={ratio}
              handleSelectRatio={handleSelectRatio}
            />
          )}

          {/* <div style={{ marginBottom: 24 }}>
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
          </div> */}
        </div>
      )}
    </div>
  )
}
