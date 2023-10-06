import React, { useEffect, useState, useRef } from 'react'
import { Box, Tooltip, IconButton } from '@mui/material'
import { Stack } from '@mui/material'
import { fabric } from 'fabric'
import CropIcon from '@mui/icons-material/Crop'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import undoIcon from 'assets/images/undoIcon.svg'
import redoIcon from 'assets/images/redoIcon.svg'
import LayersIcon from '@mui/icons-material/Layers'
import DeleteIcon from '@mui/icons-material/Delete'
import imageBg from 'assets/images/gray-white-dotted.png'
import Loader from 'components/AnimatedLoader'
import { useSelector } from 'react-redux'

interface CanvasProps {
  selectedFile: any
  generateBtnClick: any
  setGenerateBtnClick: any
  canvas: any
  setCanvas: any
  elementAdded: any
  setElementAdded: any
  removeBackgroundImageLoading: any
  selectedMode: any
  openModal: any
}

function Canvas({
  selectedFile,
  generateBtnClick,
  setGenerateBtnClick,
  canvas,
  setCanvas,
  elementAdded,
  setElementAdded,
  removeBackgroundImageLoading,
  selectedMode,
  openModal
}: CanvasProps) {
  const [image, setImage] = useState<any | null>(null)
  const [isCropImage, setIsCropImage] = useState(false)
  const canvasRef = useRef(null)
  const [canvasStack, setCanvasStack] = useState<any[]>([])
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(-1)
  const [showCrop, setShowCrop] = useState(true)
  const generateProductState = useSelector((state: any) => state.generate)
  const generateImageStatePayload = generateProductState?.generateImagePayload
  const resizeCanvas = generateImageStatePayload?.resizeCanvas || ''
  const newCanvasWidth = resizeCanvas?.newCanvasWidth || ''
  const newCanvasHeight = resizeCanvas?.newCanvasHeight || ''
  const resizeCanvasAspectRatio = resizeCanvas?.aspectRatio || ''
  useEffect(() => {
    if (canvas) {
      adjustCanvasAspectRatio(resizeCanvasAspectRatio)
    }
  }, [resizeCanvasAspectRatio])
  const moveSelectedObjectToBack = () => {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      const objects = canvas.getObjects()
      const selectedObjectIndex = objects.findIndex((obj: any) => obj === activeObject)

      if (selectedObjectIndex !== -1) {
        objects.splice(selectedObjectIndex, 1)
        objects.unshift(activeObject)

        canvas.clear()

        objects.forEach((obj: any) => {
          canvas.add(obj)
        })

        canvas.renderAll()
        handleCanvasModified()
      }
    }
  }
  const moveSelectedObjectToFront = () => {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      const objects = canvas.getObjects()
      const selectedObjectIndex = objects.findIndex((obj: any) => obj === activeObject)

      if (selectedObjectIndex !== -1) {
        objects.splice(selectedObjectIndex, 1)
        objects.push(activeObject)

        canvas.clear()

        objects.forEach((obj: any) => {
          canvas.add(obj)
        })

        canvas.renderAll()
        handleCanvasModified()
      }
    }
  }
  const deleteSelectedObject = () => {
    const activeObject = canvas.getActiveObject()
    if (activeObject && activeObject.imageType !== 'productImage') {
      const objects = canvas.getObjects()
      const selectedObjectIndex = objects.findIndex((obj: any) => obj === activeObject)

      if (selectedObjectIndex !== -1) {
        objects.splice(selectedObjectIndex, 1)
        canvas.clear()

        objects.forEach((obj: any) => {
          canvas.add(obj)
        })

        canvas.renderAll()
        const getAllImageObject = canvas.getObjects().filter((obj: any) => obj.type === 'image')
        if (getAllImageObject.length > 1) {
          setShowCrop(false)
        } else {
          setShowCrop(true)
        }
        handleCanvasModified()
      }
    }
  }
  // useEffect(() => {
  //   //Remove elements on switching from visual concept to other modes
  //   if (selectedMode === "Themes" && canvas) {
  //     const getAllElementObject = canvas
  //       ?.getObjects()
  //       ?.filter(
  //         (obj) => obj.type === "image" && obj.imageType !== "productImage"
  //       );
  //     if (getAllElementObject.length > 0) {
  //       const getImageObject = canvas
  //         ?.getObjects()
  //         ?.filter(
  //           (obj) => obj.type === "image" && obj.imageType === "productImage"
  //         );
  //       canvas.clear();
  //       getImageObject.forEach((obj) => {
  //         canvas.add(obj);
  //       });
  //       setShowCrop(true);
  //       setCanvasStack([canvas.toDatalessJSON(["imageType"])]);
  //       setCurrentCanvasIndex(0);
  //     }
  //   }
  // }, [selectedMode]);
  useEffect(() => {
    if (elementAdded) {
      const getAllImageObject = canvas.getObjects().filter((obj: any) => obj.type === 'image')
      if (getAllImageObject.length > 1) {
        setShowCrop(false)
      } else {
        setShowCrop(true)
      }
      handleCanvasModified()
      setElementAdded(false)
    }
  }, [elementAdded])
  const handleObjectModified = (e: any) => {
    const modifiedObject = e.target
    if (canvas && modifiedObject.type === 'image') {
      handleCanvasModified()
    }
  }
  useEffect(() => {
    if (canvas) {
      canvas.on('object:modified', handleObjectModified)

      return () => {
        // Clean up the event listeners when unmounting or when canvas changes
        canvas.off('object:modified', handleObjectModified)
      }
    }
  }, [canvas, handleObjectModified])

  const fileReader = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const fabricImage = new fabric.Image(img)
        if (typeof canvas === 'undefined' || !(canvas instanceof fabric.Canvas)) {
          // Create a new canvas instance
          canvas = new fabric.Canvas('canvas', {
            preserveObjectStacking: true
          })
        }
        let canvasWidth = canvas.getWidth()
        let canvasHeight = canvas.getHeight()
        let imgWidth = fabricImage.width || 0
        let imgHeight = fabricImage.height || 0
        const scaleX = fabricImage.scaleX || 1
        const scaleY = fabricImage.scaleY || 1
        let imgRatio = imgWidth / imgHeight
        let canvasRatio = canvasWidth / canvasHeight
        if (imgRatio <= canvasRatio) {
          if (imgHeight > canvasHeight) {
            fabricImage.scaleToHeight(canvasHeight)
          }
        } else {
          if (imgWidth > canvasWidth) {
            fabricImage.scaleToWidth(canvasWidth)
          }
        }
        fabricImage.set({
          angle: 0,
          padding: 0,
          originX: 'center',
          originY: 'center',
          scaleX: scaleX * 0.95,
          scaleY: scaleY * 0.95,
          hasRotatingPoint: true,
          centeredScaling: true,
          cornerStyle: 'circle',
          cornerColor: 'rgba(0, 0, 0, 0.6)',
          cornerSize: 10,
          borderColor: 'rgba(0, 0, 0, 0.6)',
          cornerStrokeColor: 'rgba(255, 255, 255, 0.6)',
          strokeWidth: 2,
          transparentCorners: false,
          imageType: 'productImage'
        } as Partial<any>)
        canvas.clear()
        canvas.add(fabricImage)
        canvas.centerObject(fabricImage)
        setCanvasStack([canvas.toDatalessJSON(['imageType', 'borderColor', 'cornerColor', 'cornerStyle', 'cornerSize', 'strokeWidth', 'transparentCorners'])])
        setCurrentCanvasIndex(0)
        setCanvas(canvas)
        setImage(fabricImage)
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  function handleCanvasModified() {
    const newCanvasStack: any[] = canvasStack.slice(0, currentCanvasIndex + 1)
    const jsonData = canvas.toDatalessJSON(['imageType', 'borderColor', 'cornerColor', 'cornerStyle', 'cornerSize', 'strokeWidth', 'transparentCorners'])
    const prevData = newCanvasStack[newCanvasStack.length - 1]

    // Compare the previous data with the new data to find the differences (delta)
    // if (JSON.stringify(prevData) !== JSON.stringify(jsonData)) {
    newCanvasStack.push(jsonData)
    setCanvasStack(newCanvasStack)
    setCurrentCanvasIndex(newCanvasStack.length - 1)
    // }
  }

  const handleUndo = () => {
    const objects = canvas.getObjects()
    const rectangleIndex = objects.findIndex((obj: any) => obj instanceof fabric.Rect)
    let selectionRect = ''
    if (rectangleIndex !== -1) {
      selectionRect = canvas?.item(rectangleIndex)
      canvas.remove(selectionRect)
      setIsCropImage(false)
    }
    if (currentCanvasIndex > 0) {
      const prevIndex = currentCanvasIndex - 1
      setCurrentCanvasIndex(prevIndex)
      const canvasData = canvasStack[prevIndex]
      canvas.loadFromJSON(canvasData, () => {
        canvas.renderAll()
        const getAllImageObject = canvas.getObjects().filter((obj: any) => obj.type === 'image')
        if (getAllImageObject.length > 1) {
          setShowCrop(false)
        } else {
          setShowCrop(true)
        }
      })
    }
  }

  const handleRedo = () => {
    const objects = canvas.getObjects()
    const rectangleIndex = objects.findIndex((obj: any) => obj instanceof fabric.Rect)
    let selectionRect = ''
    if (rectangleIndex !== -1) {
      selectionRect = canvas?.item(rectangleIndex)
      canvas.remove(selectionRect)
      setIsCropImage(false)
    }
    if (currentCanvasIndex < canvasStack.length - 1) {
      const nextIndex = currentCanvasIndex + 1
      setCurrentCanvasIndex(nextIndex)
      const canvasData = canvasStack[nextIndex]
      canvas.loadFromJSON(canvasData, () => {
        canvas.renderAll()
        const getAllImageObject = canvas.getObjects().filter((obj: any) => obj.type === 'image')
        if (getAllImageObject.length > 1) {
          setShowCrop(false)
        } else {
          setShowCrop(true)
        }
      })
    }
  }
  useEffect(() => {
    const handleClickOutsideCanvas = (event: any) => {
      if (canvas && canvas.getActiveObject()) {
        const canvasElement = canvas.getElement()
        const rect = canvasElement.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        if (x < 0 || x > canvasElement.width || y < 0 || y > canvasElement.height) {
          canvas.discardActiveObject()
          canvas.renderAll()
        }
      }
    }
    if (generateBtnClick) {
      canvas.discardActiveObject()
      const objects = canvas.getObjects()
      const rectangleIndex = objects.findIndex((obj: any) => obj instanceof fabric.Rect)
      let selectionRect = ''
      if (rectangleIndex !== -1) {
        selectionRect = canvas?.item(rectangleIndex)
        canvas.remove(selectionRect)
        setIsCropImage(false)
        const fabricImage = objects[0]
        fabricImage.lockMovementX = false
        fabricImage.lockMovementY = false
        fabricImage.selectable = true
      }
      canvas.renderAll()
      setGenerateBtnClick(false)
    }
    document.addEventListener('click', handleClickOutsideCanvas)

    return () => {
      document.removeEventListener('click', handleClickOutsideCanvas)
    }
  }, [canvas, generateBtnClick])
  useEffect(() => {
    if (selectedFile) {
      fileReader(selectedFile)
    }
  }, [selectedFile])

  function handleCrop() {
    setIsCropImage(false)
    const selectionRect = canvas.item(1)
    const fabricImage = canvas.item(0)

    const rect = new fabric.Rect({
      left: selectionRect.left,
      top: selectionRect.top,
      width: selectionRect.getScaledWidth(),
      height: selectionRect.getScaledHeight(),
      absolutePositioned: true
    })

    fabricImage.clipPath = rect
    canvas.remove(selectionRect)

    // Crop the image using the current canvas context
    const croppedDataUrl = canvas.toDataURL({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height
    })

    // Create a new fabric.Image object with the cropped image data
    fabric.Image.fromURL(croppedDataUrl, (img) => {
      img.set({
        left: rect.left,
        top: rect.top,
        hasControls: true,
        hasBorders: true,
        padding: 0,
        cornerStyle: 'circle',
        cornerColor: 'rgba(0, 0, 0, 0.6)',
        cornerSize: 10,
        borderColor: 'rgba(0, 0, 0, 0.6)',
        cornerStrokeColor: 'rgba(255, 255, 255, 0.6)',
        strokeWidth: 2,
        transparentCorners: false,
        imageType: 'productImage'
      } as Partial<any>)

      // Remove the old image object and add the cropped image object to the canvas
      canvas.remove(fabricImage)
      canvas.add(img)
      canvas.setActiveObject(img)
      canvas.renderAll()

      // Enable movement and selection for the cropped image
      img.lockMovementX = false
      img.lockMovementY = false
      img.selectable = true

      handleCanvasModified()
    })
  }

  function addCropMask() {
    setIsCropImage(true)
    const fabricImage = canvas.getObjects()[0]
    fabricImage.lockMovementX = true
    fabricImage.lockMovementY = true
    fabricImage.selectable = false

    let selectionRect = new fabric.Rect({
      fill: 'rgba(0,0,0,0.3)',
      originX: 'left',
      originY: 'top',
      stroke: 'black',
      opacity: 1,
      width: 100,
      height: 100,
      hasRotatingPoint: false,
      transparentCorners: false,
      cornerColor: 'white',
      cornerStrokeColor: 'black',
      borderColor: 'black',
      cornerSize: 12,
      padding: 0,
      cornerStyle: 'circle',
      borderDashArray: [5, 5],
      borderScaleFactor: 1.3
    })

    selectionRect.scaleToWidth(100)
    canvas.centerObject(selectionRect)
    canvas.setActiveObject(selectionRect)
    canvas.add(selectionRect)
  }
  function handleRotate() {
    if (canvas) {
      canvas.forEachObject((obj: any) => {
        if (obj instanceof fabric.Image && obj.angle) {
          obj.rotate(obj.angle - 90)
        }
      })
      const objects = canvas.getObjects()
      const rectangleIndex = objects.findIndex((obj: any) => obj instanceof fabric.Rect)
      let selectionRect = ''
      if (rectangleIndex !== -1) {
        selectionRect = canvas?.item(rectangleIndex)
        canvas.remove(selectionRect)
      }
      handleCanvasModified()
      if (rectangleIndex !== -1) {
        canvas.setActiveObject(selectionRect)
        canvas.add(selectionRect)
      }
      canvas.renderAll()
    }
  }

  function handleZoomIn() {
    if (canvas) {
      canvas.forEachObject((obj: any) => {
        if (obj instanceof fabric.Image && obj.scaleX) {
          obj.scale(obj.scaleX * 1.1)
        }
      })
      const objects = canvas.getObjects()
      const rectangleIndex = objects.findIndex((obj: any) => obj instanceof fabric.Rect)
      let selectionRect = ''
      if (rectangleIndex !== -1) {
        selectionRect = canvas?.item(rectangleIndex)
        canvas.remove(selectionRect)
      }
      handleCanvasModified()
      if (rectangleIndex !== -1) {
        canvas.setActiveObject(selectionRect)
        canvas.add(selectionRect)
      }
      canvas.renderAll()
    }
  }

  function handleZoomOut() {
    if (canvas) {
      canvas.forEachObject((obj: any) => {
        if (obj instanceof fabric.Image && obj.scaleX) {
          obj.scale(obj.scaleX * 0.9)
        }
      })
      const objects = canvas.getObjects()
      const rectangleIndex = objects.findIndex((obj: any) => obj instanceof fabric.Rect)
      let selectionRect = ''
      if (rectangleIndex !== -1) {
        selectionRect = canvas?.item(rectangleIndex)
        canvas.remove(selectionRect)
      }
      handleCanvasModified()
      if (rectangleIndex !== -1) {
        canvas.setActiveObject(selectionRect)
        canvas.add(selectionRect)
      }
      canvas.renderAll()
    }
  }
  function adjustCanvasAspectRatio(aspectRatio: any) {
    canvas.setHeight(newCanvasHeight)
    canvas.setWidth(newCanvasWidth)
    canvas.forEachObject((obj: any) => {
      if (obj.imageType === 'productImage') {
        obj.scaleToWidth(newCanvasWidth)
        obj.scaleToHeight(newCanvasHeight)
      }
    })

    canvas.renderAll()
  }

  return (
    <div>
      {removeBackgroundImageLoading && (
        <Loader
          width="100%"
          height="100px"
        />
      )}
      <Box
        style={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          visibility: !selectedFile || removeBackgroundImageLoading ? 'hidden' : 'visible'
        }}>
        <Box
          style={{
            backgroundImage: `url(${imageBg})`,
            borderRadius: '10px',
            height: `${newCanvasHeight}px`
          }}>
          <canvas
            ref={canvasRef}
            height={newCanvasHeight}
            width={newCanvasWidth}
            id="canvas"
            style={{
              width: `${newCanvasWidth}px`,
              margin: '0 auto',
              // border: "2px solid #ccc",
              height: `${newCanvasHeight}px`,
              borderRadius: '10px'
            }}
          />
        </Box>
        {image && (
          <>
            <Stack
              direction="column"
              spacing={2}
              justifyContent="center"
              sx={{ textAlign: 'center' }}
              mt={1}>
              <Stack
                direction="row"
                spacing={2}>
                <Tooltip title="Undo">
                  <IconButton
                    aria-label="undo"
                    onClick={handleUndo}
                    size="small">
                    <img
                      src={undoIcon}
                      alt="undoIcon"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Redo">
                  <IconButton
                    aria-label="redo"
                    onClick={handleRedo}
                    size="small">
                    <img
                      src={redoIcon}
                      alt="redoIcon"
                    />
                  </IconButton>
                </Tooltip>
                {showCrop && (
                  <>
                    {!isCropImage ? (
                      <Tooltip title="Crop">
                        <IconButton
                          aria-label="crop"
                          onClick={addCropMask}
                          size="small"
                          sx={{ color: '#1C1B1F' }}>
                          <CropIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Finish cropping">
                        <IconButton
                          aria-label="crop"
                          onClick={handleCrop}
                          size="small"
                          sx={{ color: '#1C1B1F' }}>
                          <CheckCircleOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
                <Tooltip title="Rotate">
                  <IconButton
                    aria-label="rotate"
                    onClick={handleRotate}
                    size="small"
                    sx={{ color: '#1C1B1F' }}>
                    <RotateLeftIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom In">
                  <IconButton
                    aria-label="zoomin"
                    onClick={handleZoomIn}
                    size="small"
                    sx={{ color: '#1C1B1F' }}>
                    <ZoomInIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom Out">
                  <IconButton
                    aria-label="zoomout"
                    onClick={handleZoomOut}
                    size="small"
                    sx={{ color: '#1C1B1F' }}>
                    <ZoomOutIcon />
                  </IconButton>
                </Tooltip>
                {!isCropImage && !openModal && (
                  <>
                    <Tooltip title="Bring to front">
                      <IconButton
                        aria-label="front"
                        onClick={moveSelectedObjectToFront}
                        size="small"
                        sx={{ color: '#1C1B1F' }}>
                        <LayersIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send to back">
                      <IconButton
                        aria-label="back"
                        onClick={moveSelectedObjectToBack}
                        size="small"
                        sx={{ color: '#1C1B1F', transform: 'rotate(180deg)' }}>
                        <LayersIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="delete"
                        onClick={deleteSelectedObject}
                        size="small"
                        sx={{ color: '#1C1B1F' }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Stack>
            </Stack>
          </>
        )}
      </Box>
    </div>
  )
}

export default Canvas
