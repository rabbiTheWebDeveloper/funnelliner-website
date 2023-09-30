
import React from 'react'
import AboutUs from '../../Components/theme_1/Common/AboutUs'
import Menubar from '../../Components/theme_1/Common/Menubar'
import Footer from '../../Components/theme_1/Common/Footer'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import PageLoader from '../../Components/Common/PageLoader/PageLoader'

const index = () => {
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
          `${process.env.API_URL}/shops/info`,
          {},
          { headers: headers }
        );
        const shopData = shopInfo?.data?.data;
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

    <div className='Multipage__1'>
        {
            loading && <PageLoader/>
        }
        {shopInfo?.theme_id == 201 && <>
        <Menubar shopInfo={shopInfo}/>
        <AboutUs shopInfo={shopInfo}/>
        <Footer shopInfo={shopInfo}/>
      </>}
    </div>

  )

}

export default index