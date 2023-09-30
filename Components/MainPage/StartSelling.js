import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {BsArrowRight } from 'react-icons/bs';
const StartSelling = () => {
    return (
        <section className='StartSelling'>

            <Container>

                <Row>

                    <Col lg={12}>

                        <div className="StartSellingBox">

                            <h2>Start selling online through the funnel.</h2>
                            <p>Build your business with Funnel Liner to sell online products and everywhere in between.</p>

                            {/* <div className="customInput">
                                <input type="text" placeholder='Enter your Work Email' />
                                <Button type='submit' className='bg'>Get Started <BsArrowRight /> </Button>
                            </div> */}

                        </div>

                    </Col>

                </Row>

            </Container>

        </section>
    );
};

export default StartSelling;