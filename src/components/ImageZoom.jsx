import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const ImageZoom = ({
  src = "",
  width = "",
  height = "",
  magnifierHeight = 100,
  magnifierWidth = 100,
  zoomLevel = 2,
  classNameImg,
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const onMouseEnter = (e) => {
    // update image size and active magnifier
    //getBoundingClientRect => check width hegiht top left ....
    const { width, height } = e.target.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };
  const onMouseMove = (e) => {
    // update cursor position
    //getBoundingClientRect => check width hegiht top left ....
    const { top, left } = e.target.getBoundingClientRect();
    // calculate cursor position and remove magnifier
    // pageX = scrollX , pageY = scrollY
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };
  const onMouseLeave = () => {
    setShowMagnifier(false);
  };
  return (
    <div
    // className={`relative pb-[100%] h-0 overflow-hidden h-[${height}] w-[${width}] ${
    //   classNameImg ?? ""
    // }`}
    >
      <LazyLoadImage
        wrapperClassName={`block relative pb-[100%] h-0 overflow-hidden h-[${height}] w-[${width}] ${
          classNameImg ?? ""
        }`}
        className="object-cover center-absolute w-full h-full cursor-zoom-in"
        loading="lazy"
        src={src || `assets/img/error.png`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/assets/img/error.png";
        }}
        effect="blur"
        style={{ height: height, width: width }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        alt={"img"}
      />
      {/* <img
        className="object-cover center-absolute w-full h-full cursor-zoom-in"
        src={src || `assets/img/error.png`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/assets/img/error.png";
        }}
        style={{ height: height, width: width }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        alt={"img"}
      /> */}
      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          // prevent magnifier blocks the mousemove event of img
          pointerEvents: "none",
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 5}px`,
          // reduce opacity so you can verify position
          //   opacity: "1",
          border: "1px solid lightgray",
          backgroundColor: "transparent",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
};
export default ImageZoom;
