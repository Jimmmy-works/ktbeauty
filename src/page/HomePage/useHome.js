import { CATEGORIES_OPTIONS, FEATURED_OPTIONS } from "@/contants/general";
import React, { useEffect, useState } from "react";

const useHome = () => {
  /// categoryProps
  const [categoryTab, setCategoryTab] = useState(CATEGORIES_OPTIONS.LIPSTICK);
  const onChangeCategoryTab = (tab) => {
    setCategoryTab(tab);
  };
  /// featuredProps
  const [featuerdTab, setFeaturedTab] = useState(FEATURED_OPTIONS.FEATURED);
  const onChangeFeaturedTab = (tab) => {
    setFeaturedTab(tab);
  };
  /// Marketing
  const [currentTime, setCurrentTime] = useState(Date.now());
  const targetTime = new Date("2023-10-11").getTime();
  const timeBetween = targetTime - currentTime;
  const seconds = Math.floor((timeBetween / 1000) % 60);
  const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
  const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(timeBetween / (1000 * 60 * 60 * 24 * 7));
  useEffect(() => {
    const countDown = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(countDown);
  }, []);
  //////////////////////////  ////////////////////////////////////////
  const marketingProps = { seconds, minutes, hours, days, weeks };
  const featuredProps = { onChangeFeaturedTab, featuerdTab };
  const categoryProps = { onChangeCategoryTab, categoryTab };
  return { featuredProps, categoryProps, marketingProps };
};

export default useHome;
