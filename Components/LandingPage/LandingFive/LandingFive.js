import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../../styles/landing_five/landing_five.module.css";
import { AiOutlineShoppingCart, AiOutlineInstagram } from "react-icons/ai";
import { style } from "@mui/system";
import { FaFish } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { FiMail, FiFacebook, FiTwitter } from "react-icons/fi";
import { RiShoppingCart2Line } from "react-icons/ri";

import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";

const LandingFive = () => {
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
    <div className={styles.LandingFive}>
      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <section className={styles.Banner}>
        {/* For Big devices-Start--------until 992px--------------------------------- */}

        <Container className={styles.BigDivece1}>
          <Row className='d_flex'>
            <Col lg={6}>
              <div className={styles.BannerLogo}>
                <img src='/images/landing_5/logo.svg' alt='' />
              </div>

              <div className={styles.BannerText}>
                <h2>
                  ইলিশ স্বাদ ও গন্ধের জন্য অতুলনীয়। আমরা আপনাকে দিচ্ছি পদ্মার{" "}
                  <span>১০০% fresh </span> <span>ফরমালিনমুক্ত</span> ইলিশ মাছ
                </h2>

                <div className={styles.txtCercleR}>
                  <div className={styles.txtCercleR2}>
                    <img src='/images/landing_5/b13.svg' alt='img' />
                  </div>
                  <div className={styles.txtCercleR3}>
                    <img
                      className={styles.txtCercleR3Img}
                      src='/images/landing_5/b14.svg'
                      alt='img'
                    />
                  </div>

                  <h3 className={styles.bgh3txt}>ওজন ১ থেকে ১,৫ kg</h3>
                </div>

                <Link href='#' className={styles.bg}>
                  {" "}
                  <AiOutlineShoppingCart /> অর্ডার করতে ক্লিক করুন{" "}
                </Link>
              </div>
            </Col>

            <Col lg={6}>
              <div className={styles.BannerImg}>
                <img
                  className={styles.bgTopImg}
                  src='/images/landing_5/img2.png'
                  alt='img'
                />
              </div>
            </Col>
          </Row>
        </Container>
        {/* For Big devices-end dispay None--992px--------------------------------------- */}

        {/* For Small 991px  devices-start (dispay None)----------------------------------------- */}

        <Container className={styles.smallDivece2}>
          <Row className='d_flex'>
            <Col lg={6}>
              <div className={styles.BannerLogo}>
                <img src='/images/landing_5/logo.svg' alt='' />
              </div>

              <div className={styles.BannerImg}>
                <img
                  className={styles.bgTopImg}
                  src='/images/landing_5/img2.png'
                  alt='img'
                />
              </div>
            </Col>

            <Col lg={6}>
              {/* <div className={styles.BannerLogo}>
                <img  src="/images/landing_5/logo.svg" alt="" />
              </div> */}

              <div className={styles.BannerText}>
                <h2>
                  ইলিশ স্বাদ ও গন্ধের জন্য অতুলনীয়। আমরা আপনাকে দিচ্ছি পদ্মার{" "}
                  <span>১০০% fresh ফরমালিনমুক্ত </span> ইলিশ মাছ{" "}
                </h2>

                <div className={styles.txtCercleR}>
                  <div className={styles.txtCercleR2}>
                    <img src='/images/landing_5/b13.svg' alt='img' />
                  </div>
                  <div className={styles.txtCercleR3}>
                    <img src='/images/landing_5/b14.svg' alt='img' />
                  </div>

                  <h3 className={styles.bgh3txt}>ওজন ১ থেকে ১,৫ kg</h3>
                </div>

                <Link href='#' className={`${styles.bg} ${styles.aLink}`}>
                  {" "}
                  <AiOutlineShoppingCart /> অর্ডার করতে ক্লিক করুন{" "}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        {/* For Small  devices-end (dispay None)----------------------------------------- */}
      </section>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner--2
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <>
        <Container>
          <div className={styles.imgbanner2}>
            <div className={styles.imgStarBox}>
              <img
                className={styles.bannerImgB2}
                src='/images/landing_5/banner3.png'
                alt='img'
              />
            </div>
            <div className={styles.imgbanner2txt}>
              <div className={styles.imgtxt}>
                <p className={styles.imgtxt1}>পদ্মার ইলিশ মাছ</p>

                <h2 className={styles.imgtxt2}>মুল্য-১২০০ টাকা</h2>

                <span className={styles.imgtxt3}>
                  সারা দেশে ফ্রি হোম ডেলিভারি
                </span>
              </div>
            </div>
          </div>
        </Container>
      </>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner ---3
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <>
        <Container fluid className={styles.conpadding}>
          <div className={styles.bgColor}>
            <Container>
              <h2 className={styles.banner3h2}>
                স্বাদে পুষ্টিগুণে ভরপুর ইলিশ <br /> মাছের উপকারিতা
              </h2>

              <Row>
                <Col xs={12} sm={6} lg={4}>
                  <div className={styles.OverflowH}>
                    <div className={styles.mycard1}>
                      <img
                        className={styles.cardimgstyle1}
                        src='/images/landing_5/b4.svg'
                        alt='img'
                      />
                      <p className={styles.cardptxt}>
                        ইলিশে ভিটামিন এ,ডি এবং ই আছে যা রাতকানা রোগ প্রতিরোধ করে
                        তাই এই মাছ শিশুদের জন্যেও উপকারী।{" "}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={4}>
                  <div className={styles.OverflowH}>
                    <div className={styles.mycard1}>
                      <img
                        className={styles.cardimgstyle1}
                        src='/images/landing_5/b5.svg'
                        alt='img'
                      />
                      <p className={styles.cardptxt}>
                        রক্ত সঞ্চালন বাড়াতে এবং রক্তনালির স্বাস্থ্য রক্ষায় ভালো
                        রাখতে ইলিশ মাছ বেশ উপকারী{" "}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={4}>
                  <div className={styles.OverflowH}>
                    <div className={styles.mycard1}>
                      <img
                        className={styles.cardimgstyle1}
                        src='/images/landing_5/b6.svg'
                        alt='img'
                      />
                      <p className={styles.cardptxt}>
                        ইলিশে থাকা ওমেগা থ্রি ফ্যাট ত্বক ভালো রাখতে সাহায্য করে
                        এবং এটি হার্ট সুস্থ রাখতে কার্যকরী{" "}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={4}>
                  <div className={styles.OverflowH}>
                    <div className={styles.mycard1}>
                      <img
                        className={styles.cardimgstyle1}
                        src='/images/landing_5/b7.svg'
                        alt='img'
                      />
                      <p className={styles.cardptxt}>
                        দৃষ্টিশক্তি ভালো রাখতে চোখ ভালো রাখতে সাহায্য করে ইলিশ।{" "}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={4}>
                  <div className={styles.OverflowH}>
                    <div className={styles.mycard1}>
                      <img
                        className={styles.cardimgstyle1}
                        src='/images/landing_5/b4.svg'
                        alt='img'
                      />
                      <p className={styles.cardptxt}>
                        খনিজ উপাদান আয়োডিন, সেলেনিয়াম, জিঙ্ক, পটাশিয়াম ভরপুর
                        ইলিশে{" "}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={4}>
                  <div className={styles.OverflowH}>
                    <div className={styles.mycard1}>
                      <img
                        className={styles.cardimgstyle1}
                        src='/images/landing_5/b5.svg'
                        alt='img'
                      />
                      <p className={styles.cardptxt}>
                        খনিজ উপাদান আয়োডিন, সেলেনিয়াম, জিঙ্ক, পটাশিয়াম ভরপুর
                        ইলিশে{" "}
                      </p>
                    </div>
                  </div>
                </Col>
                <div className={styles.cardBtmPadding}></div>
              </Row>
            </Container>
          </div>
        </Container>
      </>

      <div className={styles.absoluteimg1box}>
        <div className={styles.absoltImg}>
          <img
            className={styles.myImgabsolut}
            src='/images/landing_5/b8.svg'
            alt='img'
          />
        </div>

        <p className={styles.banner3ptxt2}>
          ইলিশের প্রতি বাঙালির ভালোবাসা তুলনাহীন। বর্ষায় ইলিশ ভাজা, ইলিশের
          ভর্তা, শর্ষে ইলিশ, পান্তা ইলিশ, ইলিশের ডিম, ইলিশ মাছ স্বাদে যেমন
          অতুলনীয়, তেমনি পুষ্টি উপাদানেও ভরপুর। ১০০% আস্থার সাথে আমাদের থেকে
          ফরমালিনমুক্ত ইলিশ মাছ আপনি কিনতে পারবেন। তার সম্পর্ক ভিডিওতে বিস্তারিত
          দেখানো হয়েছে। আমরা সরাসরি গ্রাহকদের হাতে পৌছে দেয়ার চেষ্টা অব্যাহত
          আছে, আপনি ও নিয়ে দেখতে পারেন।
        </p>
      </div>

      <Container>
        <div className={styles.videoImg}>
          <iframe
            width='100%'
            height='651'
            src='https://www.youtube.com/embed/T-fsk0jsnzc'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowfullscreen
          ></iframe>
        </div>
      </Container>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner-- 4
   ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <div className={styles.bluCercleRt}>
        <div className={styles.bluCercleRt2}>
          <img src='/images/landing_5/b12.svg' alt='img' />
        </div>
      </div>

      {/* ----------  yello-------- */}
      <div className={styles.yelloCercleRt}>
        <div className={styles.yelloCercleRt2}>
          <img
            className={styles.cercleSmall}
            src='/images/landing_5/b11.svg'
            alt='img'
          />
        </div>
      </div>
      <Container>
        <div className={styles.baner4Dev}>
          <div className={styles.banner4BorderImg}>
            <img
              className={styles.borderImg}
              src='/images/landing_5/b9.svg'
              alt='img'
            />
          </div>

          <div className={styles.card4abTextBox}>
            <div className={styles.card4abText}>
              <h2 className={styles.banner4h2}>ডিস্কাউন্ট মূল্যঃ ১৬৫০ টাকা</h2>
              <Link href='#' className={`${styles.bg} ${styles.mylink}`}>
                {" "}
                <AiOutlineShoppingCart /> অর্ডার করতে ক্লিক করুন{" "}
              </Link>
              <p className={styles.banner4P}>
                বহু গবেষণায় দেখা গেছে, সামুদ্রিক মাছ ফুসফুসের <br /> স্বাস্থ্য
                ভালো রাখতে কার্যকর
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner------5
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <Container className={styles.mainlinkdiv}>
        <div className={styles.cercleRed}>
          <img src='/images/landing_5/b10.svg' alt='img' />
        </div>

        <div>
          <div className={styles.banner5Link1}>
            {" "}
            <Link className={styles.mypadding} href='#'>
              <b>100% fresh</b> পদ্মার ইলিশ{" "}
            </Link>{" "}
            <FaFish className={styles.Bannerbanner5Icon} />
          </div>
          <div className={styles.banner5Link1}>
            {" "}
            <Link className={styles.mypadding} href='#'>
              ৩০০০ টাকার মাছ কিনলে হোম ডেলিভারি ফ্রি{" "}
            </Link>{" "}
            <FaFish className={styles.Bannerbanner5Icon} />
          </div>
          <div className={styles.banner5Link1}>
            {" "}
            <Link className={styles.mypadding} href='#'>
              <b>20%</b> অগ্রিম বিকাশ এবং ব্যালেন্স ক্যাশ অফ ডেলিভারি।{" "}
            </Link>{" "}
            <FaFish className={styles.Bannerbanner5Icon} />
          </div>
          <div className={styles.banner5Link1}>
            {" "}
            <Link className={styles.mypadding} href='#'>
              মাছ কুটে, পিস করে কেটে, এই দরেই বিক্রি করা হচ্ছে{" "}
            </Link>{" "}
            <FaFish className={styles.Bannerbanner5Icon} />
          </div>
        </div>
      </Container>

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
        Banner----Footer
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <Container fluid className={styles.footerMDiv}>
        <div className={styles.footerDiv}>
          <Row>
            <Col xs={12} sm={4}>
              <h2 className={styles.footerh2}>যোগাযোগ</h2>
              <div className={styles.hr}></div>
              <ul>
                <li className={styles.footerS}>
                  {" "}
                  <IoCallOutline className={styles.foottericon2} />{" "}
                  <span className={styles.footerSpan}>00 0392 96 32</span>
                </li>
                <li>
                  {" "}
                  <FiMail className={styles.foottericon2} />{" "}
                  <span className={styles.footerSpan}>oder@freshen.com</span>
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
            </Col>

            <Col xs={12} sm={4}>
              <h2 className={`${styles.footerh2} ${styles.footerh2TB}`}>
                প্রয়োজনীয় লিংক
              </h2>
              <div className={styles.hrDev}></div>
              <div className={styles.hr}></div>
              <ul>
                <li className={styles.footerS}>
                  {" "}
                  <span className={styles.footerSpan}>
                    <Link href='#'>প্রাইভেসী পলিসি </Link>
                  </span>
                </li>
                <li>
                  {" "}
                  <span className={styles.footerSpan}>
                    {" "}
                    <Link href='#'>শর্তাবলী </Link>
                  </span>
                </li>
              </ul>
            </Col>

            <Col xs={12} sm={4}>
              <div>
                <Link href='#'>
                  {" "}
                  <img
                    src='/images/landing_5/logo2.svg'
                    className={styles.lastlogo}
                    alt='Img'
                  ></img>
                </Link>

                <ul>
                  <li>
                    {" "}
                    <span className={styles.footlastSpan1}>
                      অর্ডার পেতে কল করুন এই নাম্বারে
                    </span>
                  </li>
                  <li>
                    {" "}
                    <span className={styles.footlastSpan2}>+8801799733234</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Banner
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
    </div>
  );
};

export default LandingFive;
