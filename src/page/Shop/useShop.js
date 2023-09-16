import { useMainContext } from "@/components/MainContext";
import React, { useEffect, useState } from "react";

const useShop = () => {
  const { isFilter, onToggleFilter, setIsFilter } = useMainContext();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);
  ///// OPTIONS
  const OPTIONS = [
    {
      title: "Produc Categories",
      id: "1",
      quantity: "4",
      subCate: [
        {
          id: "product-1",
          title: "Base categories",
          quantity: "3",
          subCateChild: [
            {
              id: "product-child-1",
              title: "Lorem ipsum dolor sit amet number one",
              quantity: "4",
            },
            {
              id: "product-child-2",
              title: "Lorem ipsum dolor sit amet number two",
              quantity: "10",
            },
          ],
        },
      ],
    },
    {
      title: "Filter Price",
      id: "2",
      type: "range",
    },

    {
      title: "Filter Brand",
      id: "3",
      quantity: "3",
      subCate: [
        { id: "filter-1", title: "Milani", quantity: "6" },
        { id: "filter-2", title: "Laura", quantity: "5" },
        {
          id: "filter-3",
          title: "Vinoble Comics ",
          quantity: "7",
          subCateChild: [
            {
              id: "filter-child-1",
              title: "Lorem ipsum dolor number three",
              quantity: "4",
            },
            {
              id: "filter-child-2",
              title: "Lorem ipsum dolor sit amet four",
              quantity: "10",
            },
          ],
        },
      ],
    },
  ];
  const OPTIONS__MOBILE = [
    {
      title: "Produc Categories",
      id: "1",
      quantity: "4",
      subCate: [
        {
          id: "product-1",
          title: "Base categories",
          quantity: "3",
          subCateChild: [
            {
              id: "product-child-1",
              title: "Lorem ipsum dolor sit amet number one",
              quantity: "4",
            },
            {
              id: "product-child-2",
              title: "Lorem ipsum dolor sit amet number two",
              quantity: "10",
            },
          ],
        },
      ],
    },

    {
      title: "Filter Brand",
      id: "2",
      quantity: "3",
      subCate: [
        { id: "filter-1", title: "Milani", quantity: "6" },
        { id: "filter-2", title: "Laura", quantity: "5" },
        {
          id: "filter-3",
          title: "Vinoble Comics ",
          quantity: "7",
          subCateChild: [
            {
              id: "filter-child-1",
              title: "Lorem ipsum dolor number three",
              quantity: "4",
            },
            {
              id: "filter-child-2",
              title: "Lorem ipsum dolor sit amet four",
              quantity: "10",
            },
          ],
        },
      ],
    },
    {
      title: "Sort",
      id: "1",
      quantity: "4",
      subCate: [
        {
          id: "sort-1",
          title: "Sort By Popularity",
        },
        {
          id: "sort-2",
          title: "Sort By Old",
        },
        {
          id: "sort-3",
          title: "Sort By High Price",
        },
        {
          id: "sort-4",
          title: "Sort By Lower Price",
        },
      ],
    },
  ];
  //// custom input range

  // let rangeMin = document
  //   .querySelector(".range-input .range-min")
  //   ?.getAttribute("value");
  // let rangeMax = document
  //   .querySelector(".range-input .range-max")
  //   ?.getAttribute("value");
  // let valueMax = parseInt(
  //   document.querySelector(".range-max")?.getAttribute("max")
  // );
  // let valueMin = parseInt(
  //   document.querySelector(".range-min")?.getAttribute("min")
  // );
  // let progress = document.querySelector(".slider .progress");
  // let priceGap = 1000;
  // const onChangeMax = (e) => {
  //   setMax(parseInt(e.target.value));
  //   if (parseInt(rangeMax) <= parseInt(rangeMin)) {
  //     console.log("11", 11);
  //     setMax(min);
  //   }
  // };
  // const onChangeMin = (e) => {
  //   setMin(parseInt(e.target.value));
  //   if (parseInt(rangeMin) >= parseInt(rangeMax)) {
  //     console.log("11", 11);
  //     setMin(max);
  //   }
  //   if (Number(rangeMin) <= 0) {
  //     setMin(valueMin);
  //   }
  // };
  // useEffect(() => {
  //   if (progress) {
  //     if (rangeMax && rangeMin) {
  //       progress.style.right = (valueMax - max) / 100 + "%";
  //       progress.style.left = (min - valueMin) / 100 + "%";
  //     }
  //   }
  //   // if (rangeMax && rangeMin) {
  //   //   if (parseInt(rangeMin) >= parseInt(rangeMax) - priceGap) {
  //   //     if (parseInt(rangeMin) <= valueMin) {
  //   //       return setMin(valueMin);
  //   //     }
  //   //     return setMin(parseInt(rangeMax) - priceGap);
  //   //   }
  //   //   if (parseInt(rangeMax) <= parseInt(rangeMin) + priceGap) {
  //   //     if (parseInt(rangeMax) >= valueMax) {
  //   //       return setMax(valueMax);
  //   //       // return setMax(valueMax), setMin(valueMax - priceGap);
  //   //     }
  //   //     return setMax(parseInt(rangeMin) + priceGap);
  //   //   }
  //   // }
  // }, [parseInt(min), parseInt(max)]);

  return {
    // min,
    // max,
    // onChangeMax,
    // onChangeMin,
    OPTIONS,
    isFilter,
    onToggleFilter,
    OPTIONS__MOBILE,
    setIsFilter,
  };
};

export default useShop;
