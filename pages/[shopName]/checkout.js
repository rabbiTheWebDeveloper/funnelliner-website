import React, { useEffect, useState } from "react";

//theme one components
import Header from "../../Components/theme_1/Common/Header";
import MenuBar from "../../Components/theme_1/Common/Menubar";
import Delivary from "../../Components/theme_1/Common/Delivary";
import Footer from "../../Components/theme_1/Common/Footer";
import SocialMedia from "../../Components/theme_1/Common/SocialMedia";
import TinyFooter from "../../Components/theme_1/Common/TinyFooter";
import CheckOut from "../../Components/theme_1/CheckOut/CheckOut";
//theme 2 components
import Menubar2 from "../../Components/ThemePage/ThemeTwo/Common/Menubar";
import Footer2 from "../../Components/ThemePage/ThemeTwo/Common/Footer";
import ShippingAddress2 from "../../Components/ThemePage/ThemeTwo/ShipingAddress/ShippingAddress";
import Cookies from "js-cookie";
import Head from 'next/head'

const checkout = () => {
	const [shopInfo, setShopInfo] =useState();
	useEffect(()=>{
		const shop = {
			theme: localStorage.getItem("theme_id"),
			landing: null,
			shop_id: localStorage.getItem("shop_id"),
		  };
		  setShopInfo(shop)
	},[])
  const shop_meta_title = Cookies.get('shop_title')
  const shop_meta_description = Cookies.get('shop_meta_description')
  const shop_logo = Cookies.get('shop_logo')
  return (
    <>
     <Head>
        <title>{shop_meta_title}</title>
        <meta name="description" content={shop_meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={shop_logo} />
      </Head>

      {shopInfo?.theme == 201  && <CheckOut/>}

      {shopInfo?.theme == 202  && (
        <div className='ThemeTwo'>
          <Menubar2 />
          <ShippingAddress2 />
          <Footer2 />
        </div>
      )}
    </>
  );
};

export default checkout;
