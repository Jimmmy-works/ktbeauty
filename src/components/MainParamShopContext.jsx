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

  const onChangeCheckbox = (id) => {
    if (valueChecked?.includes(id)) {
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
  return (
    <MainParamShopContext.Provider
      value={{
        valueChecked,
        renderChecked,
        onChangeCheckbox,
        onChangeRenderCheckbox,
        setValueChecked,
        setRenderChecked,
      }}
    >
      {children}
    </MainParamShopContext.Provider>
  );
};

export const useMainParamContext = () => useContext(MainParamShopContext);
