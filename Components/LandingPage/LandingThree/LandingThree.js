import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button, Navbar } from "react-bootstrap";
import { BsArrowRight, BsFillCartFill, BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import swal from "sweetalert";
import { useRouter } from 'next/router'

import {
  FaFacebookF,
  FaGooglePlus,
  FaLinkedinIn,
  FaQuoteLeft,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import axios from "axios";

const LandingThree = () => {
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
          // swal(
          //   "Thank you!",
          //   "Your order has been successfully placed",
          //   "success"
          // );
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
    <>
      {/* ------------------------------------------------------------------------   -----------------------------------------------------------
            Banner
        --------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className='BannerSection'>
        <Container>
          <Row>
            <Col lg={8}>
              <div className='logo'>
                <img src='/images/landing_3/logo.png' alt='' />
              </div>

              <div className='title'>
                <h1>
                  আমরা <span>বিশুদ্ধতার</span>, <span>সুস্বাদু </span>খাবারের
                  স্বাদ এবং গন্ধ বাড়াতে আমরা কঠোর সেরা{" "}
                  <span>খাঁটি গরুর দুধ</span> দিয়ে তৈরি সেরা ঘি সংগ্রহ করি
                </h1>
              </div>

              <div className='bannerBtn'>
                <Link href='#placeAnOrder'>
                  <Button className='button3' variant='primary'>
                    অর্ডার করুন
                    <BsArrowRight />
                  </Button>
                </Link>
              </div>
            </Col>

            <Col lg={4}></Col>
          </Row>
        </Container>
      </section>

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            SubtitleSection
        --------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className='SubtitleSection'>
        <div className='ImgOverlay1'>
          <img
            className='image1'
            src='/images/landing_3/woodspoon.png'
            alt=''
          />
        </div>

        <div className='ImgOverlay2'>
          <img className='image2' src='/images/landing_3/Ghee.png' alt='' />
        </div>

        <Container>
          <Row className='justify-content-center'>
            <Col lg={8}>
              <div className='text text-center'>
                <h2 className='heading'>আমাদের এই ঘি জগতে স্বাগতম আপনাকে!</h2>
                <p>
                  বাংলাদেশে আমরাই কম দামে দেশি ব্র্যান্ডের খাঁটি গরুর ঘি বিক্রি
                  করি। আমাদের এই খাঁটি ঘি সিএলএ, ভিটামিন কে, বাটারিক অ্যাসিড
                  রয়েছে। এটি সম্পূর্ণ জৈব এবং আসল বাষ্পীভূত গরুর দুধের কঠিন
                  পদার্থ থেকে সংগ্রহ করা হয়। আমরা আপনাকে 100% অরজিনাল
                  গ্যারান্টি দিতে পারি।
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            PriceTitle Section
        --------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className='PriceTitle'>
        <Container>
          <Row className='justify-content-center'>
            <Col sm={12} lg={10}>
              <div className='PriceDiv'>
                <img className='' src='/images/landing_3/CreamBg.png' alt='' />

                <div className='text'>
                  <h2>মুল্য-1,500.00 টাকা</h2>
                  <h4>সারা দেশে ফ্রি হোম ডেলিভারি</h4>

                  <div className='btnBox d-flex justify-content-center'>
                    <Link href='#placeAnOrder'>
                      <Button className='button3' variant='primary'>
                        অর্ডার করতে এখানে ক্লিক করুন
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            ProductQuality section
        --------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className='ProductQuality'>
        <img className='vector' src='/images/landing_3/Vector.png' alt='' />

        <Container>
          <div className='content'>
            <Row className='justify-content-center'>
              <Col lg={8}>
                <h2 className='text-white'>
                  সর্বাধিক প্রিমিয়াম মানের আমাদের এই মাখন-ঘি স্বাস্থ্যের পক্ষে
                  উপকারি ?
                </h2>
              </Col>
            </Row>

            <div className='gap'></div>

            <Row className='justify-content-center'>
              <Col lg={3} md={6}>
                <div className='infoBox'>
                  <img
                    className='bgImage'
                    src='/images/landing_3/productDetails.png'
                    alt=''
                  />

                  <div className='description text-center'>
                    <img src='/images/landing_3/bowl.png' alt='' />
                    <p className='text-center'>
                      {" "}
                      প্রিমিয়াম ঘি সম্পূর্ণরূপে তৈরি করা হয় ভেজালহীন দুগ্ধজাত
                      পশুর দুধের ক্রিম থেকে
                    </p>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={6}>
                <div className='infoBox'>
                  <img
                    className='bgImage'
                    src='/images/landing_3/productDetails.png'
                    alt=''
                  />

                  <div className='description text-center'>
                    <img src='/images/landing_3/bowl.png' alt='' />
                    <p className='text-center'>
                      {" "}
                      ঘি পোলাও, কোরমা, বিরিয়ানি, পরাঠা, হালুয়া বা অন্য যেকোনো
                      মিষ্টি খাবারের জন্য ব্যবহার করুন
                    </p>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={6}>
                <div className='infoBox'>
                  <img
                    className='bgImage'
                    src='/images/landing_3/productDetails.png'
                    alt=''
                  />

                  <div className='description text-center'>
                    <img src='/images/landing_3/bowl.png' alt='' />
                    <p className='text-center'>
                      {" "}
                      ঘি একটি স্বাস্থ্যকর পুষ্টিতে ভরপুর সম্পূর্ণরূপে তৈরি করা
                      হয় ভেজালহীন দুগ্ধজাত পশুর দুধের ক্রিম থেকে{" "}
                    </p>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={6}>
                <div className='infoBox'>
                  <img
                    className='bgImage'
                    src='/images/landing_3/productDetails.png'
                    alt=''
                  />

                  <div className='description text-center'>
                    <img src='/images/landing_3/bowl.png' alt='' />
                    <p className='text-center'>
                      {" "}
                      ঘি শুষ্ক ত্বক ও চুলকে ময়েশ্চারাইজ করতে সাহায্য করে
                    </p>
                  </div>
                </div>
              </Col>
            </Row>

            <div className='gap'></div>

            <Row className='justify-content-center'>
              <Col lg={3} md={6}>
                <div className='infoBox'>
                  <img
                    className='bgImage'
                    src='/images/landing_3/productDetails.png'
                    alt=''
                  />

                  <div className='description text-center'>
                    <img src='/images/landing_3/bowl.png' alt='' />
                    <p className='text-center'>
                      {" "}
                      এটি আপনার ভাল পাচনতন্ত্রে ব্যাপকভাবে সাহায্য করতে পারে।
                    </p>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={6}>
                <div className='infoBox'>
                  <img
                    className='bgImage'
                    src='/images/landing_3/productDetails.png'
                    alt=''
                  />

                  <div className='description text-center'>
                    <img src='/images/landing_3/bowl.png' alt='' />
                    <p className='text-center'>
                      {" "}
                      এটি ভাজার জন্য ব্যবহার করার জন্য একটি চমৎকার পছন্দ।
                    </p>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={6}>
                <div className='infoBox'>
                  <img
                    className='bgImage'
                    src='/images/landing_3/productDetails.png'
                    alt=''
                  />

                  <div className='description text-center'>
                    <img src='/images/landing_3/bowl.png' alt='' />
                    <p className='text-center'>
                      {" "}
                      আপনাকে বিশুদ্ধতার এবং সুস্বাদু খাবারের স্বাদ ও সুগন্ধ
                      বাড়াতে আমরা কৃষকদের সেরা ঘি প্রক্রিয়াজাত করি
                    </p>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={6}>
                <div className='infoBox'>
                  <img
                    className='bgImage'
                    src='/images/landing_3/productDetails.png'
                    alt=''
                  />

                  <div className='description text-center'>
                    <img src='/images/landing_3/bowl.png' alt='' />
                    <p className='text-center'>
                      {" "}
                      অন্যান্য তেলের অর্ধেকেরও কম ব্যবহার করেন এবং এটি খাবারের
                      স্বাদ বাড়ায়।
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            ProductVideo Section
        --------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className='ProductVideo'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={12}>
              <img src='/images/landing_3/Youtube Video.png' alt='youtube' />
            </Col>
          </Row>
        </Container>
      </section>

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            CustomerReview Section
        --------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* <section className='CustomerReview'>
        <div className="ImgOverlay2">
               <img className='' src="images/landing_3/honey leaf.png" alt="" />
            </div>

            <Container>

                <Row>

                    <Col lg={12}>

                        <h2>আমাদের কাস্টমার রিভিউ</h2>

                    </Col>

                </Row>

                <Row>

                    <Col lg={5}>

                        <div className="customerImg">

                        </div>

                    </Col>

                    <Col lg={7} className='d-flex align-items-center'>

                        <div className="Review">

                            <FaQuoteLeft/>
                            <h4 className='text-left'>Ahsan Rahman</h4>
                            <p>একটি পূর্ববর্তী পর্যবেক্ষণ গবেষণায় দেখা যায় যে লোকেরা প্রতিদিন ছয় বা তার বেশি কাপ গ্রীন টি গ্রহণ করেন তাদের টাইপ 2 ডায়াবেটিস হওয়ার ঝুঁকি ছিল 33%, যারা প্রতি সপ্তাহে এক কাপের চেয়ে কম পান করেছেন তাদের তুলনায়</p>

                        </div>

                    </Col>

                </Row>

            </Container>

        </section> */}

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            OrderConfirmFrom Section
        --------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className='OrderConfirmFrom' id='placeAnOrder'>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {/* left */}
              <Col lg={7}>
                <div className='OrderConfirmLeft'>
                  <h3>Billing details</h3>

                  <div className='CustomeInput'>
                    <input
                      type='text'
                      name=''
                      {...register("customerName", { required: true })}
                      placeholder='আপনার নাম লিখুন *'
                    />
                    {errors.customerName && (
                      <span style={{ color: "red" }}>Name is required</span>
                    )}
                  </div>

                  <div className='CustomeInput'>
                    <input
                      type='text'
                      name=''
                      {...register(
                        "customerMobile",
                        { required: true },
                        { min: 11, max: 15 }
                      )}
                      placeholder='আপনার মোবাইল নাম্বার লিখুন *'
                    />
                    {errors.customerMobile && (
                      <span style={{ color: "red" }}>
                        Valid Mobile Number require
                      </span>
                    )}
                  </div>

                  <div className='CustomeInput'>
                    <input
                      type='text'
                      name=''
                      {...register("customerAddress", { required: true })}
                      placeholder='আপনার সম্পূর্ণ ঠিকানা লিখুন *'
                    />
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
                          <img
                            //  src="images/product.svg"
                            src={product?.main_image?.name}
                            alt=''
                          />
                        </div>

                        <p>{product?.product_name}</p>
                      </div>

                      <div className='right d_flex'>
                        <input
                          type='number'
                          onChange={handleQuantityChange}
                          defaultValue={1}
                          min={1}
                        />

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

                  <button type='submit'>
                    {" "}
                    <RiShoppingCart2Line /> Place Order TK{" "}
                    {quantity * product?.price}
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </section>

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            FreeDelivery Section
        --------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className='FreeDelivery'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg='8'>
              <div className='OrderImage'>
                <div className='text text-center'>
                  <h3>সারাদেশে ফ্রি ডেলিভারি পেতে এখনি</h3>

                  <Button className='button3' variant='primary'>
                    <BsFillCartFill /> অর্ডার করুন
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            footerWidget Section
        --------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className='ServiceWidget'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg='8'>
              <Row>
                <Col lg={4} md={4}>
                  <div className='ServiceImage text-center'>
                    <img src='../images/landing_3/serv1.png' alt='' />

                    <h3>দ্রুত ডেলিভারি</h3>
                  </div>
                </Col>

                <Col lg={4} md={4}>
                  <div className='ServiceImage text-center'>
                    <img src='../images/landing_3/serv2.png' alt='' />

                    <h3>নিরাপদ পেমেন্ট</h3>
                  </div>
                </Col>

                <Col lg={4} md={4}>
                  <div className='ServiceImage text-center'>
                    <img src='../images/landing_3/serv3.png' alt='' />

                    <h3>অর্ডার করুন</h3>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            footerWidget Section
        --------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className='FooterWidget'>
        <img className='vector' src='../images/landing_3/Vector2.png' alt='' />

        <Container className=''>
          <Row className='justify-content-center front'>
            <Col lg={4}>
              <div className='logo text-center'>
                <img src='images/landing_3/logo.png' alt='' />
              </div>
            </Col>
          </Row>

          <Row className='front my-5 '>
            <Col lg={4}>
              <div className='footerMenu'>
                <h5>Contact Us</h5>

                <ul className=''>
                  <li>
                    <BsTelephone />
                    00 0392 96 32
                  </li>

                  <li>
                    <FiMail />
                    oder@freshen.com
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={4} className=''>
              <div className='footerMenu'>
                <h5>Important Link</h5>

                <ul className=''>
                  <li>
                    <Link href='#'>Refund Policy </Link>
                  </li>

                  <li>
                    <Link href='#'>Privacy Policy</Link>
                  </li>

                  <li>
                    <Link href='#'>Terms and Conditions</Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={4}>
              <div className='footerMenu'>
                <h5>অর্ডার পেতে কল করুন এই নাম্বারে</h5>

                <h2 className='text-white'>+8801799733234</h2>

                <ul className='social mt-3 mt-lg-2'>
                  <li>
                    <Link href='#'>
                      <FaFacebookF />
                    </Link>
                  </li>

                  <li>
                    <Link href='#'>
                      <FaTwitter />
                    </Link>
                  </li>

                   <li>
                    <Link href='#'>
                      <FaGooglePlus />
                    </Link>
                  </li>

                  <li>
                    <Link href='#'>
                      <FaLinkedinIn />
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* -----------------------------------------------------------------------------------------------------------------------------------
            footerWidget Section
        --------------------------------------------------------------------------------------------------------------------------------------*/}
      {/* -----------------------------------------------------------------------------------------------------------------------------------
            footerWidget Section
        --------------------------------------------------------------------------------------------------------------------------------------*/}
    </>
  );
};

export default LandingThree;
