import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import styles from "../../styles/main_page/home_page.module.css";
import Placeholder from 'react-bootstrap/Placeholder';
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { Autoplay } from "swiper";

// import "swiper/css";
// import "swiper/css/autoplay"
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";


const MainPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [landingList, setLandingList] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  const idsToSkip = Array.from({ length: 200 }, (_, i) => (i + 206).toString());
  const landingThemeFetch = async () => {
    try {
      let res = await axios({
        method: 'get',
        url: `${process.env.API_URL}v1/theme/list`,
        headers: {
          type: "landing"
        }
      });
      let data = res.data.data;
      const filteredItems = data.filter(item => !idsToSkip.includes(item.name));
      setLandingList(filteredItems.slice(0, 6))
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      return error.response;
    }
  }
  useEffect(() => {
    landingThemeFetch()
  }, [])


  return (
    <div className={`${styles.MainPage}`}>
      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
            Menubar
        ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <div className={styles.Menubar}>
        <Container className={styles.CustomeContainer}>
          <Row>
            <Col lg={12}>

              {/* DesktopMenu */}
              <div
                className={`${styles.DesktopMenu} ${styles.d_flex} ${styles.d_justify}`}
              >
                {/* logo */}
                <div className={styles.Left}>
                  <div className={styles.Logo}>
                    <Link href='#'>
                      <img src='../images/home_page/logo.svg' alt='' />
                    </Link>
                  </div>
                </div>

                {/* MenuItem */}
                <div className={styles.MenuItem}>
                  <ul>
                    <li>
                      {" "}
                      <Link href='#' className={styles.active}>
                        Home
                      </Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link href='#BestFeatures'>Feature</Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link href='#ShopTheme'>Theme</Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link href='#ChossePackage'>Pricing</Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link href='#FAQ'>FAQ</Link>{" "}
                    </li>
                  </ul>
                </div>

                {/* Login */}
                <div className={styles.Login}>
                  <Link href='https://dashboard.funnelliner.com/'>Log In</Link>
                  <Link href='/signup'>Sign Up</Link>
                </div>
              </div>

              {/* MobileMenu */}
              <div
                className={`${styles.MobileMenu} ${styles.d_flex} ${styles.d_justify}`}
              >
                {/* logo */}
                <div className={styles.Left}>
                  <div className={styles.Logo}>
                    <Link href='#'>
                      <img src='../images/home_page/logo.svg' alt='' />
                    </Link>
                  </div>
                </div>

                {/* MenuItem */}

                <div className={styles.MenuIcon}>
                  <Button onClick={handleShowMenu}>
                    <img src='../images/home_page/menu.png' alt='' />
                  </Button>

                  <Offcanvas show={showMenu} onHide={handleCloseMenu}>
                    <Offcanvas.Header closeButton></Offcanvas.Header>

                    <Offcanvas.Body>
                      <div className={styles.MenuItem}>
                        <ul>
                          <li>
                            {" "}
                            <Link href='#' className={styles.active}>
                              Home
                            </Link>{" "}
                          </li>
                          <li>
                            {" "}
                            <Link href='#'>Feature</Link>{" "}
                          </li>
                          <li>
                            {" "}
                            <Link href='#'>Theme</Link>{" "}
                          </li>
                          <li>
                            {" "}
                            <Link href='#'>Pricing</Link>{" "}
                          </li>
                          <li>
                            {" "}
                            <Link href='#'>Blogs</Link>{" "}
                          </li>
                        </ul>

                        {/* Login */}
                        <div className={styles.Login}>
                          <Link href='https://dashboard.funnelliner.com/'>
                            Log In
                          </Link>
                          <Link href='/signup'>
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
            Banner
        ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section className={styles.Banner}>
        <Container className={styles.CustomeContainer}>
          <Row>
            <Col lg={12}>
              <div
                className={` ${styles.BannerContent} ${styles.d_flex} ${styles.d_justify}`}
              >
                {/* left */}
                <div className={styles.BannerText}>
                  <h2>
                    {" "}
                    <span>Welcome to</span> The First Ever Automated <br />{" "}
                    E-Commerce Sales Funnel <span>in bangladesh</span>
                  </h2>
                </div>

                {/* Img */}
                <div className={styles.Img}>
                  <img src='../images/home_page/banner_arrow.png' alt='' />
                </div>

                {/* right */}
                <div className={styles.BannerRight}>
                  <h2>
                    <span>Create Your</span> Own Online Shop,
                    <span>Decorate Your Shop,</span> Boost Up Your Sales !
                  </h2>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <div className={styles.BannerBg}>
          <img src='../images/home_page/banner_bg.png' alt='' />

          <div className={styles.overlay}>
            <Container className={styles.CustomeContainer}>
              <Row className='justify-content-md-center'>
                <Col lg={6}>
                  <img src='../images/home_page/banner_img.png' alt='' />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>
      {/* section_gaps */}
      <div className={styles.section_gaps}></div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
            HowToSetUp
        ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section className={styles.HowToSetUp}>
        <Container className={styles.CustomeContainer}>
          <Row className='justify-content-md-center'>
            <Col lg={10}>
              <div className={styles.Header}>
                <h2>How To Set Up Your Online Shop </h2>

                <p>
                  You must be thinking of setting up the store nicely. If your
                  answer is yes then follow these five steps.
                </p>
              </div>

              <div className={styles.img}>
                <img src='../images/home_page/how-to-set-up.svg' alt='' />
              </div>

              <div className={styles.MobileImg}>
                <img src='../images//home_page/mobshop1.svg' alt='' />
                <img src='../images//home_page/mobshop2.svg' alt='' />
                <img src='../images//home_page/mobshop3.svg' alt='' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* section_gaps */}
      <div className={styles.section_gaps}></div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------

            ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='BestFeatures' className={styles.BestFeatures}>
        <Row>
          <Col lg={6}>
            <div className={styles.BestFeaturesImg}>
              <img src='../images/home_page/best_feature.png' alt='' />
            </div>
          </Col>

          <Col lg={6}>
            <div className={styles.BestFeaturesText}>
              <h2>
                Best Features That Will Make <span>Your Shop Best</span>
              </h2>

              <ul>
                <li>Dynamic Dashboard. </li>
                <li>On-time update system. </li>
                <li>1-minute shop creation. </li>
                <li>Modern informative Admin panel. </li>
                <li>Facility to get all information on one Page. </li>
                <li>Multilevel Security. </li>
                <li>Product Inventory. </li>
                <li>Multiple Payment Method. </li>
                <li>Many types of couriers. </li>
                <li>SEO friendly. </li>
                <li>150+ customizable themes to choose from.</li>
                <li>Mobile and Tablet friendly Website. </li>
                <li>Provide all the benefits of E-commerce.</li>
              </ul>
            </div>
          </Col>
        </Row>
      </section>

      {/* section_gaps */}
      <div className={styles.section_gaps}></div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
               ManageYourShop
            ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section className={styles.ManageYourShop}>
        <Container className={styles.CustomeContainer}>
          <Row className={styles.d_flex}>
            <Col lg={7}>
              <div className={styles.Header}>
                <h2>
                  Manage Your Shop On The Go With{" "}
                  <span>Mobile Friendly Application</span>
                </h2>

                <p>
                  If the store can be maintained beautifully on mobile. Then the
                  store can be easily maintained from anywhere. Funnelliner's
                  mobile-friendly app works to bring your store completely into
                  your hands. Your one-touch solution.
                </p>

                <p>Four main reasons to be mobile-friendly</p>
                <p>
                  Smart dashboard: As beautiful as it looks, all the important
                  information can be easily found in the Funnelliner dashboard
                </p>
                <p>
                  Fast browsing: Browsing with maximum speed will make your shop
                  supervision faster.
                </p>
                <p>
                  Easy website: You don't have to take any stress to managing.
                  You can manage your website without stress.
                </p>
                <p>
                  All Device Compatible: You can easily use the internet using
                  devices in a beautiful and smooth way.
                </p>
              </div>

              <div
                className={` ${styles.SmartDashbord} ${styles.d_flex} ${styles.d_justify}`}
              >
                <div className={styles.SmartDashbordItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/home.png' alt='' />
                  </div>

                  <p>
                    Smart <br /> Dashboard
                  </p>
                </div>

                <div className={styles.SmartDashbordItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/browser.png' alt='' />
                  </div>

                  <p>
                    Fast <br /> Browsing
                  </p>
                </div>

                <div className={styles.SmartDashbordItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/computer.png' alt='' />
                  </div>

                  <p>
                    Easy Website <br /> Management
                  </p>
                </div>

                <div className={styles.SmartDashbordItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/mobile.png' alt='' />
                  </div>

                  <p>
                    All Device <br /> Compatible
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={5}>
              <div className={styles.ManageShop}>
                <img src='../images/home_page/manageshop.png' alt='' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* section_gaps */}
      <div className={styles.section_gaps}></div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
               OurService
            ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section className={styles.OurService}>
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className='mySwiper'
        >
          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service3.png' alt='' />
              </div>

              <p>Furniture & Household Business</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service1.png' alt='' />
              </div>

              <p>Watch & Clock Shop</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service2.png' alt='' />
              </div>

              <p>Grocery/Organic Foods Farm</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service4.png' alt='' />
              </div>

              <p>Fashion & Clothing Store</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service5.png' alt='' />
              </div>

              <p>Electronics & Smart Gadget Shop</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service6.png' alt='' />
              </div>

              <p>Medical & Hospital Equipment Shop</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service7.png' alt='' />
              </div>

              <p>Perfume & Body Spray Store</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service1.png' alt='' />
              </div>

              <p>Watch & Clock Shop</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service2.png' alt='' />
              </div>

              <p>Grocery/Organic Foods Farm</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service3.png' alt='' />
              </div>

              <p>Furniture & Household Business</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service4.png' alt='' />
              </div>

              <p>Fashion & Clothing Store</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service5.png' alt='' />
              </div>

              <p>Electronics & Smart Gadget Shop</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service6.png' alt='' />
              </div>

              <p>Medical & Hospital Equipment Shop</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.Item}>
              <div className={styles.img}>
                <img src='../images/home_page/service7.png' alt='' />
              </div>

              <p>Perfume & Body Spray Store</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>



      {/* section_gaps */}
      <div className={styles.section_gaps}></div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
               ShopTheme
            ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='ShopTheme' className={styles.ShopTheme}>
        <Container className={styles.CustomeContainer}>
          <Row className='justify-content-md-center'>
            <Col lg={10}>
              <div className={styles.Header}>
                <h2>Choose Your Shop Theme</h2>
                <p>
                  All the themes you need are here, choose, select, customize
                  and build your favorite website in no time.
                </p>
              </div>
            </Col>
          </Row>

          <div className={styles.ShopThemeContent}>
            <Row>
              <Col lg={4} sm={6}>
                <div className={styles.ShopThemeItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/theme2.png' alt='' />
                  </div>

                  <div className={styles.text}>
                    <h3>Grocery/Organic Foods</h3>

                    <a target="_blank" href='https://preview.funnelliner.xyz/theme_1'>View Demo</a>
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={6}>
                <div className={styles.ShopThemeItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/sobId.png' alt='' />
                  </div>

                  <div className={styles.text}>
                    <h3>Iconic E-commerce</h3>

                    <a target="_blank" href='https://preview.funnelliner.xyz/theme-two'>View Demo</a>
                  </div>
                </div>
              </Col>


              <Col lg={4} sm={6}>
                <div className={styles.ShopThemeItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/theme4.png' alt='' />
                    <div className={styles.overlay}>
                      <h5>Coming Soon...</h5>
                    </div>
                  </div>

                  <div className={styles.text}>
                    <h3>Electronics And Gadgets Shop</h3>

                    <Link href=''>View Demo</Link>
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={6}>
                <div className={styles.ShopThemeItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/theme3.png' alt='' />
                    <div className={styles.overlay}>
                      <h5>Coming Soon...</h5>
                    </div>
                  </div>
                  <div className={styles.text}>
                    <h3>Fast Food Web Theme</h3>

                    <Link href=''>View Demo</Link>
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={6}>
                <div className={styles.ShopThemeItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/theme5.png' alt='' />
                    <div className={styles.overlay}>
                      <h5>Coming Soon...</h5>
                    </div>
                  </div>

                  <div className={styles.text}>
                    <h3>Fancy Watch & Clock Shop</h3>

                    <Link href=''>View Demo</Link>
                  </div>
                </div>
              </Col>

              <Col lg={4} sm={6}>
                <div className={styles.ShopThemeItem}>
                  <div className={styles.img}>
                    <img src='../images/home_page/theme6.png' alt='' />
                    <div className={styles.overlay}>
                      <h5>Coming Soon...</h5>
                    </div>
                  </div>

                  <div className={styles.text}>
                    <h3>Jewellery & Ornaments Shop</h3>

                    <Link href=''>View Demo</Link>
                  </div>
                </div>
              </Col>

              <Col lg={12}>
                <div className={styles.ShowMore}>
                  <Link href=''>View All</Link>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* section_gaps */}
      <div className={styles.section_gaps}></div>
      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
          ShopTheme
      ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section className={styles.ShopTheme}>
        <Container className={styles.CustomeContainer}>
          <Row className='justify-content-md-center'>
            <Col lg={10}>
              <div className={styles.Header}>
                <h2>Choose Your One Page Funnel Template</h2>
                <p>
                  The One Page Panel template is the flagship champion that
                  combines the sales page and order form into a single page. It
                  may be a convenient solution for you.
                </p>
              </div>
            </Col>
          </Row>

          <div className={styles.ShopThemeContent}>
            <Row>

              {
                isLoading === true && <>
                  <Col lg={4} sm={6}>
                    <div className={styles.ShopThemeItem}>
                      <div className={styles.img}>
                        <Placeholder as={Card.Img} xs={12} animation="wave" />
                      </div>
                      <div className={styles.text}>
                        <Placeholder xs={12} bg="secondary" />
                        <Placeholder xs={12} bg="secondary" />
                      </div>
                    </div>
                  </Col>

                  <Col lg={4} sm={6}>
                    <div className={styles.ShopThemeItem}>
                      <div className={styles.img}>
                        <Placeholder as={Card.Img} xs={12} animation="wave" />
                      </div>
                      <div className={styles.text}>
                        <Placeholder xs={12} bg="secondary" />
                        <Placeholder xs={12} bg="secondary" />
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} sm={6}>
                    <div className={styles.ShopThemeItem}>
                      <div className={styles.img}>
                        <Placeholder as={Card.Img} xs={12} animation="wave" />
                      </div>
                      <div className={styles.text}>
                        <Placeholder xs={12} bg="secondary" />
                        <Placeholder xs={12} bg="secondary" />
                      </div>
                    </div>
                  </Col>
                  
                </>
              }

              {
                landingList && isLoading === false && landingList.map((item) => (
                  <Col lg={4} sm={6}>
                    <div className={styles.ShopThemeItem}>
                      <div className={styles.img}>
                        <img src={item?.media?.name} alt='' />
                      </div>
                      <div className={styles.text}>
                        <h3>{item?.theme_name}</h3>
                        <a target="_blank" href={item?.url}>View Demo</a>
                      </div>
                    </div>
                  </Col>
                ))
              }

              <Col lg={12}>
                <div className={styles.ShowMore}>
                  <Link href='/shop-theme'>View All</Link>
                </div>
              </Col>

            </Row>
          </div>

        </Container>

      </section>

      {/* section_gaps */}
      <div className={styles.section_gaps}></div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
        ChossePackage
        ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='ChossePackage' className={styles.ChossePackage}>
        <Container className={styles.CustomeContainer}>
          <Row className='justify-content-md-center'>
            <Col lg={10}>
              <div className={styles.Header}>
                <h2>Choose Your Subscription Package</h2>
                <p>
                  A convenient subscription package for you with all the
                  benefits of professional templates plus customer response
                  order maintenance with store layout in mind.
                </p>
              </div>
            </Col>
          </Row>

          {/* <!-- ChossePackageConent --> */}
          <div className={styles.ChossePackageConent}>
            <Row className='justify-content-md-center'>
              <Col lg={4} sm={6}>
                <div className={styles.ChossePackageItem}>
                  <div className={styles.PackageImg}>
                    <img src='../images/home_page/package_img.png' alt='' />
                  </div>

                  <h4>Basic</h4>
                  <h3>BDT 3000</h3>
                  <h5>Every Month</h5>

                  <ul>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' /> 1 online
                      store
                    </li>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' />{" "}
                      Unlimited products
                    </li>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' />{" "}
                      Unlimited Order Monthly
                    </li>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' /> Payment
                      gateway integration
                    </li>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' />{" "}
                      Marketing tools
                    </li>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' /> Free SSL
                      certificate
                    </li>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' /> Discount
                      codes
                    </li>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' /> Themes
                    </li>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' /> Plugins
                    </li>
                    <li>
                      {" "}
                      <img src='../images/home_page/sign.svg' alt='' /> 24/7
                      support
                    </li>
                  </ul>

                  <Link href='/signup'>
                    Subscribe
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* section_gaps */}
      <div className={styles.section_gaps}></div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
            AskQustion
        ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='FAQ' className={styles.AskQustion}>
        <Container className={styles.CustomeContainer}>
          <Row className='justify-content-md-center'>
            <Col lg={10}>
              <div className={styles.Header}>
                <h2>Frequently Asked Questions</h2>
                <p>
                  If You spend a lot of your time answering emails or social
                  media queries, an FAQ can be a real timesaver.
                </p>
              </div>
            </Col>
          </Row>

          <div className={styles.AskQusContent}>
            <Row className={styles.d_flex}>
              <Col lg={6} className={styles.first}>
                <Accordion defaultActiveKey={["0"]}>
                  <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                      <h3>What is a Funnelliner and how does it work?</h3>

                      <div className='plus'>
                        {" "}
                        <HiOutlinePlus />{" "}
                      </div>
                      <div className='minus'>
                        {" "}
                        <HiOutlineMinus />{" "}
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <p>
                        Funnel liner is an easy-to-use platform to run, manage
                        and grow your business online from desktop and mobile.
                        You can create your online store, add products, manage
                        inventory, accept online payments, and do much more.
                        It’s the simplest and fastest way to take your business
                        to the next level.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey='1'>
                    <Accordion.Header>
                      <h3>
                        Do I need to be technically savvy to use Funnelliner?
                      </h3>

                      <div className='plus'>
                        {" "}
                        <HiOutlinePlus />{" "}
                      </div>
                      <div className='minus'>
                        {" "}
                        <HiOutlineMinus />{" "}
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <p>
                        No, you don’t need to be technically skilled to run an
                        online business on Funnelliner. Funnelliner makes it
                        easy for you to launch an online business and grow it
                        using a suite of marketing tools and plugins.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey='2'>
                    <Accordion.Header>
                      <h3>Can I accept online payments?</h3>

                      <div className='plus'>
                        {" "}
                        <HiOutlinePlus />{" "}
                      </div>
                      <div className='minus'>
                        {" "}
                        <HiOutlineMinus />{" "}
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <p>
                        Yes, you can accept online payments from your customers.
                        Funnelliner also allows you to integrate with Bkash,
                        Nagad and Sslcommerz to accept online payments..
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey='3'>
                    <Accordion.Header>
                      <h3>Can I customise my online store?</h3>

                      <div className='plus'>
                        {" "}
                        <HiOutlinePlus />{" "}
                      </div>
                      <div className='minus'>
                        {" "}
                        <HiOutlineMinus />{" "}
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <p>
                        Yes, you can customise your online store. You can choose
                        from a range of themes that match your brand and make
                        your store stand out.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey='4'>
                    <Accordion.Header>
                      <h3>Can I pay my fee every Month-end?</h3>

                      <div className='plus'>
                        {" "}
                        <HiOutlinePlus />{" "}
                      </div>
                      <div className='minus'>
                        {" "}
                        <HiOutlineMinus />{" "}
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <p>Yes, you can pay a fee at the end of the month..</p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey='5'>
                    <Accordion.Header>
                      <h3>What about 3rd party payment gateway?</h3>

                      <div className='plus'>
                        {" "}
                        <HiOutlinePlus />{" "}
                      </div>
                      <div className='minus'>
                        {" "}
                        <HiOutlineMinus />{" "}
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <p>
                        If you want to use a third party payment gateway then
                        you have to purchase a 3rd party payment gateway from a
                        corresponding authority like Sslcommerz , bKash, Nagad
                        and we will integrate in your system.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey='6'>
                    <Accordion.Header>
                      <h3>Can I use my own domain with Funnelliner?</h3>

                      <div className='plus'>
                        {" "}
                        <HiOutlinePlus />{" "}
                      </div>
                      <div className='minus'>
                        {" "}
                        <HiOutlineMinus />{" "}
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      <p>
                        Yes, you can connect your domain name with Funnelliner.
                        You can also purchase premium domain names by paying
                        additional fees.
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              </Col>

              <Col lg={6} className={styles.last}>
                <div className={styles.AskQustionImg}>
                  <img src='../images/home_page/qus.png' alt='' />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* section_gaps */}
      <div className={styles.section_gaps}></div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
            JoinUs
            ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section className={styles.JoinUs}>
        <Container className={styles.CustomeContainer}>
          <Row className='justify-content-md-center'>
            <Col lg={10}>
              <div className={styles.Header}>
                <h2>Join Us On Social Media</h2>
                <p>
                  Join our funnel liner community for e-commerce and marketing
                  tips and tricks, where we help solo business owners like you
                  save time and grow with better content strategies.
                </p>
              </div>

              <div className={` ${styles.SocialIcon} ${styles.d_flex} `}>
                <a
                  href='https://www.facebook.com/funnelliner'
                  className={styles.fb}
                >
                  {" "}
                  <FaFacebookF />{" "}
                </a>
                <a
                  href='https://www.facebook.com/funnelliner'
                  className={styles.ins}
                >
                  <FaInstagram />
                </a>
                <a
                  href='https://www.facebook.com/funnelliner'
                  className={styles.youtube}
                >
                  <FaYoutube />
                </a>
                <a
                  href='https://api.whatsapp.com/send/?phone=8801799733234&text&type=phone_number&app_absent=0'
                  className={styles.whats}
                >
                  <FaWhatsapp />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* section_gaps */}
      <div className={styles.section_gaps}></div>

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
            Footer
            ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <footer className={styles.Footer}>
        <Container className={styles.CustomeContainer}>
          <Row>
            <Col lg={6} sm={12}>
              <Row>
                <Col lg={6} sm={6}>
                  <div className={styles.Address}>
                    <h4>Address</h4>
                    <p>
                      SAR Bhaban, Level-5 , Ka-78, Progoti Sarani, Kuril,
                      Vatara, Dhaka-1229, Bangladesh
                    </p>
                  </div>

                  <div className={styles.Address}>
                    <h4>Contact No.</h4>
                    <a href='tel:0123456789'>+8801894844452</a>
                    {/* <a href="tel:0123456789">+880 123 456 789</a> */}
                  </div>

                  <div className={styles.Address}>
                    <h4>E-mail Address</h4>
                    <a href='mailto:support@funnelliner.com'>
                      support@funnelliner.com
                    </a>
                  </div>

                  <div className={styles.Logo}>
                    <img src='../images/home_page/logo.svg' alt='' />
                  </div>
                </Col>

                <Col lg={6} sm={6}>
                  <div className={styles.Address}>
                    <h4>Quick Links</h4>

                    <div className={styles.FooterMenubar}>
                      <ul>
                        <li>
                          <Link href=''>Home</Link>
                        </li>
                        <li>
                          <Link href=''>Feature</Link>
                        </li>
                        <li>
                          <Link href=''>Themes</Link>
                        </li>
                        <li>
                          <Link href='/privacy'>Privacy Policy</Link>
                        </li>
                        <li>
                          <Link href='/terms'>Terms & Condition</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col lg={6} sm={12}>
              <div className={styles.FormPart}>
                <form action='' method='post'>
                  <div className={styles.CustomeInput}>
                    <input type='text' name='' placeholder='Full Name' />
                  </div>

                  <div className={styles.CustomeInput}>
                    <input type='text' name='' placeholder='Contact Number' />
                  </div>

                  <div className={styles.CustomeInput}>
                    <input type='text' name='' placeholder='E-mail Address' />
                  </div>

                  <div className={styles.CustomeInput}>
                    <textarea
                      name=''
                      id=''
                      rows='5'
                      placeholder='Enter Your Message'
                    ></textarea>
                  </div>

                  <div className={styles.CustomeInput}>
                    <button type='submit'>Submit</button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* section_gaps */}
      {/* <div className={styles.section_gaps}></div> */}

      {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------

      ------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      {/* <Container className={styles.CustomeContainer}> */}
    </div>
  );
};

