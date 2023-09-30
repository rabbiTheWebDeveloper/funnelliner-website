import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { RiShoppingCart2Line } from "react-icons/ri";
import style from '../../CommonLandingComponent/Order/Order2/order2.module.css';

// Css
// import style from './order.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import OrderOtp from '../../../OrderOtp/OrderOtp';
import Cookies from 'js-cookie';
import Loader from './loader';
import { useToast } from '../../../../hooks/useToast';
import VariantItem from './VariantItem';

const Order = ({ default_delivery_location, product, visitorID, backgroundColor, fontColor, btnColor, btnTextColor, order_title, checkout_button_text }) => {
  const showToast = useToast()
  const router = useRouter();
  const [shopID, setShopID] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [restOtpLoading, setResetOTPLoading] = useState(false);
  //shipping cost add
  const [isCheckedInSideDhaka, setIsCheckedInSideDhaka] = useState(true);
  const [isCheckedInOutSideDhaka, setIsCheckedInOutSideDhaka] = useState(false);
  const [isCheckedSubArea, setIsCheckedSubArea] = useState(false);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState("inside_dhaka");
  const [shippingCost, setShippingCost] = useState(product?.inside_dhaka)
  const [checkOutProduct, setCheckOutProduct] = useState(product)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
      .post(`${process.env.API_URL}/customer/resend-otp`, postBody, {
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

  const handleChange = e => {
    if (e.target.id === "insideDhaka" && !isCheckedInSideDhaka) {
      setIsCheckedInSideDhaka(!isCheckedInSideDhaka);
      setIsCheckedInOutSideDhaka(false)
      setIsCheckedSubArea(false)
      setShippingCost(e.target.value)
      setSelectedDeliveryLocation("inside_dhaka")
    }
    if (e.target.id === "outSideDhaka" && !isCheckedInOutSideDhaka) {
      setIsCheckedInOutSideDhaka(!isCheckedInOutSideDhaka)
      setIsCheckedInSideDhaka(false)
      setIsCheckedSubArea(false)
      setShippingCost(e.target.value)
      setSelectedDeliveryLocation("outside_dhaka")
    }
    if (e.target.id === "subArea" && !isCheckedSubArea) {
      setIsCheckedSubArea(!isCheckedSubArea)
      setIsCheckedInSideDhaka(false)
      setIsCheckedInOutSideDhaka(false)
      setShippingCost(e.target.value)
      setSelectedDeliveryLocation("sub_area")
    }
  }
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const [checkedVariantItem, setCheckedVariantItem] = useState();
  console.log('product?.variants', product?.variations)
  useEffect(() => {
    if (product?.variations.length > 0) {
      const productObj = {
        checkOutProduct: product?.id,
        variant_product_code: product?.variations[0].code,
        variant_product_id: product?.variations[0]?.id,
        main_image: product?.variations[0]?.media || product?.main_image,
        product_name: product?.product_name,
        discount: product?.variations[0]?.price,
      }
      setCheckedVariantItem(product?.variations[0]?.id)
      setCheckOutProduct(productObj)
    }
  }, [])

  const handleSelectVariantChange = (variant) => {
    const productObj = {
      checkOutProduct: product?.id,
      variant_product_code: variant.code,
      variant_product_id: variant?.id,
      main_image: variant?.media || product?.main_image,
      product_name: product?.product_name,
      discount: variant?.price,
    }
    setCheckOutProduct(productObj)
    setCheckedVariantItem(variant?.id)
  }
  const onSubmit = (data) => {
    setIsLoading(true)
    setCustomerPhone(data?.customerMobile)
    const postBody = {
      customer_name: data.customerName,
      customer_phone: data.customerMobile,
      customer_address: data.customerAddress,
      // note: data.customerOrderNote,
      product_id: [product.id],
      product_qty: [quantity],
      variant_id: [checkOutProduct?.variant_product_id || null],
      delivery_location: selectedDeliveryLocation,
      visitor_id: visitorID,
      order_type: "landing"
    };
    Cookies.set('customer_phone', data.customerMobile)
    if (show === false) {
      axios
        .post(`${process.env.API_URL}/customer/order/store`, postBody, {
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
      <section style={{ backgroundColor: backgroundColor }} id="OrderConfirmFrom" className={style.OrderConfirmFrom}>

        <Container>       
          <h2 style={{ color: fontColor }}> {order_title ? order_title : "তাই আর দেরি না করে আজই অর্ডার করুন"} </h2>
          <Row>
            <Col lg={12}>
              <div className={style.VarientMainDiv}>
                {
                  product?.variations.map((item, index) =>
                    <VariantItem
                      key={item?.id}
                      variant={item}
                      quantity={quantity}
                      handleSelectVariantChange={handleSelectVariantChange}
                      productName={product?.product_name}
                      productMainImage={product?.main_image}
                      checkedVariantItem={checkedVariantItem}
                    // variantCheckFirstItem={variantCheckFirstItem}
                    // isFirstItem={variantCheckFirstItem || index}
                    />
                  )
                }
              </div>
            </Col>
          </Row>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg={7}>

                <div id="OrderConfirmLeft" className={style.OrderConfirmLeft}>

                  <h3 style={{ color: fontColor }}>Billing details</h3>

                  <div id="CustomeInput" className={style.CustomeInput}>
                    <input style={{ border: `1px solid ${fontColor}` }} type="text" name="" placeholder='আপনার নাম লিখুন *' {...register("customerName", { required: true })} />
                    {errors.customerName && (
                      <span style={{ color: "red" }} >Name is required</span>
                    )}
                  </div>

                  <div id="CustomeInput" className={style.CustomeInput}>
                    <input style={{ border: `1px solid ${fontColor}` }} type="text" name="" placeholder='আপনার মোবাইল নাম্বার লিখুন *'  {...register("customerMobile", { required: true, pattern: /^(?:\+8801|01)[3-9]\d{8}$/ })} />
                    {errors.customerMobile && (
                      <span style={{ color: "red" }} >
                        Valid Mobile Number required
                      </span>
                    )}
                  </div>

                  <div id="CustomeInput" className={style.CustomeInput}>
                    <input style={{ border: `1px solid ${fontColor}` }} type="text" name="" placeholder='আপনার সম্পূর্ণ ঠিকানা লিখুন *'  {...register("customerAddress", { required: true })} />
                    {errors.customerAddress && (
                      <span style={{ color: "red" }} >Address is required</span>
                    )}
                  </div>

                  {/* <div id="CustomeInput" className={style.CustomeInput}>
                    <input style={{ border: `1px solid ${fontColor}` }} type="text" name="" placeholder='নোট'  {...register("customerOrderNote")} />
                  </div> */}

                  {/* PaymentDesktop*/}
                  <div id="Payment" className={style.Payment}>

                    <h3 style={{ color: fontColor }}>Payment</h3>

                    <div id="CustomeInput" className={`${style.CustomeInput} ${style.d_flex}`}>

                      <input style={{ color: 'blue' }} type="checkbox" readOnly name="" id='CashOn' checked />
                      <label style={{ color: fontColor }} htmlFor="CashOn">ক্যাশ অন ডেলিভারি</label>

                    </div>

                    <div style={{ backgroundColor: btnColor }} id='ArrowBg' className={style.ArrowBg}>

                      <p style={{ color: btnTextColor }}>Pay with cash on delivery.</p>

                    </div>

                  </div>

                </div>

              </Col>

              {/* right */}

              <Col lg={5}>

                <div id='OrderConfirmRight' className={style.OrderConfirmRight}>

                  <h3 style={{ color: fontColor }}>Your order</h3>

                  <ul>

                    <li style={{ border: `1px solid ${fontColor}` }}>
                      <h4 style={{ color: fontColor }}>Product</h4>
                      <h5 style={{ color: fontColor }}>Total</h5>
                    </li>

                    <li style={{ border: `1px solid ${fontColor}` }}>

                      <div id='left' className={`${style.left} ${style.d_flex}`}>

                        <div id='img' className={style.img}>
                          <img src={checkOutProduct?.main_image} alt={product?.product_name} />
                        </div>

                        <p style={{ color: fontColor }}>{checkOutProduct?.product_name}</p>

                      </div>

                      <div id='right' className={`${style.right} ${style.d_flex}`}>

                        <input style={{ border: `1px solid ${fontColor}` }} type="number" onChange={handleQuantityChange} defaultValue={quantity}
                          min={1} />

                        <h5 style={{ color: fontColor }}> ৳  {checkOutProduct?.discount}</h5>

                      </div>

                    </li>

                    <li style={{ border: `1px solid ${fontColor}` }}>
                      <h5 style={{ color: fontColor }}>Subtotal</h5>
                      <h5 style={{ color: fontColor }}>৳ {parseInt(checkOutProduct?.discount) * parseInt(quantity)}</h5>
                    </li>

                    <li style={{ color: fontColor, border: `1px solid ${fontColor}` }}>
                      <h5 style={{ color: fontColor }}>Shipping</h5>

                      {
                        product?.delivery_charge === "free" ? "Free delivery" :
                          <h5>
                            <div id='checkbox' className={`${style.checkbox} ${style.d_flex}`}>
                              <input type='checkbox' value={product?.inside_dhaka} onChange={handleChange} id="insideDhaka" checked={isCheckedInSideDhaka} />  {default_delivery_location ? `Inside 
                              ${default_delivery_location}` : "Inside Dhaka"} ৳ <span style={{ color: fontColor, fontWeight: "bold" }}> {product?.inside_dhaka}</span>
                            </div>
                            {
                              product?.sub_area_charge > 0 && <div id='checkbox' className={`${style.checkbox} ${style.d_flex}`}>
                                <input type='checkbox' value={product?.sub_area_charge} onChange={handleChange} id="subArea" checked={isCheckedSubArea} />Sub Area ৳ <span style={{ color: fontColor, fontWeight: "bold" }}> {product?.sub_area_charge}</span>
                              </div>
                            }

                            <div id='checkbox' className={`${style.checkbox} ${style.d_flex}`}>
                              <input type='checkbox' value={product?.outside_dhaka} onChange={handleChange} id="outSideDhaka" checked={isCheckedInOutSideDhaka} />{default_delivery_location ? `Outside ${default_delivery_location} ` : "Outside Dhaka"} ৳ <span style={{ color: fontColor, fontWeight: "bold" }}> {product?.outside_dhaka}</span>
                            </div>

                          </h5>
                      }
                    </li>

                    <li style={{ border: `1px solid ${fontColor}` }}>
                      <h4 style={{ color: fontColor }}>Total</h4>
                      <h4 style={{ color: fontColor }}>৳ {parseInt(checkOutProduct?.discount) * parseInt(quantity) + parseInt(shippingCost)}</h4>
                    </li>

                  </ul>


                  {/* Payment Mobile*/}

                  <div id="OrderConfirmLeft" className={`${style.OrderConfirmLeft} ${style.OrderConfirmLeft2}`}>

                    <div id="Payment" className={`${style.Payment} ${style.Payment2} `}>

                      <div id="CustomeInput" className={`${style.CustomeInput} ${style.d_flex} ${style.CustomeInput2}`}>

                        <input style={{ color: 'blue' }} type="checkbox" readOnly name="" id='CashOn' checked />
                        <label style={{ color: fontColor }} htmlFor="CashOn">ক্যাশ অন ডেলিভারি</label>

                      </div>

                    </div>

                  </div>

                  {
                    isLoading && <button disabled={isLoading} className={style.Loading_order_btn} style={{ background: btnColor, color: btnTextColor, display: "flex", textAlign:"center" }}>
                      <Loader btnTextColor={btnTextColor} />
                      {checkout_button_text ? `${checkout_button_text}` : "Place Order BDT "}
                      {quantity * checkOutProduct?.discount + parseInt(shippingCost)}
                    </button>
                  }
                  {
                    isLoading === false &&
                    <button disabled={isLoading} className="style.order_btn" style={{ background: btnColor, color: btnTextColor }}>
                      <><RiShoppingCart2Line style={{ color: btnTextColor }} />
                        {checkout_button_text ? `${checkout_button_text}` : "Place Order BDT "}
                        {quantity * checkOutProduct?.discount + parseInt(shippingCost)}
                      </>
                    </button>
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