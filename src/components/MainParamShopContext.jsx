import { _LIMIT } from "@/contants/general";
import queryString from "query-string";
import React, { createContext, useContext, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
const MainParamShopContext = createContext({});
export const MainParamShopProvider = ({ children }) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryObject = queryString.parse(search);
  const updateQueryString = (queryObject) => {
    const newQuerryString = queryString.stringify({
      ...queryObject,
    });
    setSearchParams(new URLSearchParams(newQuerryString));
  };
  const [valueChecked, setValueChecked] = useState([]);
  const [renderChecked, setRenderChecked] = useState([]);
  const [valueCheckedSex, setValueCheckedSex] = useState([]);
  const [renderCheckedSex, setRenderCheckedSex] = useState([]);
  const [valueCheckedLifeStyle, setValueCheckedLifeStyle] = useState([]);
  const [renderCheckedLifeStyle, setRenderCheckedLifeStyle] = useState([]);
  const [valueCheckedSkinType, setValueCheckedSkinType] = useState([]);
  const [renderCheckedSkinType, setRenderCheckedSkinType] = useState([]);
  const onChangeCheckbox = (id) => {
    if (valueChecked?.includes(id)) {
      if (valueChecked.length > 1) {
        let filterCate = valueChecked?.filter((cate) => {
          return cate !== id;
        });
        setValueChecked(filterCate);
        updateQueryString({
          ...queryObject,
          categories: filterCate?.toString() || "",
          page: 0,
          limit: _LIMIT,
        });
      } else {
        let filterCate = valueChecked?.filter((cate) => {
          return cate !== id;
        });
        setValueChecked(filterCate);
        updateQueryString({
          page: 0,
          limit: _LIMIT,
        });
      }
    } else {
      let filterCate = valueChecked?.filter((cate) => {
        return cate !== id;
      });
      setValueChecked([...filterCate, id]);
      updateQueryString({
        ...queryObject,
        categories: [...filterCate, id]?.toString() || "",
        page: 0,
        limit: _LIMIT,
      });
    }
  };
  const onChangeRenderCheckbox = (selected) => {
    if (valueChecked?.includes(selected?._id)) {
      let filterRenderCate = renderChecked?.filter((cate) => {
        return cate?._id !== selected?._id;
      });
      setRenderChecked(filterRenderCate);
    } else {
      let filterRenderCate = renderChecked?.filter((cate) => {
        return cate?._id !== selected?._id;
      });
      setRenderChecked([...filterRenderCate, selected]);
    }
  };
  const onChangeCheckboxSex = (value) => {
    if (valueCheckedSex?.includes(value)) {
      if (valueCheckedSex.length > 1) {
        let filterCate = valueCheckedSex?.filter((sexValue) => {
          return sexValue !== value;
        });
        setValueCheckedSex(filterCate);
        updateQueryString({
          ...queryObject,
          sex: filterCate?.toString() || "",
          page: 0,
          limit: _LIMIT,
        });
      } else {
        let filterCate = valueCheckedSex?.filter((sexValue) => {
          return sexValue !== value;
        });
        setValueCheckedSex(filterCate);
        updateQueryString({
          page: 0,
          limit: _LIMIT,
        });
      }
    } else {
      let filterCate = valueCheckedSex?.filter((sexValue) => {
        return sexValue !== value;
      });
      setValueCheckedSex([...filterCate, value]);
      updateQueryString({
        ...queryObject,
        sex: [...filterCate, value]?.toString() || "",
        page: 0,
        limit: _LIMIT,
      });
    }
  };
  const onChangeRenderCheckboxSex = (selected) => {
    if (valueCheckedSex?.includes(selected?.value)) {
      let filterRenderCate = renderCheckedSex?.filter((sexValue) => {
        return sexValue?.value !== selected?.value;
      });
      setRenderCheckedSex(filterRenderCate);
    } else {
      let filterRenderCate = renderCheckedSex?.filter((sexValue) => {
        return sexValue?.value !== selected?.value;
      });
      setRenderCheckedSex([...filterRenderCate, selected]);
    }
  };
  const onChangeCheckboxLifeStyle = (value) => {
    if (valueCheckedLifeStyle?.includes(value)) {
      if (valueCheckedLifeStyle.length > 1) {
        let filterCate = valueCheckedLifeStyle?.filter((lifeStyleValue) => {
          return lifeStyleValue !== value;
        });
        setValueCheckedLifeStyle(filterCate);
        updateQueryString({
          ...queryObject,
          hobby: filterCate?.toString() || "",
          page: 0,
          limit: _LIMIT,
        });
      } else {
        let filterCate = valueCheckedLifeStyle?.filter((lifeStyleValue) => {
          return lifeStyleValue !== value;
        });
        setValueCheckedLifeStyle(filterCate);
        updateQueryString({
          page: 0,
          limit: _LIMIT,
        });
      }
    } else {
      let filterCate = valueCheckedLifeStyle?.filter((lifeStyleValue) => {
        return lifeStyleValue !== value;
      });
      setValueCheckedLifeStyle([...filterCate, value]);
      updateQueryString({
        ...queryObject,
        hobby: [...filterCate, value]?.toString() || "",
        page: 0,
        limit: _LIMIT,
      });
    }
  };
  const onChangeRenderCheckboxLifeStyle = (selected) => {
    if (valueCheckedLifeStyle?.includes(selected?.value)) {
      let filterRenderCate = renderCheckedLifeStyle?.filter(
        (liftStyleValue) => {
          return liftStyleValue?.value !== selected?.value;
        }
      );
      setRenderCheckedLifeStyle(filterRenderCate);
    } else {
      let filterRenderCate = renderCheckedLifeStyle?.filter(
        (liftStyleValue) => {
          return liftStyleValue?.value !== selected?.value;
        }
      );
      setRenderCheckedLifeStyle([...filterRenderCate, selected]);
    }
  };
  const onChangeCheckboxSkinType = (value) => {
    if (valueCheckedSkinType?.includes(value)) {
      if (valueCheckedSkinType.length > 1) {
        let filterCate = valueCheckedSkinType?.filter((skinType) => {
          return skinType !== value;
        });
        setValueCheckedSkinType(filterCate);
        updateQueryString({
          ...queryObject,
          skinType: filterCate?.toString() || "",
          page: 0,
          limit: _LIMIT,
        });
      } else {
        let filterCate = valueCheckedSkinType?.filter((skinType) => {
          return skinType !== value;
        });
        setValueCheckedSkinType(filterCate);
        updateQueryString({
          page: 0,
          limit: _LIMIT,
        });
      }
    } else {
      let filterCate = valueCheckedSkinType?.filter((skinType) => {
        return skinType !== value;
      });
      setValueCheckedSkinType([...filterCate, value]);
      updateQueryString({
        ...queryObject,
        skinType: [...filterCate, value]?.toString() || "",
        page: 0,
        limit: _LIMIT,
      });
    }
  };
  const onChangeRenderCheckboxSkinType = (selected) => {
    if (valueCheckedSkinType?.includes(selected?.value)) {
      let filterRenderCate = renderCheckedSkinType?.filter((skinTypeValue) => {
        return skinTypeValue?.value !== selected?.value;
      });
      setRenderCheckedSkinType(filterRenderCate);
    } else {
      let filterRenderCate = renderCheckedSkinType?.filter((skinTypeValue) => {
        return skinTypeValue?.value !== selected?.value;
      });
      setRenderCheckedSkinType([...filterRenderCate, selected]);
    }
  };
  return (
    <MainParamShopContext.Provider
      value={{
        valueChecked,
        renderChecked,
        onChangeCheckbox,
        onChangeRenderCheckbox,
        setValueChecked,
        setRenderChecked,
        /////
        valueCheckedSex,
        renderCheckedSex,
        setValueCheckedSex,
        setRenderCheckedSex,
        onChangeCheckboxSex,
        onChangeRenderCheckboxSex,
        /////
        valueCheckedLifeStyle,
        renderCheckedLifeStyle,
        setValueCheckedLifeStyle,
        setRenderCheckedLifeStyle,
        onChangeCheckboxLifeStyle,
        onChangeRenderCheckboxLifeStyle,
        /////
        valueCheckedSkinType,
        renderCheckedSkinType,
        setValueCheckedSkinType,
        setRenderCheckedSkinType,
        onChangeCheckboxSkinType,
        onChangeRenderCheckboxSkinType,
      }}
    >
      {children}
    </MainParamShopContext.Provider>
  );
};

export const useMainParamContext = () => useContext(MainParamShopContext);
