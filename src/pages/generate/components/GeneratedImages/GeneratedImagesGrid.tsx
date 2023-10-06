import { IconButton, ImageListItem, Tooltip, ImageList, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from 'styles/GenerateProduct.module.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

interface GeneratedImagesGridProps {
  cols: number
  rowHeight: number
  imageList: any
  handleSaveImage: any
  handleDownloadSingleImage: any
  enhanceImage: any
  handleLikeDisLike: any
  handleGenerateMoreImage: any
  copyPromptInfo: any
  handleImageClick: any
  isCopied: any
  imageListState: any
  viewAllOption?: any
  setOpenViewAll?: any
}

function GeneratedImagesGrid({
  cols,
  rowHeight,
  imageList,
  handleSaveImage,
  handleDownloadSingleImage,
  enhanceImage,
  handleLikeDisLike,
  handleGenerateMoreImage,
  copyPromptInfo,
  handleImageClick,
  isCopied,
  imageListState,
  viewAllOption,
  setOpenViewAll
}: GeneratedImagesGridProps) {
  const [hovered, setHovered] = useState(false)
  const handleMouseEnter = () => {
    setHovered(true)
  }
  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <div>
      <ImageList
        cols={cols}
        gap={8}
        rowHeight={rowHeight}>
        {imageList && imageList?.length > 0 ? (
          imageList.map((item: any, index: number) => {
            return (
              <ImageListItem
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                  '&:hover .icon-container-hovered': {
                    visibility: 'visible !important',
                    transition: 'visibility 0.3s ease',
                    borderRadius: '10px',
                    backgroundImage: 'linear-gradient(to bottom,rgb(0 0 0 / .5),transparent)',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: 'absolute',
                    cursor: 'zoom-in'
                  }
                }}
                onClick={() => handleImageClick(imageListState, index)}>
                <img
                  src={`${'data:image/png;base64, ' + item.image}`}
                  alt={item.prompt}
                  style={{
                    borderRadius: '10px',
                    position: 'relative',
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    maxHeight: '150px'
                  }}
                />
                <div
                  className={`icon-container${hovered ? '-hovered' : ''}`}
                  style={{ visibility: 'hidden' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      display: 'flex'
                    }}>
                    <Tooltip title={`Download`}>
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`Download`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownloadSingleImage(`${'data:image/png;base64, ' + item.image}`)
                        }}>
                        <ArrowDownwardIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </ImageListItem>
            )
          })
        ) : (
          <></>
        )}
        {viewAllOption && imageList && imageList?.length > 0 && (
          <ImageListItem>
            <Box
              onClick={() => setOpenViewAll(true)}
              className={styles.viewAllImageBox}>
              View all
            </Box>
          </ImageListItem>
        )}
      </ImageList>
    </div>
  )
}

export default GeneratedImagesGrid