export default MainPage;



















< !DOCTYPE html >
  <html>
    <head>
      <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale = 1">
        <title>CSS Card Flip</title>
        <link href="style.css" type="text/css" rel="stylesheet">
        </head>

        <body>
          <div class="maincontainer">
            <div class="back">
              <h2>Copywriting</h2>
              <p>Introduction to Copywriting’ workshop focuses on the theory and processes of professional copywriting as applied to persuasion, reasoning, and rhetoric. This workshop is best-suited to learning how to write and think about consumer-driven functions.</p>
            </div>
            <div class="front">
              <div class="image">
                <img src="https://i.postimg.cc/nhG8H3X6/copywriting.jpg">
                  <h2>Copywriting</h2>
              </div>
            </div>
          </div>
          <div class="maincontainer">
            <div class="back">
              <h2>Content Marketing</h2>
              <p>Introduction to Content Marketing workshop focuses on building content frameworks that are designed for and directed at communication engagement. This interdisciplinary workshop is best-suited to learning visual and written communication strategies.</p>
            </div>
            <div class="front">
              <div class="image">
                <img src="https://i.postimg.cc/ydrv1ZXq/contentmarketing.jpg">
                  <h2>Content Marketing</h2>
              </div>
            </div>
          </div>
          <div class="maincontainer">
            <div class="back">
              <h2>Web Writing</h2>
              <p>Introduction to Web-Writing workshop focuses on building creative and systemic digital content through online user experiences that benefit people and robots. This workshop is best-suited to creating content for digital platforms and devices — websites, mobile, game consoles, and virtual reality engines.</p>
            </div>
            <div class="front">
              <div class="image">
                <img src="https://i.postimg.cc/ZqbG0630/webwriting.jpg">
                  <h2>Web Writing</h2>
              </div>
            </div>
          </div>

        </body>
      </html>