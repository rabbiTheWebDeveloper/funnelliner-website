import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
const axios = require("axios");
// import { FiPlus } from "react-icons/fi";
// import { BiMinus } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import ImageSliderComponent from "../ImageSliderComponent";
import { useRouter } from "next/router";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/stateSlices/CartSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
const ProductDescription = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
  };
  const [shopName, setShopName] = useState();
  useEffect(() => {
    setShopName(localStorage.getItem("shop_name"));
  }, []);
  const priceWithDiscount = parseInt(data?.price) + parseInt(data?.discount);


  const prductIamges = []
  prductIamges.push({ original: data?.main_image?.name, thumbnail: data?.main_image?.name })
  if (data?.other_images?.length > 0) {
    data.other_images.map(item => {
      prductIamges.push({ original: item.name, thumbnail: item.name })
    })
  }
  return (
    <>
      {/* <section className='ProductDetails'>
        <Container>
          <Row>
            <Col xs={6}>
              <div className='ProductDetailsLeft'>
                <div className='ProductDetailsSlider'>
                  <ImageSliderComponent data={data}></ImageSliderComponent>
                </div>
              </div>
            </Col>

            <Col xs={6}>
              <div className='ProductDetailsRight'>
                {data?.product_qty >= 0 && <h4>IN STOCK</h4>}

                <h3>{data?.product_name}</h3>

                <h2>
                  {data?.price} TK{" "}
                  <del>{priceWithDiscount}</del>{" "}
                </h2>

                <p>{data?.short_description}</p>

               
                <div className='AddCart mt-5'>
                  <button onClick={() => handleAddToCart(data)}>
                    {" "}
                    <AiOutlineShoppingCart /> ADD TO CART

                  </button>

                  <Link onClick={() => handleBuyNow(data)} href={`/${shopName}/checkout`}>
                    {" "}
                    <BsCart4 /> Buy Now
                  </Link>

                </div>
                <ToastContainer />
              </div>
            </Col>
          </Row>

         
          <div className='ProductTabs'>
            <Tabs
              defaultActiveKey='profile'
              id='uncontrolled-tab-example'
              className='mb-3'
            >
              <Tab eventKey='Description' title='Description'>
                <div className='TabsItem'>
                  <p>{data?.short_description}</p>

                </div>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </section> */}


      <section>
        <Container>
          <Row>
            <Col lg={6}>
              <ImageSliderComponent data={data}></ImageSliderComponent>
            </Col>
            {/* <Col lg={6}>
              <div className='Multipage__1__SliderOneImg'>
                <>
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >

                    {
                      prductIamges.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className='Multipage__1__ThambImgBox'>
                              <img src={item?.thumbnail} />
                            </div>
                          </SwiperSlide>
                        )
                      })
                    }

                  </Swiper>

                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {
                      prductIamges.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className='Multipage__1__ThambImgSmall'>
                              <img src={item?.thumbnail} />
                            </div>
                          </SwiperSlide>
                        )
                      })
                    }
                  </Swiper>
                </>
              </div>
            </Col> */}
            <Col lg={6}>
              <div className='Multipage__1__CartDetails'>
                <div className='Multipage__1__CartInstcok'> {data?.product_qty >= 0 && "IN STOCK"}</div>
                <h2>{data?.product_name}</h2>
                <div className='Multipage__1__CartTKDiv'>
                  <h3>{data?.price} TK</h3>
                  <h4>{priceWithDiscount + 50}</h4>

                </div>
                <div className='Multipage__1__CartButtonDiv2'>
                  <p>{data?.short_description}</p>
                </div>
                  <div className='Multipage__1__CartButtonDiv'>
                    <button className='Multipage__1__CartButtonDivbtn1' onClick={() => handleAddToCart(data)}>
                      {" "}
                      <AiOutlineShoppingCart /> ADD TO CART
                    </button>
                    <Link onClick={() => handleBuyNow(data)} href={`/${shopName}/checkout`} className='Multipage__1__CartButtonDivbtn2'>
                      {" "}
                      <BsCart4 /> Buy Now
                    </Link>
                  </div>
                </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDescription;
