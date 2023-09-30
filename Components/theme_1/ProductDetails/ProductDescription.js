import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
const axios = require("axios");
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import ImageSliderComponent from "../ImageSliderComponent";
import { useRouter } from "next/router";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/stateSlices/CartSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import ProductVariation from "./ProductVariation";
import Cookies from "js-cookie";
import { useToast } from "../../../hooks/useToast";
const ProductDescription = ({ data, pageUrl }) => {
  const [selectedVariation, setSelectedVariation] = useState([]);
  const [shop_name, setShop_name] = useState("");
  const [fetchedVariantProduct, setFetchedVariantProduct] = useState({});
  const ShopID = Cookies.get("shop_id");
  const showToast = useToast()
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = (product, btnTpe) => {
    if (data?.attributes?.length > 0) {
      if (selectedVariation?.length !== data?.attributes?.length) {
        showToast("Please select all variations", "error")
        return
      }
      else if (fetchedVariantProduct.id) {
        product.discounted_price = fetchedVariantProduct?.price;
        product.variant_id = fetchedVariantProduct?.id;
        product.variant = fetchedVariantProduct?.variant
        dispatch(addToCart(product));
        router.push(`/${router?.query?.shopName}/checkout`)
      }
    }
  };


  const productFetchByVariants = async (reqBody) => {
    const headers = {
      "shop-id": ShopID,
    }
    try {
      let response = await axios({
        method: 'post',
        url: `${process.env.API_URL}/customer/product-combined-price`,
        headers,
        data: reqBody
      });
      setFetchedVariantProduct(response?.data?.data)
    } catch (error) {
      setFetchedVariantProduct({})
    }
  }


  useEffect(() => {
    if (data?.attributes?.length !== 0 && data?.attributes?.length === selectedVariation?.length) {
      let attributes = '';
      selectedVariation.map((item) => {
        attributes = attributes + "-" + item.attribute_value;
      })
      const postBody = {
        variant: attributes.replace(/^-\s*/, ''),
        product_id: parseInt(router.query.id)
      }
      productFetchByVariants(postBody)
    }
  }, [selectedVariation]);


  const findMinMaxPrice = (dataAndVariation, isMin) => {
    if (dataAndVariation?.variations?.length === 0 && isMin===false) {
      return `৳ ${dataAndVariation?.discounted_price}`;
    } if (dataAndVariation?.variations?.length) {
      const compareFn = isMin ? ((prev, curr) => prev.price < curr.price ? prev : curr) : ((prev, curr) => prev.price > curr.price ? prev : curr);
      const result = dataAndVariation.variations.reduce(compareFn);
      return `৳ ${result?.price}`;
    }
  }

  return (
    <>
      <section className="ProductDetails">
        <Container>
          <Row>
            <Col xs={12} lg={6}>
              <div className="ProductDetailsLeft">
                <div className="ProductDetailsSlider">
                  <ImageSliderComponent data={data} fetchedVariantProduct={fetchedVariantProduct} />
                </div>
              </div>
            </Col>

            <Col xs={12} lg={6}>
              <div className="ProductDetailsRight">
                <div className="theme-1__product__title__Div">
                  <div className="theme-1__product__title__Div__One">
                    {data?.product_qty >= 0 && <h4>IN STOCK</h4>}
                    <h3>{data?.product_name}</h3>
                    <h3 className="ProductDetails__H3Price">
                      {/* {findMinMaxPrice(data.variations)} */}
                     {
                      fetchedVariantProduct?.price?`৳ ${fetchedVariantProduct?.price}`:<> {findMinMaxPrice(data, true)} - {findMinMaxPrice(data, false)}</>
                     }
                                      
                    </h3>
                    {
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data?.short_description,
                        }}
                      />
                    }
                  </div>
                  <div className="theme-1__product__title__Div__Two"></div>
                </div>

                {/* product Verient */}
                <ProductVariation
                  product={data}
                  setSelectedVariation={setSelectedVariation}
                  selectedVariation={selectedVariation}
                />

                {/* AddCart */}

                <div className="AddCart mt-5">
                  <button
                    className="Multipage__1__CartButtonDivbtn1"
                    onClick={() => handleAddToCart(data)}
                  >
                    {" "}
                    <AiOutlineShoppingCart /> ADD TO CART
                  </button>

                  <Link
                    onClick={() => handleAddToCart(data, "buyNowBtn")}
                    href={"#"}
                    className="Multipage__1__CartButtonDivbtn2"
                  >
                    {" "}
                    <BsCart4 /> Buy Now
                  </Link>
                </div>

                <div className="social_share_section">
                  <div>
                    <FacebookShareButton url={pageUrl}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                  </div>
                  <div>
                    <WhatsappShareButton url={pageUrl}>
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                  </div>
                  <div>
                    <TwitterShareButton url={pageUrl}>
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* ProductTabs */}
          <div className="ProductTabs">
            <Tabs
              defaultActiveKey="Description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="Description" title="Description">
                <div className="TabsItem">
                  {
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.long_description,
                      }}
                    />
                  }

                  {/* <ul>
                    <li>
                      Nunc nec porttitor turpis. In eu risus enim. In vitae
                      mollis elit.
                    </li>
                    <li>
                      Nunc nec porttitor turpis. In eu risus enim. In vitae
                      mollis elit.
                    </li>
                    <li>
                      Nunc nec porttitor turpis. In eu risus enim. In vitae
                      mollis elit.
                    </li>
                  </ul>

                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                    erat ut turpis. Suspendisse urna viverra non, semper
                    suscipit, posuere a, pede. Donec nec justo eget felis
                    facilisis fermentum. Aliquam porttitor mauris sit amet orci.
                    Aenean dignissim pellentesque felis. Phasellus ultrices
                    nulla quis nibh. Quisque a lectus. Donec consectetuer ligula
                    vulputate sem tristique cursus.
                  </p> */}
                </div>
              </Tab>

              {/* <Tab eventKey="Additional information" title="Additional information">

              <div className="TabsItem">

                <div className="TabsItemList d_flex d_justify">
                  <h4>Weight</h4>
                  <h5>1 kg</h5>
                </div>

                 <div className="TabsItemList d_flex d_justify">
                  <h4>Dimensions</h4>
                  <h5>224 × 65 × 564 cm</h5>
                </div>

                 <div className="TabsItemList d_flex d_justify">
                  <h4>Brand</h4>
                  <h5>Evoylink</h5>
                </div>

              </div>

              </Tab> */}
            </Tabs>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductDescription;
