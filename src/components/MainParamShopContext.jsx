import { _LIMIT } from "@/contants/general";
import queryString from "query-string";
import React, { createContext, useContext, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
const MainParamShopContext = createContext({});
export const MainParamShopProvider = ({ children }) => {
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  const [searchParams, setSearchParams] = useSearchParams();
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
  const onChangeCheckbox = (id) => {
    if (valueChecked?.includes(id)) {
      if (valueChecked.length > 1) {
        let filterCate = valueChecked?.filter((cate) => {
          return cate !== id;
        });
        setValueChecked(filterCate);
        updateQueryString({
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
      if (valueCheckedSex.length > 0) {
        let filterCate = valueCheckedSex?.filter((sexValue) => {
          return sexValue !== value;
        });
        setValueChecked(filterCate);
        updateQueryString({
          sex: filterCate?.toString() || "",
          page: 0,
          limit: _LIMIT,
        });
      } else {
        let filterCate = valueCheckedSex?.filter((sexValue) => {
          return sexValue !== value;
        });
        setValueChecked(filterCate);
        updateQueryString({
          page: 0,
          limit: _LIMIT,
        });
      }
    } else {
      let filterCate = valueCheckedSex?.filter((sexValue) => {
        return sexValue !== value;
      });
      setValueChecked([...filterCate, value]);
      updateQueryString({
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
      }}
    >
      {children}
    </MainParamShopContext.Provider>
  );
};

export const useMainParamContext = () => useContext(MainParamShopContext);
