export const getURL = (file: File) => {
  return URL.createObjectURL(file);
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