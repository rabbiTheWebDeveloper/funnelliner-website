import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillInstagram, AiOutlineShoppingCart } from "react-icons/ai";
import { BsInstagram, BsPlayFill } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import styles from "../../../styles/landing_six/landing_six.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";
const LandingSix = () => {
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
    <div className={styles.LandingSix}>
      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Banner
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className={styles.Banner}>
        <Container>
          <Row>
            <Col lg={6}>
              <div className={styles.BannerContent}>
                <div className={styles.Logo}>
                  <img
                    className={styles.imgBlack}
                    src='/images/landing_6/bike_logo.svg'
                    alt=''
                  />
                  <img
                    className={styles.imgWhite}
                    src='/images/landing_6/logo-2.svg'
                    alt=''
                  />
                </div>

                <div className={styles.text}>
                  <h3>
                    পৃথিবী সেরা ইলেক্ট্রিক স্কুটার <br /> এখন বাংলাদেশে
                  </h3>

                  <div className={styles.titleHeader}>
                    <h1>Electrica </h1>

                    <h1 className='text-white'>
                      {" "}
                      Sc<span>oo</span>ter
                    </h1>
                  </div>

                  <div className={styles.btnBox}>
                    <Link href='#orderSection' className={styles.bg}>
                      {" "}
                      <AiOutlineShoppingCart /> অর্ডার করুন
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Specifications
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.Specification}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className={styles.Spec}>
                <ul>
                  <li>
                    <div className={styles.item}>
                      <img src='/images/landing_6/cil_bike.svg' alt='' />
                      <p>
                        Semi-Auto Pilot <br /> Technology
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className={styles.item}>
                      <img
                        className='mb-1'
                        src='/images/landing_6/battery_charge.svg'
                        alt=''
                      />
                      <p>
                        Two-way port <br /> charging options
                      </p>
                    </div>
                  </li>

                  <li>
                    <div className={styles.item}>
                      <img src='/images/landing_6/cloud.svg' alt='' />
                      <p>
                        Segway Function <br /> Cloud System
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className={styles.item}>
                      <img src='/images/landing_6/ep_setting.svg' alt='' />
                      <p>
                        Low operation & <br /> maintenance
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className={styles.item}>
                      <img
                        className='mb-xl-3'
                        src='/images/landing_6/charge_battery.svg'
                        alt=''
                      />
                      <p>
                        Day Long Battery <br /> Performance
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Feature
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      <section className={styles.Features}>
        <Container>
          <Row>
            <Col lg={6}>
              <div className={styles.imagescooter}>
                <img src='/images/landing_6/scooty_img.png' alt='' />
              </div>
            </Col>

            <Col lg={6}>
              <h2>স্কুটারের বিশেষ ফিচার</h2>
              <div className={styles.hLine}></div>

              <div className={styles.text}>
                <p>
                  স্কুটার মডেলগুলি এখানে বৈশিষ্ট্য, সর্বশেষ ডিজাইন, বাজারের
                  খ্যাতি, জনপ্রিয়তা, নির্ভরযোগ্যতা, কর্মক্ষমতা, ব্র্যান্ড ইমেজ,
                  বিক্রয়োত্তর পরিষেবা ইত্যাদি বিবেচনা করে কালানুক্রমিকভাবে
                  সাজানো হয়েছে৷ বাংলাদেশের এই সেরা স্কুটার পৃষ্ঠায়, আমরা
                  বিভিন্ন দামের রেঞ্জের গাড়িগুলিকে রেখেছি৷
                </p>
              </div>

              <div className={styles.FeatureList}>
                <ul>
                  <li>
                    <p>
                      <BsPlayFill /> বর্তমানে বাংলাদেশের সবচেয়ে শক্তিশালী
                      স্কুটার
                    </p>
                  </li>
                  <li>
                    <p>
                      <BsPlayFill /> ২ বছরের ওয়ারেন্টি (পার্টস ও ইঞ্জিন)
                    </p>
                  </li>
                  <li>
                    <p>
                      <BsPlayFill /> দেশজুড়ে ৩০+ সার্ভিস সেন্টার
                    </p>
                  </li>
                  <li>
                    <p>
                      <BsPlayFill /> স্পেয়ার পার্টস এভেইলেবল গ্যারান্টি
                    </p>
                  </li>
                  <li>
                    <p>
                      <BsPlayFill /> ২৫ টি দেশে সুনামের সাথে চলছে
                    </p>
                  </li>
                  <li>
                    <p>
                      <BsPlayFill /> মানিব্যাক গ্যারান্টি
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            OurStories
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      <section className={styles.OurStories}>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={9}>
              <h2>স্কুটারের বিশেষ ফিচার</h2>
              <div className={styles.hLine}></div>

              <p>
                স্কুটার মডেলগুলি এখানে বৈশিষ্ট্য, সর্বশেষ ডিজাইন, বাজারের
                খ্যাতি, জনপ্রিয়তা, নির্ভরযোগ্যতা, কর্মক্ষমতা, ব্র্যান্ড ইমেজ,
                বিক্রয়োত্তর পরিষেবা ইত্যাদি বিবেচনা করে কালানুক্রমিকভাবে সাজানো
                হয়েছে৷ বাংলাদেশের এই সেরা স্কুটার পৃষ্ঠায়, আমরা বিভিন্ন দামের
                রেঞ্জের গাড়িগুলিকে রেখেছি৷
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            YouTube Section
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      <section className={styles.YouTubeVid}>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={12}>
              <img src='/images/landing_6/youtube.png' alt='' />
            </Col>
          </Row>

          <Row className='justify-content-center'>
            <Col lg={12}>
              <div className={styles.buttonGroup}>
                <Link href='' className={styles.bg}>
                  {" "}
                  অর্ডার করুন
                </Link>
                <Link href='' className={styles.bg}>
                  {" "}
                  যোগাযোগ করুন
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Checkout Section
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      <section className={styles.OrderSection}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className={styles.OrderDiv}>
                <h1 className='text-white'>
                  অর্ডার করতে নিচের ফর্মটি পূরণ করে সাবমিট করুন !
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Checkout Form
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      <section className='OrderConfirmFrom'  id="orderSection">
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

                  <button >
                    {" "}
                    <RiShoppingCart2Line /> Place Order BDT {quantity * product?.price}
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </section>

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Footer Widget
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <section className={styles.SocialIcons}>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={12}>
              <div className={styles.SocialIconsList}>
                <Link href='' className={styles.Fb}>
                  {" "}
                  <FaFacebookF />
                </Link>
                <Link href='' className={styles.Yt}>
                  {" "}
                  <FaYoutube />
                </Link>
                <Link href='' className={styles.InS}>
                  {" "}
                  <AiFillInstagram />
                </Link>
                <Link href='' className={styles.Tw}>
                  {" "}
                  <FaTwitter />
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Footer
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* Section Gaps */}
      <div className={styles.section_gaps}></div>

      <section className={styles.FooterSection}>
        <Container>
          <Row>
            <Col md={6}>
              <div className={styles.Logo}>
                <img src='/images/landing_6/bike_logo.svg' alt='' />
              </div>
            </Col>

            <Col md={6}>
              <div className={styles.FooterMenu}>
                <ul>
                  <li>
                    <Link href=' ' className=''>
                      Terms & Condition
                    </Link>
                  </li>
                  <li>
                    <Link href=' ' className=''>
                      Privacy Policy
                    </Link>
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

export default LandingSix;
