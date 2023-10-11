export const getURL = (file: File) => {
  return URL.createObjectURL(file);
};

export const imgUrlToImgFile = async ( imgSrc: string, name: string ) => {
  const response = await fetch( imgSrc );
  const blob = await response.blob();
  const file = new File( [blob], `${name || "product"}.png`, {
    type: blob.type,
  } );
  return file
};

export const getUrlExtension = ( url: string ) => {
  const extension = url.split( /[#?]/ )[0].split( "." ).pop()?.trim() || "";
  return extension;
};

// name = selectedImage?.product_type || removeBgProductName
export const removeBackground = async ( name: string, selectedImage: any, setSelectedImage: any, selectedFile: any ) => {
  const formData = new FormData();
  formData.append(
    "product_name", selectedImage?.product_type || name );
  if ( selectedImage?.image?.src ) {
    const imgExt = getUrlExtension( selectedImage?.image?.src );
    const response = await fetch( selectedImage?.image?.src );
    const blob = await response.blob();
    const file = new File(
      [blob],
      `${name || "product"}.${imgExt}`,
      {
        type: blob.type,
      }
    );
    setSelectedImage( "" );
    formData.append( "image", file );
  } else if ( selectedFile ) {
    formData.append( "image", selectedFile );
    setSelectedImage( "" );
  }
  window.amplitude.track( "Remove background", {
    email: localStorage.getItem( "email" ) || "",
  } );
  // dispatch(removeBackgroundApi(formData))
};

export const shadowOptions = [
  { label: "Any", value: "any" },
  { label: "Side", value: "side" },
  { label: "Angled", value: "angled" },
  { label: "Reflection", value: "reflection" },
]

export const placementOptions = [
  { label: "Standing", value: "standing" },
  { label: "Flat lay", value: "flat-lay" },
]

export const backdropOptions = [
  { label: "Plain color", value: "plain-color" },
  { label: "Textured surface", value: "textured-surface" },
]