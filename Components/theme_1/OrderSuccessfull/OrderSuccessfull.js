import Image from 'next/image';
import Link from "next/link";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const axios = require('axios');
import moment from 'moment';
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

const OrderSuccessfull = () => {
    const [orderDetails, setOrderDetails]=useState({})
    const router = useRouter()
    const { orederdID } = router.query
    const shop_id = Cookies.get('shop_id')
    const headers = { "shop-id": shop_id }

    const orderInfoDetails = () => {
        axios.get(`${process.env.API_URL}v1/customer/order/${orederdID}/details`, { 'headers': { "shop-id": shop_id, } })
        .then((res)=>{
            // if(res.data.data !==null){
            //     setOrderDetails(res.data.data)
            // }
            setOrderDetails(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        orderInfoDetails()
    }, [orederdID, shop_id])
    // console.log("orderDetails", orderDetails)
    const totalPrice = orderDetails?.order_details?.reduce((acc, item) => acc + item.product.price*item.product_qty, 0);
    return (

        <>


            <section className='ThankYou'>

                <Container>

                    <Row className="justify-content-md-center">

                        <Col lg={6}>

                            <div className="ThankYouBanner header text-center">
                                <h4>Thank You.</h4>
                                <h4>Your order has been received.</h4>
                            </div>

                        </Col>

                    </Row>

                </Container>

                <div className="svg">
                    {/* <AiFillCaretDown/> */}
                </div>

            </section>

            <section className='OrderTitle'>

                <Container>

                    <Row className="justify-content-md-center">

                        <Col lg={6}>

                            {/* <div className=" header text-center">
                                <h4>Thank you. Your order has been received.</h4>
                            </div> */}

                        </Col>

                    </Row>

                    {/* OrderTitleContent */}
                    <Row className="justify-content-md-center">

                        <Col lg={10}>

                            <div className="OrderTitleContent text-center">

                                <ul>


                                    <li>
                                        <p>Order number:</p>
                                        <h5>{orderDetails?.order_no}</h5>
                                    </li>

                                    <li>
                                        <p>Date:</p>
                                        <h5> {moment(orderDetails?.created_at).format("DD/MM/YYYY")}</h5>
                                    </li>

                                    <li>
                                        <p>Total:</p>
                                        <h5>৳ {totalPrice}</h5>

                                    </li>

                                    <li>
                                        <p>Payment method:</p>
                                        <h5>Cash on delivery</h5>
                                    </li>

                                </ul>

                            </div>

                        </Col>

                    </Row>

                    {/* OrderDetail */}
                    <div className="OrderDetail">

                        <Row className="justify-content-md-center">

                            <Col lg={10}>

                                <div className="OrderDetailContent">

                                    <h5>Order details</h5>

                                    <div className="OrderDetailContentPart">

                                        <div className="OrderDetailContentItem d_flex">

                                            <h4>Product</h4>
                                            <h4>Total</h4>

                                        </div>

                                        <div className="OrderDetailContentItem d_flex">
                                            <h6>order.product_name</h6>
                                           <div>

                                            {
                                                orderDetails?.order_details?.map((item, index)=>{
                                                    return(
                                                        <h5>{item?.product?.product_name}</h5>
                                                    )
                                                })
                                            }
                                            {/* <span>5</span>
                                            <span>2</span> */}
                                           </div>
                                            {/* <h6>৳ {order.total_amount}</h6> */}
                                        </div>

                                        <div className="OrderDetailContentItem d_flex">

                                            <h6>Subtotal:</h6>
                                            <h6>৳ {totalPrice}</h6>

                                        </div>

                                        <div className="OrderDetailContentItem d_flex">

                                            <h6>Payment method:	</h6>
                                            <h6>Cash on delivery</h6>

                                        </div>

                                        <div className="OrderDetailContentItem d_flex">

                                            <h6>Total:</h6>
                                            <h6>৳ {totalPrice}</h6>

                                        </div>

                                    </div>

                                </div>

                                {/* CallUs */}
                                {/* <div className="CallUs">

                                    <h5>Contact Us</h5>
                                    <a href="tel:01894844456">+8801894844456</a>

                                </div> */}

                            </Col>

                        </Row>

                    </div>




                </Container>

            </section>


        </>

    );

};

export default OrderSuccessfull;
