import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
// import ReactPlayer from "react-player";
import { BiPhoneCall } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Select from "react-select";
import axios from "axios";
import styles from "/styles/landing_one/landing_one.module.css";
import { RiShoppingCart2Line } from "react-icons/ri";

import { useEditor, useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import Context from "../../Context";
import { useRouter } from 'next/router'

const LandingOne = (props) => {
  const [product, setProduct] = useState({});

  const [shopID, setShopID] = useState();
  // async function fetchProducts(headers) {
  //   const response = await fetch(`${process.env.API_URL}v1/customer/products`, {
  //     headers: headers,
  //   });
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

  const [quantity, setQuantity] = useState(1);
 

  const handleQuantityChange=(e)=>{
    setQuantity(parseInt(e.target.value))

  }
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("hello")
    // console.log(`${process.env.API_URL}v1/customer/order/store`);
    const postBody = {
      // shop_id: shopId,
      customer_name: data.customerName,
      customer_phone: data.customerMobile,
      customer_address: data.customerAddress,
      product_id: [product.id],
      product_qty: [quantity],
    };

    axios
      .post(`${process.env.API_URL}v1/customer/order/store`, postBody, {
        headers: { "shop-id": shopID },
      })
      .then((res) => {
        if (res.status === 200) {
          router.push(`/${shop_name}/order_successfull/${res?.data?.data?.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Sorry",
          text: "Something went wrong",
          icon: "warning",
        });
      });
  };



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
  const contextValue = useContext(Context);
  let editActive = false;

  //logo
  const [logo, setLogo] = useState();
  if (contextValue !== undefined) {
    editActive = contextValue.value;
    useEffect(() => {
      if (contextValue.value1 === true) {
        const serialize = query.serialize();
        props.save(serialize);
        if (logo !== undefined) {
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

  //productImageGallery1
  const [gallery_1, setGallery_1] = useState();
  const gallery_1_inputFile = useRef(null);
  const handleChangegallery_1 = (e) => {
    setGallery_1(URL.createObjectURL(e.target.files[0]));
  };
  const ongallery_1ButtonClick = () => {
    gallery_1_inputFile.current.click();
  };

  //productImageGallery2
  const [gallery_2, setGallery_2] = useState();
  const gallery_2_inputFile = useRef(null);
  const handleChangegallery_2 = (e) => {
    setGallery_2(URL.createObjectURL(e.target.files[0]));
  };
  const ongallery_2ButtonClick = () => {
    gallery_2_inputFile.current.click();
  };

  return (
    <div className={styles.LandingOne}>
      {/* Banner */}
      <section id='banner'>
        <Container>
          <Row className='d_flex'>
            <Col lg={6}>
              <div className={styles.banner_content}>
                {/* <!-- logo --> */}
                <div className='logo Desktop'>
                  <img
                    src={
                      logo === undefined ? "/images/landing_1/logo.png" : logo
                    }

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
                </div>

                {/* <!-- text --> */}
                <div className={styles.text}>
                  {editActive === false && <h3>{props.heroContent}</h3>}
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
                        style={{ fontSize: `${props.fontSize}px` }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.fontSize}
                      max={50}
                      onChange={(e) => {
                        setProp((props) => (props.fontSize = e.target.value));
                      }}
                    />
                  )}
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className={styles.banner_content}>
                {/* <!-- logo --> */}
                {/* <div className={styles["logo Mobile"]}>
                  <img src='/images/landing_1/logo.png'  alt='image' />
                </div> */}
              </div>

              <div className={styles.banner_img}>
                <img
                //  src='images/landing_1/banner.png'
                src='/images/landing_1/banner.png'
                alt='image' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Desktop Delivary */}
      <section id={styles.delivary} className={styles.DesktopDelivary}>
        <Container>
          <Row className='d_flex'>
            <Col lg={4} sm={4}>
              <div className={styles.delivary_item}>
                <div className={styles.img}>
                  <img src='/images/landing_1/delivary-1.png' alt='' />
                </div>

                <div className={styles.text}>
                  <h3>সারাদেশে ডেলিভারী চার্জ ফ্রি</h3>
                </div>

                {/* border */}
                <div className={styles.delivary_border}>
                  <img src='/images/landing_1/delivary_border.png' alt='' />
                </div>
              </div>
            </Col>

            <Col lg={4} sm={4}>
              <div className={styles.delivary_item}>
                <div className={styles.img}>
                  <img src='/images/landing_1/delivary-2.png' alt='' />
                </div>

                <div className={styles.text}>
                  <h3>প্রিমিয়াম প্যাকেজিং</h3>
                </div>

                {/* border */}
                <div className={styles.delivary_border}>
                  <img src='/images/landing_1/delivary_border.png' alt='' />
                </div>
              </div>
            </Col>

            <Col lg={4} sm={4}>
              <div className={styles.delivary_item}>
                <div className={styles.img}>
                  <img src='/images/landing_1/delivary-3.png' alt='' />
                </div>

                <div className={styles.text}>
                  <h3>ক্যাশ অন ডেলিভারী</h3>
                </div>

                {/* border */}
                <div className={styles.delivary_border}>
                  <img src='/images/landing_1/delivary_border.png' alt='' />
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <div className={styles.fram}>
          <img src='/images/landing_1/delivary_fram.png' alt='' />
        </div>
      </section>

      {/* Price */}
      <section id={styles.price}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className={styles.price_img}>
                <img src='/images/landing_1/price_img.png' alt='' />
                <div className={styles.overlay_text}>
                  {editActive === false && <h2> {props.orderTitle}</h2>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.orderTitle}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.orderTitle = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='a'
                        style={{ fontSize: `${props.orderTitleFontSize}px` }}
                      />
                    </>
                  )}

                  {editActive === false && <h1>{props.productPrice} </h1>}

                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.productPrice}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.productPrice = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='a'
                        style={{ fontSize: `${props.orderTitleFontSize}px` }}
                      />
                    </>
                  )}
                  {editActive === true && (
                    <Form.Range
                      min={1}
                      style={{ width: "200px" }}
                      defaultvalue={props.orderTitleFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.orderTitleFontSize = e.target.value)
                        );
                      }}
                    />
                  )}

                  <Link href='' className={styles.bg} activeClass='active'>
                    অর্ডার করুন
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* section gaps */}
        <div className={styles.section_gaps} />
      </section>

      {/* Customiza */}
      <section id={styles.customized}>
        <Container>
          <Row className='justify-content-md-center'>
            <Col lg={6}>
              <div className={styles.header}>
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
                      tagName='a'
                      style={{ fontSize: `${props.sectionFontSize}px` }}
                    />
                  </>
                )}
                <br />
                {editActive === true && (
                  <Form.Range
                    min={1}
                    style={{ width: "200px" }}
                    defaultvalue={props.sectionFontSize}
                    max={50}
                    onChange={(e) => {
                      setProp(
                        (props) => (props.sectionFontSize = e.target.value)
                      );
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>

          <div className={styles.customized_content}>
            <Row>
              {/* item1 */}
              <Col lg={4} sm={6}>
                <div className={styles.customized_item}>
                  <div className={styles.customized_border}>
                    {/* img */}
                    <div className={styles.img}>
                      <img src='/images/landing_1/customize_sign.png' alt='' />
                    </div>

                    {/* Text */}
                    <div className={styles.text}>
                      {editActive === false && (
                        <h3>{props.whyChooseUsTittleOne}</h3>
                      )}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsTittleOne}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsTittleOne =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{
                              fontSize: `${props.productTitleFontSize}px`,
                            }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultvalue={props.productTitleFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) =>
                                (props.productTitleFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                      <br />
                      {editActive === false && <p>{props.whyChooseUsDecOne}</p>}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsDecOne}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsDecOne =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{ fontSize: `${props.desFontSize}px` }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultValue={props.desFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) => (props.desFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Col>

              {/* item2 */}
              <Col lg={4} sm={6}>
                <div className={styles.customized_item}>
                  <div className={styles.customized_border}>
                    {/* img */}
                    <div className={styles.img}>
                      <img src='/images/landing_1/customize_sign.png' alt='' />
                    </div>

                    {/* Text */}
                    <div className={styles.text}>
                      {editActive === false && (
                        <h3>{props.whyChooseUsTittleTwo}</h3>
                      )}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsTittleTwo}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsTittleTwo =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{
                              fontSize: `${props.productTitleFontSize}px`,
                            }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultvalue={props.productTitleFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) =>
                                (props.productTitleFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                      <br />
                      {editActive === false && <p>{props.whyChooseUsDecTwo}</p>}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsDecTwo}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsDecTwo =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{ fontSize: `${props.desFontSize}px` }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultValue={props.desFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) => (props.desFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Col>

              {/* item3 */}
              <Col lg={4} sm={6}>
                <div className={styles.customized_item}>
                  <div className={styles.customized_border}>
                    {/* img */}
                    <div className={styles.img}>
                      <img src='/images/landing_1/customize_sign.png' alt='' />
                    </div>

                    {/* Text */}
                    <div className={styles.text}>
                      {editActive === false && (
                        <h3>{props.whyChooseUsTittleThree}</h3>
                      )}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsTittleThree}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsTittleThree =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{
                              fontSize: `${props.productTitleFontSize}px`,
                            }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultvalue={props.productTitleFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) =>
                                (props.productTitleFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                      <br />
                      {editActive === false && (
                        <p>{props.whyChooseUsDecThree}</p>
                      )}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsDecThree}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsDecThree =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{ fontSize: `${props.desFontSize}px` }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultValue={props.desFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) => (props.desFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Col>

              {/* item4 */}
              <Col lg={4} sm={6}>
                <div className={styles.customized_item}>
                  <div className={styles.customized_border}>
                    {/* img */}
                    <div className={styles.img}>
                      <img src='/images/landing_1/customize_sign.png' alt='' />
                    </div>

                    {/* Text */}
                    <div className={styles.text}>
                      {editActive === false && (
                        <h3>{props.whyChooseUsTittleFour}</h3>
                      )}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsTittleFour}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsTittleFour =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{
                              fontSize: `${props.productTitleFontSize}px`,
                            }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultvalue={props.productTitleFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) =>
                                (props.productTitleFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                      <br />
                      {editActive === false && (
                        <p>{props.whyChooseUsDecFour}</p>
                      )}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsDecFour}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsDecFour =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{ fontSize: `${props.desFontSize}px` }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultValue={props.desFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) => (props.desFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Col>

              {/* item5 */}
              <Col lg={4} sm={6}>
                <div className={styles.customized_item}>
                  <div className={styles.customized_border}>
                    {/* img */}
                    <div className={styles.img}>
                      <img src='/images/landing_1/customize_sign.png' alt='' />
                    </div>

                    {/* Text */}
                    <div className={styles.text}>
                      {editActive === false && (
                        <h3>{props.whyChooseUsTittleFive}</h3>
                      )}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsTittleFive}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsTittleFive =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{
                              fontSize: `${props.productTitleFontSize}px`,
                            }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultvalue={props.productTitleFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) =>
                                (props.productTitleFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                      <br />
                      {editActive === false && (
                        <p>{props.whyChooseUsDecFive}</p>
                      )}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsDecFive}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsDecFive =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{ fontSize: `${props.desFontSize}px` }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultValue={props.desFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) => (props.desFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Col>

              {/* item 6*/}
              <Col lg={4} sm={6}>
                <div className={styles.customized_item}>
                  <div className={styles.customized_border}>
                    {/* img */}
                    <div className={styles.img}>
                      <img src='/images/landing_1/customize_sign.png' alt='' />
                    </div>

                    {/* Text */}
                    <div className={styles.text}>
                      {editActive === false && (
                        <h3>{props.whyChooseUsTittleSix}</h3>
                      )}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsTittleSix}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsTittleSix =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{
                              fontSize: `${props.productTitleFontSize}px`,
                            }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultvalue={props.productTitleFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) =>
                                (props.productTitleFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                      <br />
                      {editActive === false && <p>{props.whyChooseUsDecSix}</p>}
                      {editActive === true && (
                        <>
                          <ContentEditable
                            html={props.whyChooseUsDecSix}
                            onChange={(e) =>
                              setProp(
                                (props) =>
                                  (props.whyChooseUsDecSix =
                                    e.target.value.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    ))
                              )
                            }
                            tagName='a'
                            style={{ fontSize: `${props.desFontSize}px` }}
                          />
                        </>
                      )}
                      <br />
                      {editActive === true && (
                        <Form.Range
                          min={1}
                          style={{ width: "200px" }}
                          defaultValue={props.desFontSize}
                          max={50}
                          onChange={(e) => {
                            setProp(
                              (props) => (props.desFontSize = e.target.value)
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Video */}
      <section id={styles.video}>
        {/* section gaps */}
        <div className={styles.section_gaps} />

        <Container>
          <Row className='justify-content-md-center'>
            <Col lg={10}>
              <div className={styles.video_item}>
                {/* <ReactPlayer controls muted={true} playing={true} url='' /> */}
              </div>
            </Col>
          </Row>
        </Container>

        {/* section gaps */}
        <div className={styles.section_gaps} />
      </section>

      {/* OrderPrice */}
      <section id={styles.price} className={styles.order}>
        <Container>
          <Row className='justify-content-md-center'>
            <Col lg={9} sm={12}>
              <div className={styles.price_img}>
                <img src='/images/landing_1/order.png' alt='' />

                <div className={styles.overlay_text}>
                  {editActive === false && (
                    <Link href='' activeClass='active' className={styles.bg}>
                      {props.buttonInnerText}
                    </Link>
                  )}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.buttonInnerText}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.buttonInnerText = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='a'
                        style={{
                          fontSize: `${props.buttonFontSize}px`,
                          color: "#fff",
                        }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      min={1}
                      style={{ width: "200px" }}
                      defaultvalue={props.buttonFontSize}
                      max={50}
                      onChange={(e) => {
                        setProp(
                          (props) => (props.buttonFontSize = e.target.value)
                        );
                      }}
                    />
                  )}

                  <br />
                  {editActive === false && <h1>{props.productPrice}</h1>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.productPrice}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.productPrice = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='a'
                        style={{
                          fontSize: `${props.fontSize}px`,
                          color: "#fff",
                        }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.fontSize}
                      max={50}
                      onChange={(e) => {
                        setProp((props) => (props.fontSize = e.target.value));
                      }}
                    />
                  )}

                  <br />

                  {editActive === false && <h2>{props.deliveryType}</h2>}
                  {editActive === true && (
                    <>
                      <ContentEditable
                        html={props.deliveryType}
                        onChange={(e) =>
                          setProp(
                            (props) =>
                              (props.deliveryType = e.target.value.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                              ))
                          )
                        }
                        tagName='a'
                        style={{
                          fontSize: `${props.fontSize}px`,
                          color: "#fff",
                        }}
                      />
                    </>
                  )}
                  <br />
                  {editActive === true && (
                    <Form.Range
                      style={{ width: "200px" }}
                      min={1}
                      defaultvalue={props.fontSize}
                      max={50}
                      onChange={(e) => {
                        setProp((props) => (props.fontSize = e.target.value));
                      }}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* section gaps */}
        <div className={styles.section_gaps} />
      </section>

      {/* Gallery */}
      <section id={styles.customized} className={styles.gallery}>
        <div className={styles.overlay_img}>
          <img src='/images/landing_1/gal_fram.png' alt='' />
        </div>

        <Container>
          <Row className='justify-content-md-center'>
            <Col lg={6}>
              <div className={styles.header}>
                {editActive === false && <h2>{props.productDescription}</h2>}
                {editActive === true && (
                  <>
                    <ContentEditable
                      html={props.productDescription}
                      onChange={(e) =>
                        setProp(
                          (props) =>
                            (props.productDescription = e.target.value.replace(
                              /<\/?[^>]+(>|$)/g,
                              ""
                            ))
                        )
                      }
                      tagName='a'
                      style={{
                        fontSize: `${props.sectionFontSize}px`,
                      }}
                    />
                  </>
                )}
                <br />
                {editActive === true && (
                  <Form.Range
                    style={{ width: "200px" }}
                    min={1}
                    defaultvalue={props.sectionFontSize}
                    max={50}
                    onChange={(e) => {
                      setProp(
                        (props) => (props.sectionFontSize = e.target.value)
                      );
                    }}
                  />
                )}
              </div>
            </Col>
          </Row>

          {/* customized */}
          <div className={styles.gallery_content}>
            <Row>
              <Col lg={4} sm={4}>
                <div className={styles.gallery_item}>
                  {/* img1 */}
                  <div className='gal_img'>
                    <img
                      src={
                        gallery_1 === undefined
                          ? "/images/landing_1/gal-1.png"
                          : gallery_1
                      }
                      alt=''
                    />
                    {editActive === true && (
                      <>
                        {" "}
                        <input
                          type='file'
                          id='file'
                          onChange={handleChangegallery_1}
                          ref={gallery_1_inputFile}
                          style={{ display: "none" }}
                        />
                        <span
                          style={{ marginLeft: "4px", cursor: "pointer" }}
                          onClick={ongallery_1ButtonClick}
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
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={4}>
                <div className={styles.gallery_item}>
                  {/* img 2*/}
                  <div className={styles.gal_img}>
                    <img src='/images/landing_1/gal-2.png' alt='' />
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={4}>
                <div className={styles.gallery_item}>
                  {/* img3 */}
                  <div className={styles.gal_img}>
                    <img src='/images/landing_1/gal-3.png' alt='' />
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={4}>
                <div className={styles.gallery_item}>
                  {/* img 4*/}
                  <div className={styles.gal_img}>
                    <img src='/images/landing_1/gal-4.png' alt='' />
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={4}>
                <div className={styles.gallery_item}>
                  {/* img5 */}
                  <div className={styles.gal_img}>
                    <img src='/images/landing_1/gal-1.png' alt='' />
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={4}>
                <div className={styles.gallery_item}>
                  {/* img6 */}
                  <div className={styles.gal_img}>
                    <img src='/images/landing_1/gal-2.png' alt='' />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Customer Review */}

      {/* Mobil Delivary */}
      <section id={styles.delivary} className={styles.MobileDelivary}>
        <Container>
          <Row className='d_flex'>
            <Col lg={4} sm={4}>
              <div className={styles.delivary_item}>
                <div className={styles.img}>
                  <img src='/images/landing_1/delivary-1.png' alt='' />
                </div>

                <div className={styles.text}>
                  <h3>সারাদেশে ডেলিভারী চার্জ ফ্রি</h3>
                </div>

                {/* border */}
                <div className={styles.delivary_border}>
                  <img src='/images/landing_1/delivary_border.png' alt='' />
                </div>
              </div>
            </Col>

            <Col lg={4} sm={4}>
              <div className={styles.delivary_item}>
                <div className={styles.img}>
                  <img src='/images/landing_1/delivary-2.png' alt='' />
                </div>

                <div className={styles.text}>
                  <h3>প্রিমিয়াম প্যাকেজিং</h3>
                </div>

                {/* border */}
                <div className={styles.delivary_border}>
                  <img src='/images/landing_1/delivary_border.png' alt='' />
                </div>
              </div>
            </Col>

            <Col lg={4} sm={4}>
              <div className={styles.delivary_item}>
                <div className={styles.img}>
                  <img src='/images/landing_1/delivary-3.png' alt='' />
                </div>

                <div className={styles.text}>
                  <h3>ক্যাশ অন ডেলিভারী</h3>
                </div>

                {/* border */}
                <div className={styles.delivary_border}>
                  <img src='/images/landing_1/delivary_border.png' alt='' />
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <div className={styles.fram}>
          <img src='/images/landing_1/delivary_fram.png' alt='' />
        </div>
      </section>

      {/* Desktop Delivary */}
      <section id={styles.customer_review}>
        {/* section gaps */}
        <div className={styles.section_gaps} />

        <Container>
          <Row className='justify-content-md-center'>
            <Col lg={6}>
              <div className='header text-center'>
                <h2>আমাদের কাস্টমার রিভিউ</h2>
              </div>
            </Col>
          </Row>

          {/* video */}
          <div className='customer_review_content ReviewSlider'>
            <Row>
              <Col lg={12}>
                <Swiper
                  breakpoints={{
                    650: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    651: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    1000: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className='mySwiper'
                >
                  <SwiperSlide>
                    <div className={styles.video}>
                      {/* <ReactPlayer controls={true} muted={true} url='' /> */}
                    </div>
                  </SwiperSlide>
                </Swiper>
              </Col>
            </Row>
          </div>

          {/* photo */}
          <div className={styles.customer_review_content}>
            <Row>
              <Col lg={6} sm={6}>
                <div className={styles.img}>
                  <img src='/images/landing_1/review-1.png' alt='' />
                </div>
              </Col>

              <Col lg={6} sm={6}>
                <div className={styles.img}>
                  <img src='/images/landing_1/review-1.png' alt='' />
                </div>
              </Col>

              <Col lg={6} sm={6}>
                <div className={styles.img}>
                  <img src='/images/landing_1/review-1.png' alt='' />
                </div>
              </Col>

              <Col lg={6} sm={6}>
                <div className={styles.img}>
                  <img src='/images/landing_1/review-1.png' alt='' />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>



      {/* From Part */}
      {/* <section id='form_part'>
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
                        <span style={{ color: "red" }}>Name is required</span>
                      )}
                    </div>


                    <div className='custome_input'>
                      <label>
                        আপনার মোবাইল নাম্বার লিখুন <span>*</span>
                      </label>
                      <input
                        {...register(
                          "customerMobile",
                          { required: true },
                          { min: 11, max: 15 }
                        )}
                        type='text'
                        placeholder=' আপনার মোবাইল নাম্বার লিখুন'
                      />
                      {errors.customerMobile && (
                        <span style={{ color: "red" }}>
                          Valid Mobile Number require
                        </span>
                      )}
                    </div>


                    <div className='custome_input'>
                      <label>
                        আপনার সম্পূর্ণ ঠিকানা লিখুন <span>*</span>
                      </label>
                      <input
                        {...register("customerAddress", { required: true })}
                        type='text'
                        placeholder=' আপনার সম্পূর্ণ ঠিকানা লিখুন'
                      />
                      {errors.customerAddress && (
                        <span style={{ color: "red" }}>
                          Address is required
                        </span>
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

                          <div className='middle'>
                            <Select
                              onChange={setQuantity}
                              options={options}
                              placeholder='1'
                            />
                          </div>

                          <div className='amount'>
                            <h3> Tk {product?.price}</h3>
                          </div>
                        </li>
                        <li className='d_flex d_justify'>
                          <h5>Subtotal</h5>
                          <h5>Tk {productQuantity * product?.price}</h5>
                        </li>
                        <li className='d_flex d_justify'>
                          <h3>Total</h3>
                          <h3>Tk {productQuantity * product?.price}</h3>
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
                        <i className='fas fa-lock' /> Place Order ৳ Tk{" "}
                        {productQuantity * product?.price}
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </section> */}




      <section className='OrderConfirmFrom'>
        <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>

              {/* left */}
              <Col lg={7}>
                <div className='OrderConfirmLeft'>
                  <h3>Billing details</h3>

                  <div className='CustomeInput'>
                  <input
                        {...register("customerName", { required: true })}
                        type='text'
                        placeholder=' আপনার নাম লিখুন'
                      />
                      {errors.customerName && (
                        <span style={{ color: "red" }}>Name is required</span>
                      )}
                  </div>

                  <div className='CustomeInput'>
                  <input
                        {...register(
                          "customerMobile",
                          { required: true },
                          { min: 11, max: 15 }
                        )}
                        type='text'
                        placeholder=' আপনার মোবাইল নাম্বার লিখুন'
                      />
                      {errors.customerMobile && (
                        <span style={{ color: "red" }}>
                          Valid Mobile Number require
                        </span>
                      )}
                  </div>

                  <div className='CustomeInput'>
                  <input
                        {...register("customerAddress", { required: true })}
                        type='text'
                        placeholder=' আপনার সম্পূর্ণ ঠিকানা লিখুন'
                      />
                      {errors.customerAddress && (
                        <span style={{ color: "red" }}>
                          Address is required
                        </span>
                      )}
                  </div>

                  {/* Payment */}
                  <div className='Payment'>
                    <h3>Paymet</h3>

                    <div className='CustomeInput d_flex'>
                      <input type='checkbox' name='' id='CashOn' />
                      <label htmlFor='CashOn'>ক্যাশ অন ডেলিভারি</label>
                    </div>

                    <div className='ArrowBg'>
                      <p>Pay with cash on delivery.</p>
                    </div>
                  </div>
                </div>
              </Col>

              {/* right */}
              <Col lg={5}>
                <div className='OrderConfirmRight'>
                  <h3>Your order</h3>

                  <ul>
                    <li>
                      <h4>Product</h4>
                      <h5>Subtotal</h5>
                    </li>

                    <li>
                      <div className='left d_flex'>
                        <div className='img'>
                          <img src={product?.main_image?.name} alt='' />
                        </div>

                        <p>{product?.product_name}</p>
                      </div>

                      <div className='right d_flex'>
                        <input type='number'  onChange={handleQuantityChange}  defaultValue={1} min={1}/>

                        <h5>{product?.price}</h5>
                      </div>
                    </li>

                    <li>
                      <h5>Subtotal</h5>
                      <h5>{quantity * product?.price}</h5>
                    </li>

                    <li>
                      <h4>Total</h4>
                      <h4>{quantity * product?.price}</h4>
                    </li>
                  </ul>

                  <button type='submit'>
                    {" "}
                    <RiShoppingCart2Line />
                     Place Order {quantity * product?.price}
                  </button>
                </div>
              </Col>
          </Row>
          </form>
        </Container>
      </section>

      {/* Fotoer */}
      <section id={styles.Footer}>
        <div className={styles.footerLeft}>
          <img src='/images/landing_1/footer_left.png' alt='' />
        </div>

        <div className={styles.footerRight}>
          <img src='/images/landing_1/footer_right.png' alt='' />
        </div>

        <Container>
          <Row>
            <Col lg={4} sm={4}>
              <div className={styles.FooterContent}>
                <h3>প্রয়োজনে কল করুন</h3>

                <ul>
                  <li className='d_flex'>
                    <BiPhoneCall /> <a href='tel:018100-45255'>018100-45255</a>{" "}
                  </li>
                </ul>

                {/* Social Icon */}
                <div className={styles.SocialIcon}>
                  <Link href='#' className={styles.fb}>
                    {" "}
                    <FaFacebookF />{" "}
                  </Link>
                  <a href='#' className={styles.youtube}>
                    {" "}
                    <AiFillYoutube />{" "}
                  </a>
                  <a href='#' className={styles.instagram}>
                    {" "}
                    <AiOutlineInstagram />{" "}
                  </a>
                  <a href='#' className={styles.twitter}>
                    {" "}
                    <BsTwitter />{" "}
                  </a>
                </div>
              </div>
            </Col>

            <Col lg={4} sm={4}>
              <div className={styles.FooterContent}>
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
              <div className={styles.FooterContent}>
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
        </Container>
      </section>
    </div>
  );
};

export default LandingOne;
