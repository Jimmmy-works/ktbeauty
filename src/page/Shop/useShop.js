import React, { useEffect, useState } from "react";

const useShop = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  //// custom input range
  let rangeMin = document
    .querySelector(".range-input .range-min")
    ?.getAttribute("value");
  let rangeMax = document
    .querySelector(".range-input .range-max")
    ?.getAttribute("value");
  let valueMax = parseInt(
    document.querySelector(".range-max")?.getAttribute("max")
  );
  let valueMin = parseInt(
    document.querySelector(".range-min")?.getAttribute("min")
  );
  let progress = document.querySelector(".slider .progress");
  let priceGap = 1000;
  const onChangeMax = (e) => {
    setMax(parseInt(e.target.value));
  };
  const onChangeMin = (e) => {
    setMin(parseInt(e.target.value));
  };
  useEffect(() => {
    if (progress) {
      if (rangeMax && rangeMin) {
        progress.style.right = (valueMax - max) / 100 + "%";

        progress.style.left = (min - valueMin) / 100 + "%";
      }
    }
    if (rangeMax && rangeMin) {
      if (parseInt(rangeMin) >= parseInt(rangeMax) - priceGap) {
        if (parseInt(rangeMin) <= valueMin) {
          return setMin(valueMin);
        }
        setMin(parseInt(rangeMax) - priceGap);
      }
      if (parseInt(rangeMax) <= parseInt(rangeMin) + priceGap) {
        console.log("1111", 1111);
        if (parseInt(rangeMax) >= valueMax) {
          console.log("22222", 22222);
          return setMax(valueMax), setMin(valueMax - priceGap);
        }
        setMax(parseInt(rangeMin) + priceGap);
      }
    }
  }, [parseInt(min), parseInt(max)]);
  const inputRangeProps = {
    min,
    max,
    onChangeMax,
    onChangeMin,
  };
  return { inputRangeProps };
};

export default useShop;
