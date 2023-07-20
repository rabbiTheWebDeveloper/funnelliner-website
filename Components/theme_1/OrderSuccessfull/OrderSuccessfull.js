import Cookies from 'js-cookie';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
const axios = require('axios');

const OrderSuccessfull = () => {
    const [orderDetails, setOrderDetails] = useState({})
    const router = useRouter()
    const { orederdID } = router.query
    const shop_id = Cookies.get('shop_id')
    const orderInfoDetails = () => {
        axios.get(`${process.env.API_URL}v1/customer/order/${orederdID}/details`, { 'headers': { "shop-id": shop_id, } })
            .then((res) => {
                // if(res.data.data !==null){
                //     setOrderDetails(res.data.data)
                // }
                setOrderDetails(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        orderInfoDetails()
    }, [orederdID, shop_id])
    // const totalPrice = orderDetails?.order_details?.reduce((acc, item) => acc + item.product.price * item.product_qty, 0);
    // console.log("order_details", orderDetails.pricing?.grand_total)
    return (
        <>
            <section className='SuccessFullPage'>

                <Container>

                    <Row className="justify-content-md-center">

                        <Col lg={12}>

                            <div className="Header">
                                <h2>Thank You For Purchasing</h2>
                                <p>Thank you. Your order has been received.</p>
                            </div>

                            <div className="SuccessFullPageContent">

                                <div className="TitlePart">

                                    <ul>

                                        <li>  <h5>- Order number:</h5> <span>{orderDetails?.order_no}</span> </li>
                                        <li>  <h5>- Date:</h5> <span>{moment(orderDetails?.created_at).format("DD/MM/YYYY")}</span> </li>
                                        <li>  <h5>- Payment method:</h5> <span>Cash on delivery</span> </li>
                                        <li>  <h5>- Total:</h5> <span>{ parseInt(orderDetails?.pricing?.grand_total) + parseInt(orderDetails?.pricing?.shipping_cost)} TK</span> </li>


                                    </ul>

                                </div>

                                {/* Order details */}
                                <div className="OrderDetail">
                                    <h3>Order Details</h3>
                                    <table className='Table striped bordered' responsive>

                                        <thead>
                                            <th>Product</th>
                                            <th>Total</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                {
                                                        orderDetails?.order_details?.map((item, index) => {
                                                            return (
                                                             <img src={item.product?.main_image?.name} alt={item?.product?.product_name} />
                                                             
                                                            )
                                                        })
                                                    }
                                                    

                                                    {
                                                        orderDetails?.order_details?.map((item, index) => {
                                                            return (
                                                                <span>{item?.product?.product_name}</span>
                                                            )
                                                        })
                                                    }

                                                </td>

                                                <td>
                                                    <div className='d_flex'>
                                                    {
                                                        orderDetails?.order_details?.map((item, index) => {
                                                            return (
                                                                <span>{item?.product?.price}</span>
                                                            )
                                                        })
                                                    }
    
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Shipping Cost</td>
                                                <td>{orderDetails?.pricing?.shipping_cost===0 ? "Free delivery" : orderDetails?.pricing?.shipping_cost}</td>
                                            </tr>

                                            <tr>
                                                <td> <h4>Subtotal</h4> </td>
                                                <td>৳ {orderDetails.pricing?.grand_total}</td>
                                            </tr>

                                            <tr>
                                                <td> <h4>Payment Method</h4> </td>
                                                <td><p>Cash on delivery</p></td>
                                            </tr>

                                            <tr>
                                                <td> <h4>Total</h4> </td>
                                                <td> <h4>৳ {orderDetails.pricing?.grand_total + orderDetails?.pricing?.shipping_cost}</h4> </td>
                                            </tr>

                                        </tbody>

                                    </table>

                                </div>


                            </div>

                        </Col>

                    </Row>

                </Container>

            </section>


        </>

    );

};

export default OrderSuccessfull;
