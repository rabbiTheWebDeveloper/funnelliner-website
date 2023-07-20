import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import styles from "../../../styles/main_page/home_page.module.css";
import styles from "../../styles/main_page/home_page.module.css";
import Card from 'react-bootstrap/Card';
import {
    Grid,
    Pagination,
    Stack,
    Tab,
    TextField
} from "@mui/material";
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
import Head from "next/head";
import axios from "axios";
import Placeholder from 'react-bootstrap/Placeholder';

function index() {
    const [landingList, setLandingList] = useState([])
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);
    //landing theme skip when shown, 
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
            setLandingList(filteredItems)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            return error.response;
        }
    }
    useEffect(() => {
        landingThemeFetch()
    }, [])
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const indexOfLastLanding = currentPage * perPage;
    const indexOfFirstLanding = indexOfLastLanding - perPage;
    const currentLanding = landingList && landingList?.slice(
        indexOfFirstLanding,
        indexOfLastLanding
    );
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(landingList.length / perPage); i++) {
        pageNumbers.push(i);
    }
    const paginate = (pageNumber, value) => setCurrentPage(value);



    const handlePaginationClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="MainPage">
            <Head>
                <title>Funnel Liner - Automated Sales Funnel</title>
                <meta name='description' content='Funnel Liner - Automated Sales Funnel' />
                <meta name='viewport' content='width=device-width, user-scalable=no' />
                <link rel="icon" href="../images/favicon.png" />
            </Head>

            <div className="MainLandingPage">

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
                                        <li> <Link href='/signup' target='_blank' className="bg"> Start free trial </Link> </li>
                                    </ul>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </section>

                {/* -- ---------------------------------------------------------------------------------------------------------------------------------------------------
                ShopTheme
                ------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                <section className='SingleLanding'>
                    <Container>
                        <Row className='justify-content-md-center'>
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
                                    currentLanding && isLoading === false && currentLanding.map((item) => (
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
                                
                                <Col className="landingPagePagination" lg={12}>
                                    {
                                        isLoading === false && <div style={{ margin: "0 auto", textAlign: "center" }} className={styles.ShowMore}>
                                            <Pagination
                                                count={pageNumbers.length}
                                                variant="outlined"
                                                page={currentPage}
                                                onChange={paginate}
                                                onClick={handlePaginationClick}
                                            />
                                        </div>
                                    }

                                </Col>
                            </Row>
                        </div>
                    </Container>


                </section>


                <div className={styles.section_gaps}></div>
                {/* Footer */}
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
                                                        <Link href=''>Pricing</Link>
                                                    </li>
                                                    <li>
                                                        <Link href=''>Blogs</Link>
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

            </div>
        </div>
    )
}

export default index