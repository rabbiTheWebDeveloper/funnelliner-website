import React from "react";
// import Menubar from '../../../Components/ThemePage/ThemeTwo/Common/Menubar'
import Menubar from "../../../Components/ThemePage/ThemeTwo/Common/Menubar";
import Footer from "../../../Components/ThemePage/ThemeTwo/Common/Footer";
import ShippingAddress from "../../../Components/ThemePage/ThemeTwo/ShipingAddress/ShippingAddress";

export default function index() {
  return (
    <>
      <div className='ThemeTwo'>
        <Menubar />
        <ShippingAddress />
        <Footer />
      </div>
    </>
  );
}
