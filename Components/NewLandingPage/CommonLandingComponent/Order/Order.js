import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { RiShoppingCart2Line } from "react-icons/ri";

// Css
import style from './order.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import OrderOtp from '../../../OrderOtp/OrderOtp';
import Cookies from 'js-cookie';
import Loader from './loader';
import { useToast } from '../../../../hooks/useToast';

const Order = ({ product, visitorID , backgroundColor, fontColor, btnColor, btnTextColor}) => {
  console.log("backgroundColor", backgroundColor)
  const showToast = useToast()
  const router = useRouter();
  const [shopID, setShopID] = useState();


  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [restOtpLoading, setResetOTPLoading] = useState(false);
  const shop_name = router.query.shopName;

  //order otp submit
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //timer setup
  const [timeLeft, setTimeLeft] = useState();
  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [show, timeLeft]);

  const [customerPhone, setCustomerPhone] = useState()
  const handldeResendOTP = () => {
    setResetOTPLoading(true)
    const postBody = {
      customer_phone: customerPhone
    }
    axios
      .post(`${process.env.API_URL}v1/customer/resend-otp`, postBody, {
        headers: { "shop-id": shopID },
      })
      .then((res) => {
        setTimeLeft(120)
        setResetOTPLoading(false)
        if (res.status === 200) {
          if (res?.data?.data?.otp_sent) {
            showToast("Resend OTP send Success")
          } else {
            showToast("Somethig went wrong", "error")
          }
        }
      })
      .catch((err) => {
        setResetOTPLoading(false)
        showToast("Internal server error", "error")
      });
  }

  // shop id get 
  useEffect(() => {
    setShopID(localStorage.getItem("shop_id"));
  }, [shopID]);

  //shipping cost add
  const [isCheckedInSideDhaka, setIsCheckedInSideDhaka] = useState(true);
  const [isCheckedInOutSideDhaka, setIsCheckedInOutSideDhaka] = useState(false);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState("inside_dhaka");
  const [shippingCost, setShippingCost] = useState(product?.inside_dhaka)

  const handleChange = e => {
    if (e.target.id === "insideDhaka" && !isCheckedInSideDhaka) {
      setIsCheckedInSideDhaka(!isCheckedInSideDhaka);
      setIsCheckedInOutSideDhaka(false)
      setShippingCost(e.target.value)
      setSelectedDeliveryLocation("inside_dhaka")
    }
    else if (e.target.id === "outSideDhaka" && !isCheckedInOutSideDhaka) {
      setIsCheckedInOutSideDhaka(!isCheckedInOutSideDhaka)
      setIsCheckedInSideDhaka(false)
      setShippingCost(e.target.value)
      setSelectedDeliveryLocation("outside_dhaka")

    }
  }

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const phone = Cookies.get("phone");


  const onSubmit = (data) => {
    setIsLoading(true)
    setCustomerPhone(data?.customerMobile)
    const postBody = {
      customer_name: data.customerName,
      customer_phone: data.customerMobile,
      customer_address: data.customerAddress,
      product_id: [product.id],
      product_qty: [quantity],
      delivery_location: selectedDeliveryLocation,
      visitor_id: visitorID,
      order_type: "landing"
    };
    Cookies.set('customer_phone', data.customerMobile)
    if (show === false) {
      axios
        .post(`${process.env.API_URL}v1/customer/order/store`, postBody, {
          headers: { "shop-id": shopID },
        })
        .then((res) => {
          setIsLoading(false)
          if (res.status === 200) {
            if (res?.data?.data.otp_sent === 1) {
              setTimeLeft(120)
              handleShow()
            } else if (res?.data?.data?.otp_sent === 0) {
              router.push(`/${shop_name}/order_successfull/${res?.data?.data?.id}`);
            }
          }
          else if (res.status === 251) {
            setIsLoading(false)
            showToast(`Something went wrong. Please contact us to get connected`, "error")
          }
        })
        .catch((err) => {
          setIsLoading(false)
          showToast("Internal server error", "error")
        });
    } else if (show) {
      setIsLoading(false)
    }
  };



  return (

    <>

      <section style={{backgroundColor:backgroundColor}} id="OrderConfirmFrom" className={style.OrderConfirmFrom}>

        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Row>
              <h2 style={{color:fontColor}}>তাই আর দেরি না করে আজই অর্ডার করুন </h2>
              {/* fontColor, btnColor, btnTextColor */}
              {/* left */}
              <Col lg={7}>

                <div id="OrderConfirmLeft" className={style.OrderConfirmLeft}>

                  <h3 style={{color:fontColor}}>Billing details</h3>

                  <div id="CustomeInput" className={style.CustomeInput}>
                    <input style={{border:`1px solid ${fontColor}`}} type="text" name="" placeholder='আপনার নাম লিখুন *' {...register("customerName", { required: true })} />
                    {errors.customerName && (
                      <span style={{ color: "red" }} >Name is required</span>
                    )}
                  </div>

                  <div id="CustomeInput" className={style.CustomeInput}>
                    <input style={{border:`1px solid ${fontColor}`}} type="text" name="" placeholder='আপনার মোবাইল নাম্বার লিখুন *'  {...register("customerMobile", { required: true, pattern: /^(?:\+8801|01)[3-9]\d{8}$/ })} />
                    {errors.customerMobile && (
                      <span style={{ color: "red" }} >
                        Valid Mobile Number require
                      </span>
                    )}
                  </div>

                  <div id="CustomeInput" className={style.CustomeInput}>
                    <input style={{border:`1px solid ${fontColor}`}} type="text" name="" placeholder='আপনার সম্পূর্ণ ঠিকানা লিখুন *'  {...register("customerAddress", { required: true })} />
                    {errors.customerAddress && (
                      <span style={{ color: "red" }} >Address is required</span>
                    )}
                  </div>

                  {/* Payment */}
                  <div id="Payment" className={style.Payment}>

                    <h3 style={{color:fontColor}}>Payment</h3>

                    <div id="CustomeInput" className={`${style.CustomeInput} ${style.d_flex}`}>

                      <input style={{ color: 'blue'}} type="checkbox" readOnly name="" id='CashOn' checked />
                      <label style={{color:fontColor}} htmlFor="CashOn">ক্যাশ অন ডেলিভারি</label>

                    </div>

                    <div style={{backgroundColor: btnColor}} id='ArrowBg' className={style.ArrowBg}>

                      <p style={{color:btnTextColor}}>Pay with cash on delivery.</p>

                    </div>

                  </div>

                </div>

              </Col>

              {/* right */}

              <Col lg={5}>

                <div id='OrderConfirmRight' className={style.OrderConfirmRight}>

                  <h3 style={{color:fontColor}}>Your order</h3>

                  <ul>

                    <li style={{border:`1px solid ${fontColor}`}}>
                      <h4 style={{color:fontColor}}>Product</h4>
                      <h5 style={{color:fontColor}}>Total</h5>
                    </li>

                    <li style={{border:`1px solid ${fontColor}`}}>

                      <div id='left' className={`${style.left} ${style.d_flex}`}>

                        <div id='img' className={style.img}>
                          <img src={product?.main_image?.name} alt="" />
                        </div>

                        <p style={{color:fontColor}}>{product?.product_name}</p>

                      </div>

                      <div id='right' className={`${style.right} ${style.d_flex}`}>

                        <input style={{border:`1px solid ${fontColor}`}} type="number" onChange={handleQuantityChange} defaultValue={1}
                          min={1} />

                        <h5 style={{color:fontColor}}> ৳  {product?.price}</h5>

                      </div>

                    </li>

                    <li style={{border:`1px solid ${fontColor}`}}>
                      <h5 style={{color:fontColor}}>Subtotal</h5>
                      <h5 style={{color:fontColor}}>{parseInt(product?.price) * parseInt(quantity)}</h5>
                    </li>

                    <li style={{color:fontColor,border:`1px solid ${fontColor}`}}>
                      <h5 style={{color:fontColor}}>Shipping</h5>

                      {
                        product?.delivery_charge === "free" ? "Free delivery" :
                          <h5>
                            <div id='checkbox' className={`${style.checkbox} ${style.d_flex}`}>
                              <input type='checkbox' value={product?.inside_dhaka} onChange={handleChange} id="insideDhaka" checked={isCheckedInSideDhaka} /> Inside Dhaka ৳ <span style={{ color:fontColor,fontWeight: "bold", padding: "0 5px" }}>{product?.inside_dhaka}</span>

                            </div>
                            <div id='checkbox' className={`${style.checkbox} ${style.d_flex}`}>
                              <input type='checkbox' value={product?.outside_dhaka} onChange={handleChange} id="outSideDhaka" checked={isCheckedInOutSideDhaka} /> Outside Dhaka ৳ <span style={{ color:fontColor,fontWeight: "bold" }}>{product?.outside_dhaka}</span>

                            </div>
                          </h5>
                      }
                    </li>

                    <li style={{border:`1px solid ${fontColor}`}}>
                      <h4 style={{color:fontColor}}>Total</h4>
                      <h4 style={{color:fontColor}}>{quantity * product?.price + parseInt(shippingCost)}</h4>
                    </li>

                  </ul>
                  {
                    isLoading && <button  disabled={isLoading} className={style.Loading_order_btn} style={{background:btnColor, color:btnTextColor}}>  <Loader btnTextColor={btnTextColor}/> Place Order BDT {quantity * product?.price + parseInt(shippingCost)}</button>
                  }
                  {
                    isLoading !== true  && <button  disabled={isLoading} className="style.order_btn" style={{background:btnColor, color:btnTextColor}}> <><RiShoppingCart2Line style={{color:btnTextColor}}/>   Place Order BDT {quantity * product?.price + parseInt(shippingCost)}</> </button>
                  }
                  <OrderOtp handldeResendOTP={handldeResendOTP} restOtpLoading={restOtpLoading} timeLeft={timeLeft} shopID={shopID} show={show} handleClose={handleClose} />
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </section>

    </>
  )

}

export default Order

