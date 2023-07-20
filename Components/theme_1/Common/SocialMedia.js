import Image from "next/image";
import Link from "next/link";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";



const SocialMedia = ({ shopInfo }) => {
    const { fb, instagram, youtube, twitter } = shopInfo;

    return (

        // <section className="SocialMedia">

        //     <Container>

        //         <Row className="justify-content-md-center">

        //             {/* item */}
        //             <Col xs={12} lg={6}>

        //                 <div className="SocialMediaContent text-center">

        //                     <h2>Join Us On Social Media</h2>

        //                     <div className="SocailIcon">


        //                         <Link href={fb ? fb : "https://www.facebook.com/"} target="_blank" > <FaFacebookF /> </Link>
        //                         <Link href={instagram ? instagram : "https://www.instagram.com/"} target="_blank" > <FaInstagram /> </Link>
        //                         <Link href={youtube ? youtube : "https://www.youtube.com/"} target="_blank" > <FaYoutube /> </Link>
        //                         <Link href={twitter ? twitter : "https://twitter.com/"} target="_blank" > <FaTwitter /> </Link>

        //                     </div>

        //                 </div>

        //             </Col>

        //         </Row>

        //     </Container>

        // </section>

        <div className='Multipage__1__SocialMedia'>

            <h2>Join Us On Social Media</h2>

            <div className='Multipage__1__SocialMediaLinkDiv'>

                <Link href={fb ? fb : "https://www.facebook.com/"} target="_blank" > <FaFacebookF /> </Link>
                <Link href={instagram ? instagram : "https://www.instagram.com/"} target="_blank" > <FaInstagram /> </Link>
                <Link href={youtube ? youtube : "https://www.youtube.com/"} target="_blank" > <FaYoutube /> </Link>
                <Link href={twitter ? twitter : "https://twitter.com/"} target="_blank" > <FaTwitter /> </Link>

            </div>

        </div>

    );

};

export default SocialMedia;
