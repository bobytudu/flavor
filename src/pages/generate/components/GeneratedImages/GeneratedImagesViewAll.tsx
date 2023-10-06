import CloseIcon from '@mui/icons-material/Close'
import { COLORS } from 'utils/colorConstant'
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Slide, Stack, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from 'styles/GenerateProduct.module.css'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import Loader from 'components/AnimatedLoader'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import GeneratedImagesGrid from './GeneratedImagesGrid'
import {
  enhanceImageSuccess,
  generateCampaignBasedImageSuccess,
  generateImageFailure,
  generateImageSuccess,
  generateThemeBasedImageSuccess,
  generateVisualConceptImageSuccess,
  historyGeneratedImagesRequest
} from 'redux/reducers/generate.reducer'

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return (
//     <Slide
//       direction="up"
//       ref={ref}
//       {...props}
//     />
//   )
// })

interface GeneratedImagesViewAllProps {
  openViewAll: any
  setOpenViewAll: any
  productName: any
  removeBgProductName: any
  handleSaveImage: any
  handleDownloadSingleImage: any
  enhanceImage: any
  handleLikeDisLike: any
  handleGenerateMoreImage: any
  copyPromptInfo: any
  handleImageClick: any
  isCopied: any
}

export default function GeneratedImagesViewAll({
  openViewAll,
  setOpenViewAll,
  productName,
  removeBgProductName,
  handleSaveImage,
  handleDownloadSingleImage,
  enhanceImage,
  handleLikeDisLike,
  handleGenerateMoreImage,
  copyPromptInfo,
  handleImageClick,
  isCopied
}: GeneratedImagesViewAllProps) {
  const handleClose = () => {
    setOpenViewAll(false)
  }
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const generateProductState = useSelector((state: any) => state.generate)
  const generateImageResponse = generateProductState?.generateImageResponse || []
  const historyGeneratedImageState = generateProductState?.historyGeneratedImages || []
  const generateImageLoading = generateProductState?.generatingImage || false
  const enhanceImageLoading = generateProductState?.enhancingImage || false
  const enhanceImageResponseError = generateProductState?.enhanceImageError || ''
  const generateImageError = generateProductState?.generateImageError || ''
  let isLoading = generateImageLoading || enhanceImageLoading

  useEffect(() => {
    if (generateImageError) {
      setError(generateImageError)
    } else {
      setError('')
    }
  }, [generateImageError])

  const downloadImage = () => {
    if (generateImageResponse && generateImageResponse.length) {
      let images = generateImageResponse
      if (historyGeneratedImageState && historyGeneratedImageState.length) {
        images = images.concat(historyGeneratedImageState)
      }
      images.map((item: any) => {
        var a = document.createElement('a')
        a.href = 'data:image/png;base64,' + item.image
        a.download = productName ? `${productName}.png` : removeBgProductName ? `${removeBgProductName}.png` : 'Image.png'
        a.click()
      })
    }
  }
  const clearHandler = () => {
    dispatch(enhanceImageSuccess(null))
    dispatch(generateImageSuccess([]))
    dispatch(generateImageFailure(null))
    dispatch(historyGeneratedImagesRequest([]))
    dispatch(generateThemeBasedImageSuccess([]))
    dispatch(generateCampaignBasedImageSuccess([]))
    dispatch(generateVisualConceptImageSuccess([]))
    handleClose()
    generateThemeBasedImageSuccess
  }
  return (
    <Dialog
      fullScreen
      open={true}
      onClose={handleClose}
      sx={{ '& .MuiPaper-root': { backgroundColor: COLORS.eggshellWhite } }}>
      <DialogTitle>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Typography className={styles.addNewAssertTitle}> Generated Images</Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack>
          <Stack
            direction={'row'}
            spacing={2}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Box>
              <Typography className={styles.generatedText}>{`Recent`}</Typography>
              <Typography>Review and download your recently created photos here.</Typography>
            </Box>
            <Stack
              direction={'row'}
              spacing={2}>
              <Tooltip title={`Clear`}>
                <IconButton
                  sx={{
                    color: '#1C1B1F'
                  }}
                  aria-label={`clear`}
                  onClick={clearHandler}>
                  <HighlightOffIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
              {generateImageResponse && generateImageResponse?.length + historyGeneratedImageState?.length > 1 && (
                <Tooltip title={`Download`}>
                  <IconButton
                    sx={{
                      color: '#1C1B1F'
                    }}
                    aria-label={`download`}
                    onClick={downloadImage}>
                    <FileDownloadOutlinedIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>
          <GeneratedImagesGrid
            cols={4}
            rowHeight={250}
            imageList={generateImageResponse}
            handleSaveImage={handleSaveImage}
            handleDownloadSingleImage={handleDownloadSingleImage}
            enhanceImage={enhanceImage}
            handleLikeDisLike={handleLikeDisLike}
            handleGenerateMoreImage={handleGenerateMoreImage}
            copyPromptInfo={copyPromptInfo}
            handleImageClick={handleImageClick}
            isCopied={isCopied}
            imageListState={'generateImageResponse'}
          />
          {historyGeneratedImageState && historyGeneratedImageState.length > 0 && (
            <Box>
              <Divider />
            </Box>
          )}
          <GeneratedImagesGrid
            cols={4}
            rowHeight={180}
            imageList={historyGeneratedImageState}
            handleSaveImage={handleSaveImage}
            handleDownloadSingleImage={handleDownloadSingleImage}
            enhanceImage={enhanceImage}
            handleLikeDisLike={handleLikeDisLike}
            handleGenerateMoreImage={handleGenerateMoreImage}
            copyPromptInfo={copyPromptInfo}
            handleImageClick={handleImageClick}
            isCopied={isCopied}
            imageListState={'historyGeneratedImages'}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
