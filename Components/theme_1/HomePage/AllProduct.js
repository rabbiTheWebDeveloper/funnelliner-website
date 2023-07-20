import Image from "next/image";
import Link from "next/link";
import {
  Col,
  Container,
  Dropdown,
  Nav,
  Row,
  Tab,
  Tabs,
  Form,
} from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/stateSlices/CartSlice";
import { baseUrl } from "../../../constant/constant";

import ContentEditable from "react-contenteditable";
import Context from "../../Context";
const axios = require("axios");
import { useRouter } from "next/router";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const [allProducts, setAllProducts] = useState();
  const [allCategories, setAllCategories] = useState([]);

  const [shopId, setShopId] = useState();
  const [shop_name, setShop_name] = useState();

  const handleFetchProduct = async (headers) => {

    try {
      let res = await axios({
        method: "get",
        url: `${process.env.API_URL}v1/customer/products`,
        headers: headers,
      });
      setAllProducts(res.data.data);
    } catch (err) {
      // console.log("all products", err.response.data.msg);
    }
  };
  const handleFetchCategories = async (headers) => {
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.API_URL}v1/customer/products`,
        headers: headers,
      });
      setAllCategories(res?.data?.data);

    } catch (err) {
      // console.log("all products", err.response.data.msg);
    }
  };
  useEffect(() => {
    const headers = {
      "shop-id": localStorage.getItem("shop_id"),
    };
    handleFetchProduct(headers);
    handleFetchCategories(headers)
    setShopId(localStorage.getItem("shop_id"));
    setShop_name(localStorage.getItem("shop_name"));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
  };
  return (

    <section className="Multipage__1">
      <Container>
        <div className='Multipage__1__AllProductDiv'>
          <h2>All Products</h2>
        </div>
        <div className="Multipage__1__grid-container">

          {Array.isArray(allProducts) ?
            allProducts.map((item, index) => {
              return (
                <div className="Multipage__1__grid-item" key={item.id}>
                  <div className="Multipage__1__grid-itemAbs">
                  </div>
                  <div className="Multipage__1__CardImgBox">
                    <Link href={`/${shop_name}/details/${item?.id}`}>
                      <img src={item?.main_image?.name} alt="" />
                    </Link>
                  </div>
                  <div className="Multipage__1__CardTxtBox">
                    <h4>BDT  {item?.price} <span>{item?.discount}</span></h4>
                    <h5>{item?.product_name}</h5>
                    <Link onClick={() => handleAddToCart(item)} href='#' className="bg6"> Add To Cart</Link>
                    <Link onClick={() => handleBuyNow(item)} href={`/${shop_name}/checkout`} className="bg5"> Order Now</Link>
                  </div>
                </div>
              );
            }) : null
          }

        </div>
      </Container>
    </section>
  );
};

export default AllProduct;
