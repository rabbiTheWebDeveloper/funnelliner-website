
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Cookies from "js-cookie";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Footer from "../../../Components/theme_1/Common/Footer";
import Header from "../../../Components/theme_1/Common/Header";
import SocialMedia from "../../../Components/theme_1/Common/SocialMedia";
import TinyFooter from "../../../Components/theme_1/Common/TinyFooter";
import Landing_14 from "../../../Components/NewLandingPage/LandingPages/landing-14";
import Landing_15 from "../../../Components/NewLandingPage/LandingPages/landing-15";
import Landing_16 from "../../../Components/NewLandingPage/LandingPages/landing-16";
import Landing_17 from "../../../Components/NewLandingPage/LandingPages/landing-17";
import Landing_18 from "../../../Components/NewLandingPage/LandingPages/landing-18";
import Landing_19 from "../../../Components/NewLandingPage/LandingPages/landing-19";
import Landing_20 from "../../../Components/NewLandingPage/LandingPages/landing-20";
import Landing_23 from "../../../Components/NewLandingPage/LandingPages/landing-23";
import Landing_24 from "../../../Components/NewLandingPage/LandingPages/landing-24";
import Landing_25 from "../../../Components/NewLandingPage/LandingPages/landing-25";
import Landing_26 from "../../../Components/NewLandingPage/LandingPages/landing-26";
import Landing_27 from "../../../Components/NewLandingPage/LandingPages/landing-27";
import Landing_21 from "../../../Components/NewLandingPage/LandingPages/landing-21";
import Landing_22 from "../../../Components/NewLandingPage/LandingPages/landing-22";
import Landing_13 from "../../../Components/NewLandingPage/LandingPages/landing-13";
import Landing_12 from "../../../Components/NewLandingPage/LandingPages/landing-12";
import Landing_11 from "../../../Components/NewLandingPage/LandingPages/landing-11";
import Landing_10 from "../../../Components/NewLandingPage/LandingPages/landing-10";
import Landing_9 from "../../../Components/NewLandingPage/LandingPages/landing-9";
import Landing_8 from "../../../Components/NewLandingPage/LandingPages/landing-8";
import Landing_7 from "../../../Components/NewLandingPage/LandingPages/landing-7";
import Landing_6 from "../../../Components/NewLandingPage/LandingPages/landing-6";
import Landing_5 from "../../../Components/NewLandingPage/LandingPages/landing-5";
import Landing_4 from "../../../Components/NewLandingPage/LandingPages/landing-4";
import Landing_3 from "../../../Components/NewLandingPage/LandingPages/landing-3";
import Landing_1 from "../../../Components/NewLandingPage/LandingPages/landing-1";
import Landing_2 from "../../../Components/NewLandingPage/LandingPages/landing-2";
import PageLoader from "../../../Components/Common/PageLoader/PageLoader";

