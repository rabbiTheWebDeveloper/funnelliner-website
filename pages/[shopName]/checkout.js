import React, { useEffect, useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

//theme one components
import CheckOut from "../../Components/theme_1/CheckOut/CheckOut";
import Menubar from "../../Components/theme_1/Common/Menubar";

import Head from 'next/head'
import { useRouter } from "next/router";
import axios from "axios";
import PageLoader from "../../Components/Common/PageLoader/PageLoader";

const checkout = () => {
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
      setShopInfo(shopData);
      setIsLoading(false)
    } catch (err) {
      console.log("err", err)
    }
  };
  useEffect(() => {
    if (shopName !== undefined) {
      getShopInfo();
    }
  }, [shopName]);

  //visitor id generate
  const [visitorID, setVisitorID] = useState('');
  const setFp = async () => {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    setVisitorID(visitorId);
  };
  useEffect(() => {
    setFp();
  }, []);

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
      {shopInfo?.theme_id == 201 && <>
        <Menubar shopInfo={shopInfo}/>
        <CheckOut shopInfo={shopInfo} visitorID={visitorID} />
      </>}

    </>
  );
};

export default checkout;
