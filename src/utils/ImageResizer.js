import Resizer from "react-image-file-resizer";

const ImageResizer = (files) => {
  // const [imgs, setImgs] = useState([]);
  let fileInput = false;
  if (files) {
    console.log(files);
    fileInput = true;
  }
  if (fileInput) {
    try {
      let images = [];
      for (let index = 0; index < files.length; index++) {
        console.log("222", 222);
        Resizer.imageFileResizer(
          files[index],
          300,
          300,
          "JPEG",
          100,
          0,
          (blob) => {
            console.log("blob", blob);
            images?.push(URL.createObjectURL(blob));
          },
          // "blob",
          "base64",
          200,
          200
        );
      }
      if (images) return images;
    } catch (err) {
      console.log(err);
    }
  }
};

export default ImageResizer;