const Page = () => {
  const router = useRouter();
  const shopDomainName = router.query.shopName;
  const [loading, setIsLoading]=useState(false)
  const { page } = router.query;
  const [shop_info, setShopInfo]=useState({})
  const [pageInfo, setPageInfo] = useState({});
  const [shop_meta_title, setShop_meta_title] = useState("");
  const [shop_meta_description, setShop_meta_description] = useState("");
  const [shop_logo, setShop_logo] = useState("");
  const getPageInfo = async (page) => {
    setIsLoading(true)
    const pageInformation = await axios.get(
      `${process.env.API_URL}v1/page/${page}`
    );
    setPageInfo(pageInformation.data.data);
    setIsLoading(false)
  };

  const headers = {
    domain: shopDomainName,
  };

  const getShopInfo = async () => {
    try {
      const shopInfo = await axios.post(
        `${process.env.API_URL}v1/shops/info`,
        {},
        { headers: headers }
      );
      const shopData = shopInfo?.data?.data;
      setShopInfo(shopData)
      localStorage.setItem("shop_id", shopData.shop_id);
      localStorage.setItem("shop_name", shopData.domain);
      localStorage.setItem("theme_id", shopData.theme_id);
      localStorage.setItem("landing", shopData.landing);
      Cookies.set("shop_id", shopData.shop_id);
      Cookies.set("domain", shopData.domain);
      Cookies.set("phone", shopData.phone);
      Cookies.set("shop_title", shopData.shop_meta_title);
      Cookies.set("shop_meta_description", shopData.shop_meta_description);
      Cookies.set("shop_logo", shopData?.shop_logo?.name);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (shopDomainName) {
      getShopInfo();
    }
  }, [shopDomainName]);

  useEffect(() => {
    // if (shopDomainName) {
    //   getShopInfo();
    // }
    if (page !== undefined) {
      getPageInfo(page);
    }
  }, [page]);
  useEffect(() => {
    setShop_meta_title(Cookies.get('shop_title'))
    setShop_meta_description(Cookies.get('shop_meta_description'))
    setShop_logo(Cookies.get('shop_logo'))
    setTimeout(() => {
      setShop_meta_title(Cookies.get('shop_title'))
      setShop_meta_description(Cookies.get('shop_meta_description'))
      setShop_logo(Cookies.get('shop_logo'))
    }, 1000);
  }, [shop_meta_title, shop_meta_description, shop_logo])

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

  return pageInfo?.theme === null ? (
    <>
      <Header />
      <section className='MiddleBanner'>
        <Container>
          <div className='overlay_text'>
            <h1>{pageInfo?.title}</h1>
            <p>{pageInfo?.page_content}</p>
          </div>
        </Container>
      </section>
      <Footer />
      <SocialMedia />
      <TinyFooter />
    </>
  ) : (
    <>
      <Head>
        <title>{shop_meta_title}</title>
        <meta name='description' content={shop_meta_description} />
        <meta name='viewport' content='width=device-width, user-scalable=no' />
        <link rel='icon' href={shop_logo} />
      </Head>
   
      {/* gift valy  */}
      {loading && <PageLoader/>}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 1 && <Landing_1 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* ProbashiPackage -2 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 2 && <Landing_2 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* mango -3 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 3 && <Landing_3 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* green tea-4  */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 4 && <Landing_4 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* bike store -5 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 5 && <Landing_5 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* dron -6 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 6 && <Landing_6 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* hafsa  -7*/}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 7 && <Landing_7 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* mani bag -8  */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 8 && <Landing_8 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* sarii -9 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 9 && <Landing_9 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* hunny -10 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 10 && <Landing_10 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* Sundorbon Hunny honney -11  */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 11 && <Landing_11 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* hunny nut -12 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 12 && <Landing_12 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* hunny nut B -13 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 13 && <Landing_13 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* //mosla-14 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 14 && <Landing_14 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* /T-Price  -15*/}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 15 && <Landing_15 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* //jenish pant -16 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 16 && <Landing_16 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* //shoes boys -17 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 17 && <Landing_17 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* //ladish bag -18  */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 18 && <Landing_18 shop_info={shop_info} pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* // cream -19  */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 19 && <Landing_19 shop_info={shop_info} pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* landing 20 watch*/}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 20 && <Landing_20 shop_info={shop_info}  pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* daymond -21  */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 21 && <Landing_21 shop_info={shop_info} pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* sarisa oil -22 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 22 && <Landing_22 shop_info={shop_info} pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* smart watch -23 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 23 && <Landing_23 shop_info={shop_info} pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* panjabi -24 * */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 24 && <Landing_24 shop_info={shop_info} pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* kajur -25 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 25 && <Landing_25 shop_info={shop_info} pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* food submimednt -26 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 26 && <Landing_26 shop_info={shop_info} pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}
      {/* lunge -27 */}
      {pageInfo.theme !== null && pageInfo?.theme?.name == 27 && <Landing_27 shop_info={shop_info} pageInfo={pageInfo} product={pageInfo.product} visitorID={visitorID} />}

    </>
  );
};
export default Page;
