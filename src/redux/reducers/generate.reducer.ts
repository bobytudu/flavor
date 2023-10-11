import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GenerateInitState } from "./types";

// Define the initial state using that type
const initialState: GenerateInitState = {
  removingBackground: false,
  removeBackgroundResponse: null,
  removeBackgroundError: null,
  enhancingImage: false,
  enhanceImageResponse: null,
  enhanceImageError: null,
  fetchingThemesImage: false,

  themesImageList: [],
  themeImageError: null,
  generatingThemeBasedImage: false,
  generateThemeBasedImageResponse: [],
  generateThemeBasedImageError: null,
  themeLoading: false,

  generatingImage: false,
  generateImageResponse: [],
  historyGeneratedImages: [],
  generateImageError: null,
  generatingCampaignBasedImage: false,
  generateCampaignBasedImageResponse: [],
  generateCampaignBasedImageError: null,
  generatingVisualConceptImage: false,
  generateVisualConceptImageResponse: [],
  generateVisualConceptImageError: null,
  savingGeneratedImage: false,
  saveGeneratedImageResponse: null,
  saveGeneratedImageError: null,
  savingProductImage: false,
  saveProductImageResponse: null,
  saveProductImageError: null,
  bookmarkingImage: false,
  bookmarkImageResponse: null,
  bookmarkImageError: null,
  fetchingBookmarkedImage: false,
  getBookmarkedImageResponse: [],
  getBookmarkedImageError: null,
  fetchingNoOfImageLeft: false,
  getNoOfImageLeftResponse: 0,
  getNoOfImageLeftError: null,
  fetchingProductPageUrlImage: false,
  getProductPageUrlImageResponse: [],
  getProductPageUrlImageError: null,
  fetchingElementsImageList: false,
  getElementsImageListResponse: [],
  getElementsImageListError: null,

  generateImagePayload: {
    selectedTab: "Theme",
    selectedHintsTab: "Style match",
    customScene: {
      selectedCustomSceneTab: "studio",
      selectedIndoorTab: "Minimalist",
      selectedPlacementValue: "standing",
      selectedShadowValue: "any",
      selectedColor: "none",
      selectedTextureSurfacePalette: "none",
      selectedTextureSurfacePaletteFile: "none",
      promptValue: "",
      selectedLifestyleShadowValue: "any"
    },
    themeBasedState: null,
    visualConceptState: null,
    personaBasedState: {
      minAge: 13,
      maxAge: 65,
      demographicState: [],
      location: ""
    },
    noOfGeneratedImage: 4,
    matchStyleState: [],
    selectedRefImageStyle: "None",
    selectedRefImageStyleFile: "None",
    photoAttributes: [],
    resizeCanvas: {
      headerTitle: "",
      title: "",
      width: "",
      height: "",
      newCanvasHeight: 300,
      newCanvasWidth: 300,
    },
    existingAssets: [],
  },
  selectedGeneratedImageState: {
    index: "",
    imageListState: "",
  },
};

