import Head from "next/head";
import OrderSuccessfull from "../../../Components/theme_1/OrderSuccessfull/OrderSuccessfull";
import Cookies from "js-cookie";

const index = () => {
  const shop_meta_title = Cookies.get('shop_title')
  const shop_meta_description = Cookies.get('shop_meta_description')
  const shop_logo = Cookies.get('shop_logo')

  return (
    <>
      <Head>
        <title>{shop_meta_title}</title>
        <meta name='description' content={shop_meta_description} />
        <link rel='icon' href='frontend_asset/images/Logo.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link rel="icon" href={shop_logo} />
        {shop_meta_description}
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap'
          rel='stylesheet'
        />
      </Head>

      <main>
        <OrderSuccessfull></OrderSuccessfull>
      </main>

    
    </>
  );
};

export default index;
