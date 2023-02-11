import Head from "next/head";

// Common CSS
import Header from "../../../Components/theme_1/Common/Header";
import MenuBar from "../../../Components/theme_1/Common/Menubar";
import Delivary from "../../../Components/theme_1/Common/Delivary";
import Footer from "../../../Components/theme_1/Common/Footer";
import SocialMedia from "../../../Components/theme_1/Common/SocialMedia";
import TinyFooter from "../../../Components/theme_1/Common/TinyFooter";
import ChoosePayment from "../../../Components/theme_1/ChoosePayment/ChoosePayment";
import { Editor, Frame } from "@craftjs/core";

const index = () => {
  return (
    <>
      <Header></Header>      
			<Editor resolver={{ MenuBar }}>
				<Frame>
					<MenuBar menu1={'Home'} menu2={'Shop'} menu3={'About Us'} menu4={'Contact Us'} fontSize={'15'} />
				</Frame>
			</Editor>

      <ChoosePayment></ChoosePayment>

      <Delivary></Delivary>
      <Footer></Footer>
      <SocialMedia></SocialMedia>
      <TinyFooter></TinyFooter>

      <footer></footer>
    </>
  );
};

export default index;