export const generateSlice = createSlice( {
    name: 'generate',
    initialState,
    reducers: {
      changeTab: ( state, action: PayloadAction<any> ) => {
        state.generateImagePayload.customScene.selectedCustomSceneTab = action.payload
      },
      resizeCanvas: ( state, action: PayloadAction<any> ) => {
        state.generateImagePayload.resizeCanvas = {
          ...state.generateImagePayload.resizeCanvas,
          newCanvasHeight: action.payload.height,
          newCanvasWidth: action.payload.width,
        }
      },
        removeBackgroundRequest: ( state ) => {
            state.removingBackground = true
            state.removeBackgroundResponse = null
            state.removeBackgroundError = null
        },
        removeBavckgroundSuccess: ( state, action: PayloadAction<any> ) => {
            state.removingBackground = false
            state.removeBackgroundResponse = action.payload
        },
        removeBackgroundFailure: ( state, action: PayloadAction<any> ) => {
            state.removingBackground = false
            state.removeBackgroundError = action.payload
        },
        enhanceImageRequest: ( state ) => {
            state.enhancingImage = true
            state.enhanceImageResponse = null
            state.enhanceImageError = null
        },
        enhanceImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.enhancingImage = false
            state.enhanceImageResponse = action.payload
        },
        enhanceImageFailure: ( state, action: PayloadAction<any> ) => {
            state.enhancingImage = false
            state.enhanceImageError = action.payload
        },
        getThemeImageRequest: ( state ) => {
            state.fetchingThemesImage = true
            state.themeImageError = null
        },
        getThemeImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.fetchingThemesImage = false
            state.themesImageList = action.payload
        },
        getThemeImageFailure: ( state, action: PayloadAction<any> ) => {
            state.fetchingThemesImage = false
            state.themeImageError = action.payload
        },
        generateImageRequest: ( state ) => {
            state.generatingImage = true
            state.generateImageError = null
        },
        generateImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.generatingImage = false
            state.generateImageResponse = action.payload
        },
        generateImageFailure: ( state, action: PayloadAction<any> ) => {
            state.generatingImage = false
            state.generateImageError = action.payload
        },
        historyGeneratedImagesRequest: ( state, action: PayloadAction<any> ) => {
            state.historyGeneratedImages = action.payload
        },
        generateThemeBasedImageRequest: ( state ) => {
            state.generatingThemeBasedImage = true
            state.generateThemeBasedImageError = null
            state.generateThemeBasedImageResponse = []
        },
        generateThemeBasedImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.generatingThemeBasedImage = false
            state.generateThemeBasedImageResponse = action.payload
        },
        generateThemeBasedImageFailure: ( state, action: PayloadAction<any> ) => {
            state.generatingThemeBasedImage = false
            state.generateThemeBasedImageError = action.payload
        },
        generateCampaignBasedImageRequest: ( state ) => {
            state.generatingCampaignBasedImage = true
            state.generateCampaignBasedImageError = null
            state.generateCampaignBasedImageResponse = []
        },
        generateCampaignBasedImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.generatingCampaignBasedImage = false
            state.generateCampaignBasedImageResponse = action.payload
        },
        generateCampaignBasedImageFailure: ( state, action: PayloadAction<any> ) => {
            state.generatingCampaignBasedImage = false
            state.generateCampaignBasedImageError = action.payload
        },
        generateVisualConceptImageRequest: ( state ) => {
            state.generatingVisualConceptImage = true
            state.generateVisualConceptImageError = null
        },
        generateVisualConceptImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.generatingVisualConceptImage = false
            state.generateVisualConceptImageResponse = action.payload
        },
        generateVisualConceptImageFailure: ( state, action: PayloadAction<any> ) => {
            state.generatingVisualConceptImage = false
            state.generateVisualConceptImageError = action.payload
        },
        saveGeneratedImageRequest: ( state ) => {
            state.savingGeneratedImage = true
            state.saveGeneratedImageError = null
            state.saveGeneratedImageResponse = null
        },
        saveGeneratedImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.savingGeneratedImage = false
            state.saveGeneratedImageResponse = action.payload
        },
        saveGeneratedImageFailure: ( state, action: PayloadAction<any> ) => {
            state.savingGeneratedImage = false
            state.saveGeneratedImageError = action.payload
        },
        saveProductImageRequest: ( state ) => {
            state.savingProductImage = true
            state.saveProductImageError = null
            state.saveProductImageResponse = null
        },
        saveProductImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.savingProductImage = false
            state.saveProductImageResponse = action.payload
        },
        saveProductImageFailure: ( state, action: PayloadAction<any> ) => {
            state.savingProductImage = false
            state.saveProductImageError = action.payload
        },
        bookmarkImageRequest: ( state ) => {
            state.bookmarkingImage = true
            state.bookmarkImageError = null
            state.bookmarkImageResponse = null
        },
        bookmarkImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.bookmarkingImage = false
            state.bookmarkImageResponse = action.payload
        },
        bookmarkImageFailure: ( state, action: PayloadAction<any> ) => {
            state.bookmarkingImage = false
            state.bookmarkImageError = action.payload
        },
        getBookmarkedImageRequest: ( state ) => {
            state.fetchingBookmarkedImage = true
            state.getBookmarkedImageError = null
            state.getBookmarkedImageResponse = []
        },
        getBookmarkedImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.fetchingBookmarkedImage = false
            state.getBookmarkedImageResponse = action.payload
        },
        getBookmarkedImageFailure: ( state, action: PayloadAction<any> ) => {
            state.fetchingBookmarkedImage = false
            state.getBookmarkedImageError = action.payload
        },
        getNoOfImageLeftRequest: ( state ) => {
            state.fetchingNoOfImageLeft = true
            state.getNoOfImageLeftError = null
        },
        getNoOfImageLeftSuccess: ( state, action: PayloadAction<any> ) => {
            state.fetchingNoOfImageLeft = false
            state.getNoOfImageLeftResponse = action.payload
        },
        getNoOfImageLeftFailure: ( state, action: PayloadAction<any> ) => {
            state.fetchingNoOfImageLeft = false
            state.getNoOfImageLeftError = action.payload
        },
        getProductPageUrlImageRequest: ( state ) => {
            state.fetchingProductPageUrlImage = true
            state.getProductPageUrlImageError = null
            state.getProductPageUrlImageResponse = []
        },
        getProductPageUrlImageSuccess: ( state, action: PayloadAction<any> ) => {
            state.fetchingProductPageUrlImage = false
            state.getProductPageUrlImageResponse = action.payload
        },
        getProductPageUrlImageFailure: ( state, action: PayloadAction<any> ) => {
            state.fetchingProductPageUrlImage = false
            state.getProductPageUrlImageError = action.payload
        },
        getElementsImageListRequest: ( state ) => {
            state.fetchingElementsImageList = true
            state.getElementsImageListError = null
        },
        getElementsImageListSuccess: ( state, action: PayloadAction<any> ) => {
            state.fetchingElementsImageList = false
            state.getElementsImageListResponse = action.payload
        },
        getElementsImageListFailure: ( state, action: PayloadAction<any> ) => {
            state.fetchingElementsImageList = false
            state.getElementsImageListError = action.payload
        },
        setGenerateImagePayload: ( state, action: PayloadAction<any> ) => {
            state.generateImagePayload = action.payload
        },
        setSelectedGeneratedImageState: ( state, action: PayloadAction<any> ) => {
            state.selectedGeneratedImageState = action.payload
        }
    },
} )

