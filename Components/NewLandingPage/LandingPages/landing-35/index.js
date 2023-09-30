import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Order from '../../CommonLandingComponent/Order/Order';
import CustomerReview from '../../CommonLandingComponent/CustomerReview/CustomerReview';
import Video from '../../CommonLandingComponent/Video/Video';

// Footer
import Footer4 from "../../CommonLandingComponent/Footer4/Footer4"
import Footer1 from '../../CommonLandingComponent/Footer1/Footer1';
import Footer2 from '../../CommonLandingComponent/Footer2/Footer2';
import Footer3 from '../../CommonLandingComponent/Footer3/Footer3';



// icon

import { BsFillCartCheckFill } from "react-icons/bs";
import { BiSolidRightArrow } from "react-icons/bi";


const Landing_35 = ({ shop_info, pageInfo, product, visitorID }) => {
    const { checkout_b_color, checkout_button_color, checkout_button_text_color, checkout_text_color, footer, order_title, checkout_button_text } = pageInfo
    return (
        <div className="Landing__35">

            {/* page content not equal null */}
            {
                pageInfo?.page_content !== null && <div dangerouslySetInnerHTML={{ __html: pageInfo?.page_content }} />
            }

            {/* page content equal null */}
            {
                pageInfo?.page_content === null && <>


                    {/* ============================================================
                Start Landing__33__Banner
                ============================================================ */}


                    <section className="Landing__35__Banner">
                        <img
                            className="Landing__35__Banner__img"
                            src="https://landing-page-images-1.s3.ap-south-1.amazonaws.com/landing-35/bg.png"
                            alt=""
                        />

                        <div className="Landing__35__Banner__Content">
                            <Container>
                                <Row className=" justify-content-center ">
                                    <Col lg={8}>
                                        <div className="Landing__35__Banner__Text">

                                            <span className="Landing__35__Banner__Text__Span">যে আতর ছড়াবে ঘ্রাণ স্থায়ী হবে দীর্ঘক্ষণ</span>

                                            <h1>জুমআ এবং ঈদের দিন আতর ব্যাবহার করা<span>নবীজীর বিশেষ সুন্নাত</span></h1>

                                            <img src="https://landing-page-images-1.s3.ap-south-1.amazonaws.com/landing-35/banner.png" alt="" />

                                            <h4>অফার মূল্য <span>৬ মিলি ৭০০ টাকা</span> </h4>

                                            <div className="Order">
                                                <Link href="#placeAnOrder">
                                                    <BsFillCartCheckFill /> অর্ডার করতে ক্লিক করুন
                                                </Link>
                                            </div>

                                        </div>


                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </section>

                    {/* gap */}
                    <div className="Section__Gaps"></div>

                    {/* ============================================================
                    Packege
                ============================================================ */}

                    <section>
                        <Container>
                            <div className="Landing__35__PackegeMain">
                                <Row>
                                    <Col>
                                        <div className="Landing__35__Packege">
                                            <div className="Landing__35__Packege__border"></div>
                                            <h2>কেন প্রয়োজন আপনার জন্য <span>এই প্যাকেজটি</span> </h2>
                                            <div className="Landing__35__Packege__border"></div>
                                        </div>

                                    </Col>
                                </Row>

                                <Row>

                                    <Col md={6} lg={3}>
                                        <div className="Landing__35__Packege__Card">
                                            <div>
                                                <div>
                                                    <h4>দূর হবে ঘামের দুর্গন্ধ</h4>
                                                    <p>শরীর থেকে ঘামের দুর্গন্ধ দূর করে রিফ্রেশ থাকুন সারাদিন</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col md={6} lg={3}>
                                        <div className="Landing__35__Packege__Card">
                                            <div>
                                                <h4>হালকা মিষ্টি ঘ্রাণ</h4>
                                                <p>শরীর থেকে ঘামের দুর্গন্ধ দূর করে রিফ্রেশ থাকুন সারাদিন</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={3}>
                                        <div className="Landing__35__Packege__Card">
                                            <div>
                                                <h4>ঘ্রাণ ছড়াবে অনেকদূর</h4>
                                                <p>শরীর থেকে ঘামের দুর্গন্ধ দূর করে রিফ্রেশ থাকুন সারাদিন</p>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col md={6} lg={3}>
                                        <div className="Landing__35__Packege__Card">
                                            <div>
                                                <h4>স্থায়ী হবে অনেক সময়</h4>
                                                <p>শরীর থেকে ঘামের দুর্গন্ধ দূর করে রিফ্রেশ থাকুন সারাদিন</p>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col md={6} lg={3}>
                                        <div className="Landing__35__Packege__Card">
                                            <div>
                                                <h4>সুগন্ধ প্রেমীদের পছন্দের সেরা</h4>
                                                <p>শরীর থেকে ঘামের দুর্গন্ধ দূর করে রিফ্রেশ থাকুন সারাদিন</p>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col md={6} lg={3}>
                                        <div className="Landing__35__Packege__Card">
                                            <div>
                                                <h4>সুঘ্রাণে মুগ্ধ হবে সকলে</h4>
                                                <p>শরীর থেকে ঘামের দুর্গন্ধ দূর করে রিফ্রেশ থাকুন সারাদিন</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6} lg={3}>
                                        <div className="Landing__35__Packege__Card">
                                            <div>
                                                <h4>দূর হবে ঘামের দুর্গন্ধ</h4>
                                                <p>শরীর থেকে ঘামের দুর্গন্ধ দূর করে রিফ্রেশ থাকুন সারাদিন</p>
                                            </div>

                                        </div>
                                    </Col>
                                    <Col md={6} lg={3}>
                                        <div className="Landing__35__Packege__Card">
                                            <div>
                                                <h4>দূর হবে ঘামের দুর্গন্ধ</h4>
                                                <p>শরীর থেকে ঘামের দুর্গন্ধ দূর করে রিফ্রেশ থাকুন সারাদিন</p>

                                            </div>

                                        </div>
                                    </Col>

                                </Row>


                            </div>


                            <div className="Order Order_Center">
                                <Link href="#placeAnOrder">
                                    <BsFillCartCheckFill /> অর্ডার করতে ক্লিক করুন
                                </Link>
                            </div>


                        </Container>
                    </section>


                    {/* gap */}
                    <div className="Section__Gaps"></div>
                    {/* ============================================================
                    Binifit
                ============================================================ */}

                    <section>
                        <Container>
                            <Row>
                                <Col>

                                    <div className="Landing__35__Packege">
                                        <div className="Landing__35__Packege__border"></div>
                                        <h2>আতর ব্যবহারের  <span>উপকারিতা সমূহ</span> </h2>
                                        <div className="Landing__35__Packege__border"></div>
                                    </div>

                                </Col>
                            </Row>

                            <div className="Landing__35__Binifit__main">

                                <Row className=" d-flex align-items-center">
                                    <Col lg={7}>

                                        <div className="Landing__35__Binifit">

                                            <ul>
                                                <li>
                                                    <p><img src="https://landing-page-images-1.s3.ap-south-1.amazonaws.com/landing-35/arr.png" alt="" />আতর ব্যবহারে রাসুলুল্লাহ (সা.) সুন্নাহ পালন হয়</p>
                                                </li>

                                                <li>
                                                    <p><img src="https://landing-page-images-1.s3.ap-south-1.amazonaws.com/landing-35/arr.png" alt="" />সুঘ্রাণ দীর্ঘ সময় ধরে রেখে, শরীরের দুর্গন্ধ বিষয়ে দুশ্চিন্তামুক্ত রাখে</p>
                                                </li>

                                                <li>
                                                    <p><img src="https://landing-page-images-1.s3.ap-south-1.amazonaws.com/landing-35/arr.png" alt="" />সুঘ্রান ছড়ানোর পাশাপাশি নীজেকে প্রফুল্ল রাখে</p>
                                                </li>

                                                <li>
                                                    <p><img src="https://landing-page-images-1.s3.ap-south-1.amazonaws.com/landing-35/arr.png" alt="" />শরীর ও মনের ক্লান্তি এবং মানসিক চাপ দূর করে</p>
                                                </li>

                                                <li>
                                                    <p><img src="https://landing-page-images-1.s3.ap-south-1.amazonaws.com/landing-35/arr.png" alt="" />সুন্নাহ পালনের পাশাপাশি ব্যক্তিত্ববান করে তোলে</p>
                                                </li>

                                            </ul>

                                        </div>

                                    </Col>

                                    <Col lg={5}>

                                        <div className="Landing__35__Binifit2">
                                            <img src="https://landing-page-images-1.s3.ap-south-1.amazonaws.com/landing-35/bottol.png" alt="" />
                                        </div>

                                    </Col>

                                </Row>

                            </div>
                        </Container>

                    </section>


                    {/* gap */}
                    <div className="Section__Gaps"></div>

                    {/* ============================================================
                    Offer
                ============================================================ */}
                    <section>
                        <Container>
                            <Row className=" justify-content-center d-flex">
                                <Col lg={8}>

                                    <div className="Landing__35__Offer">
                                        <h4>রেগুলার মূল্য <span>১২০০ টাকা</span></h4>
                                        <h2>আজকের অফার মূল্য <span>৯৯০ টাকা</span> </h2>
                                        <h5>ডেলিভারি চার্জ ফ্রি</h5>
                                        <h6>মোবাইলঃ +8801894844452</h6>


                                    </div>

                                </Col>
                            </Row>

                            <div className="Order Order_Center">
                                <Link href="#placeAnOrder">
                                    <BsFillCartCheckFill /> অর্ডার করতে ক্লিক করুন
                                </Link>
                            </div>

                        </Container>
                    </section>

                    {/* gap */}
                    <div className="Section__Gaps"></div>
                    {/* ============================================================
                    Video
                ============================================================ */}

                    <section>
                        <Container>
                            <div className="Landing__35__Video">
                                <Row>
                                    <Col>
                                        <Video />
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>

                    {/* gap */}
                    <div className="Section__Gaps"></div>

                    {/* ============================================================
                    question
                ============================================================ */}

                    <section className="Landing__35__questionSec">
                        <Container>
                            <Row className=" justify-content-center d-flex">
                                <Col lg={6}>
                                    <div className="Landing__35__question">
                                        <div className="Landing__35__Packege__border2"></div>
                                        <h2>কমন কিছু  <span>প্রশ্নের উত্তর </span> </h2>
                                        <div className="Landing__35__Packege__border2"></div>
                                    </div>

                                    <div className="Landing__35__question2">

                                        <div className="Landing__35__Packege2">
                                            <h4>আতরটির ঘ্রাণ সাধারণত কতক্ষণ থাকে? </h4>
                                            <BiSolidRightArrow />
                                        </div>
                                        <div className="Landing__35__Packege2">
                                            <h4>আতর টি কি সরাসরি শরীরে ব্যবহার করতে পারবো? </h4>
                                            <BiSolidRightArrow />
                                        </div>
                                        <div className="Landing__35__Packege2">
                                            <h4>আপনাদের কি কোনো শো-রুম আছে ? </h4>
                                            <BiSolidRightArrow />
                                        </div>
                                        <div className="Landing__35__Packege2">
                                            <h4>আমি কি পণ্যটি দেখে শুঁকে নিতে পারবো? </h4>
                                            <BiSolidRightArrow />
                                        </div>
                                    </div>

                                </Col>
                            </Row>


                        </Container>
                    </section>


                    {/* ============================================================
                Banner2
                ============================================================ */}
                    <section>
                        <Container>
                            <div className="Landing__35__Banner2__bg">
                                <Row className=" justify-content-center d-flex">
                                    <Col lg={7}>
                                        <div className="Landing__35__Banner2">
                                            <img src="https://landing-page-images-1.s3.ap-south-1.amazonaws.com/landing-35/banner2.png" alt="" />

                                            <h2>সারা বাংলাদেশে হোম ডেলিভারি চার্জ সম্পূর্ণ ফ্রি</h2>
                                            <p>পরিবেশ যেটাই হউক, বয়স যত কম কিংবা বেশি হউক, মাসজিদ কিংবা অফিসেই হউক আমাদের সুগন্ধির ঘ্রানে কাবু হচ্ছে সবাই ইংশা আল্লাহ</p>
                                            <h4>রেগুলার মূল্য <span>৯৫০ টাকা</span></h4>
                                            <h5>অফার মূল্য <span>৭৯০ টাকা</span></h5>
                                        </div>


                                        <div className="Order Order_Center">
                                            <Link href="#placeAnOrder">
                                                <BsFillCartCheckFill /> অর্ডার করতে ক্লিক করুন
                                            </Link>
                                        </div>

                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>

                    {/* gap */}
                    <div className="Section__Gaps"></div>

                    {/* ============================================================
                Contact
                ============================================================ */}
                    <section>
                        <Container>
                            <div className="Landing__35__Banner2__bg_Contact">
                                <Row>
                                    <Col lg={12}>

                                        <div className="Landing__35__Banner2__Contact">
                                            <h4>পরিবেশ যেটাই হউক, বয়স যত কম কিংবা বেশি হউক, মাসজিদ কিংবা অফিসেই হউক আমাদের সুগন্ধির ঘ্রানে কাবু হচ্ছে সবাই ইংশা আল্লাহ</h4>
                                            <h5>প্রয়োজনে ফোন করুন +8801894844452</h5>
                                        </div>


                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>


                    {/* ============================================================
                    Packege
                ============================================================ */}


                    {/* Section__Gaps */}
                    <div className="Section__Gaps"></div>

                    {/* CustomerReview */}
                    <CustomerReview />
                </>
            }

            {/* Order section Static */}
            <section className='Landing__35__OrderSec'>
                <div>
                    <Container>
                        <div id="placeAnOrder">
                            <Order default_delivery_location={shop_info?.default_delivery_location}  checkout_button_text={checkout_button_text} backgroundColor={checkout_b_color} fontColor={checkout_text_color} btnColor={checkout_button_color} btnTextColor={checkout_button_text_color} product={product} visitorID={visitorID} order_title={order_title}></Order>
                        </div>
                    </Container>
                </div>
            </section>
            {/* <div className="Landing__27__section_gaps"></div> */}

            {
                footer?.footer_id == 4 && <Footer1 domainName={shop_info?.domain} pageInfo={pageInfo} />
            }
            {
                footer?.footer_id == 5 && <Footer2 domainName={shop_info?.domain} pageInfo={pageInfo} />
            }
            {
                footer?.footer_id == 6 && <Footer3 domainName={shop_info?.domain} pageInfo={pageInfo} />
            }
            {
                footer?.footer_id == 7 && <Footer4 domainName={shop_info?.domain} pageInfo={pageInfo} />
            }
        </div>
    );
};

export default Landing_35;
