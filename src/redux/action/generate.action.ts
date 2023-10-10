import {
  bookmarkImageFailure,
  bookmarkImageRequest,
  bookmarkImageSuccess,
  enhanceImageFailure,
  enhanceImageRequest,
  enhanceImageSuccess,
  generateImageFailure,
  generateImageRequest,
  generateImageSuccess,
  getNoOfImageLeftFailure,
  getNoOfImageLeftRequest,
  getNoOfImageLeftSuccess,
  getThemeImageFailure,
  getThemeImageRequest,
  //   getThemeImageRequest,
  getThemeImageSuccess,
  historyGeneratedImagesRequest,
} from "redux/reducers/generate.reducer";
import makeAIAPIAuthorizedRequest from "service/api/makeAIAPIAuthorizedRequest";
import store from "redux/store";

const dispatch = store.dispatch;
const getState = store.getState;

export const getNoOfImageLeft = async (email: string) => {
  try {
    dispatch(getNoOfImageLeftRequest());
    let url =
      process.env.REACT_APP_AI_API_URL + `/api/get_number_of_images_left/`;
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: { email: email },
    });
    const res = response.data;
    dispatch(getNoOfImageLeftSuccess(res));
  } catch (error: any) {
    dispatch(getNoOfImageLeftFailure(error.message));
  }
};
export const getThemeImage = async (theme: string) => {
  let result = "";
  try {
    let url = process.env.REACT_APP_AI_API_URL + `/api/theme_image/${theme}`;
    const response = await makeAIAPIAuthorizedRequest({ url, method: "GET" });

    const res = response.data;
    result = res && res.length > 0 && res[0];
  } catch (error) {
    result = "";
  }
  return result;
};

