import React from "react";
//theme_1 components
import MenuBar from "../../../Components/theme_1/Common/Menubar";
import Footer from "../../../Components/theme_1/Common/Footer";
import ProductDescription from "../../../Components/theme_1/ProductDetails/ProductDescription";
import Head from 'next/head'
const axios = require("axios");
const index = ({ shopInfo, product, pageUrl }) => {
  return (
    <>
      <Head>
        <title>{product?.product_name}</title>
        <meta property="og:title" content={product?.product_name} />
        <meta property="og:image" content={product?.main_image} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="product" />
      </Head>

      {shopInfo?.theme_id === 201 || shopInfo?.theme_id === "201" && (
        <main>
          <MenuBar shopInfo={shopInfo} />
          <ProductDescription data={product} pageUrl={pageUrl} />
          <Footer shopInfo={shopInfo} />
        </main>
      )}

    </>
  );
};

export async function getServerSideProps(context) {
  const pageUrl = context.req.headers.referer
  try {
    const shopInfoResponse = await axios.post(`${process.env.API_URL}/shops/info`, {},
      {
        headers: { domain: context.params.shopName }
      })
    const productInfo = await axios.get(`${process.env.API_URL}/customer/products/${context.query.id}`,
      {
        headers: { "shop-id": shopInfoResponse?.data?.data?.shop_id }
      })
    return {
      props: {
        shopInfo: shopInfoResponse?.data?.data,
        product: productInfo?.data?.data,
        pageUrl: pageUrl,
      }
    }
  } catch (error) {
    return {
      props: {
        shopInfo: null,
        product: null,
        pageUrl: null,
      },
    }
  }
}

export default index;


