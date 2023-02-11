import React from "react";
import Footer from "../../../Components/ThemePage/ThemeTwo/Common/Footer";
import Menubar from "../../../Components/ThemePage/ThemeTwo/Common/Menubar";
import ProductInfo from "../../../Components/ThemePage/ThemeTwo/SingleProduct/ProductInfo";
import ProductDescription from '../../../Components/ThemePage/ThemeTwo/SingleProduct/ProductDescription'
const index = () => {
  return (
    <div className='ThemeTwo'>
      <Menubar />
      <ProductInfo />
      <ProductDescription />
      <Footer/>
    </div>
  );
};

export default index;
