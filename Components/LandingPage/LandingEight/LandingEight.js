import { StyleSharp } from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillInstagram, AiOutlineShoppingCart } from "react-icons/ai";
import { BsInstagram, BsPlayFill, BsTelephone } from "react-icons/bs";
import {
  FaFacebookF,
  FaGooglePlus,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
// import { GoLocation } from "react-icons/go";
import { FiMail } from "react-icons/fi";
import { RiShoppingCart2Line } from "react-icons/ri";
import styles from "../../../styles/landing_eight/landing_eight.module.css";

import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";

const LandingEight = () => {
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
    <>
      <div className={styles.LandingEight}>
        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Banner
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <div className={styles.Banner}>
          <div className={styles.Leaf}>
            <Container>
              <Row className='justify-content-center'>
                <Col lg={12}>
                  <div className={styles.LogoDiv}>
                    <img
                      className={styles.imgBlack}
                      src='/images/landing_8/logo.svg'
                      alt=''
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={8}>
                  <div className={styles.text}>
                    <h1>
                      ?????????????????? ?????????????????? ???????????? ??????????????? ??????????????????????????? ??????????????? ???????????????????????? ??????????????? ??????
                      ????????? ???????????? ??????????????? ???????????????
                    </h1>

                    <div className={styles.pricediv}>
                      <h2>
                        {" "}
                        <span>???????????????: ????????????????????????</span>{" "}
                      </h2>

                      <div className={styles.price2}>
                        <h2>?????????????????????????????? ???????????????:</h2>

                        <div className={styles.textDecoration}>
                          <img src='/images/landing_8/Frame.png' alt='' />

                          <div className={styles.PriceBox}>
                            <h2>???????????? ????????????</h2>
                          </div>
                        </div>
                      </div>
                      <div className={styles.phoneDiv}>
                        <h2>+8801799733234 </h2>
                        <h6>?????????????????? ???????????? ?????? ???????????? ?????? ????????????????????????</h6>
                      </div>

                      <div className={styles.btnBox}>
                        <Link href='' className={styles.bg}>
                          {" "}
                          <AiOutlineShoppingCart /> ?????????????????? ????????????
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className={styles.DiscountBox}>
                    <img src='/images/landing_8/white_egg.svg' alt='' />

                    <div className={styles.text}>
                      <h2>25% OFF</h2>
                      <h5>Free Gift</h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Service Methods
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        <div className={styles.ServiceSection}>
          <Container>
            <Row className='justify-content-spacebetween'>
              <Col lg={3} md={6} sm={12}>
                <div className={styles.Services}>
                  <div className={styles.ServiceBox}>
                    <div className={styles.image}>
                      <img
                        className=''
                        src='/images/landing_8/fast.svg'
                        alt=''
                      />
                    </div>

                    <div className={styles.text}>
                      <h5>Free Shipping</h5>
                      <p>For all orders from 100tk</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className={styles.Services}>
                  <div className={styles.ServiceBox}>
                    <div className={styles.image}>
                      <img
                        className=''
                        src='/images/landing_8/List.svg'
                        alt=''
                      />
                    </div>

                    <div className={styles.text}>
                      <h5>Order Online</h5>
                      <p>Order bouquet Via mobile</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className={styles.Services}>
                  <div className={styles.ServiceBox}>
                    <div className={styles.image}>
                      <img
                        className=''
                        src='/images/landing_8/Flower.svg'
                        alt=''
                      />
                    </div>

                    <div className={styles.text}>
                      <h5>More Freshness</h5>
                      <p>Bouquet are fresh & blooms</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={6} sm={12}>
                <div className={styles.Services}>
                  <div className={styles.ServiceBox}>
                    <div className={styles.image}>
                      <img
                        className=''
                        src='/images/landing_8/credit-card.svg'
                        alt=''
                      />
                    </div>

                    <div className={styles.text}>
                      <h5>Secure Payment</h5>
                      <p>Potect online payment</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Section Gaps */}
        <div className={styles.section_gaps}></div>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            ProductAbout Section
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <section className={styles.ProductAbout}>
          <Container>
            <Row className='justify-content-center'>
              <Col lg={10}>
                <div className={styles.Title}>
                  <h2>??????????????? ?????? ?????? ?</h2>
                  <p>
                    ??????????????? ?????? ?????? ?????? ??????????????? ?????? ?????? ????????????????????????????????? ???????????????????????? ???????????? ?????????
                    ?????????????????? ???????????? ???????????? ????????? ????????? ??????????????? ????????????????????? ??????????????? ???????????? ???????????????????????????
                    ???????????? ???????????? ??????????????? ????????????, ?????? ???????????? ?????? ??????????????? ??????????????? ????????? ????????? ??????????????????
                    ??????????????? ???????????? ????????? ????????????????????? ????????? ??????????????? ??????????????? ???????????????
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            YouTube video
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        {/* Section Gaps */}
        <div className={styles.section_gaps}></div>

        <section className={styles.YouTubeVid}>
          <Container>
            <Row className='justify-content-center'>
              <Col lg={12}>
                <img src='/images/landing_8/YouTube2.png' alt='' />
              </Col>
            </Row>
          </Container>
        </section>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            Usefullness
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        {/* Section Gaps */}
        <div className={styles.section_gaps}></div>

        <section className={styles.Usefullness}>
          <Container>
            <Row className='justify-content-center'>
              <Col lg={8}>
                <div className={styles.Title}>
                  <h2>
                    ??????????????? ?????? ??????????????????????????? ???????????????????????? ?????? ??????????????????????????? ?????????????????? ????????? ?????? ????????????
                  </h2>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            UsefullNessItems
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        {/* Section Gaps */}
        <div className={styles.section_gaps}></div>

        <section className={styles.UsefullnessItems}>
          <div className={styles.left}>
            <img src='/images/landing_8/leaf_left.svg' alt='' />
          </div>

          <div className={styles.right}>
            <img src='/images/landing_8/leaf_right.svg' alt='' />
          </div>

          <Container>
            <Row className='justify-content-center'>
              <Col lg={4} xs={6}>
                <div className={styles.ItemCards}>
                  <div className={styles.IconBox}>
                    <img src='/images/landing_8/capsule.svg' alt='' />
                  </div>
                  <h3>??????????????????????????? ???????????????????????? ?????????</h3>
                </div>
              </Col>

              <Col lg={4} xs={6}>
                <div className={styles.ItemCards}>
                  <div className={styles.IconBox}>
                    <img src='/images/landing_8/capsule.svg' alt='' />
                  </div>
                  <h3>?????????????????? ????????? ???????????????</h3>
                </div>
              </Col>

              <Col lg={4} xs={6}>
                <div className={styles.ItemCards}>
                  <div className={styles.IconBox}>
                    <img src='/images/landing_8/capsule.svg' alt='' />
                  </div>
                  <h3>???????????? ??????????????? ????????? ?????????</h3>
                </div>
              </Col>

              <Col lg={4} xs={6}>
                <div className={styles.ItemCards}>
                  <div className={styles.IconBox}>
                    <img src='/images/landing_8/capsule.svg' alt='' />
                  </div>
                  <h3>???????????? ????????????????????? ????????? ?????????</h3>
                </div>
              </Col>

              <Col lg={4} xs={6}>
                <div className={styles.ItemCards}>
                  <div className={styles.IconBox}>
                    <img src='/images/landing_8/capsule.svg' alt='' />
                  </div>
                  <h3>?????????????????? ?????????????????????????????? ???????????????</h3>
                </div>
              </Col>

              <Col lg={4} xs={6}>
                <div className={styles.ItemCards}>
                  <div className={styles.IconBox}>
                    <img src='/images/landing_8/capsule.svg' alt='' />
                  </div>
                  <h3>?????????????????????????????? ?????????????????????</h3>
                </div>
              </Col>

              <Col lg={4} xs={6}>
                <div className={styles.ItemCards}>
                  <div className={styles.IconBox}>
                    <img src='/images/landing_8/capsule.svg' alt='' />
                  </div>
                  <h3>??????????????????????????? ???????????????????????? ?????????</h3>
                </div>
              </Col>

              <Col lg={4} xs={6}>
                <div className={styles.ItemCards}>
                  <div className={styles.IconBox}>
                    <img src='/images/landing_8/capsule.svg' alt='' />
                  </div>
                  <h3>??????????????? ??????????????????????????????</h3>
                </div>
              </Col>

              <Col lg={4} xs={6}>
                <div className={styles.ItemCards}>
                  <div className={styles.IconBox}>
                    <img src='/images/landing_8/capsule.svg' alt='' />
                  </div>
                  <h3>???????????????????????? ????????? ????????????????????? ??????????????? ?????????</h3>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            DiscountSection
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        {/* Section Gaps */}
        <div className={styles.section_gaps}></div>

        <section className={styles.DiscountSection}>
          <Container>
            <Row className='justify-content-center'>
              <Col lg={10}>
                <h2>
                  {" "}
                  <span>????????????????????? ??????????????? : ????????????????????????</span>{" "}
                </h2>

                <h1>
                  {" "}
                  <span>?????????????????????????????? ???????????????: ???????????? ????????????</span>{" "}
                </h1>
              </Col>
            </Row>

            <Row className='justify-content-center my-4'>
              <Col lg={12}>
                <div className={styles.ContentBox}>
                  <div className={styles.text}>
                    <h1>???????????????????????? ???????????? ???????????????????????? ???????????? ????????????</h1>

                    <div className={styles.buttonCenter}>
                      <Link href='' className={styles.bg}>
                        {" "}
                        <AiOutlineShoppingCart /> ?????????????????? ????????????
                      </Link>
                    </div>
                  </div>
                  <div className={styles.ImageLayer2}>
                    <img src='/images/landing_8/design.png' alt='' />
                  </div>
                  <div className={styles.ImageLayer}>
                    <img src='/images/landing_8/design.png' alt='' />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            WhyUs
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        {/* Section Gaps */}
        <div className={styles.section_gaps}></div>

        <section className={styles.WhyUs}>
          <div className={styles.left}>
            <img src='/images/landing_8/left_leaf1.svg' alt='' />
          </div>

          <div className={styles.right}>
            <img src='/images/landing_8/right_leaf1.svg' alt='' />
          </div>

          <Container>
            <Row className='justify-content-center'>
              <Col lg={9}>
                <div className={styles.Title}>
                  <h2>?????????????????? ???????????? ????????? ??????????????? ???????</h2>

                  <p>
                    ?????????????????? ???????????? ?????? ????????? ???????????????? ???????????? ???????????? ????????????????????? ???????????? ????????? ???????????? ??????
                    ?????????????????? ???????????? ?????? ????????????????????? ???????????????????????? ??????????????? ???????????? ???????????? ???????????? ???????????????
                    ???????????? ?????????????????? ??????????????????????????? ?????????????????? ??????????????? ???????????? ?????? ?????? ???????????? ??????????????????
                    ??????????????????????????? ???????????? ???????????? ???????????? ??????????????? ???????????? ????????? ???????????????????????? ???????????? ???????????????{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            OnlyOrderBtn
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
        <section className={styles.OnlyOrderBtn}>
          <Container>
            <Row>
              <Col>
                <div className={styles.buttonCenter}>
                  <Link href='' className={styles.bg}>
                    {" "}
                    <AiOutlineShoppingCart /> ?????????????????? ????????????
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Section Gaps */}
        <div className={styles.section_gaps}></div>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            OrderConformation Section
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
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
                  placeholder='??????????????? ????????? ??????????????? *' />
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
                   placeholder='??????????????? ?????????????????? ????????????????????? ??????????????? *' />
                   {errors.customerMobile && (
                      <span style={{ color: "red" }}>
                        Valid Mobile Number require
                      </span>
                    )}
                  </div>

                  <div className='CustomeInput'>
                  <input
                   {...register("customerAddress", { required: true })}
                   type="text"  placeholder='??????????????? ???????????????????????? ?????????????????? ??????????????? *' />
                    {errors.customerAddress && (
                      <span style={{ color: "red" }}>Address is required</span>
                    )}
                  </div>

                  {/* Payment */}
                  <div className='Payment'>
                    <h3>Paymet</h3>

                    <div className='CustomeInput d_flex'>
                      <input type='checkbox' name='' id='CashOn' />
                      <label htmlFor='CashOn'>??????????????? ?????? ????????????????????????</label>
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
            Footer
        ------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        {/* Section Gaps */}
        <div className={styles.section_gaps}></div>

        <section className={styles.FooterSection}>
          <div className={styles.imgLayer}>
            <img src='/images/landing_8/bottom_leaf.svg' alt='' />
          </div>

          <Container>
            <Row>
              <Col lg={4}>
                <div className={styles.footerMenu}>
                  <ul className=''>
                    <li>
                      <Link href='#'>
                        <BsTelephone />
                        01799-733234
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col lg={4} className=''>
                <div className={styles.footerMenu}>
                  <ul className=''>
                    <li>
                      <Link href='#'>
                        <FiMail />
                        contact@softitcare.com
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col lg={4}>
                <div className={styles.footerMenu}>
                  <ul className=''>
                    <li>
                      <div className={styles.footerBox}>
                        {/* <GoLocation /> */}

                        <Link href='#'>
                          Level: 5, Road: 07, Block: C, Niketan, Gulshan??? 1,
                          Dhaka ??? 1212
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <div className={styles.SocialIcons}>
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
                </div>
              </Col>
              <Col lg={12}>
                <div className={styles.BottomFooterMenu}>
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

          <hr />

          <Container>
            <Row className='justify-content-center'>
              <Col lg={12}>
                <div className={styles.CopyRight}>
                  <p className='text-center'>
                    Copyright ?? 2022 FR agrances. All rights reserved.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default LandingEight;
