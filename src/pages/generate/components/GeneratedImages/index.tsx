import { Box, Button, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from 'styles/GenerateProduct.module.css'
import Loader from 'components/AnimatedLoader'
import generateBtnIcon from 'assets/images/generateBtnIcon.png'
import GeneratedImagesGrid from './GeneratedImagesGrid'
// import { userEmail, userId } from "utils/userDetails";
import { fabric } from 'fabric'
import {
  enhanceImageSuccess,
  generateThemeBasedImageSuccess,
  generateVisualConceptImageSuccess,
  generateImageFailure,
  generateImageSuccess,
  historyGeneratedImagesRequest,
  setSelectedGeneratedImageState,
  setGenerateImagePayload,
  generateCampaignBasedImageSuccess,
  bookmarkImageSuccess,
  bookmarkImageRequest,
  bookmarkImageFailure,
  enhanceImageFailure,
  enhanceImageRequest,
  generateImageRequest,
  getNoOfImageLeftRequest,
  getNoOfImageLeftSuccess,
  getNoOfImageLeftFailure,
  saveGeneratedImageRequest,
  saveGeneratedImageSuccess,
  saveGeneratedImageFailure
} from 'redux/reducers/generate.reducer'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AlertComp from 'components/AlertComp'
import ImageModal from './ImageModal'
import makeAIAPIAuthorizedRequest from 'service/api/makeAIAPIAuthorizedRequest'
import {
  bookmarkImage,
  enhanceImageApi,
  generateImageCampaignBasedApi,
  generateImageCustomStudioApi,
  generateImageThemeBasedApi,
  generateImageVisualConceptApi,
  getNoOfImageLeft
} from 'redux/action/generate.action'

interface GeneratedImagesProps {
  productName: string
  removeBgProductName: string
  productDetails: any
  canvas: any
  setGenerateBtnClick: any
  removeBackgroundImageLoading: boolean
  selectedMenu: string
  setSelectedMenu: any
}

function GeneratedImages({
  productName,
  removeBgProductName,
  productDetails,
  canvas,
  setGenerateBtnClick,
  removeBackgroundImageLoading,
  selectedMenu,
  setSelectedMenu
}: GeneratedImagesProps) {
  const state = useSelector((state: any) => state.generate)
  const userEmail = 'js903783@gmail.com'
  const userId = 'cKtEO8vZqwRZ6A3XEn9L5ZPGv1k2'
  const [open, setOpen] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState('')
  const [error, setError] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [openViewAll, setOpenViewAll] = useState(false)
  const [showAlert, setShowAlert] = useState({
    open: false,
    message: '',
    messageType: ''
  })
  const dispatch = useDispatch()
  const generateProductState = useSelector((state: any) => state.generate)
  const generateImageResponse = generateProductState?.generateImageResponse || []
  const historyGeneratedImageState = generateProductState?.historyGeneratedImages || []
  const generateImageLoading = generateProductState?.generatingImage || false
  const enhanceImageLoading = generateProductState?.enhancingImage || false
  const generateImageError = generateProductState?.generateImageError || ''
  const selectedGeneratedImageState = generateProductState?.selectedGeneratedImageState || {}
  let isLoading = generateImageLoading || enhanceImageLoading
  const generateImageStatePayload = generateProductState?.generateImagePayload
  const personaBasedState = generateImageStatePayload?.personaBasedState || ''
  const visualConceptState = generateImageStatePayload?.visualConceptState || ''
  const themeBasedState = generateImageStatePayload?.themeBasedState || ''
  const customSceneState = generateImageStatePayload?.customScene || ''
  const noOfGeneratedImage = generateImageStatePayload?.noOfGeneratedImage || ''
  const selectedMode = generateImageStatePayload?.selectedTab || ''
  const selectedHintsTab = generateImageStatePayload?.selectedHintsTab || ''
  const resizeCanvas = generateImageStatePayload?.resizeCanvas || ''
  const selectedRefImageStyle = generateImageStatePayload?.selectedRefImageStyleFile || ''
  const handleImageClick = (imageState: any, index: any) => {
    let payload = {
      ...selectedGeneratedImageState,
      imageListState: imageState,
      index
    }
    dispatch(setSelectedGeneratedImageState(payload))
    setOpen(true)
  }
  const handleEdit = () => {}
  const handleResize = () => {}
  const handleDialogClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    if (generateImageError) {
      setError(generateImageError)
    } else {
      setError('')
    }
  }, [generateImageError])
  const handleDownloadSingleImage = (imgUrl: string) => {
    const a = document.createElement('a')
    a.href = imgUrl
    a.download = productName ? `${productName}.png` : removeBgProductName ? `${removeBgProductName}.png` : 'Image.png'
    a.click()
  }
  const getUrlExtension = (url: string) => {
    return url.split(/[#?]/)[0].split('.').pop()?.trim()
  }

  const formCustomStudioApiRequest = (customSceneState: any, formData: any) => {
    let placement = customSceneState.selectedPlacementValue
    placement = placement.charAt(0).toLowerCase() + placement.slice(1)
    placement = placement.replace(' ', '')
    let shadow = customSceneState.selectedShadowValue
    shadow = shadow.charAt(0).toLowerCase() + shadow.slice(1)
    if (shadow !== 'any') {
      shadow = shadow + '_shadow'
    }
    let backgroundColor = customSceneState.selectedColor
    let textureImage = customSceneState.selectedTextureSurfacePaletteFile
    if (customSceneState.selectedBackDropValue === 'Plain color') {
      let colorValues = Object.values(backgroundColor)
      let colorString = colorValues.join('_')
      formData.append('bg_color', colorString)
    } else {
      formData.append('texture_img', textureImage)
    }
    formData.append('placement', placement)
    formData.append('shadow', shadow)
    formData.append('ref_img', selectedRefImageStyle)
    return formData
  }

  const saveGeneratedImage = async (formData: any, arrIndex: any, action: any, imageListState: any) => {
    try {
      dispatch(saveGeneratedImageRequest())
      let actionName = action === 'liked' || action === 'disliked' ? action : action === 'Remove dislike' ? 'disliked' : action === 'Remove like' ? 'liked' : ''
      let actionValue = action === 'liked' || action === 'disliked' ? true : action === 'Remove dislike' || action === 'Remove like' ? false : false
      let previousState = state.generate[imageListState]
      previousState[arrIndex] = {
        ...previousState[arrIndex],
        [actionName]: actionValue,
        [actionName === 'liked' ? 'disliked' : 'liked']: false
      }
      let stateFunction: any = generateImageSuccess
      if (imageListState === 'historyGeneratedImages') {
        stateFunction = historyGeneratedImagesRequest
      }
      dispatch(stateFunction(previousState))
      let url = process.env.REACT_APP_AI_API_URL + '/api/save_generated_image'
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      const response = await makeAIAPIAuthorizedRequest({ url, method: 'POST', data: formData, headers })
      const res = response.data
      dispatch(saveGeneratedImageSuccess(res))
      if (response.status !== 200) {
        previousState[arrIndex] = {
          ...previousState[arrIndex],
          [actionName]: false
        }
        dispatch(stateFunction(previousState))
      }
    } catch (error: any) {
      dispatch(saveGeneratedImageFailure(error.message))
    }
  }

  const enhanceImage = async (imageUrl: string, arrIndex: string, imageListState: string) => {
    const imgExt = getUrlExtension(imageUrl)
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'product.png', {
      type: blob.type
    })
    const formData = new FormData()
    formData.append('image', file)
    enhanceImageApi(formData, arrIndex, imageListState)
  }

  const convertImageUrlToFile = async (imageUrl: string) => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'productImage.png', {
      type: blob.type
    })
    return file
  }

  const productImageFile = async () => {
    const clonedCanvas = new fabric.StaticCanvas(null, {
      width: canvas.getWidth(),
      height: canvas.getHeight()
    })
    let productImage = canvas.getObjects().find((obj: any) => obj.type === 'image' && obj.imageType === 'productImage')
    if (productImage) {
      const clonedImage = fabric.util.object.clone(productImage)
      clonedCanvas.add(clonedImage)
    }
    let productFile
    // var c = document.createElement("canvas");
    // c.width = resizeCanvas.width;
    // c.height = resizeCanvas.height;

    // // Extract the content from the clonedCanvas using Fabric.js
    // var canvasImage = new Image();
    // canvasImage.src = clonedCanvas.toDataURL("image/png");

    // canvasImage.onload = async function () {
    //   // Draw the extracted content onto the new canvas
    //   const ctx = c.getContext("2d");
    //   ctx.imageSmoothingEnabled = true;
    //   ctx.imageSmoothingQuality = "high";
    //   ctx.drawImage(
    //     canvasImage,
    //     0,
    //     0,
    //     canvasImage.width,
    //     canvasImage.height,
    //     0,
    //     0,
    //     resizeCanvas.width,
    //     resizeCanvas.height
    //   );
    // };
    const imageDataURL = clonedCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 3.414
    })
    productFile = await convertImageUrlToFile(imageDataURL)
    return productFile
  }
  const productWithElementImageFile = async () => {
    const imageDataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 3.414
    })

    let elementFile = await convertImageUrlToFile(imageDataURL)
    return elementFile
  }
  const handleGenerateMoreImage = async (imageUrl: any, prompt: any) => {
    setOpen(false)
    let productWithElementFile = await productWithElementImageFile()
    let productFile = await productImageFile()
    let payload = {
      product_name: productDetails?.name || '',
      product_category: productDetails ? productDetails?.category || '' : removeBgProductName ? removeBgProductName : '' || '',
      product_description: productDetails?.description || '',
      prompt: prompt,
      num_generated_images: 4,
      email: userEmail,
      userId: userId
    }
    const formData = new FormData()
    formData.append('image', productFile)
    formData.append('image_with_elements', productWithElementFile)
    formData.append('product_name', payload.product_name)
    formData.append('product_category', payload.product_category)
    formData.append('product_description', payload.product_description)
    formData.append('prompt', payload.prompt)
    formData.append('num_generated_images', payload.num_generated_images as any)
    formData.append('email', payload.email)
    formData.append('user_id', payload.userId)
    generateImageVisualConceptApi(formData)
  }

  const handleLikeDisLike = async ({
    imageUrl,
    arrIndex,
    action,
    imageListState
  }: {
    imageUrl: string
    arrIndex: number
    action: any
    imageListState: any
  }) => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'product.png', {
      type: blob.type
    })
    let payload = {
      product_name: productDetails ? productDetails?.name || '' : removeBgProductName ? removeBgProductName : '' || '',
      action: action === 'liked' || action === 'disliked' ? action : ''
    }
    const formData = new FormData()
    formData.append('image', file)
    formData.append('product_name', payload.product_name)
    formData.append('action', payload.action)
    saveGeneratedImage(formData, arrIndex, action, imageListState)
  }

  const handleSaveImage = async (imageUrl: string, index: number, imageListState: any) => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'product.png', {
      type: blob.type
    })
    let payload = {
      product_name: productDetails ? productDetails?.name || '' : removeBgProductName ? removeBgProductName : '' || ''
    }
    const formData = new FormData()
    formData.append('image', file)
    formData.append('email', userEmail)
    formData.append('product_name', `${payload.product_name}`)
    bookmarkImage(formData, index, imageListState)
  }

  const copyPromptInfo = async (prompt: any) => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 5000)
  }
  const clearHandler = () => {
    dispatch(enhanceImageSuccess(null))
    dispatch(generateImageSuccess([]))
    dispatch(generateImageFailure(null))
    dispatch(historyGeneratedImagesRequest([]))
    dispatch(generateThemeBasedImageSuccess([]))
    dispatch(generateCampaignBasedImageSuccess([]))
    dispatch(generateVisualConceptImageSuccess([]))
  }
  const downloadImage = () => {
    if (generateImageResponse && generateImageResponse.length) {
      let images = generateImageResponse
      if (historyGeneratedImageState && historyGeneratedImageState.length) {
        images = images.concat(historyGeneratedImageState)
      }
      images.map((item: any) => {
        const a = document.createElement('a')
        a.href = 'data:image/png;base64,' + item.image
        a.download = productName ? `${productName}.png` : removeBgProductName ? `${removeBgProductName}.png` : 'Image.png'
        a.click()
      })
    }
  }

  const handleSubmit = async () => {
    setGenerateBtnClick(true)
    let productWithElementFile = await productWithElementImageFile()
    let productFile = await productImageFile()
    let payload = {
      product_name: productDetails?.name || '',
      product_category: productDetails ? productDetails?.category || '' : removeBgProductName ? removeBgProductName : '' || '',
      product_description: productDetails?.description || '',
      num_generated_images: noOfGeneratedImage,
      email: userEmail,
      userId: userId
    }
    const formData = new FormData()
    formData.append('image', productFile)
    formData.append('product_name', payload.product_name)
    formData.append('product_category', payload.product_category)
    formData.append('product_description', payload.product_description)
    formData.append('num_generated_images', payload.num_generated_images)
    formData.append('email', payload.email)
    formData.append('user_id', payload.userId)
    if (selectedMenu === 'Assets') {
      setSelectedMenu('Create')
    }
    if (selectedMode === 'Custom Scene') {
      if (customSceneState.selectedCustomSceneTab === 'Studio') {
        let payload = {
          ...generateImageStatePayload,
          customScene: {
            ...customSceneState,
            selectedCustomSceneTab: 'Studio'
          }
        }
        dispatch(setGenerateImagePayload(payload))
        generateImageCustomStudioApi(formCustomStudioApiRequest(customSceneState, formData))
      } else {
        let prompt = customSceneState?.promptValue || ''
        if (!prompt) {
          let payload = {
            ...generateImageStatePayload,
            customScene: {
              ...customSceneState,
              selectedCustomSceneTab: 'Lifestyle'
            }
          }
          dispatch(setGenerateImagePayload(payload))
          setShowAlert({
            open: true,
            message: 'Please describe the scene to generate image',
            messageType: 'error'
          })
          return
        } else {
          formData.append('prompt', prompt)
          formData.append('image_with_elements', productWithElementFile)
          formData.append('ref_img', selectedRefImageStyle)
          generateImageVisualConceptApi(formData)
        }
      }
    } else if (selectedMode === 'Theme') {
      let theme = themeBasedState?.selectedTheme || ''
      if (!theme) {
        setSelectedMenu('Create')
        setShowAlert({
          open: true,
          message: 'Please select theme to generate image',
          messageType: 'error'
        })
        return
      }
      formData.append('theme', theme)
      generateImageThemeBasedApi(formData)
    } else if (selectedMode === 'Target Audience') {
      const { minAge = 13, maxAge = 65, gender = [], location = '', demographicList = [], behaviourList = [], interestList = [] } = personaBasedState
      formData.append('location', location)
      formData.append('min_age', minAge)
      formData.append('max_age', maxAge)
      formData.append('gender', gender)
      formData.append('demographic', demographicList)
      formData.append('interests', interestList)
      formData.append('behaviours', behaviourList)
      generateImageCampaignBasedApi(formData)
    }
  }

  return (
    <div className={styles.GeneratedImageDiv}>
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography className={styles.recentText}>{`Recent`}</Typography>
        {/* {generateImageResponse && generateImageResponse?.length > 0 && (
            <Button
              className={styles.viewAllBtn}
              onClick={() => setOpenViewAll(true)}
            >
              View all
            </Button>
          )} */}
        <Stack direction={"row"} spacing={2}>
          {generateImageResponse && generateImageResponse?.length > 0 && (
            <Tooltip title={`Clear`}>
              <IconButton
                sx={{
                  color: "#1C1B1F",
                }}
                aria-label={`clear`}
                onClick={clearHandler}
              >
                <HighlightOffIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          )}
          {generateImageResponse &&
            generateImageResponse?.length + historyGeneratedImageState?.length >
              1 && (
              <Tooltip title={`Download`}>
                <IconButton
                  sx={{
                    color: "#1C1B1F",
                  }}
                  aria-label={`download`}
                  onClick={downloadImage}
                >
                  <FileDownloadOutlinedIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            )}
        </Stack>
      </Stack>
      {(generateImageResponse && generateImageResponse?.length) || isLoading ? (
        <Box>
          {isLoading && <Loader width="100%" />}
          <>
            {error && (
              <Typography className={styles.errorMsg}>{error}</Typography>
            )}
            <GeneratedImagesGrid
              cols={2}
              rowHeight={150}
              imageList={generateImageResponse}
              handleSaveImage={handleSaveImage}
              handleDownloadSingleImage={handleDownloadSingleImage}
              enhanceImage={enhanceImage}
              handleLikeDisLike={handleLikeDisLike}
              handleGenerateMoreImage={handleGenerateMoreImage}
              copyPromptInfo={copyPromptInfo}
              handleImageClick={handleImageClick}
              isCopied={isCopied}
              imageListState={"generateImageResponse"}
              setOpenViewAll={setOpenViewAll}
            />
            {historyGeneratedImageState &&
              historyGeneratedImageState.length > 0 && (
                <Box>
                  <Divider />
                </Box>
              )}
            <GeneratedImagesGrid
              cols={2}
              rowHeight={150}
              handleImageClick={handleImageClick}
              isCopied={isCopied}
              imageList={historyGeneratedImageState}
              handleSaveImage={handleSaveImage}
              handleDownloadSingleImage={handleDownloadSingleImage}
              enhanceImage={enhanceImage}
              handleLikeDisLike={handleLikeDisLike}
              handleGenerateMoreImage={handleGenerateMoreImage}
              copyPromptInfo={copyPromptInfo}
              imageListState={"historyGeneratedImages"}
              setOpenViewAll={setOpenViewAll}
            />
          </>
        </Box>
      ) : (
        <Box className={styles.generateBtnCenterBox}>
          <Stack spacing={2}>
            <Typography className={styles.noImageYetText}>
              No images yet!
            </Typography>
            {/* <Button
              className={styles.createImageBtn}
              onClick={handleSubmit}
              disabled={isLoading || removeBackgroundImageLoading}>
              Generate your first image
            </Button> */}
            {error && (
              <Typography className={styles.errorMsg} textAlign={"center"}>
                {error}
              </Typography>
            )}
          </Stack>
        </Box>
      )}
      {/* {openViewAll && (
        <GeneratedImagesViewAll
          openViewAll={openViewAll}
          setOpenViewAll={setOpenViewAll}
          productName={productName}
          removeBgProductName={removeBgProductName}
          handleSaveImage={handleSaveImage}
          handleDownloadSingleImage={handleDownloadSingleImage}
          enhanceImage={enhanceImage}
          handleLikeDisLike={handleLikeDisLike}
          handleGenerateMoreImage={handleGenerateMoreImage}
          copyPromptInfo={copyPromptInfo}
          handleImageClick={handleImageClick}
          isCopied={isCopied}
        />
      )} */}
      {open && (
        <ImageModal
          handleDialogClose={handleDialogClose}
          handleSaveImage={handleSaveImage}
          handleDownloadSingleImage={handleDownloadSingleImage}
          enhanceImage={enhanceImage}
          handleLikeDisLike={handleLikeDisLike}
          handleGenerateMoreImage={handleGenerateMoreImage}
          handleEdit={handleEdit}
          handleResize={handleResize}
        />
      )}
      <AlertComp showAlert={showAlert} setShowAlert={setShowAlert} />
    </div>
  );
}

export default GeneratedImages
