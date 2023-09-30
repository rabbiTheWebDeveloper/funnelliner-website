import Head from "next/head";
// Common CSS
import Footer from "./Common/Footer";
import Banner from "./HomePage/Banner";
import Category from "./HomePage/Category";
import MiddleBanner from "./HomePage/MiddleBanner";
import AllProduct from "./HomePage/AllProduct";
import Menubar from "./Common/Menubar";

const index = ({ shopInfo }) => {
  return (
    <div className="Theme__1">
      <Head>
        <title>{shopInfo?.shop_meta_title}</title>
        <meta name="description" content={shopInfo?.shop_meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={shopInfo?.shop_logo?.name} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <Menubar shopInfo={shopInfo} />
        <Banner shopInfo={shopInfo} />
        <Category shopInfo={shopInfo} />
        <MiddleBanner shopInfo={shopInfo} />
        <AllProduct shopInfo={shopInfo} />
        <Footer shopInfo={shopInfo} />
      </main>
      <footer></footer>
    </div>
  );
};

export default index;
