import { Box, Dialog, DialogContent, Stack, IconButton, Tooltip, Button, Typography } from '@mui/material'
import React, { KeyboardEventHandler, useEffect, useState } from 'react'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import styles from 'styles/GenerateProduct.module.css'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { COLORS } from 'utils/colorConstant'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import { setSelectedGeneratedImageState } from 'redux/reducers/generate.reducer'

interface ImageModalProps {
  handleDialogClose: () => void
  handleSaveImage: (imageUrl: string, arrIndex: number, imageListState: string) => Promise<void>
  handleDownloadSingleImage: (imageUrl: string) => void
  enhanceImage: (imageUrl: string, arrIndex: string, imageListState: string) => void
  handleLikeDisLike: (payload: { imageUrl: string; arrIndex: number; action: string; imageListState: string }) => void
  handleGenerateMoreImage: (imageUrl: string, prompt: string) => void
  handleEdit: () => void
  handleResize: () => void
}
function ImageModal({
  handleDialogClose,
  handleSaveImage,
  handleDownloadSingleImage,
  enhanceImage,
  handleLikeDisLike,
  handleGenerateMoreImage,
  handleEdit,
  handleResize
}: ImageModalProps) {
  const dispatch = useDispatch()
  const generateProductState = useSelector((state: any) => state.generate)
  const selectedGeneratedImageState = generateProductState?.selectedGeneratedImageState || {}
  const { imageListState, index } = selectedGeneratedImageState
  const generateImageResponse = generateProductState[imageListState] || []
  const bookmarkingImage = generateProductState.bookmarkingImage || false
  const enhancingImage = generateProductState.enhancingImage || false
  const selectedImageState = generateImageResponse[index]
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [disablePrevBtn, setDisablePrevBtn] = useState(false)
  const [disableNextBtn, setDisableNextBtn] = useState(false)
  useEffect(() => {
    if (selectedImageState && selectedImageState?.image) {
      const imageElement = document.createElement('img')
      imageElement.onload = handleImageLoad
      imageElement.src = `${'data:image/png;base64, ' + selectedImageState?.image}`
    }
  }, [selectedImageState])
  const handleImageLoad = (event: any) => {
    const image = event.target
    setImageDimensions({ width: image.width, height: image.height })
  }
  useEffect(() => {
    if (index === 0 && imageListState === 'generateImageResponse') {
      setDisablePrevBtn(true)
    } else {
      setDisablePrevBtn(false)
    }
    if (
      (index === generateImageResponse.length - 1 &&
        imageListState === 'generateImageResponse' &&
        generateProductState['historyGeneratedImages'].length === 0) ||
      (index === generateImageResponse.length - 1 && imageListState === 'historyGeneratedImages')
    ) {
      setDisableNextBtn(true)
    } else {
      setDisableNextBtn(false)
    }
  }, [index])
  const handlePrev = () => {
    if (index > 0) {
      let payload = {
        ...selectedGeneratedImageState,
        index: index - 1
      }
      dispatch(setSelectedGeneratedImageState(payload))
    } else if (index === 0 && imageListState === 'historyGeneratedImages') {
      let payload = {
        ...selectedGeneratedImageState,
        index: generateProductState['generateImageResponse'].length - 1,
        imageListState: 'generateImageResponse'
      }
      dispatch(setSelectedGeneratedImageState(payload))
    } else {
      handleDialogClose()
    }
  }

  const handleNext = () => {
    if (index < generateImageResponse.length - 1) {
      let payload = {
        ...selectedGeneratedImageState,
        index: index + 1
      }
      dispatch(setSelectedGeneratedImageState(payload))
    } else if (
      index === generateImageResponse.length - 1 &&
      imageListState === 'generateImageResponse' &&
      generateProductState['historyGeneratedImages'].length > 0
    ) {
      let payload = {
        ...selectedGeneratedImageState,
        index: 0,
        imageListState: 'historyGeneratedImages'
      }
      dispatch(setSelectedGeneratedImageState(payload))
    } else {
      handleDialogClose()
    }
  }
  const handleKeyUp = (event: any) => {
    console.log(event.key)
    if (event.key === 'ArrowLeft') {
      handlePrev()
    } else if (event.key === 'ArrowRight') {
      handleNext()
    }
  }
  return (
    <Box>
      <Dialog
        PaperProps={{
          sx: {
            height: '100vh',
            backgroundColor: COLORS.eggshellWhite
          }
        }}
        maxWidth={'md'}
        open={true}
        onClose={handleDialogClose}
        onKeyUp={handleKeyUp}>
        <DialogContent>
          <Stack height={'100%'}>
            <Stack
              direction={'row'}
              spacing={4}>
              <Stack maxWidth={'30%'}>
                <Stack
                  direction={'row'}
                  alignItems={'center'}>
                  <Typography sx={{ fontSize: '15px' }}>{imageDimensions?.width}</Typography>
                  <CloseIcon sx={{ fontSize: '15px' }} /> <Typography sx={{ fontSize: '15px' }}>{imageDimensions?.height}</Typography>
                </Stack>
                <Typography mt={1}>{selectedImageState?.prompt}</Typography>
              </Stack>
              <Stack
                flex={1}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                flexWrap={'wrap'}>
                <Tooltip title={`Back`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={handleDialogClose}
                    startIcon={<ArrowBackIcon />}>
                    Back
                  </Button>
                </Tooltip>
                <Tooltip title={`Edit`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={handleEdit}>
                    Edit
                  </Button>
                </Tooltip>
                <Tooltip title={`Resize`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={handleResize}>
                    Resize
                  </Button>
                </Tooltip>
                {selectedImageState?.saved ? (
                  <Tooltip title={`Saved`}>
                    <Button
                      className={styles.imageModalBtn}
                      size="small"
                      sx={{
                        cursor: 'default'
                      }}
                      startIcon={<BookmarkOutlinedIcon />}>
                      Saved
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title={bookmarkingImage ? 'Saving' : 'Click to save'}>
                    <Button
                      className={styles.imageModalBtn}
                      size="small"
                      onClick={() => handleSaveImage(`${'data:image/png;base64, ' + selectedImageState?.image}`, index, imageListState)}
                      startIcon={<BookmarkBorderOutlinedIcon />}
                      disabled={bookmarkingImage}>
                      {bookmarkingImage ? 'Saving' : 'Save'}
                    </Button>
                  </Tooltip>
                )}
                <Tooltip title={`Generate more images of this type`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={() => handleGenerateMoreImage(`${'data:image/png;base64, ' + selectedImageState?.image}`, selectedImageState?.prompt)}
                    startIcon={<AddPhotoAlternateIcon />}>
                    Generate
                  </Button>
                </Tooltip>
                <Tooltip title={`Download`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={() => handleDownloadSingleImage(`${'data:image/png;base64, ' + selectedImageState?.image}`)}
                    startIcon={<ArrowDownwardIcon />}>
                    Download
                  </Button>
                </Tooltip>
              </Stack>
            </Stack>
            <Stack
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
              mt={2}
              mb={1}>
              <img
                src={`${'data:image/png;base64, ' + selectedImageState?.image}`}
                style={{
                  width: '512px',
                  height: '512px',
                  objectFit: 'scale-down',
                  paddingTop: 16
                }}
                alt="Selected"
              />
            </Stack>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}>
              {selectedImageState?.enhancedImage ? (
                <Tooltip title={`Image Enhanced`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    sx={{
                      cursor: 'default'
                    }}
                    startIcon={<AutoFixHighIcon />}>
                    Image Enhanced
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title={enhancingImage ? 'Enhanceing Image' : 'Enhance Image'}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={() => enhanceImage(`${'data:image/png;base64, ' + selectedImageState?.image}`, index, imageListState)}
                    startIcon={<AutoFixHighOutlinedIcon />}
                    disabled={enhancingImage}>
                    {enhancingImage ? 'Enhanceing Image' : 'Enhance Image'}
                  </Button>
                </Tooltip>
              )}
              {selectedImageState?.liked ? (
                <Tooltip title={`Liked`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={() =>
                      handleLikeDisLike({
                        imageUrl: `${'data:image/png;base64, ' + selectedImageState?.image}`,
                        arrIndex: index,
                        action: 'Remove like',
                        imageListState
                      })
                    }
                    startIcon={<ThumbUpIcon />}>
                    Liked
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title={`I like this`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={() =>
                      handleLikeDisLike({
                        imageUrl: `${'data:image/png;base64, ' + selectedImageState?.image}`,
                        arrIndex: index,
                        action: 'liked',
                        imageListState
                      })
                    }
                    startIcon={<ThumbUpOutlinedIcon />}>
                    Like
                  </Button>
                </Tooltip>
              )}
              {selectedImageState?.disliked ? (
                <Tooltip title={`Disliked`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={() =>
                      handleLikeDisLike({
                        imageUrl: `${'data:image/png;base64, ' + selectedImageState?.image}`,
                        arrIndex: index,
                        action: 'Remove dislike',
                        imageListState
                      })
                    }
                    startIcon={<ThumbDownIcon />}>
                    Disliked
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title={`I dislike this`}>
                  <Button
                    className={styles.imageModalBtn}
                    size="small"
                    onClick={() =>
                      handleLikeDisLike({
                        imageUrl: `${'data:image/png;base64, ' + selectedImageState?.image}`,
                        arrIndex: index,
                        action: 'disliked',
                        imageListState
                      })
                    }
                    startIcon={<ThumbDownAltOutlinedIcon />}>
                    Dislike
                  </Button>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </DialogContent>

        <IconButton
          onClick={handlePrev}
          style={{ position: 'absolute', top: '50%', left: '0', zIndex: 1301 }}
          disabled={disablePrevBtn}>
          <ChevronLeft sx={{ fontSize: '50px' }} />
        </IconButton>

        <IconButton
          onClick={handleNext}
          style={{ position: 'absolute', top: '50%', right: '0', zIndex: 1301 }}
          disabled={disableNextBtn}>
          <ChevronRight sx={{ fontSize: '50px' }} />
        </IconButton>
      </Dialog>
    </Box>
  )
}

export default ImageModal
