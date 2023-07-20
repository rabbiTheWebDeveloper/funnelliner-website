import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Placeholder, Row, Tab, Tabs } from 'react-bootstrap';
import Link from 'next/link';

import { BsArrow90DegRight, BsArrowRight, BsEnvelopeAt } from 'react-icons/bs';
import { FiPhoneCall } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import { PiArrowBendUpRightBold } from 'react-icons/pi';
import axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import { Button } from '@mui/material';



const MainPage = () => {

    const [landingList, setLandingList] = useState([])
    const [isLoading, setIsLoading] = useState(true);

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
            console.log("error", error)
        }
    }
    useEffect(() => {
        landingThemeFetch()
    }, []);





    return (

        <>

            <div className="MainLandingPage">


                {/* =============================================================================
                    Start CountDown
                ===============================================================================*/}
                <section className="CountDown">

                    <Container>

                        <Row>

                            <Col lg={12}>

                                <div className="CountDownContent">

                                    <div className="left">

                                        <p>আপনার বিজনেসে সর্বোচ্চ সেল বৃদ্ধি ও অটোমেশন করতে মোস্ট ভ্যালুয়েবল ওয়েবিনারে জয়েন করুন</p>

                                        <div className="CountDownBox">

                                            <div className="CountDownItem">
                                                <h4>10</h4>
                                                <h6>Days</h6>
                                            </div>

                                            <div className="CountDownItem">
                                                <h4>10</h4>
                                                <h6>Hours</h6>
                                            </div>

                                            <div className="CountDownItem">
                                                <h4>10</h4>
                                                <h6>Min</h6>
                                            </div>

                                            <div className="CountDownItem">
                                                <h4>10</h4>
                                                <h6>Sec</h6>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="JoinNow">
                                        <Link href='https://app.funnelliner.com/join' target='_blank'>Join Now <PiArrowBendUpRightBold /></Link>
                                    </div>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End CountDown
                ===============================================================================*/}

                {/* =============================================================================
                    Start Menubar
                ===============================================================================*/}
                <section className="Menubar">

                    <Container>

                        <Row className="d_flex">

                            {/* logo */}
                            <Col lg={3}>

                                <div className="Logo">
                                    <img src="/images/home_page/logo-beta.png" alt="" />
                                </div>

                            </Col>

                            {/* Menu */}
                            <Col lg={6}>

                                <div className="Menu">

                                    <ul>
                                        <li><Link className="active" href='#'>Home</Link></li>
                                        <li><Link href='#'>Feature</Link></li>
                                        <li><Link href='#'>Theme</Link></li>
                                        <li><Link href='#'>Pricing</Link></li>
                                        <li><Link href='#'>FAQ</Link></li>
                                    </ul>

                                </div>

                            </Col>

                            <Col lg={3}>

                                <div className="Login">

                                    <ul>
                                        <li> <Link href='https://dashboard.funnelliner.com/' target='_blank'> Login </Link> </li>
                                        <li> <Link href='/signup' target='_blank' className="bg"> Sign Up </Link> </li>
                                    </ul>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End Menubar
                ===============================================================================*/}



                {/* =============================================================================
                    Start Banner
                ===============================================================================*/}
                <section className="Banner">

                    <img className='OverlayOneImg' src="images/home_page/banner/banner-effect1.png" alt="" />
                    <img className='OverlayTwoImg' src="images/home_page/banner/banner-effect2.png" alt="" />
                    <img className='OverlayThreeImg' src="images/home_page/banner/banner-effect3.png" alt="" />

                    <div className="OverlayOne"></div>


                    <div className="OverlayOne Two"></div>


                    <Container>

                        <Row>

                            <Col lg={12}>

                                <div className="BannerContent">
                                    <h1>Make your Website, Sales Funnel & Automation your business</h1>
                                    <h4>Without any Coding skills</h4>
                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>

                {/* BannerShop */}
                <div className="BannerShop">
                    <Container>
                        <Row className='justify-content-center'>
                            <Col lg={12}>
                                <div className="BannerShopImg">
                                    <img src="/images/home_page/banner/shop.png" alt="" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>


                {/* =============================================================================
                    End Banner
                ===============================================================================*/}

                <div className="SectionGaps"></div>

                {/* =============================================================================
                    Start Platform
                ===============================================================================*/}
                <section className='Platform'>

                    <div className="overlayOne"></div>
                    <div className="overlayTwo"></div>
                    <div className="overlayThree">
                        <img src="/images/home_page/platform-arrow.png" alt="" />
                    </div>

                    <Container>

                        <Row>

                            <Col lg={6}>

                                <div className="Video">

                                    <video playing autoPlay loop muted>
                                        <source src="https://funnelliner.s3.ap-southeast-1.amazonaws.com/media/Video/01.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                </div>



                            </Col>

                            <Col lg={6}>

                                <div className="PlatformRight">

                                    <h4>Funnel Liner platform</h4>
                                    <h2>Infinite possibilities grow your business.</h2>

                                    <ul>
                                        <li> <BsArrow90DegRight /> Unlimited Website & Landing  page creation </li>
                                        <li> <BsArrow90DegRight /> The place for your business growth </li>
                                        <li> <BsArrow90DegRight /> Sales Galore </li>
                                        <li> <BsArrow90DegRight /> Powerful super fast  Application </li>
                                        <li> <BsArrow90DegRight /> ​Simple Buying Process </li>
                                    </ul>

                                    {/* Call */}
                                    <div className="Call">
                                        <div className="img">
                                            <img src="/images/home_page/support.png" alt="" />
                                        </div>
                                        <div className="text">
                                            <h3>0963-888-8881</h3>
                                            <p>Need Customer Care Help? </p>
                                        </div>
                                    </div>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End Platform
                ===============================================================================*/}


                {/* =============================================================================
                    Start SetUpOnlineShop
                ===============================================================================*/}

                <section className='SetUpOnlineShop'>

                    <div className="overlayOne"></div>
                    <div className="overlayTwo"></div>
                    <div className="overlayThree">
                        <img src="/images/home_page/squar-fram.png" alt="" />
                    </div>

                    <Container>

                        <Row className='justify-content-center'>

                            <Col lg={8}>

                                <div className="Header">
                                    <h2>How To Set Up Your Online Shop</h2>
                                    <p>You must be thinking of setting up the store nicely. If your answer is yes then follow these five steps.</p>
                                </div>

                            </Col>

                        </Row>

                        {/* SetUpOnlineShopContent */}
                        <div className="SetUpOnlineShopContent">

                            <Row>

                                <Col lg={12}>

                                    <div className="SetUpOnlineShopFlex">

                                        {/* item */}
                                        <div className="SetUpOnlineShopItem">

                                            <div className="SetUpOnlineShopText">

                                                <div className="img">
                                                    <img src="/images/home_page/SetUpOnlineShop1.png" alt="" />
                                                </div>

                                                <h4>Open Account</h4>

                                            </div>

                                        </div>

                                        {/* item */}
                                        <div className="SetUpOnlineShopItem">

                                            <div className="SetUpOnlineShopText">

                                                <div className="img">
                                                    <img src="/images/home_page/SetUpOnlineShop2.png" alt="" />
                                                </div>

                                                <h4>Select Theme</h4>

                                            </div>

                                        </div>

                                        {/* item */}
                                        <div className="SetUpOnlineShopItem">

                                            <div className="SetUpOnlineShopText">

                                                <div className="img">
                                                    <img src="/images/home_page/SetUpOnlineShop3.png" alt="" />
                                                </div>

                                                <h4>Upload Product</h4>

                                            </div>

                                        </div>

                                        {/* item */}
                                        <div className="SetUpOnlineShopItem">

                                            <div className="SetUpOnlineShopText">

                                                <div className="img">
                                                    <img src="/images/home_page/SetUpOnlineShop4.png" alt="" />
                                                </div>

                                                <h4>Delivery Service</h4>

                                            </div>

                                        </div>

                                        {/* item */}
                                        <div className="SetUpOnlineShopItem">

                                            <div className="SetUpOnlineShopText">

                                                <div className="img">
                                                    <img src="/images/home_page/SetUpOnlineShop5.png" alt="" />
                                                </div>

                                                <h4>Ready To Start</h4>

                                            </div>

                                        </div>

                                    </div>

                                    <Link href='/signup' className='bg'>Get Started <BsArrowRight /> </Link>

                                </Col>

                            </Row>

                        </div>

                    </Container>

                </section>


                {/* =============================================================================
                    End SetUpOnlineShop
                ===============================================================================*/}


                {/* =============================================================================
                    Start BuiltForEveryone
                ===============================================================================*/}
                <section className='BuiltForEveryone'>

                    <Container>

                        <Row className='justify-content-center'>

                            <Col lg={10}>

                                <div className="Header">
                                    <h4>Built For Everyone</h4>
                                    <h2>We funnel liners are built for the way you work</h2>
                                </div>

                            </Col>

                        </Row>

                        <div className="BuiltForEveryoneTabs">

                            <Tabs
                                defaultActiveKey="Editor"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >

                                {/* Editor */}
                                <Tab eventKey="Editor" title="Funnel Liner Editor">

                                    <div className="BuiltTabsContent">

                                        {/* Left */}
                                        <div className="Left">

                                            <h3>Work easy and do more with Funnel Liner.</h3>
                                            <p>Test our Easy And Powerful Drag & Drop Page Builder editing experience & make...</p>

                                            <div className="Replace d_flex">
                                                <h4>REPLACES:</h4>
                                                <img src="/images/home_page/wordpress.png" alt="" />
                                            </div>

                                            <Link href='/signup' className='bg'>Get Started <BsArrowRight /> </Link>

                                        </div>

                                        {/* Right */}
                                        <div className="Right">

                                            <div className="Video">

                                                <video playing autoPlay loop muted>
                                                    <source src="https://funnelliner.s3.ap-southeast-1.amazonaws.com/media/Video/editor.mp4" type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>

                                            </div>

                                        </div>

                                    </div>

                                </Tab>

                                {/* Orders */}
                                <Tab eventKey="Orders" title="Orders Management">

                                    <div className="BuiltTabsContent">

                                        {/* Right */}
                                        <div className="Right">

                                            <div className="Video">
                                                <img src="/images/home_page/Order.jpg" alt="" />
                                            </div>

                                        </div>

                                    </div>

                                </Tab>

                                {/* Account */}
                                <Tab eventKey="Account" title="Accounting Modules">

                                    <div className="BuiltTabsContent">

                                        {/* Right */}
                                        <div className="Right">

                                            <div className="Video">
                                                <img src="/images/home_page/Accounting Modules.jpg" alt="" />
                                            </div>

                                        </div>

                                    </div>

                                </Tab>

                                {/* Bulk */}
                                <Tab eventKey="Bulk" title="Bulk Sms">

                                    <div className="BuiltTabsContent">

                                        {/* Right */}
                                        <div className="Right">

                                            <div className="Video">
                                                <img src="/images/home_page/Bulk-SMS.jpg" alt="" />
                                            </div>

                                        </div>

                                    </div>

                                </Tab>

                                {/* Stock */}
                                <Tab eventKey="Stock" title="Stock">

                                    <div className="BuiltTabsContent">

                                        {/* Right */}
                                        <div className="Right">

                                            <div className="Video">
                                                <img src="/images/home_page/Stock.jpg" alt="" />
                                            </div>

                                        </div>

                                    </div>

                                </Tab>

                            </Tabs>

                        </div>

                    </Container>

                </section>


                {/* =============================================================================
                    End BuiltForEveryone
                ===============================================================================*/}


                <div className="SectionGaps"></div>


                {/* =============================================================================
                    Start PowerfulFunnel
                ===============================================================================*/}

                <section className='PowerfulFunnel'>

                    <div className="Frame">
                        <img src="/images/home_page/Frame3.png" alt="" />
                    </div>

                    <Container>

                        <Row className='justify-content-center'>

                            <Col lg={10}>
                                <h2>Attract customers will make your online business the best with powerful funnel.</h2>
                            </Col>

                        </Row>

                        {/* PowerfulFunnelContent */}
                        <div className="PowerfulFunnelContent">

                            <Row>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon1.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Funnel Liner Editor</h4>
                                            <p>Test our Easy And Powerful Drag & Drop Page Builder editing experience & make...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon2.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Order Management Solution</h4>
                                            <p>Easily manage orders from your Facebook page inbox, manual orders, landing page...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon3.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Super Fast Hosting</h4>
                                            <p>Experience lightning-fast page delivery with our powerful CDN hosting, ensuring accele...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon4.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Ready Landing Page</h4>
                                            <p>Unlock instant success with our collection of ready-to-use landing page templates...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon5.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Auto Invoice Making</h4>
                                            <p>Simplify your business operations with our automated invoice generation, ensuring seam...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon6.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Courier Entry</h4>
                                            <p>Streamline your order processing with our one-click order entry feature, allowing you...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon7.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Stock Management</h4>
                                            <p>Automatically reduce stock quantities upon order confirmation, and effortlessly...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon8.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>SMS Marketing</h4>
                                            <p>Amplify your marketing efforts with our bulk SMS marketing tool, allowing you to reach...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon9.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Accounting Module</h4>
                                            <p>Simplify your accounting tasks with our intuitive and user-friendly accounting mod...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon10.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Easy Checkout Pages</h4>
                                            <p>Enhance your customers' shopping experience with our convenient one-page che...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon11.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Marketing Tools</h4>
                                            <p>Empower your marketing efforts with our comprehensive suite of powerful marketing tools.</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon12.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Orders, Sales & Delivery Reporting Dashboard</h4>
                                            <p>Gain valuable insights into your orders, sales, and delivery data with our comprehensive re...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon13.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Sales Target</h4>
                                            <p>Set and track your sales targets effortlessly with our intuitive tool, allowing you to monitor pro...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon14.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Custom Domain</h4>
                                            <p>Funnel Liner  allows you to easily set up and customize your own domain, giving your bran...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon15.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Auto SSL Certificate</h4>
                                            <p>Your website and landing pages will be automatically secured with SSL encryption, provid...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon16.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Auto Scaling Feature (No Data Loss)</h4>
                                            <p>Funnel Liner incorporates automatic scaling capabilities, ensuring that your system...</p>
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon17.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Call Center Solution</h4>
                                            <img src="/images/home_page/icons/coming-soon.png" alt="" />
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon18.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>User Role</h4>
                                            <img src="/images/home_page/icons/coming-soon.png" alt="" />
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon19.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Business Email Add</h4>
                                            <img src="/images/home_page/icons/coming-soon.png" alt="" />
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More<BsArrowRight /> </Link>

                                    </div>

                                </Col>

                                {/* item */}
                                <Col lg={3}>

                                    <div className="PowerfulFunnelItem">

                                        <div className="Image">
                                            <img className='Img' src="/images/home_page/icons/icon20.png" alt="" />
                                            {/* overlay */}
                                            <img className='overlay' src="/images/home_page/icons/hover.png" alt="" />
                                        </div>

                                        <div className="text">
                                            <h4>Fb Page Inbox Integration with AI Chatbot</h4>
                                            <img src="/images/home_page/icons/coming-soon.png" alt="" />
                                        </div>

                                        <img className="HoverOverlayOne" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <img className="HoverOverlayTwo" src="/images/home_page/icons/hover-vector.png" alt="" />

                                        <Link href='#' className='bg'>Read More <BsArrowRight /> </Link>

                                    </div>

                                </Col>

                            </Row>

                        </div>

                    </Container>

                </section>

                {/* =============================================================================
                    End PowerfulFunnel
                ===============================================================================*/}


                <div className="SectionGaps"></div>


                {/* =============================================================================
                    Start IfHaveFunnelLiner
                ===============================================================================*/}
                <section className='IfHaveFunnelLiner'>

                    <div className="overlayOne"></div>
                    <div className="overlayTwo"></div>

                    <img className='Frame1' src="/images/home_page/frame1.png" alt="" />
                    <img className='Frame2' src="/images/home_page/frame2.png" alt="" />

                    <Container>

                        <Row className='justify-content-center'>

                            <Col lg={6}>
                                <h2>If you have Funnel Liner you don't need</h2>
                            </Col>

                        </Row>

                        <Row>
                            <Col lg={12}>

                                <div className="Video">

                                    <video playing autoPlay loop muted>
                                        <source src="https://funnelliner.s3.ap-southeast-1.amazonaws.com/media/Video/02.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                </div>
                            </Col>
                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End IfHaveFunnelLiner
                ===============================================================================*/}


                {/* =============================================================================
                    Start SingleLanding
                ===============================================================================*/}
                <section className='SingleLanding'>

                    <Container>

                        <Row className='justify-content-center'>

                            <Col lg={10}>

                                <div className="Header">
                                    <h2>One Page Funnel Template</h2>
                                    <p>Simply Drag & Drop, Customize, and Achieve Maximum Conversions with Our Sales, Marketing, and Conversion Hacks & Create High-Converting Pages in Minutes with Funnel Liner. </p>
                                </div>

                            </Col>

                        </Row>

                        {/* SingleLandingContent */}
                        <div className="SingleLandingContent">

                            <Row>

                                {
                                    isLoading === true && <>
                                        <Col lg={4} sm={6}>
                                            <div className="ShopThemeItem">
                                                <div className="img">
                                                    <Placeholder as={Card.Img} xs={12} animation="wave" />
                                                </div>
                                                <div className="text">
                                                    <Placeholder xs={12} bg="secondary" />
                                                    <Placeholder xs={12} bg="secondary" />
                                                </div>
                                            </div>
                                        </Col>

                                        <Col lg={4} sm={6}>
                                            <div className="ShopThemeItem">
                                                <div className="img">
                                                    <Placeholder as={Card.Img} xs={12} animation="wave" />
                                                </div>
                                                <div className="text">
                                                    <Placeholder xs={12} bg="secondary" />
                                                    <Placeholder xs={12} bg="secondary" />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6}>
                                            <div className="ShopThemeItem">
                                                <div className="img">
                                                    <Placeholder as={Card.Img} xs={12} animation="wave" />
                                                </div>
                                                <div className="text">
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
                                            <div className="SingleLandingItem">
                                                <div className="img">
                                                    <img src={item?.media?.name} alt='' />
                                                </div>
                                                <div className="text">
                                                    <h4>{item?.theme_name}</h4>
                                                    <Link target="_blank" href={item?.url} className='bg'>View Demo</Link>
                                                </div>
                                            </div>
                                        </Col>
                                    ))
                                }

                            </Row>

                            <div className="ViewAll">
                                <Link href='/shop-theme' target='_blank' className='bg LandingAll'>View All <BsArrowRight /></Link>
                            </div>

                        </div>

                    </Container>

                </section>


                {/* =============================================================================
                    End SingleLanding
                ===============================================================================*/}


                <div className="SectionGaps"></div>


                {/* =============================================================================
                    Start MultiLanding
                ===============================================================================*/}

                <section className='SingleLanding MultiLanding'>

                    <img className='FrameFour' src="/images/home_page/frame4.png" alt="" />
                    <img className='FrameFive' src="/images/home_page/frame5.png" alt="" />
                    <img className='FrameSix' src="/images/home_page/frame6.png" alt="" />
                    <img className='MultiLandingBg' src="/images/home_page/multi-landing-bg.png" alt="" />

                    <Container>

                        <Row className='justify-content-center'>

                            <Col lg={10}>

                                <div className="Header">
                                    <h2>Choose Your Website Theme</h2>
                                    <p>All the themes you need are here, choose, select, customise and build your favourite website in no time. </p>
                                </div>

                            </Col>

                        </Row>

                        {/* SingleLandingContent */}
                        <div className="SingleLandingContent">

                            <Row>

                                {
                                    isLoading === true && <>
                                        <Col lg={4} sm={6}>
                                            <div className="ShopThemeItem">
                                                <div className="img">
                                                    <Placeholder as={Card.Img} xs={12} animation="wave" />
                                                </div>
                                                <div className="text">
                                                    <Placeholder xs={12} bg="secondary" />
                                                    <Placeholder xs={12} bg="secondary" />
                                                </div>
                                            </div>
                                        </Col>

                                        <Col lg={4} sm={6}>
                                            <div className="ShopThemeItem">
                                                <div className="img">
                                                    <Placeholder as={Card.Img} xs={12} animation="wave" />
                                                </div>
                                                <div className="text">
                                                    <Placeholder xs={12} bg="secondary" />
                                                    <Placeholder xs={12} bg="secondary" />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4} sm={6}>
                                            <div className="ShopThemeItem">
                                                <div className="img">
                                                    <Placeholder as={Card.Img} xs={12} animation="wave" />
                                                </div>
                                                <div className="text">
                                                    <Placeholder xs={12} bg="secondary" />
                                                    <Placeholder xs={12} bg="secondary" />
                                                </div>
                                            </div>
                                        </Col>

                                    </>
                                }


                                <Col lg={4} sm={6}>
                                    <div className="SingleLandingItem">
                                        <div className="img">
                                            <img src="/images/home_page/theme1.png" alt='' />
                                        </div>
                                        <div className="text">
                                            <h4>Grocery/Organic Foods</h4>
                                            <Link target="_blank" href="https://preview.funnelliner.xyz/multipage-1" className='bg'>View Demo</Link>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={4} sm={6}>
                                    <div className="SingleLandingItem">
                                        <div className="img">
                                            <img src="/images/home_page/theme2.png" alt='' />
                                            {/* ComingSoon */}
                                            <div className="ComingSoon">
                                                <h4>Coming Soon...</h4>
                                            </div>
                                        </div>
                                        <div className="text">
                                            <h4>Iconic E-commerce</h4>
                                            <Link target="_blank" href="#" className='bg'>View Demo</Link>
                                        </div>

                                    </div>
                                </Col>

                                <Col lg={4} sm={6}>
                                    <div className="SingleLandingItem">
                                        <div className="img">
                                            <img src="/images/home_page/theme3.png" alt='' />
                                            {/* ComingSoon */}
                                            <div className="ComingSoon">
                                                <h4>Coming Soon...</h4>
                                            </div>
                                        </div>
                                        <div className="text">
                                            <h4>Electronics And Gadgets Shop</h4>
                                            <Link target="_blank" href="#" className='bg'>View Demo</Link>
                                        </div>

                                    </div>
                                </Col>

                            </Row>

                            <div className="ViewAll">
                                <Link href='#' className='bg'>View All <BsArrowRight /></Link>
                            </div>

                        </div>

                    </Container>

                </section>

                {/* =============================================================================
                    End MultiLanding
                ===============================================================================*/}

                <div className="SectionGaps"></div>

                {/* =============================================================================
                    Start MobileFriendly
                ===============================================================================*/}
                <section className='MobileFriendly'>

                    <img className='Frame7' src="/images/home_page/frame7.png" alt="" />
                    <img className='Frame8' src="/images/home_page/frame8.png" alt="" />
                    <img className='Frame9' src="/images/home_page/squar-fram.png" alt="" />

                    <Container>

                        <Row className='d_flex'>

                            <Col lg={6}>

                                <div className="MobileFriendlyLeft">

                                    <h4>Mobile friendly</h4>
                                    <h2>Manage Your Shop On The Go With Funnel Liner</h2>

                                    <div className="MobileFriendlyLeftBox">

                                        {/* item */}
                                        <div className="MobileFriendlyItem">

                                            <div className="img">
                                                <img src="/images/home_page/mobile-friendly1.png" alt="" />
                                            </div>

                                            <h4>Easy Website Builder</h4>

                                        </div>

                                        {/* item */}
                                        <div className="MobileFriendlyItem">

                                            <div className="img">
                                                <img src="/images/home_page/mobile-friendly2.png" alt="" />
                                            </div>

                                            <h4>Smart Dashboard</h4>

                                        </div>

                                        {/* item */}
                                        <div className="MobileFriendlyItem">

                                            <div className="img">
                                                <img src="/images/home_page/mobile-friendly3.png" alt="" />
                                            </div>

                                            <h4>All Device Compatible</h4>

                                        </div>

                                        {/* item */}
                                        <div className="MobileFriendlyItem">

                                            <div className="img">
                                                <img src="/images/home_page/mobile-friendly4.png" alt="" />
                                            </div>

                                            <h4>Fast Browsing</h4>

                                        </div>

                                    </div>

                                </div>

                            </Col>

                            <Col lg={6}>

                                <div className="Video">

                                    <video playing autoPlay loop muted>
                                        <source src="https://funnelliner.s3.ap-southeast-1.amazonaws.com/media/Video/04.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End MobileFriendly
                ===============================================================================*/}


                <div className="SectionGaps"></div>


                {/* =============================================================================
                    Start PersonalPlan
                ===============================================================================*/}
                <section className='PersonalPlan'>

                    <Container>

                        <Row className='justify-content-center'>

                            <Col lg={8}>

                                <div className="Header">

                                    <h4>Subscription Package</h4>
                                    <h2>Choose your personal plan</h2>

                                </div>

                            </Col>

                            <Col lg={12}>

                                <div className="PersonalPlanContent">

                                    {/* left */}
                                    <div className="left">

                                        <ul>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                1 Online Store
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Custom Domain
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Drag & Drop, No Code Editor
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Auto Invoice Making
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Super Fast CDN Hosting
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Auto Courier Entry
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Super Fast CDN Hosting
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Auto Courier Entry
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Unlimited Products
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Inventory Management
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Multi Page Themes
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Bulk SMS Marketing Features
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Landing Page Templates
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Marketing Tools
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Business Reports
                                            </li>

                                            <li>
                                                <img src="/images/home_page/check.png" alt="" />
                                                Business Reports
                                            </li>

                                            <li>
                                                <Link href='/signup' className='bg'>Get Started <BsArrowRight /> </Link>
                                            </li>

                                        </ul>

                                    </div>

                                    {/* right */}
                                    <div className="right">

                                        <div className="img">
                                            <img src="/images/home_page/priceing-text-bg.png" alt="" />

                                            <div className="text">

                                                <h4>TK</h4>
                                                <h2>2999</h2>
                                                <h4>Per Month</h4>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End PersonalPlan
                ===============================================================================*/}


                {/* =============================================================================
                    Start AskQuestion
                ===============================================================================*/}
                <section className='AskQuestion'>

                    <Container>

                        <Row className='justify-content-center'>

                            <Col lg={8}>
                                <h2>Frequently Asked Questions?</h2>
                            </Col>

                        </Row>

                        <Row>

                            <Col lg={12}>

                                <div className="AskQuestionTabs">

                                    <Accordion defaultActiveKey="0">

                                        <Accordion.Item eventKey="0">

                                            <Accordion.Header>
                                                Is it easy to build a website?

                                                <div className="img">
                                                    <img className='plus' src="/images/home_page/plus.png" alt="" />
                                                    <img className='minus' src="/images/home_page/minus.png" alt="" />
                                                </div>

                                            </Accordion.Header>

                                            <Accordion.Body>
                                                <p>Absolutely. Funnelliner is for everyone and makes it possible to create a high-quality website without knowing how to code. In the Funnelliner Editor, you can drag and drop any feature you want and customize it to match the look and feel of your site. Of course, if you do know how to code, you can add advanced functionality to your site with Velo.</p>
                                            </Accordion.Body>

                                        </Accordion.Item>

                                        <Accordion.Item eventKey="1">

                                            <Accordion.Header>
                                                Can I create a website without knowing how to code?

                                                <div className="img">
                                                    <img className='plus' src="/images/home_page/plus.png" alt="" />
                                                    <img className='minus' src="/images/home_page/minus.png" alt="" />
                                                </div>

                                            </Accordion.Header>

                                            <Accordion.Body>
                                                <p>Absolutely. Funnelliner is for everyone and makes it possible to create a high-quality website without knowing how to code. In the Funnelliner Editor, you can drag and drop any feature you want and customize it to match the look and feel of your site. Of course, if you do know how to code, you can add advanced functionality to your site with Velo.</p>
                                            </Accordion.Body>

                                        </Accordion.Item>

                                        <Accordion.Item eventKey="2">

                                            <Accordion.Header>
                                                Can I create a website without knowing how to code?

                                                <div className="img">
                                                    <img className='plus' src="/images/home_page/plus.png" alt="" />
                                                    <img className='minus' src="/images/home_page/minus.png" alt="" />
                                                </div>

                                            </Accordion.Header>

                                            <Accordion.Body>
                                                <p>Absolutely. Funnelliner is for everyone and makes it possible to create a high-quality website without knowing how to code. In the Funnelliner Editor, you can drag and drop any feature you want and customize it to match the look and feel of your site. Of course, if you do know how to code, you can add advanced functionality to your site with Velo.</p>
                                            </Accordion.Body>

                                        </Accordion.Item>

                                        <Accordion.Item eventKey="3">

                                            <Accordion.Header>
                                                Can I create a website without knowing how to code?

                                                <div className="img">
                                                    <img className='plus' src="/images/home_page/plus.png" alt="" />
                                                    <img className='minus' src="/images/home_page/minus.png" alt="" />
                                                </div>

                                            </Accordion.Header>

                                            <Accordion.Body>
                                                <p>Absolutely. Funnelliner is for everyone and makes it possible to create a high-quality website without knowing how to code. In the Funnelliner Editor, you can drag and drop any feature you want and customize it to match the look and feel of your site. Of course, if you do know how to code, you can add advanced functionality to your site with Velo.</p>
                                            </Accordion.Body>

                                        </Accordion.Item>

                                    </Accordion>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End AskQuestion
                ===============================================================================*/}



                <div className="SectionGaps"></div>


                {/* =============================================================================
                    Start 24/7 RealtimeSupport
                ===============================================================================*/}
                <section className='RealtimeSupport'>

                    <Container>

                        <Row>

                            <Col lg={6}>

                                <div className="Video">

                                    <video playing autoPlay loop muted>
                                        <source src="https://funnelliner.s3.ap-southeast-1.amazonaws.com/media/Video/Support.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                </div>

                            </Col>

                            <Col lg={6}>

                                <div className="PlatformRight">

                                    <h2>24/7 real <br /> time support.</h2>

                                    <ul>
                                        <li> <BsArrow90DegRight /> Email Support </li>
                                        <li> <BsArrow90DegRight /> Live Chat for Unlimited Plan </li>
                                        <li> <BsArrow90DegRight /> Frequent Webinars</li>
                                        <li> <BsArrow90DegRight /> All-time support for any problem with the website </li>
                                    </ul>

                                    {/* Call */}
                                    <div className="Call">
                                        <div className="img">
                                            <img src="/images/home_page/support.png" alt="" />
                                        </div>
                                        <div className="text">
                                            <h3>0963-888-8881</h3>
                                            <p>Need Customer Care Help? </p>
                                        </div>
                                    </div>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End 24/7 RealtimeSupport
                ===============================================================================*/}


                <div className="SectionGaps"></div>


                {/* =============================================================================
                    Start StartSelling
                ===============================================================================*/}
                <section className='StartSelling'>

                    <Container>

                        <Row>

                            <Col lg={12}>

                                <div className="StartSellingBox">

                                    <h2>Start selling online through the funnel.</h2>
                                    <p>Build your business with Funnel Liner to sell online products and everywhere in between.</p>

                                    <div className="customInput">
                                        <input type="text" placeholder='Enter your Work Email' />
                                        <Button type='submit' className='bg'>Get Started <BsArrowRight /> </Button>
                                    </div>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End StartSelling
                ===============================================================================*/}


                {/* =============================================================================
                    Start Footer
                ===============================================================================*/}
                <section className='Footer'>

                    <Container>

                        <Row>

                            <Col lg={5}>

                                <div className="FooterLogo">

                                    <img src="/images/home_page/logo-beta.png" alt="" />
                                    <p>The First Ever AutomatedE-Commerce Sales Funnel. Create Your Own Online Shop,Decorate Your Shop, Boost Up Your Sales !</p>

                                    <div className="socialIcon">

                                        <Link href=""><img src="/images/home_page/facebook.png" alt="" /></Link>
                                        <Link href=""><img src="/images/home_page/instagram.png" alt="" /></Link>
                                        <Link href=""><img src="/images/home_page/whatsapp.png" alt="" /></Link>
                                        <Link href=""><img src="/images/home_page/youtube.png" alt="" /></Link>

                                    </div>

                                </div>

                            </Col>

                            <Col lg={7}>

                                <Row>

                                    <Col lg={4}>

                                        <div className="FooterItem">

                                            <h3>Product</h3>

                                            <ul>
                                                <li> <Link href=''>Website Theme</Link> </li>
                                                <li> <Link href=''>Website Builder</Link> </li>
                                                <li> <Link href=''>Landing Page </Link> </li>
                                            </ul>

                                        </div>

                                    </Col>

                                    <Col lg={4}>

                                        <div className="FooterItem">

                                            <h3>About</h3>

                                            <ul>
                                                <li> <Link href=''>Terms & Conditions</Link> </li>
                                                <li> <Link href=''>Privacy Policy</Link> </li>
                                                <li> <Link href=''>Contact </Link> </li>
                                                <li> <Link href=''>FAQ </Link> </li>
                                            </ul>

                                        </div>

                                    </Col>

                                    <Col lg={4}>

                                        <div className="FooterItem">

                                            <h3>Contact Us</h3>

                                            <ul>

                                                <li>
                                                    <div className="svg"> <FiPhoneCall /> </div>
                                                    <Link href='tel:0963-888-8881'> 0963-888-8881 </Link>
                                                </li>

                                                <li>
                                                    <div className="svg"> <BsEnvelopeAt /> </div>
                                                    <Link href='mailto:support@funnelliner.com'>support@funnelliner.com</Link>
                                                </li>

                                                <li>
                                                    <div className="svg"> <MdLocationOn /> </div>
                                                    <p>SAR Bhaban, Level-5 , Ka-78, Progoti Sarani, Kuril, Vatara, Dhaka-1229, Bangladesh</p>
                                                </li>

                                            </ul>

                                        </div>

                                    </Col>

                                </Row>

                            </Col>

                            <Col lg={12}>
                                <div className="copyRight"> Copyright 2023 <Link href=''>Funnel Liner</Link>. All Rights Reserved </div>
                            </Col>

                        </Row>

                    </Container>

                </section>


                {/* =============================================================================
                    End Footer
                ===============================================================================*/}


                {/* =============================================================================
                    Start 
                ===============================================================================*/}



                {/* =============================================================================
                    End 
                ===============================================================================*/}



            </div>

        </>

    )
}

export default MainPage
