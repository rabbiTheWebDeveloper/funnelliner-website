import React, { useState, useEffect } from "react";
//theme_1 components
import MenuBar from "../../../Components/theme_1/Common/Menubar";
import Footer from "../../../Components/theme_1/Common/Footer";
import ProductDescription from "../../../Components/theme_1/ProductDetails/ProductDescription";


const axios = require("axios");
import { useRouter } from "next/router";
import PageLoader from "../../../Components/Common/PageLoader/PageLoader";
const index = () => {
  const [loading, setLoading] = useState();
  const [shopInfo, setShopInfo] = useState()
  const [singleProduct, setSingleProduct] = useState({});
  const router = useRouter();
  const productID = router.query.productID;

  const { shopName } = router.query;
  const headers = {
    domain: shopName,
  };
  const getShopInfo = async () => {
    setLoading(true)
    try {
      const shopInfo = await axios.post(
        `${process.env.API_URL}v1/shops/info`,
        {},
        { headers: headers }
      );
      const shopData = shopInfo?.data?.data;
      setShopInfo(shopData);
      setLoading(false)
    } catch (err) {
      console.log("err", err)
    }
  };
  useEffect(() => {
    if (shopName !== undefined) {
      getShopInfo();
    }
  }, [shopName]);


  const handleFetchProductById = async (shop_id) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}v1/customer/products/${productID}`,
        {
          method: "get",
          headers: {
            "shop-id": shop_id,
          },
        }
      );
      const data = await response?.json();
      setSingleProduct(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (productID !== undefined) {
      handleFetchProductById(localStorage.getItem("shop_id"));
    }
  }, [productID]);


  return (
    <>
      {
        loading && <PageLoader/>
      }
      {shopInfo?.theme_id == 201 && (
        <>
          <main>
            <MenuBar shopInfo={shopInfo}/>
            <ProductDescription data={singleProduct}></ProductDescription>
            <Footer shopInfo={shopInfo}></Footer>
          </main>
        </>
      )}
     
    </>
  );
};

export default index;


