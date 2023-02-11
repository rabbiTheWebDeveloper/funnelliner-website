import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { BiPhoneCall } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { BsArrowRight, BsTwitter } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import Context from "../../Context";

import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Select from "react-select";
import axios from "axios";

import { useEditor, useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { useRouter } from 'next/router'

const LandingOne = (props) => {
  const [product, setProduct] = useState({});
  const [shopID, setShopID] = useState();

  // async function fetchProducts(headers) {
  //   const response = await fetch(
  //     `${process.env.API_URL}v1/customer/products`,
  //     {
  //       headers: headers,
  //     }
  //   );
  //   const data = await response.json();

  //   setProduct(data.data[data.data?.length - 1]);
  // }

  useEffect(() => {
    const headers = {
     "shop-id": localStorage.getItem("shop_id"),
    };
    // fetchProducts(headers).then((r) => console.log());
    setShopID(localStorage.getItem("shop_id"));
  }, [shopID]);

  //   console.log(product[0]);
  const [quantity, setQuantity] = useState(null);
  const productQuantity = quantity === null ? 1 : quantity.value;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const shop_name = router.query.shopName;
  const { page } = router.query;
  const getPageInfo = async (page) => {
    const pageInformation = await axios.get(
      `${process.env.API_URL}v1/page/${page}`
    );
    // setPageInfo(pageInformation.data.data);
    setProduct(pageInformation.data.data.product)
  };
  useEffect(()=>{
    if (page !== undefined) {
      getPageInfo(page);
    }
   
  }, [shop_name])

  const onSubmit = (data) => {
    const postBody = {
      customer_name: data.customerName,
      customer_phone: data.customerMobile,
      customer_address: data.customerAddress,
      product_id: [product.id],
      product_qty: [productQuantity],
    };
    axios
      .post(
        `${process.env.API_URL}v1/customer/order/store`,
        postBody,
        {
          headers: {  "shop-id": shopID },
        },

      )
      .then((res) => {
        if (res.status === 200) {
          router.push(`/${shop_name}/order_successfull/${res?.data?.data?.id}`);
          // swal(
          //   "Thank you!",
          //   "Your order has been successfully placed",
          //   "success"
          // );
        }
      })
      .catch((err) => {
        swal({
          title: "Sorry",
          text: "Something went wrong",
          icon: "warning",
        });
      });
  };

  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  //edit
  const contextValue = useContext(Context);
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected.size > 0,
    hasDraggedNode: state.events.dragged.size > 0,
  }));
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: true,
  }));
  //logo change
  let editActive = false;
  const [logo, setLogo] = useState();
  if (contextValue !== undefined) {
    editActive = contextValue.value;
    useEffect(() => {
      if (contextValue.value1 === true) {
        const serialize = query.serialize();
        props.save(serialize);
        if(logo !== undefined){
          props.save(JSON.stringify(logo));
        }
      }
    }, [contextValue.value1]);
  }
  const inputFile = useRef(null);
  const handleChangeLogo = (e) => {
    setLogo(URL.createObjectURL(e.target.files[0]));
  };
  const onButtonClick = () => {
    inputFile.current.click();
  };



  //banner change
  const [banner, setBanner] = useState();
  const bannerInputFile = useRef(null);
  const handleChangeBanner = (e) => {
    setBanner(URL.createObjectURL(e.target.files[0]));
  };
  const onEditBannerClick = () => {
    bannerInputFile.current.click();
  };

  //video upload
  const [productVideo, setProductVideo] = useState();
  const ProductVideoFile = useRef(null);
  const handleChangeProductVideo = (e) => {
    setProductVideo(URL.createObjectURL(e.target.files[0]));
  };
  const onEditProductVideoClick = () => {
    ProductVideoFile.current.click();
  };
  return (
    <div className='LandingTwo'>
      {/* Banner */}
      <section className='Logo'>
        <img
          src={logo === undefined ? "/images/landing_2/logo.png" : logo}
          alt=''
        />
        {editActive === true && (
          <>
            {" "}
            <input
              type='file'
              id='file'
              onChange={handleChangeLogo}
              ref={inputFile}
              style={{ display: "none" }}
            />
            <span
              style={{ marginLeft: "4px", cursor: "pointer" }}
              onClick={onButtonClick}
            >
              <svg
                fill='#000'
                height='20px'
                width='20px'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 306.637 306.637'
                xmlSpace='preserve'
              >
                <path d='M12.809 238.52L0 306.637l68.118-12.809 184.277-184.277-55.309-55.309L12.809 238.52zm47.981 41.423l-41.992 7.896 7.896-41.992L197.086 75.455l34.096 34.096L60.79 279.943zM251.329 0l-41.507 41.507 55.308 55.308 41.507-41.507L251.329 0zm-20.294 41.507l20.294-20.294 34.095 34.095-20.294 20.294-34.095-34.095z' />
              </svg>
            </span>
          </>
        )}
        {/* <img src='images/landing_2/logo.png' alt='' /> */}
        <div className='LogoOverlay'>
          <img src='/images/landing_2/top_overlay.png' alt='' />
        </div>
      </section>

      {/* Banner */}
      <section className='Banner'>
        <Container>
          <Row className='d_flex'>
            <Col lg={6}>
              <div className='BannerContent'>
                <h5>বেস্ট সেলিং</h5>
                {editActive === false && <h2>{props.heroContent}</h2>}
                {editActive === true && (
                  <>
                    <ContentEditable
                      html={props.heroContent}
                      onChange={(e) =>
                        setProp(
                          (props) =>
                            (props.heroContent = e.target.value.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            ))
                        )
                      }
                      tagName='a'
                      style={{ fontSize: `${props.heroFontSize}px` }}
                    />
                  </>
                )}
                <br />
                {editActive === true && (
                  <Form.Range
                    style={{ width: "200px" }}
                    min={1}
                    defaultvalue={props.heroFontSize}
                    max={50}
                    onChange={(e) => {
                      setProp((props) => (props.heroFontSize = e.target.value));
                    }}
                  />
                )}

                <br />
                {/* price */}
                {editActive === false && <h4> {props.currentPrice} টাকা</h4>}
                {editActive === true && (
                  <>
                    <ContentEditable
                      html={props.currentPrice}
                      onChange={(e) =>
                        setProp(
                          (props) =>
                            (props.currentPrice = e.target.value.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            ))
                        )
                      }
                      tagName='a'
                      style={{ fontSize: `${props.priceFontSize}px` }}
                    />
                  </>
                )}
                <br />
                {editActive === true && (
                  <Form.Range
                    style={{ width: "200px" }}
                    min={1}
                    defaultvalue={props.priceFontSize}
                    max={50}
                    onChange={(e) => {
                      setProp(
                        (props) => (props.priceFontSize = e.target.value)
                      );
                    }}
                  />
                )}

                <h6>
                  {editActive === false && <del>{props.previousPrice}</del>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.previousPrice}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.previousPrice = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='del'
                        style={{ fontSize: `${props.previousPriceFontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.previousPriceFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) =>
                            (props.previousPriceFontSize = e.target.value)
                        );
                      }}
                    />
                  )}
                </h6>

                <div className='OrderNow'>
                  <Link href='' className='bg'>
                    অর্ডার করুন <BsArrowRight />{" "}
                  </Link>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className='BannerImg'>
                <img
                  src={
                    banner === undefined
                      ? "/images/landing_2/banner.png"
                      : banner
                  }
                  alt=''
                />
                {editActive === true && (
                  <>
                    {" "}
                    <input
                      type='file'
                      id='file'
                      onChange={handleChangeBanner}
                      ref={bannerInputFile}
                      style={{ display: "none" }}
                    />
                    <span
                      style={{ marginLeft: "200px", cursor: "pointer" }}
                      onClick={onEditBannerClick}
                    >
                      <svg
                        fill='#000'
                        height='20px'
                        width='20px'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 306.637 306.637'
                        xmlSpace='preserve'
                      >
                        <path d='M12.809 238.52L0 306.637l68.118-12.809 184.277-184.277-55.309-55.309L12.809 238.52zm47.981 41.423l-41.992 7.896 7.896-41.992L197.086 75.455l34.096 34.096L60.79 279.943zM251.329 0l-41.507 41.507 55.308 55.308 41.507-41.507L251.329 0zm-20.294 41.507l20.294-20.294 34.095 34.095-20.294 20.294-34.095-34.095z' />
                      </svg>
                    </span>
                  </>
                )}

                <div className='BannerImgOverlay'>
                  <img src='/images/landing_2/butterfly.png' alt='' />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Product */}
      <section className='Product section_gaps'>
        <div className='ProductOverlay'>
          <img src='/images/landing_2/product_overlay.png' alt='' />
        </div>

        <Container>
          <Row>
            {/* card 1 */}
            <Col lg={3} sm={6}>
              <div className='ProductItem'>
                <div className='img'>
                  <img src='/images/landing_2/product1.png' alt='' />
                </div>

                <div className='text'>
                  {editActive === false && <h3>{props.cardOneTitle}</h3>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.cardOneTitle}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.cardOneTitle = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='h3'
                        style={{ fontSize: `${props.cardTitleFontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.cardTitleFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.cardTitleFontSize = e.target.value)
                        );
                      }}
                    />
                  )}

                  {/* card one desc */}
                  {editActive === false && <h6>{props.cardOneText}</h6>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.cardOneText}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.cardOneText = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='h6'
                        style={{ fontSize: `${props.cardTextFontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.cardTextFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.cardTextFontSize = e.target.value)
                        );
                      }}
                    />
                  )}
                </div>
              </div>
            </Col>

            {/* card 2 */}
            <Col lg={3} sm={6}>
              <div className='ProductItem'>
                <div className='img'>
                  <img src='/images/landing_2/product2.png' alt='' />
                </div>

                <div className='text'>
                  {editActive === false && <h3>{props.cardTwoTitle}</h3>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.cardTwoTitle}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.cardTwoTitle = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='h3'
                        style={{ fontSize: `${props.cardTitleFontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.cardTitleFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.cardTitleFontSize = e.target.value)
                        );
                      }}
                    />
                  )}

                  {/* card one desc */}
                  {editActive === false && <h6>{props.cardTwoText}</h6>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.cardTwoText}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.cardTwoText = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='h6'
                        style={{ fontSize: `${props.cardTextFontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.cardTextFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.cardTextFontSize = e.target.value)
                        );
                      }}
                    />
                  )}
                </div>
              </div>
            </Col>

            {/* card 3  */}
            <Col lg={3} sm={6}>
              <div className='ProductItem'>
                <div className='img'>
                  <img src='/images/landing_2/product3.png' alt='' />
                </div>

                <div className='text'>
                  {editActive === false && <h3>{props.cardThreeTitle}</h3>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.cardThreeTitle}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.cardThreeTitle = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='h3'
                        style={{ fontSize: `${props.cardTitleFontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.cardTitleFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.cardTitleFontSize = e.target.value)
                        );
                      }}
                    />
                  )}

                  {/* card one desc */}
                  {editActive === false && <h6>{props.cardThreeText}</h6>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.cardThreeText}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.cardThreeText = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='h6'
                        style={{ fontSize: `${props.cardTextFontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.cardTextFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.cardTextFontSize = e.target.value)
                        );
                      }}
                    />
                  )}
                </div>
              </div>
            </Col>

            {/* card 4  */}
            <Col lg={3} sm={6}>
              <div className='ProductItem'>
                <div className='img'>
                  <img src='/images/landing_2/product4.png' alt='' />
                </div>

                <div className='text'>
                  {editActive === false && <h3>{props.cardFourTitle}</h3>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.cardFourTitle}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.cardFourTitle = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='h3'
                        style={{ fontSize: `${props.cardTitleFontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.cardFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.cardTitleFontSize = e.target.value)
                        );
                      }}
                    />
                  )}

                  {/* card one desc */}
                  {editActive === false && <h6>{props.cardFourText}</h6>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.cardFourText}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.cardFourText = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='h6'
                        style={{ fontSize: `${props.cardTextFontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.cardTextFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.cardTextFontSize = e.target.value)
                        );
                      }}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Video */}
      <section className='Video section_gaps'>
        <div className='VideoOverlay'>
          <img src='/images/landing_2/video_overlay.png' alt='' />
        </div>

        <Container>
          <Row>
            <Col lg={12}>
              <div className='header text-center'>
                {editActive === false && <h2>{props.whyBuyOurProduct}</h2>}
                {editActive === true && (
                  <>
                    <ContentEditable
                      html={props.whyBuyOurProduct}
                      onChange={(e) =>
                        setProp(
                          (props) =>
                            (props.whyBuyOurProduct = e.target.value.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            ))
                        )
                      }
                      tagName='h6'
                      style={{ fontSize: `${props.whyBuyFontSize}px` }}
                    />
                  </>
                )}
                <br />
                {editActive === true && (
                  <Form.Range
                    style={{ width: "200px" }}
                    min={1}
                    defaultvalue={props.whyBuyFontSize}
                    max={50}
                    onChange={(e) => {
                      setProp(
                        (props) => (props.whyBuyFontSize = e.target.value)
                      );
                    }}
                  />
                )}
              </div>

              {/* Video */}
              <div className='VideoContent'>
                <div className='img'>
                  <img src='/images/landing_2/video.png' alt='' />
                </div>

                <Link href='' className='bg'>
                  অর্ডার করুন <BsArrowRight />{" "}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* WhyBuy */}
      <section className='WhyBuy section_gaps'>
        <Container>
          <div className='WhyBuyOverlay'>
            <img src='/images/landing_2/why_overlay.png' alt='' />
          </div>

          <div className='WhyBuyOverlay2'>
            <img src='/images/landing_2/why_overlay2.png' alt='' />
          </div>

          <Row>
            <Col lg={12}>
              <div className='header text-center'>
                {editActive === false && <h2>{props.whyThisProductForYou}</h2>}
                {editActive === true && (
                  <>
                    <ContentEditable
                      html={props.whyThisProductForYou}
                      onChange={(e) =>
                        setProp(
                          (props) =>
                            (props.whyThisProductForYou =
                              e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
                        )
                      }
                      tagName='h3'
                      style={{ fontSize: `${props.whyThisProductFontSize}px` }}
                    />
                  </>
                )}
                <br />
                {editActive === true && (
                  <Form.Range
                    style={{ width: "200px" }}
                    min={1}
                    defaultvalue={props.whyThisProductFontSize}
                    max={50}
                    onChange={(e) => {
                      setProp(
                        (props) =>
                          (props.whyThisProductFontSize = e.target.value)
                      );
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>

          {/* WhyBuyContent */}
          <div className='WhyBuyContent'>
            <Row>
              {/* item */}
              <Col lg={6} sm={6}>
                <div className='WhyBuyItem'>
                  <div className='img'>
                    <img src='/images/landing_2/sign.png' alt='' />
                  </div>

                  <div className='text'>
                    {editActive === false && <h4>{props.reason_1}</h4>}
                    {editActive === true && (
                      <>
                        <ContentEditable
                          html={props.reason_1}
                          onChange={(e) =>
                            setProp(
                              (props) =>
                                (props.reason_1 = e.target.value.replace(
                                  /<\/?[^>]+(>|$)/g,
                                  ""
                                ))
                            )
                          }
                          tagName='h3'
                          style={{ fontSize: `${props.reasonFontSize}px` }}
                        />
                      </>
                    )}
                    <br />
                    {editActive === true && (
                      <Form.Range
                        style={{ width: "200px" }}
                        min={1}
                        defaultvalue={props.reasonFontSize}
                        max={50}
                        onChange={(e) => {
                          setProp(
                            (props) => (props.reasonFontSize = e.target.value)
                          );
                        }}
                      />
                    )}
                  </div>
                </div>
              </Col>

              {/* item */}
              <Col lg={6} sm={6}>
                <div className='WhyBuyItem'>
                  <div className='img'>
                    <img src='/images/landing_2/sign.png' alt='' />
                  </div>

                  <div className='text'>
                    {editActive === false && <h4>{props.reason_2}</h4>}
                    {editActive === true && (
                      <>
                        <ContentEditable
                          html={props.reason_2}
                          onChange={(e) =>
                            setProp(
                              (props) =>
                                (props.reason_2 = e.target.value.replace(
                                  /<\/?[^>]+(>|$)/g,
                                  ""
                                ))
                            )
                          }
                          tagName='h3'
                          style={{ fontSize: `${props.reasonFontSize}px` }}
                        />
                      </>
                    )}
                    <br />
                    {editActive === true && (
                      <Form.Range
                        style={{ width: "200px" }}
                        min={1}
                        defaultvalue={props.reasonFontSize}
                        max={50}
                        onChange={(e) => {
                          setProp(
                            (props) => (props.reasonFontSize = e.target.value)
                          );
                        }}
                      />
                    )}
                  </div>
                </div>
              </Col>

              {/* item */}
              <Col lg={6} sm={6}>
                <div className='WhyBuyItem'>
                  <div className='img'>
                    <img src='/images/landing_2/sign.png' alt='' />
                  </div>

                  <div className='text'>
                    {editActive === false && <h4>{props.reason_3}</h4>}
                    {editActive === true && (
                      <>
                        <ContentEditable
                          html={props.reason_3}
                          onChange={(e) =>
                            setProp(
                              (props) =>
                                (props.reason_3 = e.target.value.replace(
                                  /<\/?[^>]+(>|$)/g,
                                  ""
                                ))
                            )
                          }
                          tagName='h3'
                          style={{ fontSize: `${props.reasonFontSize}px` }}
                        />
                      </>
                    )}
                    <br />
                    {editActive === true && (
                      <Form.Range
                        style={{ width: "200px" }}
                        min={1}
                        defaultvalue={props.reasonFontSize}
                        max={50}
                        onChange={(e) => {
                          setProp(
                            (props) => (props.reasonFontSize = e.target.value)
                          );
                        }}
                      />
                    )}
                  </div>
                </div>
              </Col>

              {/* item */}
              <Col lg={6} sm={6}>
                <div className='WhyBuyItem'>
                  <div className='img'>
                    <img src='/images/landing_2/sign.png' alt='' />
                  </div>

                  <div className='text'>
                    {editActive === false && <h4>{props.reason_4}</h4>}
                    {editActive === true && (
                      <>
                        <ContentEditable
                          html={props.reason_4}
                          onChange={(e) =>
                            setProp(
                              (props) =>
                                (props.reason_4 = e.target.value.replace(
                                  /<\/?[^>]+(>|$)/g,
                                  ""
                                ))
                            )
                          }
                          tagName='h3'
                          style={{ fontSize: `${props.reasonFontSize}px` }}
                        />
                      </>
                    )}
                    <br />
                    {editActive === true && (
                      <Form.Range
                        style={{ width: "200px" }}
                        min={1}
                        defaultvalue={props.reasonFontSize}
                        max={50}
                        onChange={(e) => {
                          setProp(
                            (props) => (props.reasonFontSize = e.target.value)
                          );
                        }}
                      />
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* WhyGood */}
      <section className='WhyGood section_gaps'>
        <Container>
          <div className='WhyGoodOverlay'>
            <img src='/images/landing_2/good_overlay1.png' alt='' />
          </div>

          <div className='WhyGoodOverlay2'>
            <img src='/images/landing_2/good_overlay2.png' alt='' />
          </div>

          <Row>
            <Col lg={12}>
              <div className='header text-center'>
                {editActive === false && <h2>{props.whyOurProductIsGood}</h2>}
                {editActive === true && (
                  <>
                    <ContentEditable
                      html={props.whyOurProductIsGood}
                      onChange={(e) =>
                        setProp(
                          (props) =>
                            (props.whyOurProductIsGood = e.target.value.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            ))
                        )
                      }
                      tagName='h3'
                      style={{
                        fontSize: `${props.whyOurProductIsGoodFontSize}px`,
                      }}
                    />
                  </>
                )}
                <br />
                {editActive === true && (
                  <Form.Range
                    style={{ width: "200px" }}
                    min={1}
                    defaultvalue={props.whyOurProductIsGoodFontSize}
                    max={50}
                    onChange={(e) => {
                      setProp(
                        (props) =>
                          (props.whyOurProductIsGoodFontSize = e.target.value)
                      );
                    }}
                  />
                )}

                {editActive === false && (
                  <h3>{props.whyOurProductIsGoodDescription}</h3>
                )}
                {editActive === true && (
                  <>
                    <ContentEditable
                      html={props.whyOurProductIsGoodDescription}
                      onChange={(e) =>
                        setProp(
                          (props) =>
                            (props.whyOurProductIsGoodDescription =
                              e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
                        )
                      }
                      tagName='h3'
                      style={{ fontSize: `${props.goodProductFontSize}px` }}
                    />
                  </>
                )}
                <br />
                {editActive === true && (
                  <Form.Range
                    style={{ width: "200px" }}
                    min={1}
                    defaultvalue={props.goodProductFontSize}
                    max={50}
                    onChange={(e) => {
                      setProp(
                        (props) => (props.goodProductFontSize = e.target.value)
                      );
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Client */}
      <section className='Client section_gaps'>
        <Container>
          <Row>
            <Col lg={12}>
              <div className='header text-center'>
                <h2>
                  আমাদের মূল্যবান গ্রাহক যারা <br /> কিনেছেন তাদের মতামত জানুন
                </h2>
              </div>
            </Col>
          </Row>

          {/* ClientContent */}
          <div className='ClientContent'>
            <Row>
              {/* item */}
              <Col lg={6} sm={6}>
                <div className='ClientImg'>
                  <img src='/images/landing_2/client_review.png' alt='' />
                </div>
              </Col>

              {/* item */}
              <Col lg={6} sm={6}>
                <div className='ClientImg'>
                  <img src='/images/landing_2/client_review.png' alt='' />
                </div>
              </Col>

              {/* item */}
              <Col lg={6} sm={6}>
                <div className='ClientImg'>
                  <img src='/images/landing_2/client_review.png' alt='' />
                </div>
              </Col>

              {/* item */}
              <Col lg={6} sm={6}>
                <div className='ClientImg'>
                  <img src='/images/landing_2/client_review.png' alt='' />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* From Part */}
      <section id='form_part' className='section_gaps'>
        <Container>
          <Row className='justify-content-md-center'>
            <Col lg={6}>
              <div className='header text-center'>
                <h2>অর্ডার কনফার্ম করতে নিচের ফর্মটি পূরণ করুন।</h2>
              </div>
            </Col>
          </Row>

          <div className='form_part_content'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg={6} sm={6}>
                  <div className='left_part'>
                    <h3>Billing details</h3>

                    {/* item */}
                    <div className='custome_input'>
                      <label>
                        আপনার নাম লিখুন <span>*</span>
                      </label>
                      <input
                        {...register("customerName", { required: true })}
                        type='text'
                        placeholder=' আপনার নাম লিখুন'
                      />
                      {errors.customerName && (
                        <span style={{ color: "red" }}>Name is require</span>
                      )}
                    </div>

                    {/* item */}
                    <div className='custome_input'>
                      <label>
                        আপনার মোবাইল নাম্বার লিখুন <span>*</span>
                      </label>
                      <input
                        type='text'
                        placeholder=' আপনার মোবাইল নাম্বার লিখুন'
                        {...register(
                          "customerMobile",
                          { required: true },
                          { min: 11, max: 15 }
                        )}
                      />
                      {errors.customerMobile && (
                        <span style={{ color: "red" }}>
                          Valid Mobile Number require
                        </span>
                      )}
                    </div>

                    {/* item */}
                    <div className='custome_input'>
                      <label>
                        আপনার সম্পূর্ণ ঠিকানা লিখুন <span>*</span>
                      </label>
                      <input
                        type='text'
                        placeholder=' আপনার সম্পূর্ণ ঠিকানা লিখুন'
                        {...register("customerAddress", { required: true })}
                      />
                      {errors.customerAddress && (
                        <span style={{ color: "red" }}>Address require</span>
                      )}
                    </div>

                    <div className='payment'>
                      <h4>Paymet</h4>
                      <div className='custome_input checkbox d_flex'>
                        <input
                          type='checkbox'
                          id='delivary_input'
                          defaultChecked={true}
                          placeholder=''
                        />
                        <label htmlFor='delivary_input'>
                          {" "}
                          ক্যাশ অন ডেলিভারি{" "}
                        </label>
                      </div>

                      <div className='arrow_bg'>
                        <p>Pay with cash on delivery.</p>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg={6} sm={6}>
                  <div className='right_part'>
                    <h3>Your order</h3>

                    <div className='product_part'>
                      <ul>
                        <li className='d_flex d_justify'>
                          <h3>Product</h3>
                          <p>Subtotal</p>
                        </li>
                        <li className='d_flex d_justify'>
                          {/* left */}
                          <div className='left d_flex'>
                            <div className='img'>
                              <img
                                style={{ width: "100px" }}
                                src={product?.main_image?.name}
                                alt=''
                              />
                            </div>
                            <div className='text'>
                              <h4>{product?.product_name}</h4>
                            </div>
                          </div>
                          {/* middle */}
                          <div className='middle'>
                            <Select
                              onChange={setQuantity}
                              options={options}
                              placeholder='1'
                            />
                          </div>
                          {/* amount */}
                          <div className='amount'>
                            <h3> {product?.price}</h3>
                          </div>
                        </li>
                        <li className='d_flex d_justify'>
                          <h5>Subtotal</h5>
                          <h5>{productQuantity * product?.price}</h5>
                        </li>
                        <li className='d_flex d_justify'>
                          <h3>Total</h3>
                          <h3> {productQuantity * product?.price}</h3>
                        </li>
                      </ul>
                    </div>

                    <div className='dexcription'>
                      <p>
                        Your personal data will be used to process your order,
                        support your experience throughout this website, and for
                        other purposes described in our
                        <a href='#'>privacy policy</a>.
                      </p>
                      <button className='bg' type='submit'>
                        <i className='fas fa-lock' /> Place Order ৳ TK{" "}
                        {productQuantity * product?.price}
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </section>

      {/* Fotoer */}
      <section id='Footer'>
        <div className='footerLeft'>
          <img src='/images/landing_1/footer_left.png' alt='' />
        </div>

        <div className='footerRight'>
          <img src='/images/landing_1/footer_right.png' alt='' />
        </div>

        <Container>
          <Row>
            <Col lg={4} sm={4}>
              <div className='FooterContent'>
                <h3>প্রয়োজনে কল করুন</h3>

                <ul>
                  <li className='d_flex'>
                    <BiPhoneCall /> <a href='tel:018100-45255'>018100-45255</a>{" "}
                  </li>
                </ul>

                {/* Social Icon */}
                <div className='SocialIcon'>
                  <a href='#' className='fb'>
                    {" "}
                    <FaFacebookF />{" "}
                  </a>
                  <a href='#' className='youtube'>
                    {" "}
                    <AiFillYoutube />{" "}
                  </a>
                  <a href='#' className='instagram'>
                    {" "}
                    <AiOutlineInstagram />{" "}
                  </a>
                  <a href='#' className='twitter'>
                    {" "}
                    <BsTwitter />{" "}
                  </a>
                </div>
              </div>
            </Col>

            <Col lg={4} sm={4}>
              <div className='FooterContent'>
                <h3>Important Links</h3>

                <ul>
                  <li className='d_flex'>
                    <a href='#'>Privacy Policy</a>{" "}
                  </li>
                  <li className='d_flex'>
                    <a href='#'>Terms & Conditions</a>{" "}
                  </li>
                  <li className='d_flex'>
                    <a href='#'>Contact</a>{" "}
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={4} sm={4}>
              <div className='FooterContent'>
                <h3>Email us</h3>

                <ul>
                  <li className='d_flex'>
                    <FiMail />{" "}
                    <a href='mailto:oder@freshen.com'>oder@freshen.com</a>{" "}
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          {/* Tiny Footer */}
          <div className='tinyFooter'>
            <p>
              2022 All Rights Reserved | Designed by{" "}
              <a href='https://sitc.sitcdev.xyz/'>Soft IT Care</a> Development
              Team
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingOne;
