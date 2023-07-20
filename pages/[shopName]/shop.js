import React, { useState, useEffect } from "react";
import Footer from "../../Components/theme_1/Common/Footer";
import Cookies from "js-cookie";
const axios = require("axios");
import { useRouter } from "next/router";
import Head from 'next/head'
import PageLoader from "../../Components/Common/PageLoader/PageLoader";
import Menubar from "../../Components/theme_1/Common/Menubar";
import AllProduct from "../../Components/theme_1/HomePage/AllProduct";

const shop = () => {
  const [loading, setIsLoading] = useState(false)
  const [shopInfo, setShopInfo] = useState({});
  const router = useRouter();
  const { shopName } = router.query;
  const headers = {
    domain: shopName,
  };

  const getShopInfo = async () => {
    setIsLoading(true)
    try {
      const shopInfo = await axios.post(
        `${process.env.API_URL}v1/shops/info`,
        {},
        { headers: headers }
      );
      const shopData = shopInfo?.data?.data;
      localStorage.setItem("shop_id", shopData.shop_id);
      localStorage.setItem("shop_name", shopData.domain);
      localStorage.setItem("theme_id", shopData.theme_id);
      localStorage.setItem("landing", shopData.landing);
      Cookies.set("shop_id", shopData.shop_id);
      setShopInfo(shopData);
      setIsLoading(false)
    } catch (err) {
    }
  };
  useEffect(() => {
    if (shopName !== undefined) {
      getShopInfo();
    }
  }, [shopName]);

  return (
    <>
      <Head>
        <title>{shopInfo?.shop_meta_title}</title>
        <meta name="description" content={shopInfo?.shop_meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={shopInfo?.shop_logo?.name} />
      </Head>
      {
        loading && <PageLoader />
      }
      {shopInfo?.theme_id == 201 && (
        <div>  
          <Menubar shopInfo={shopInfo}/>
          <AllProduct shopInfo={shopInfo} />
          <Footer shopInfo={shopInfo}></Footer>
        </div>
      )}

    </>
  );
};

export default shop;
