import { Box, Button, Grid, InputLabel, Tab, Tabs, Typography, SelectChangeEvent, InputBase, Chip, Divider } from '@mui/material'
import React from 'react'
import prodImg9 from 'assets/img9.png'
import img7 from 'assets/img7.png'
import img from 'assets/img4.png'
import capitalize from 'lodash/capitalize'
// import { fabric } from 'fabric'
// import generateBtnIcon from 'assets/images/generateBtnIcon.png'
import {
  FolderIcon,
  PaintBrushIcon,
  SparklesIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import DefaultDrawer from './components/drawer/CreateDrawer'
import AssetDrawer from './components/drawer/AssetDrawer'
// import Canvas from './components/Canvas'
// import { useAppSelector } from 'redux/hooks'
// import styles from 'styles/GenerateProduct.module.css'
// import GeneratedImages from './components/GeneratedImages'
// import ThemeBased from './components/drawer/ThemeBased'
// import { useDispatch, useSelector } from 'react-redux'
import {
  // generateImageCampaignBasedApi,
  // generateImageCustomStudioApi,
  // generateImageThemeBasedApi,
  // generateImageVisualConceptApi,
  getThemeImageListsApi,
} from "redux/action/generate.action";
// import { setGenerateImagePayload } from "redux/reducers/generate.reducer";
import ThemeDrawer from "./components/drawer/ThemeDrawer";
const tabs = [
  {
    name: "Presets",
    icon: Square2StackIcon,
  },
  {
    name: "Custom",
    icon: PaintBrushIcon,
  },
  {
    name: "Assets",
    icon: FolderIcon,
  },
];

export default function GenerateImage() {
  // const dispatch = useDispatch();
  // const generateProductState = useSelector((state: any) => state.generate);
  // const generateImageResponse =
  // generateProductState?.generateImageResponse || [];
  const [value, setValue] = React.useState(0);
  const [ratio, setRatio] = React.useState("1:1");
  // const [canvas, setCanvas] = React.useState<any>(null);
  // const [openModal, setOpenModal] = React.useState(false);
  // const [selectedImage, setSelectedImage] = React.useState<any>("");
  // const [openElements, setOpenElements] = React.useState(false);
  // const [elementAdded, setElementAdded] = React.useState(false);
  // const [productDetails, setProductDetails] = React.useState<{
  //   name: string;
  //   category: string;
  //   description: string;
  // } | null>(null);
  // const [selectedMenu, setSelectedMenu] = React.useState("Assets");
  const [selectedImageSrc, setSelectedImageSrc] = React.useState("");
  // const [generateBtnClick, setGenerateBtnClick] = React.useState(false);
  // const [removeBgProductName, setRemoveBgProductName] = React.useState("");
  // const [selectedFile, setSelectedFile] = React.useState<Blob | null>(null);
  // const userEmail = "js903783@gmail.com";
  // const userId = "cKtEO8vZqwRZ6A3XEn9L5ZPGv1k2";
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([
    "Slide show",
    "Gender: Man",
    "Age: 13-15",
  ]);
  // const [showAlert, setShowAlert] = React.useState({
  //   open: false,
  //   message: "",
  //   messageType: "",
  // });
  // const removeBackgroundResponseImage =
  //   generateProductState?.removeBackgroundResponse?.image || "";
  // const removeBackgroundResponseError =
  //   generateProductState?.removeBackgroundError || "";
  // const removeBackgroundImageLoading =
  //   generateProductState?.removingBackground || false;
  // const generateImageStatePayload = generateProductState?.generateImagePayload;
  // const selectedMode = generateImageStatePayload?.selectedTab || "";
  // const historyGeneratedImageState =
  //   generateProductState?.historyGeneratedImages || [];
  // const generateImageLoading = generateProductState?.generatingImage || false;
  // const enhanceImageLoading = generateProductState?.enhancingImage || false;
  // const generateImageError = generateProductState?.generateImageError || "";
  // const selectedGeneratedImageState =
  //   generateProductState?.selectedGeneratedImageState || {};
  // let isLoading = generateImageLoading || enhanceImageLoading;
  // const personaBasedState = generateImageStatePayload?.personaBasedState || "";
  // const visualConceptState =
  //   generateImageStatePayload?.visualConceptState || "";
  // const themeBasedState = generateImageStatePayload?.themeBasedState || "";
  // const customSceneState = generateImageStatePayload?.customScene || "";
  // const noOfGeneratedImage =
  //   generateImageStatePayload?.noOfGeneratedImage || "";
  // const selectedHintsTab = generateImageStatePayload?.selectedHintsTab || "";
  // const resizeCanvas = generateImageStatePayload?.resizeCanvas || "";
  // const selectedRefImageStyle =
  //   generateImageStatePayload?.selectedRefImageStyleFile || "";

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);
  const handleSelectRatio = (e: SelectChangeEvent) =>
    setRatio(e.target.value as string);

  React.useEffect(() => {
    const calculateWidthAndHeight = (ratio: string) => {
      const container = document.getElementById("image_container_container");
      const imgContainer = document.getElementById("image_container");
      const image = document.getElementById("prod_img");
      const width = container?.offsetHeight || 0;
      const height = container?.offsetHeight || 0;
      if (ratio === "1:1" && imgContainer && image) {
        //container
        imgContainer.style.width = `${height - 224}px`;
        imgContainer.style.height = `${height - 224}px`;

        // image
        image.style.width = `${height - 230}px`;
        image.style.height = `${height - 230}px`;
      } else if (ratio === "16:9" && imgContainer && image) {
        // container
        imgContainer.style.width = `${height - 224}px`;
        imgContainer.style.height = `${(width - 224) / (16 / 9)}px`;

        // image
        image.style.width = `${height - 230}px`;
        image.style.height = `${(width - 230) / (16 / 9)}px`;
      } else if (ratio === "9:16" && imgContainer && image) {
        // container
        imgContainer.style.width = `${(height - 224) / (16 / 9)}px`;
        imgContainer.style.height = `${height - 224}px`;

        // image
        image.style.width = `${(height - 230) / (16 / 9)}px`;
        image.style.height = `${height - 230}px`;
      }
    };
    calculateWidthAndHeight(ratio);
  }, [ratio]);

  // React.useEffect(() => {
  //   if (selectedImageSrc) {
  //     imgUrlToImgFile(selectedImageSrc);
  //     setSelectedImageSrc("");
  //   }
  // }, [selectedImageSrc]);

  //converting image path to file object
  // const imgUrlToImgFile = async (imgSrc: string) => {
  //   const response = await fetch(imgSrc);
  //   const blob = await response.blob();
  //   const file = new File([blob], `${removeBgProductName || "product"}.png`, {
  //     type: blob.type,
  //   });
  //   setSelectedFile(file);
  // };

  // React.useEffect(() => {
  //   if (selectedImage) {
  //     setRemoveBgProductName(selectedImage?.product_type || "");
  //     setProductDetails({
  //       name: selectedImage?.title || "",
  //       category: selectedImage?.product_type || "",
  //       description: selectedImage?.body_html || "",
  //     });
  //   }
  //   if (selectedImage?.product_type) {
  //     removeBackground();
  //     imgUrlToImgFile(selectedImage?.image?.src);
  //   }
  // }, [selectedImage]);

  // React.useEffect(() => {
  // get all themes
  // getThemeImageListsApi();
  // }, []);

  // const getUrlExtension = (url: string) => {
  //   const extension = url.split(/[#?]/)[0].split(".").pop()?.trim() || "";
  //   return extension;
  // };
  // const removeBackground = async (e?: any) => {
  //   e?.preventDefault();
  //   const formData = new FormData();
  //   formData.append(
  //     "product_name",
  //     selectedImage?.product_type || removeBgProductName
  //   );
  //   if (selectedImage?.image?.src) {
  //     const imgExt = getUrlExtension(selectedImage?.image?.src);
  //     const response = await fetch(selectedImage?.image?.src);
  //     const blob = await response.blob();
  //     const file = new File(
  //       [blob],
  //       `${removeBgProductName || "product"}.${imgExt}`,
  //       {
  //         type: blob.type,
  //       }
  //     );
  //     setSelectedImage("");
  //     formData.append("image", file);
  //   } else if (selectedFile) {
  //     formData.append("image", selectedFile);
  //     setSelectedImage("");
  //   }
  //   window.amplitude.track("Remove background", {
  //     email: localStorage.getItem("email") || "",
  //   });
  //   // dispatch(removeBackgroundApi(formData))
  // };

  // const productImageFile = async () => {
  //   const clonedCanvas = new fabric.StaticCanvas(null, {
  //     width: canvas.getWidth(),
  //     height: canvas.getHeight(),
  //   });
  //   let productImage = canvas
  //     .getObjects()
  //     .find(
  //       (obj: any) => obj.type === "image" && obj.imageType === "productImage"
  //     );
  //   if (productImage) {
  //     const clonedImage = fabric.util.object.clone(productImage);
  //     clonedCanvas.add(clonedImage);
  //   }
  //   let productFile;
  //   const imageDataURL = clonedCanvas.toDataURL({
  //     format: "png",
  //     quality: 1,
  //     multiplier: 3.414,
  //   });
  //   productFile = await convertImageUrlToFile(imageDataURL);
  //   return productFile;
  // };

  // const convertImageUrlToFile = async (imageUrl: string) => {
  //   const response = await fetch(imageUrl);
  //   const blob = await response.blob();
  //   const file = new File([blob], "productImage.png", {
  //     type: blob.type,
  //   });
  //   return file;
  // };

  // const productWithElementImageFile = async () => {
  //   if (canvas) {
  //     const imageDataURL = canvas.toDataURL({
  //       format: "png",
  //       quality: 1,
  //       multiplier: 3.414,
  //     });

  //     let elementFile = await convertImageUrlToFile(imageDataURL);
  //     return elementFile;
  //   }
  // };

  // const formCustomStudioApiRequest = (customSceneState: any, formData: any) => {
  //   let placement = customSceneState.selectedPlacementValue;
  //   placement = placement.charAt(0).toLowerCase() + placement.slice(1);
  //   placement = placement.replace(" ", "");
  //   let shadow = customSceneState.selectedShadowValue;
  //   shadow = shadow.charAt(0).toLowerCase() + shadow.slice(1);
  //   if (shadow !== "any") {
  //     shadow = shadow + "_shadow";
  //   }
  //   let backgroundColor = customSceneState.selectedColor;
  //   let textureImage = customSceneState.selectedTextureSurfacePaletteFile;
  //   if (customSceneState.selectedBackDropValue === "Plain color") {
  //     let colorValues = Object.values(backgroundColor);
  //     let colorString = colorValues.join("_");
  //     formData.append("bg_color", colorString);
  //   } else {
  //     formData.append("texture_img", textureImage);
  //   }
  //   formData.append("placement", placement);
  //   formData.append("shadow", shadow);
  //   formData.append("ref_img", selectedRefImageStyle);
  //   return formData;
  // };

  // const handleSubmit = async () => {
  //   setGenerateBtnClick(true);
  //   let productWithElementFile = await productWithElementImageFile();
  //   let productFile = await productImageFile();
  //   let payload = {
  //     product_name: productDetails?.name || "",
  //     product_category: productDetails
  //       ? productDetails?.category || ""
  //       : removeBgProductName
  //       ? removeBgProductName
  //       : "" || "",
  //     product_description: productDetails?.description || "",
  //     num_generated_images: noOfGeneratedImage,
  //     email: userEmail,
  //     userId: userId,
  //   };
  //   const formData = new FormData();
  //   formData.append("image", productFile);
  //   formData.append("product_name", payload.product_name);
  //   formData.append("product_category", payload.product_category);
  //   formData.append("product_description", payload.product_description);
  //   formData.append("num_generated_images", payload.num_generated_images);
  //   formData.append("email", payload.email);
  //   formData.append("user_id", payload.userId);
  //   if (selectedMenu === "Assets") {
  //     setSelectedMenu("Create");
  //   }
  //   if (selectedMode === "Custom Scene") {
  //     if (customSceneState.selectedCustomSceneTab === "Studio") {
  //       let payload = {
  //         ...generateImageStatePayload,
  //         customScene: {
  //           ...customSceneState,
  //           selectedCustomSceneTab: "Studio",
  //         },
  //       };
  //       dispatch(setGenerateImagePayload(payload));
  //       generateImageCustomStudioApi(
  //         formCustomStudioApiRequest(customSceneState, formData)
  //       );
  //     } else {
  //       let prompt = customSceneState?.promptValue || "";
  //       if (!prompt) {
  //         let payload = {
  //           ...generateImageStatePayload,
  //           customScene: {
  //             ...customSceneState,
  //             selectedCustomSceneTab: "Lifestyle",
  //           },
  //         };
  //         dispatch(setGenerateImagePayload(payload));
  //         setShowAlert({
  //           open: true,
  //           message: "Please describe the scene to generate image",
  //           messageType: "error",
  //         });
  //         return;
  //       } else {
  //         formData.append("prompt", prompt);
  //         formData.append("image_with_elements", productWithElementFile as any);
  //         formData.append("ref_img", selectedRefImageStyle);
  //         generateImageVisualConceptApi(formData);
  //       }
  //     }
  //   } else if (selectedMode === "Theme") {
  //     let theme = themeBasedState?.selectedTheme || "";
  //     if (!theme) {
  //       setSelectedMenu("Create");
  //       setShowAlert({
  //         open: true,
  //         message: "Please select theme to generate image",
  //         messageType: "error",
  //       });
  //       return;
  //     }
  //     formData.append("theme", theme);
  //     generateImageThemeBasedApi(formData);
  //   } else if (selectedMode === "Target Audience") {
  //     const {
  //       minAge = 13,
  //       maxAge = 65,
  //       gender = [],
  //       location = "",
  //       demographicList = [],
  //       behaviourList = [],
  //       interestList = [],
  //     } = personaBasedState;
  //     formData.append("location", location);
  //     formData.append("min_age", minAge);
  //     formData.append("max_age", maxAge);
  //     formData.append("gender", gender);
  //     formData.append("demographic", demographicList);
  //     formData.append("interests", interestList);
  //     formData.append("behaviours", behaviourList);
  //     generateImageCampaignBasedApi(formData);
  //   }
  // };

  return (
    <div style={{ display: "flex", maxWidth: "100vw" }}>
      <div
        style={{
          minWidth: 80,
          height: "calc(100vh - 75px)",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          TabIndicatorProps={{ style: { display: "none" } }}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ "& .Mui-selected": { background: "white" } }}
        >
          {tabs.map((tab, index) => (
            <Tab
              sx={{ py: 2 }}
              label={
                <>
                  <tab.icon style={{ width: 16, height: 16 }} />
                  <Typography variant="caption" sx={{ fontWeight: 400 }}>
                    {capitalize(tab.name)}
                  </Typography>
                </>
              }
            />
          ))}
        </Tabs>
      </div>
      {/* left drawer */}
      <Box
        sx={{
          height: "calc(100vh - 75px)",
          minWidth: 340,
          width: 340,
          background: "white",
          p: 3,
          overflowY: "auto",
          zIndex: 10,
        }}
      >
        {value === 0 && <ThemeDrawer />}
        {value === 1 && (
          <DefaultDrawer ratio={ratio} handleSelectRatio={handleSelectRatio} />
        )}
        {value === 2 && (
          <AssetDrawer
            selectedImageSrc={selectedImageSrc}
            setSelectedImageSrc={setSelectedImageSrc}
          />
        )}
      </Box>

      <div
        id="image_container_container"
        style={{
          minHeight: "calc(100vh - 75px)",
          backgroundColor: "#E5E5E5",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
          padding: 24,
          position: "relative",
        }}
      >
        {/* <Stack
          direction={'column'}
          spacing={1}
          className={styles.canvasStack}>
          <Stack
            direction={'row'}
            spacing={1}
            justifyContent={'space-evenly'}
            alignItems={'flex-start'}>
            {!openModal && (
              <Canvas
                selectedFile={selectedFile}
                generateBtnClick={generateBtnClick}
                setGenerateBtnClick={setGenerateBtnClick}
                canvas={canvas}
                setCanvas={setCanvas}
                elementAdded={elementAdded}
                setElementAdded={setElementAdded}
                removeBackgroundImageLoading={removeBackgroundImageLoading}
                selectedMode={selectedMode}
                openModal={openModal}
              />
            )}
          </Stack>
        </Stack>

        {generateImageResponse && generateImageResponse?.length > 0 && (
          <Button
            startIcon={
              <img
                src={generateBtnIcon}
                alt="generateBtnIcon"
              />
            }
            variant="contained"
            size="large"
            className={styles.generateBtnCenter}
            onClick={handleSubmit}
            disabled={isLoading || removeBackgroundImageLoading}>
            Generate
          </Button>
        )} */}
        <div style={{ textAlign: "left" }}>
          <Typography variant="subtitle1" sx={{ color: "#2291FF" }}>
            Dimensions: Instagram Post ({ratio})
          </Typography>
          <div
            id="image_container"
            style={{
              width: "100%",
              height: "100%",
              background: "white",
              border: "1px solid rgba(34, 145, 255, 1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              id="prod_img"
              src={prodImg9}
              style={{ width: 608, height: 608, objectFit: "contain" }}
              alt="prod_img"
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            padding: 16,
            background: "white",
            borderRadius: 12,
            position: "absolute",
            bottom: 56,
            width: "80%",
            left: 56,
            boxShadow: "0px 4px 6px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ width: "100%" }}>
            <InputBase
              multiline
              fullWidth
              placeholder="Select the settings in the left sidebar"
            />
            <div
              style={{
                display: selectedStyles.length > 0 ? "flex" : "none",
                flexWrap: "wrap",
              }}
            >
              <Chip
                variant="outlined"
                label="Clear Styles"
                clickable
                onClick={() => setSelectedStyles([])}
                sx={{ borderRadius: "4px", mb: 1 }}
              />
              <Divider flexItem orientation="vertical" sx={{ mx: 1 }} />
              {selectedStyles.map((style) => (
                <Chip
                  variant="outlined"
                  label={style}
                  onDelete={() =>
                    setSelectedStyles(selectedStyles.filter((s) => s !== style))
                  }
                  sx={{ borderRadius: "4px", mb: 1, mr: 1 }}
                />
              ))}
            </div>
          </div>
          <Button
            sx={{ bgcolor: "background.color-brand-background", px: 2 }}
            startIcon={<SparklesIcon style={{ width: 18, height: 18 }} />}
          >
            Generate
          </Button>
        </div>
      </div>

      {/* right drawer */}
      <Box
        sx={{
          height: "calc(100vh - 75px)",
          minWidth: "340px",
          width: "340px",
          maxWidth: "340px",
          background: "white",
          p: 1.5,
          overflowY: "auto",
        }}
      >
        {/* <div style={{ marginBottom: 24 }}>
          {selectedFile && (
            <GeneratedImages
              productName={`${productDetails?.name}`}
              removeBgProductName={removeBgProductName}
              productDetails={productDetails}
              canvas={canvas}
              setGenerateBtnClick={setGenerateBtnClick}
              removeBackgroundImageLoading={removeBackgroundImageLoading}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          )}
        </div> */}
        <div style={{ marginBottom: 24 }}>
          <InputLabel sx={{ fontSize: 20, fontWeight: 600 }}>
            Recents
          </InputLabel>
          <Typography sx={{ mb: 1 }} color="text.secondary" variant="subtitle2">
            Instagram Post (1:1): A bottle of cosmetics stands on a rock in the
            middle of the jungle
          </Typography>
          <Grid container spacing={1}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={6} key={item}>
                <img
                  src={img}
                  alt="img"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <div style={{ marginBottom: 24 }}>
          <Typography sx={{ mb: 1 }} color="text.secondary" variant="subtitle2">
            Facebook Post (16:9): A bottle of cosmetics stands on a rock in the
            middle of the river
          </Typography>
          <Grid container spacing={1}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={6} key={item}>
                <img
                  src={img7}
                  alt="img"
                  style={{
                    minWidth: "150px",
                    height: "85px",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <div style={{ marginBottom: 24 }}>
          <Typography sx={{ mb: 1 }} color="text.secondary" variant="subtitle2">
            Facebook Post (9:16): A bottle of cosmetics stands on a rock in the
            middle of the desert:
          </Typography>
          <Grid container spacing={1}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={6} key={item}>
                <img
                  src={img7}
                  alt="img"
                  style={{
                    minWidth: "150px",
                    height: "267px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 8,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
    </div>
  );
}