export const getThemeImageListsApi = async () => {
  try {
    dispatch(getThemeImageRequest());
    let url = process.env.REACT_APP_AI_API_URL + "/api/themes";
    const response = await makeAIAPIAuthorizedRequest({ url, method: "GET" });
    const res = response.data;
    if (res && res.length) {
      let themeImageList: any[] = [];
      await Promise.all(
        res.map(async (theme: any) => {
          let themeImage = await getThemeImage(theme);
          themeImageList = [
            ...themeImageList,
            { theme: theme, image: themeImage },
          ];
        })
      );
      themeImageList.sort((a, b) => {
        let fa = a.theme.toLowerCase(),
          fb = b.theme.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      dispatch(getThemeImageSuccess(themeImageList));
    }
  } catch (error: any) {
    console.log(error.message);
    dispatch(getThemeImageFailure(error.message));
  }
};

export const generateImageCampaignBasedApi = async (formData: any) => {
  try {
    dispatch(generateImageRequest());
    let url =
      process.env.REACT_APP_AI_API_URL + "/api/generate_image_target_audience";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    if (response.status === 200) {
      let state = getState();
      let generatedImageState = state.generate["generateImageResponse"];
      if (generatedImageState && generatedImageState?.length > 0) {
        let historyGeneratedImageState =
          state.generate["historyGeneratedImages"];
        historyGeneratedImageState = [
          ...generatedImageState,
          ...historyGeneratedImageState,
        ];
        dispatch(historyGeneratedImagesRequest(historyGeneratedImageState));
      }
      dispatch(generateImageSuccess(res));
      getNoOfImageLeft("js903783@gmail.com");
    }
  } catch (error: any) {
    let errorMsg = error?.response?.data?.message || "";
    dispatch(generateImageFailure(errorMsg));
  }
};

export const generateImageThemeBasedApi = async (formData: any) => {
  try {
    dispatch(generateImageRequest());
    let url = process.env.REACT_APP_AI_API_URL + "/api/generate_image_theme";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    if (response.status === 200) {
      let state = getState();
      let generatedImageState = state.generate["generateImageResponse"];
      if (generatedImageState && generatedImageState?.length > 0) {
        let historyGeneratedImageState =
          state.generate["historyGeneratedImages"];
        historyGeneratedImageState = [
          ...generatedImageState,
          ...historyGeneratedImageState,
        ];
        dispatch(historyGeneratedImagesRequest(historyGeneratedImageState));
      }
      dispatch(generateImageSuccess(res));
      getNoOfImageLeft("js903783@gmail.com");
    }
  } catch (error: any) {
    let errorMsg = error?.response?.data?.message || "";
    dispatch(generateImageFailure(errorMsg));
  }
};

export const generateImageCustomStudioApi = async (formData: any) => {
  try {
    dispatch(generateImageRequest());
    let url =
      process.env.REACT_APP_AI_API_URL + "/api/generate_image_custom_studio";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    if (response.status === 200) {
      let state = getState();
      let generatedImageState = state.generate["generateImageResponse"];
      if (generatedImageState && generatedImageState?.length > 0) {
        let historyGeneratedImageState =
          state.generate["historyGeneratedImages"];
        historyGeneratedImageState = [
          ...generatedImageState,
          ...historyGeneratedImageState,
        ];
        dispatch(historyGeneratedImagesRequest(historyGeneratedImageState));
      }
      dispatch(generateImageSuccess(res));
      getNoOfImageLeft("js903783@gmail.com");
    }
  } catch (error: any) {
    let errorMsg = error?.response?.data?.message || "";
    dispatch(generateImageFailure(errorMsg));
  }
};

export const generateImageVisualConceptApi = async (formData: any) => {
  try {
    dispatch(generateImageRequest());
    let url =
      process.env.REACT_APP_AI_API_URL + "/api/generate_image_visual_concept";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    if (response.status === 200) {
      let state = getState();
      let generatedImageState = state.generate["generateImageResponse"];
      if (generatedImageState && generatedImageState?.length > 0) {
        let historyGeneratedImageState =
          state.generate["historyGeneratedImages"];
        historyGeneratedImageState = [
          ...generatedImageState,
          ...historyGeneratedImageState,
        ];
        dispatch(historyGeneratedImagesRequest(historyGeneratedImageState));
      }
      dispatch(generateImageSuccess(res));
      getNoOfImageLeft("js903783@gmail.com");
    }
  } catch (error: any) {
    let errorMsg = error?.response?.data?.message || "";
    dispatch(generateImageFailure(errorMsg));
  }
};

export const enhanceImageApi = async (
  formData: any,
  arrIndex: any,
  imageListState: any
) => {
  try {
    dispatch(enhanceImageRequest());
    let url = process.env.REACT_APP_AI_API_URL + "/api/enhance_image";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });
    const res = response.data;
    dispatch(enhanceImageSuccess(res));
    if (response.status === 200) {
      let state = getState();
      let previousState = state.generate[imageListState];
      previousState[arrIndex] = {
        ...previousState[arrIndex],
        image: res,
        enhancedImage: true,
      };
      let stateFunction: any = generateImageSuccess;
      if (imageListState === "historyGeneratedImages") {
        stateFunction = historyGeneratedImagesRequest;
      }
      dispatch(stateFunction(previousState));
    }
  } catch (error: any) {
    dispatch(enhanceImageFailure(error.message));
  }
};

export const bookmarkImage = async (
  formData: any,
  arrIndex: number,
  imageListState: string
) => {
  try {
    const generateProductState = getState().generate;
    const historyGeneratedImageState =
      generateProductState?.historyGeneratedImages || [];
    dispatch(bookmarkImageRequest());
    let url = process.env.REACT_APP_AI_API_URL + "/api/bookmark_image";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await makeAIAPIAuthorizedRequest({
      url,
      method: "POST",
      data: formData,
      headers,
    });

    const res = response.data;
    dispatch(bookmarkImageSuccess(res));
    if (response.status === 200) {
      let state = getState();
      let previousState = state.generate[imageListState];
      previousState[arrIndex] = {
        ...previousState[arrIndex],
        saved: true,
      };
      let stateFunction = generateImageSuccess;
      if (imageListState === "historyGeneratedImages") {
        stateFunction = historyGeneratedImageState;
      }
      dispatch(stateFunction(previousState));
    }
  } catch (error: any) {
    dispatch(bookmarkImageFailure(error.message));
  }
};
