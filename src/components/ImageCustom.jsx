import React from "react";
const ImageCustom = ({ path, placeholder, loadError, ...props }) => {
  const [img, initImg] = React.useState(placeholder || path);
  const onLoad = React.useCallback(() => {
    initImg(path);
  }, [path]);
  const onError = React.useCallback(() => {
    initImg(loadError || placeholder);
  }, [loadError, placeholder]);
  React.useEffect(() => {
    const imageObjt = new Image();
    imageObjt.src = path;
    imageObjt.addEventListener("load", onLoad);
    imageObjt.addEventListener("error", onError);
    return () => {
      imageObjt.removeEventListener("load", onLoad);
      imageObjt.removeEventListener("error", onError);
    };
  }, [path, onLoad, onError]);
  return <img {...props} alt={img} src={img} />;
};
export default ImageCustom;
