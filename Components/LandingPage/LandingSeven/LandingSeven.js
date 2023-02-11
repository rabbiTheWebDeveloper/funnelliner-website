import React, { useState, useEffect } from "react";
import styles from "../../../styles/landing_seven/landing_seven.module.css";
import Link from "next/link";
// import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsCameraReels } from "react-icons/bs";
import { GiDeliveryDrone } from "react-icons/gi";
import {
  IoGameControllerOutline,
  IoBatteryChargingOutline,
} from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiShoppingCart2Line } from "react-icons/ri";

import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";
// lightgalary

export default function LandingSeven() {
  const [product, setProduct] = useState({});
  const [shopID, setShopID] = useState();
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
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
    console.log("postBody", data);
    const postBody = {
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
  return (
    <div className={styles.LandingSeven}>
      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.Banner}>
        <Container fluid>
          <div className={styles.logoBox}>
            <img src='/images/landing_7/logo.svg' alt='img' />
          </div>
          {/* for Small device */}
          <Container>
            <div className={styles.bgImgIcon3Small}>
              <img src='/images/landing_7/d3.png' alt='' />
            </div>
          </Container>
          {/* for Small device  end*/}
          <Row>
            <Col xs={5} className={styles.myColBlank}></Col>
            <Col xs={12} md={7}>
              <div className={`${styles.textBoxBg} ${styles.bgImgIconBox}`}>
                <div className={styles.bgImgIcon1}>
                  <img src='/images/landing_7/d1.svg' alt='drone' />
                </div>
                <div className={styles.bgImgIcon2}>
                  <img src='/images/landing_7/d2.svg' alt='drone' />
                </div>

                <p>Get The Best Drone</p>

                <h1>
                  For The <span>Video Shoot </span> <br />& Photography
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner  ---2
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <Row className={styles.DronemainBox}>
        <Col xs={5} xl={4} xxl={4} xxxl={2} className={styles.bgImgIcon3}>
          <img
            className={styles.myDroneImg}
            src='/images/landing_7/d3.png'
            alt='drone'
          />
        </Col>
      </Row>

      <section className={styles.Banner2}>
        <Container>
          <Row>
            <Col xs={12} md={3} lg={5}></Col>

            <Col xs={12} md={9} lg={7}>
              <div className={styles.banner2Txt}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh
                  diam velit velit aliquam. Aliquam lorem risus a neque, ligula
                  hac hendrerit lectus. Eget et sit suspendisse elementum vitae.
                </p>
                <h2>BDT 29,500</h2>
              </div>

              <div className={styles.myButtonBox}>
                <Link href='#' className={styles.bg}>
                  {" "}
                  <AiOutlineShoppingCart />
                  Order Now
                </Link>
                <Link href='#' className={styles.BtnOrderNow2}>
                  Contact Us
                </Link>
              </div>

              {/* <div className={styles.squareboxDivMain}>
                            <div className={styles.squareboxDiv}></div>
                            <div className={styles.squareboxDiv}></div>
                            <div className={styles.squareboxDiv}></div>
                            <div className={styles.squareboxDiv}></div>
                        </div> */}
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner---3
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.bannerThree}>
        <Container>
          <div className={styles.banner3TopTxt}>
            <h2>Best Feature Drone </h2>
            <div>
              <img src='/images/landing_7/d4.svg' alt='Img' />
            </div>
          </div>

          <Row>
            <Col xs={12} sm={12} md={6} className={styles.Columanpading}>
              <Row>
                <Col xs={12} sm={3}>
                  <div>
                    <div className={styles.IcodBorderDev}>
                      <BsCameraReels className={styles.Banner3Icon} />
                      <div className={styles.icon3SideImg}>
                        {" "}
                        <img src='/images/landing_7/d5.svg' alt='img' />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={9}>
                  <div className={styles.myIcontxtBox}>
                    <h2>4K Video Quality</h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit.
                      Nibh diam velit velit aliquam.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={6} className={styles.Columanpading}>
              <Row>
                <Col xs={12} sm={3}>
                  <div>
                    <div className={styles.IcodBorderDev}>
                      <GiDeliveryDrone className={styles.Banner3Icon} />
                      <div className={styles.icon3SideImg}>
                        {" "}
                        <img src='/images/landing_7/d5.svg' alt='img' />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={9}>
                  <div className={styles.myIcontxtBox}>
                    <h2>Best Stabilization</h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit.
                      Nibh diam velit velit aliquam.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={6} className={styles.Columanpading}>
              <Row>
                <Col xs={12} sm={3}>
                  <div>
                    <div className={styles.IcodBorderDev}>
                      <IoGameControllerOutline className={styles.Banner3Icon} />
                      <div className={styles.icon3SideImg}>
                        {" "}
                        <img src='/images/landing_7/d5.svg' alt='img' />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={9}>
                  <div className={styles.myIcontxtBox}>
                    <h2>Full 360 Degree Control</h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit.
                      Nibh diam velit velit aliquam.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={6} className={styles.Columanpading}>
              <Row>
                <Col xs={12} sm={3}>
                  <div>
                    <div className={styles.IcodBorderDev}>
                      <IoBatteryChargingOutline
                        className={styles.Banner3Icon}
                      />
                      <div className={styles.icon3SideImg}>
                        {" "}
                        <img src='/images/landing_7/d5.svg' alt='img' />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={9}>
                  <div className={styles.myIcontxtBox}>
                    <h2>Day-Long Battery Life</h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit.
                      Nibh diam velit velit aliquam.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner---4
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.banner4Sec}>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <div className={styles.vidioBox}>
                <div className={styles.borderDev}>
                  <img src='/images/landing_7/d16.png' alt='' />

                  {/* <iframe width="" height="497" src="https://www.youtube.com/embed/I19QtXQGIUw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <div className={styles.banner4Txt}>
                <h2>
                  Fly In The Sky With The <span>Best Video Footage</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh
                  diam velit velit aliquam. Aliquam lorem risus a neque, ligula
                  hac hendrerit lectus. Eget et sit suspendisse elementum vitae.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <br />
                <p>
                  Nibh diam velit velit aliquam. Aliquam lorem risus a neque,
                  ligula hac hendrerit lectus. Eget et sit suspendisse elementum
                  vitae. Lorem ipsum dolor sit amet, consectetur dipiscing elit.
                  Nibh diam velit velit aliquam.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner--5
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.Banner5sec}>
        <Container fluid className={styles.Container5}>
          <div className={styles.Banner5Padding}>
            <Row>
              <Col xs={12} sm={12} md={7}>
                <div className={styles.banner3TopTxt2}>
                  <h2 className={styles.Sec5h2}>Deal Of The Day</h2>
                  <div>
                    <img src='/images/landing_7/d6.svg' alt='Img' />
                  </div>
                </div>
                <div className={styles.banner3TopTxt3}>
                  <h3>
                    DJI Phantom{" "}
                    <span className={styles.h3span}>
                      4 Pro V2.0 Cinematography Drone
                    </span>
                  </h3>
                  <h4>BDT 2,90,500</h4>
                  <h5>BDT 2,90,500</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nibh diam velit velit aliquam. Aliquam lorem risus a neque,
                    ligula hac hendrerit lectus.
                  </p>
                </div>
                {/* className={styles.myButtonBox} */}
                <div className={`${styles.btndiv2} ${styles.myButtonBox}`}>
                  <Link
                    href='#'
                    className={`${styles.BtnOrderNow2} ${styles.BtnOrderNow3}`}
                  >
                    {" "}
                    <AiOutlineShoppingCart />
                    Order Now
                  </Link>
                  <Link href='#' className={styles.Costombtn}>
                    Contact Us
                  </Link>
                </div>
              </Col>
              <Col xs={12} sm={12} md={5}>
                <div className={styles.imgBorder5}>
                  <img src='/images/landing_7/d7.png' alt='img' />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner--6
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.section6}>
        <Container>
          <div className={styles.banner3TopTxt6}>
            <h2>Photos Taken From This Drone</h2>
            <div>
              <img src='/images/landing_7/d4.svg' alt='Img' />
            </div>
          </div>

          {/* Light gelary start */}

          {/* Light gelary end */}

          <Row className={styles.Banner6Img}>
            <Col className={styles.myImg} xs={12} sm={6} md={3}>
              <div>
                {" "}
                <Link href='/images/landing_7/d8.png'>
                  {" "}
                  <img src='/images/landing_7/d8.png' alt='img' />{" "}
                </Link>{" "}
              </div>
            </Col>
            <Col className={styles.myImg} xs={12} sm={6} md={3}>
              <div>
                {" "}
                <Link href='/images/landing_7/d9.png'>
                  {" "}
                  <img src='/images/landing_7/d9.png' alt='img' />{" "}
                </Link>
              </div>
            </Col>
            <Col className={styles.myImg} xs={12} sm={6} md={3}>
              <div>
                {" "}
                <Link href='/images/landing_7/d10.png'>
                  {" "}
                  <img src='/images/landing_7/b10.png' alt='img' />{" "}
                </Link>
              </div>
            </Col>
            <Col className={styles.myImg} xs={12} sm={6} md={3}>
              <div>
                {" "}
                <Link href='/images/landing_7/d11.png'>
                  {" "}
                  <img src='/images/landing_7/b11.png' alt='img' />{" "}
                </Link>
              </div>
            </Col>
            <Col className={styles.myImg} xs={12} sm={6} md={3}>
              <div>
                {" "}
                <Link href='/images/landing_7/d12.png'>
                  {" "}
                  <img src='/images/landing_7/b12.png' alt='img' />{" "}
                </Link>
              </div>
            </Col>
            <Col className={styles.myImg} xs={12} sm={6} md={3}>
              <div>
                {" "}
                <Link href='/images/landing_7/d13.png'>
                  {" "}
                  <img src='/images/landing_7/b13.png' alt='img' />{" "}
                </Link>
              </div>
            </Col>
            <Col className={styles.myImg} xs={12} sm={6} md={3}>
              <div>
                {" "}
                <Link href='/images/landing_7/d14.png'>
                  {" "}
                  <img src='/images/landing_7/b14.png' alt='img' />
                </Link>
              </div>
            </Col>
            <Col className={styles.myImg} xs={12} sm={6} md={3}>
              <div>
                {" "}
                <Link href='/images/landing_7/d15.png'>
                  <img src='/images/landing_7/b15.png' alt='img' />
                </Link>{" "}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        OrderConfirmFrom--
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.section_gaps}></section>

      <section className='OrderConfirmFrom'>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {/* left */}
              <Col lg={7}>
                <div className='OrderConfirmLeft'>
                  <h3>Billing details</h3>

                  <div className='CustomeInput'>
                  <input type="text"
                    {...register("customerName", { required: true })}
                  placeholder='আপনার নাম লিখুন *' />
                    {errors.customerName && (
                      <span style={{ color: "red" }}>Name is required</span>
                    )}
                  </div>

                  <div className='CustomeInput'>
                  <input type="text"
                   {...register(
                    "customerMobile",
                    { required: true },
                    { min: 11, max: 15 }
                  )}
                   placeholder='আপনার মোবাইল নাম্বার লিখুন *' />
                   {errors.customerMobile && (
                      <span style={{ color: "red" }}>
                        Valid Mobile Number require
                      </span>
                    )}
                  </div>

                  <div className='CustomeInput'>
                  <input
                   {...register("customerAddress", { required: true })}
                   type="text"  placeholder='আপনার সম্পূর্ণ ঠিকানা লিখুন *' />
                    {errors.customerAddress && (
                      <span style={{ color: "red" }}>Address is required</span>
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
                      <input type='number'
                       onChange={handleQuantityChange}
                       defaultValue={1}
                       min={1} />

                        <h5>BDT {product?.price}</h5>
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

                  <button>
                    {" "}
                    <RiShoppingCart2Line /> Place Order BDT {quantity * product?.price}
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner  -- Footer
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.footerSection}>
        <Container>
          <div className={styles.banner3TopTxtF}>
            <h2>Join Us On Our Social Media</h2>
            <div>
              <img src='/images/landing_7/d4.svg' alt='Img' />
            </div>
          </div>

          {/* <div>
                <div className={styles.imgBoxFooter}>
                  <Link href="#"> <img src="/images/landing_7/facebook.png" alt="img" /> </Link>
                  <Link href="#"> <img src="/images/landing_7/youtube.png" alt="img" /></Link>
                  <Link href="#"> <img src="/images/landing_7/instagram.png" alt="img" /> </Link>
                  <Link href="#"> <img src="/images/landing_7/twiter.png" alt="img" /> </Link>
                </div>
            </div> */}

          {/* <!--Icon Hover Effect 2--> */}

          <div className={styles.hovereffect2}>
            <ul>
              <li>
                <Link href='#' title='Facebook'>
                  <img src='/images/landing_7/facebook.png' alt='img' />{" "}
                </Link>
              </li>
              <li>
                <Link href='#' title='Youtube'>
                  <img src='/images/landing_7/youtube.png' alt='img' />{" "}
                </Link>
              </li>
              <li>
                <Link href='#' title='Instagram'>
                  <img src='/images/landing_7/instagram.png' alt='img' />{" "}
                </Link>
              </li>
              <li>
                <Link href='#' title='Twiter'>
                  <img src='/images/landing_7/twiter.png' alt='img' />{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.lastlogo}>
            <div>
              <img src='/images/landing_7/logoend.png' alt='Img'></img>
            </div>
          </div>

          {/* <div className={styles.lastlinks}>
              <Link href="#">Terms & Condition</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">FAQs</Link>
          </div> */}
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
    </div>
  );
}