export const {
  changeTab,
    removeBackgroundRequest,
    removeBavckgroundSuccess,
    removeBackgroundFailure,
    enhanceImageRequest,
    enhanceImageSuccess,
    enhanceImageFailure,
    getThemeImageRequest,
    getThemeImageSuccess,
    getThemeImageFailure,
    generateImageRequest,
    generateImageSuccess,
    generateImageFailure,
    historyGeneratedImagesRequest,
    generateThemeBasedImageRequest,
    generateThemeBasedImageSuccess,
    generateThemeBasedImageFailure,
    generateCampaignBasedImageRequest,
    generateCampaignBasedImageSuccess,
    generateCampaignBasedImageFailure,
    generateVisualConceptImageRequest,
    generateVisualConceptImageSuccess,
    generateVisualConceptImageFailure,
    saveGeneratedImageRequest,
    saveGeneratedImageSuccess,
    saveGeneratedImageFailure,
    saveProductImageRequest,
    saveProductImageSuccess,
    saveProductImageFailure,
    bookmarkImageRequest,
    bookmarkImageSuccess,
    bookmarkImageFailure,
    getBookmarkedImageRequest,
    getBookmarkedImageSuccess,
    getBookmarkedImageFailure,
    getNoOfImageLeftRequest,
    getNoOfImageLeftSuccess,
    getNoOfImageLeftFailure,
    getProductPageUrlImageRequest,
    getProductPageUrlImageSuccess,
    getProductPageUrlImageFailure,
    getElementsImageListRequest,
    getElementsImageListSuccess,
    getElementsImageListFailure,
    setGenerateImagePayload,
  setSelectedGeneratedImageState,
  resizeCanvas
} = generateSlice.actions


export default generateSlice.reducer