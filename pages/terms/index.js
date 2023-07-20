import React, { useState } from 'react';

import privacyStyles from './style.module.css';
import styles from "../../styles/main_page/home_page.module.css";

import { Button, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';

import Offcanvas from "react-bootstrap/Offcanvas";

const index = () => {

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    const [showMenu, setShowMenu] = useState(false);
    const [landingList, setLandingList] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    return (

        <div className={privacyStyles.privacy}>

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
                                            <Link href='/'>
                                                <img src='../images/home_page/logo.svg' alt='' />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* MenuItem */}
                                    <div className={styles.MenuItem}>
                                        <ul>
                                            <li>

                                                <Link href='/' className={styles.active}>
                                                    Home
                                                </Link>
                                            </li>
                                            <li>

                                                <Link href='#BestFeatures'>Feature</Link>
                                            </li>
                                            <li>

                                                <Link href='#ShopTheme'>Theme</Link>
                                            </li>
                                            <li>

                                                <Link href='#ChossePackage'>Pricing</Link>
                                            </li>
                                            <li>

                                                <Link href='#FAQ'>FAQ</Link>
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

                                                            <Link href='#' className={styles.active}>
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>

                                                            <Link href='#'>Feature</Link>
                                                        </li>
                                                        <li>

                                                            <Link href='#'>Theme</Link>
                                                        </li>
                                                        <li>

                                                            <Link href='#'>Pricing</Link>
                                                        </li>
                                                        <li>

                                                            <Link href='#'>Blogs</Link>
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
            </div>

            <section className={privacyStyles.privacyBanner}>

                <Container>

                    <Row className='d_flex'>

                        <Col lg={6}>
                            <h2>Terms and Condition</h2>
                        </Col>

                        <Col lg={6}>
                            <div className={privacyStyles.img}>
                                <img src="images/privacy-policy/privacy-banner.png" alt="" />
                            </div>
                        </Col>

                    </Row>

                </Container>

            </section>

            {/* middle */}
            <section className={privacyStyles.descriptionPolicy}>

                <Container>

                    <Row>
                        <Col lg={12}>

                            <h2>Legal Information</h2>

                            <p>Welcome to www.funnelliner.com/!</p>

                            <p>These terms and conditions outline the rules and regulations for the use of Funnel Liner's Website, located at https://funnelliner.com/.</p>

                            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use www.funnelliner.com/ if you do not agree to take all of the terms and conditions stated on this page.</p>

                            <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of bd. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

                            <h3><strong>Cookies</strong></h3>

                            <p>We employ the use of cookies. By accessing www.funnelliner.com/, you agreed to use cookies in agreement with the Funnel Liner's Privacy Policy. </p>

                            <p>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

                            <h3><strong>License</strong></h3>

                            <p>Unless otherwise stated, Funnel Liner and/or its licensors own the intellectual property rights for all material on www.funnelliner.com/. All intellectual property rights are reserved. You may access this from www.funnelliner.com/ for your own personal use subjected to restrictions set in these terms and conditions.</p>

                            <p>You must not:</p>
                            <ul>
                                <li>Republish material from www.funnelliner.com/</li>
                                <li>Sell, rent or sub-license material from www.funnelliner.com/</li>
                                <li>Reproduce, duplicate or copy material from www.funnelliner.com/</li>
                                <li>Redistribute content from www.funnelliner.com/</li>
                            </ul>

                            <p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the <a href="https://www.termsandconditionsgenerator.com/">Free Terms and Conditions Generator</a>.</p>

                            <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Funnel Liner does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Funnel Liner,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Funnel Liner shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

                            <p>Funnel Liner reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

                            <p>You warrant and represent that:</p>

                            <ul>
                                <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                                <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                                <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                                <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                            </ul>

                            <p>You hereby grant Funnel Liner a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

                            <h3><strong>Hyperlinking to our Content</strong></h3>

                            <p>The following organizations may link to our Website without prior written approval:</p>

                            <ul>
                                <li>Government agencies;</li>
                                <li>Search engines;</li>
                                <li>News organizations;</li>
                                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                                <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                            </ul>

                            <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.</p>

                            <p>We may consider and approve other link requests from the following types of organizations:</p>

                            <ul>
                                <li>commonly-known consumer and/or business information sources;</li>
                                <li>dot.com community sites;</li>
                                <li>associations or other groups representing charities;</li>
                                <li>online directory distributors;</li>
                                <li>internet portals;</li>
                                <li>accounting, law and consulting firms; and</li>
                                <li>educational institutions and trade associations.</li>
                            </ul>

                            <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Funnel Liner; and (d) the link is in the context of general resource information.</p>

                            <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.</p>

                            <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Funnel Liner. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>

                            <p>Approved organizations may hyperlink to our Website as follows:</p>

                            <ul>
                                <li>By use of our corporate name; or</li>
                                <li>By use of the uniform resource locator being linked to; or</li>
                                <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.</li>
                            </ul>

                            <p>No use of Funnel Liner's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

                            <h3><strong>iFrames</strong></h3>

                            <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

                            <h3><strong>Content Liability</strong></h3>

                            <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

                            <h3><strong>Reservation of Rights</strong></h3>

                            <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

                            <h3><strong>Removal of links from our website</strong></h3>

                            <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

                            <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

                            <h3><strong>Disclaimer</strong></h3>

                            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

                            <ul>
                                <li>limit or exclude our or your liability for death or personal injury;</li>
                                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                            </ul>

                            <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

                            <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>


                        </Col>
                    </Row>

                </Container>

            </section>

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

        </div>

    )

}

export default index