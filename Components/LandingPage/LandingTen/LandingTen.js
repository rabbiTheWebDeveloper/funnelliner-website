import React, { useState, useEffect } from "react";
import Link from "next/link";
// import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../../styles/landing_ten/landing_ten.module.css";
import { AiOutlineShoppingCart, AiOutlineInstagram } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { FiMail, FiFacebook, FiTwitter } from "react-icons/fi";
import { RiShoppingCart2Line } from "react-icons/ri";

// FiMail
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";

export default function LandingTen() {
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
  

  //order submit
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
    <div className={styles.LandingTen}>
      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.banner}>
        <Container>
          <Row className={styles.Rowrvs}>
            <Col xs={12} sm={12} md={6} className={styles.ClmPad}>
              <div className={styles.topImg}>
                <img
                  className={styles.topImg1}
                  src='/images/landing_10/b1.svg'
                  alt='img'
                />
              </div>

              <div className={styles.TopTxtdev}>
                <div className={styles.logo}>
                  <img src='/images/landing_10/logo.svg' alt='img' />
                </div>
                <h1>জান্নাতে চাবি কুরআন মজিদ পড়ুন সহজ সরল পবিত্র জীবন গড়ুন</h1>
                <span className={styles.span1}>
                  বাংলা অনুবাদ ও সংক্ষিপ্ত তফসীর
                </span>
                <h5>পূর্বের হাদিয়া ১,৭৯০/- টাকা</h5>
                <h4>
                  অফারে হাদিয়া <span className={styles.span2}>১,৪৮০ টাকা</span>
                </h4>
              </div>
            </Col>

            {/*Col----------------------------------------2  */}

            <Col xs={12} sm={12} md={6} className={styles.ClmPad}>
              <div className={styles.logo2}>
                <img src='/images/landing_10/logo.svg' alt='img' />
              </div>

              <div className={styles.topImg2}>
                <img
                  className={styles.topImg4}
                  src='/images/landing_10/b2.svg'
                  alt='img'
                />
              </div>

              <div className={styles.TopTxtdev2}>
                <div className={styles.mainImglogo}>
                  <img src='/images/landing_10/b.png' alt='img' />
                  <div className={styles.Imgrelativ}>
                    <div className={styles.ImgAbsolote}>
                      <span className={styles.persentxt}>
                        {" "}
                        40% <br /> ছাড়{" "}
                      </span>
                      <img src='/images/landing_10/b4.svg' alt='img' />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.topImg3}>
                <img
                  className={styles.topImg4}
                  src='/images/landing_10/b3.svg'
                  alt='img'
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner-  2
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section>
        <Container fluid className={styles.secBanner2}>
          <div className={styles.banner2}>
            <ul>
              <li>
                {" "}
                <Link href='#' className={styles.bg}>
                  {" "}
                  <AiOutlineShoppingCart />
                  Order Now
                </Link>
              </li>
              <li>হটলাইন: 01600-324567</li>
              <li>
                {" "}
                <span className={styles.myWhatsapp}>Whats App:</span>{" "}
                01600-324567
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner----3
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section>
        <Container fluid className={styles.PaddCon}>
          <div className={styles.banner3bg}>
            <h2>
              আল-কুরআনুল-কারীম কিতাব কেন পড়বেন? কেন প্রত্যেক মুসলমান জানা দরকার
              বা পরিবারে থাকা উচিত?
            </h2>
            <div className={styles.banAbsoluteMain1}>
              <Container fluid className={styles.banAbsoluteMain}>
                <Container className={styles.banAbsolute}>
                  <Row>
                    <Col xs={12} sm={6} md={4}>
                      <div className={styles.OverflowH}>
                        <div className={styles.cardDiv}>
                          <img src='/images/landing_10/b5.svg' alt='img'></img>
                          <p>
                            {" "}
                            ব্যস্ততার কারণে যারা কোরআন শিখতে পারছেন না তাদের কথা
                            মাথায় রেখে খুব সহজ পদ্ধতিতে কুরআনের কায়দা কানুন
                            শিখতে পারবেন ।{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                      <div className={styles.OverflowH}>
                        <div className={styles.cardDiv}>
                          <img src='/images/landing_10/b5.svg' alt='img'></img>
                          <p>
                            {" "}
                            যারা আল্লাহর সান্নিধ্য পেতে চান দুনিয়া ও আখেরাতে সহী
                            ভাবে নামাজ পড়তে চান এই কিতাব তাদের জন্য।{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                      <div className={styles.OverflowH}>
                        <div className={styles.cardDiv}>
                          <img src='/images/landing_10/b5.svg' alt='img'></img>
                          <p>
                            {" "}
                            সর্বস্তরের মানুয়ের কথা বিবেচনায় রেখে আনুবাদটি করা
                            হয়েছে। ভাষাকে এতটুকু সহজ-সরল ও প্রাঞ্জল রাখার
                            চেষ্টা করা হয়েছে ।{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                      <div className={styles.OverflowH}>
                        <div className={styles.cardDiv}>
                          <img src='/images/landing_10/b5.svg' alt='img'></img>
                          <p>
                            {" "}
                            মা-বাবা, আত্বীয় স্বজন, সহকর্মী শ্রেষ্ট উপহার হিসেবে
                            আল কুরআন দিতে পারেন। আপনার জন্য সদকায়ে জারিয়ার উছিলা
                            হবে।{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                      <div className={styles.OverflowH}>
                        <div className={styles.cardDiv}>
                          <img src='/images/landing_10/b5.svg' alt='img'></img>
                          <p>
                            {" "}
                            মানব জীবনের বিভিন্ন বিষয় নিয়ে কুরআনে আল্লাহপাক কি
                            বলেছেন সেই বিষয়ের নিয়ে সহজেই সূচি পত্র থেকে খুঁজে
                            পাবেন।{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                      <div className={styles.OverflowH}>
                        <div className={styles.cardDiv}>
                          <img src='/images/landing_10/b5.svg' alt='img'></img>
                          <p>
                            {" "}
                            ব্যস্ততার কারণে যারা কোরআন শিখতে পারছেন না তাদের কথা
                            মাথায় রেখে খুব সহজ পদ্ধতিতে কুরআনের কায়দা কানুন
                            শিখতে পারবেন ।{" "}
                          </p>
                        </div>
                      </div>
                    </Col> 
                  </Row>
                </Container>
              </Container>
            </div>
            <div className={styles.FloatSolve}></div>
          </div>
         
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner--3
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.section3}>
        <Container>
          <div className={styles.sec3txtDiv}>
            <div className={styles.linkdiv}>
              {" "}
              <Link href='#' className={styles.bg}>
                {" "}
                <AiOutlineShoppingCart />
                Order Now
              </Link>
            </div>
            <h2>
              দেশজুড়ে সারা বাংলাদেশে ফ্রি হোম ডেলিভারি এবং কুরিয়ার মাধ্যমেও বই
              পাঠানো হয়
            </h2>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner-4
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.section4}>
        <Container fluid className={styles.Consection4}>
          <Row>
            <Col xs={12} sm={6}>
              <div className={styles.Sec4Img}>
                <img src='/images/landing_10/b6.png' alt='img'></img>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className={styles.B4reltive}>
                <div className={styles.B4Absolutimg}>
                  <img src='/images/landing_10/b10.svg' alt='img' />
                </div>
              </div>

              <div className={styles.Sec4ul}>
                <ul>
                  <li>
                    <img
                      className={styles.liImg}
                      src='/images/landing_10/b7.svg'
                      alt='img'
                    />{" "}
                    <span className={styles.liTxt}>
                      প্রকাশকঃ সৌদি কিং ফাহাদ অরজিনাল{" "}
                    </span>
                  </li>
                  <li>
                    <img
                      className={styles.liImg}
                      src='/images/landing_10/b7.svg'
                      alt='img'
                    />{" "}
                    <span className={styles.liTxt}>বাংলা অনুবাদ</span>
                  </li>
                  <li>
                    <img
                      className={styles.liImg}
                      src='/images/landing_10/b7.svg'
                      alt='img'
                    />{" "}
                    <span className={styles.liTxt}>ভাষাঃ আরবী ও বাংলা </span>
                  </li>
                  <li>
                    <img
                      className={styles.liImg}
                      src='/images/landing_10/b7.svg'
                      alt='img'
                    />{" "}
                    <span className={styles.liTxt}>সাইজঃ লার্জ</span>
                  </li>
                  <li>
                    <img
                      className={styles.liImg}
                      src='/images/landing_10/b7.svg'
                      alt='img'
                    />{" "}
                    <span className={styles.liTxt}>পেইজ সংখ্যাঃ ১৪৯০ পাতা</span>
                  </li>
                  <li>
                    <img
                      className={styles.liImg}
                      src='/images/landing_10/b7.svg'
                      alt='img'
                    />{" "}
                    <span className={styles.liTxt}>পারা ৩০</span>
                  </li>
                  <li>
                    <img
                      className={styles.liImg}
                      src='/images/landing_10/b7.svg'
                      alt='img'
                    />{" "}
                    <span className={styles.liTxt}>ডাইমেনশন ৯.৫*৬.৫ ইঞ্চি</span>
                  </li>
                  <li>
                    <img
                      className={styles.liImg}
                      src='/images/landing_10/b7.svg'
                      alt='img'
                    />{" "}
                    <span className={styles.liTxt}>১০০% নির্ভুল ছাপা </span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner-5
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section>
        <Container>
          <div className={styles.ban5Txtbox}>
            <h2>
              কেন এই আল-কুরআনুল-কারীম কিতাব শিক্ষা করবেন তার সম্পর্ক ভিডিও
              বিস্তারিত আলোচনা করা হয়েছে
            </h2>
          </div>

          <div className={styles.banner5Img}>
            <img src='/images/landing_10/b8.png' alt='' />
          </div>

          <div className={styles.banner5Button}>
            <div>
              <h2>নিচের বাটনে ক্লিক করে এখুনি অর্ডার করুন</h2>
              <Link href='#' className={styles.bg}>
                {" "}
                <AiOutlineShoppingCart />
                Order Now
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        OrderConfirmFrom
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
                        <img  src={product?.main_image?.name} alt='' />
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
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.footerSec}>
        <Container fluid className={styles.Footpad}>
          <div className={styles.footerRel}>
            <div className={styles.lastImg}>
              <img src='/images/landing_10/b9.png' alt='img' />
            </div>
          </div>
        </Container>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <div className={styles.footerh4}>
                <h4>যোগাযোগ</h4>
                <div className={styles.hr}></div>
                <ul>
                  <li>
                    {" "}
                    <IoCallOutline />
                    <span> 00 0392 96 32</span>
                  </li>
                  <li>
                    <FiMail /> <span> oder@freshen.com</span>
                  </li>
                </ul>

                <div className={styles.footericon3}>
                  <Link href='#'>
                    {" "}
                    <AiOutlineInstagram className={styles.coloricon} />
                  </Link>{" "}
                  <Link href='#'>
                    {" "}
                    <FiFacebook className={styles.coloricon} />
                  </Link>{" "}
                  <Link href='#'>
                    <FiTwitter className={styles.coloricon3} />{" "}
                  </Link>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className={styles.footerh4}>
                <h4>প্রয়োজনীয় লিংক</h4>
                <div className={styles.hr}></div>
                <ul>
                  <li>
                    {" "}
                    <span>
                      <Link href=''> প্রাইভেসী পলিসি </Link>
                    </span>
                  </li>
                  <li>
                    {" "}
                    <span>
                      <Link href=''> শর্তাবলী</Link>
                    </span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      {/* <section>
    <Container>
        <h1>Hello</h1>
    </Container>
</section> */}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
    </div>
  );
}
