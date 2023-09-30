
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import TextField from "@mui/material/TextField";


import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../../redux/stateSlices/CartSlice";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import Footer from "../Common/Footer";
import OrderOtp from "../../OrderOtp/OrderOtp";
import { useToast } from "../../../hooks/useToast";
import Loader from "../../NewLandingPage/CommonLandingComponent/Order/loader";

const CheckOut = ({ shopInfo, visitorID }) => {
  const showToast = useToast()
  const carts = useSelector((state) => state.cart);
  const [cart, setCart] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [shopID, setShopID] = useState();
  const [shop_name, setShopName] = useState()
  useEffect(() => {
    setShopID(localStorage.getItem("shop_id"));
    setCart(carts?.cartItems);
    setCartSubTotal(carts.cartTotalAmount);
    setShopName(localStorage.getItem("shop_name"));
  }, [carts]);


  //order otp submit
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //shipping cost add
  const checkDeliveryCharge = cart.length > 0 && cart.find(item => item.delivery_charge === "paid")
  const [isCheckedInSideDhaka, setIsCheckedInSideDhaka] = useState(true);
  const [isCheckedInOutSideDhaka, setIsCheckedInOutSideDhaka] = useState(false);
  const [isCheckedSubArea, setIsCheckedSubArea] = useState(false);
  const [shippingCost, setShippingCost] = useState();
  const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState("inside_dhaka");
  const [restOtpLoading, setResetOTPLoading] = useState(false);
  const [customerPhone, setCustomerPhone] = useState();
  const [variantID, setVariantID] = useState([]);

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


  useEffect(() => {
    dispatch(getTotals());

    //shipping cost add
    if (checkDeliveryCharge !== undefined) {
      setShippingCost(checkDeliveryCharge?.inside_dhaka)
    }
    else if (checkDeliveryCharge === undefined) {
      setShippingCost(0)
    }
    // setShippingCost()
  }, [cart, dispatch]);



  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    if (product.cartQuantity < 2) {
      return;
    }
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  //timer setup
  const [timeLeft, setTimeLeft] = useState();
  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [show, timeLeft]);

  const totalItem = cart.reduce((total, current) => total+ current?.cartQuantity, 0);
  const headers = {
    "shop-id": shopID,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitOrder = (data) => {
    setIsLoading(true)
    setCustomerPhone(data.customerMobile)
    const postBody = {
      customer_name: data.customerName,
      customer_phone: data.customerMobile,
      customer_address: data.customerAddress,
      product_id: cart.map(item => item.id),
      product_qty: cart.map(item => item.cartQuantity),
      variant_id: cart.map(item => item.variant_id || 0),
      visitor_id: visitorID,
      delivery_location: selectedDeliveryLocation,
      order_type: "website"
    };
    if (show !== true) {
      axios
        .post(`${process.env.API_URL}/customer/order/store`, postBody, {
          headers: headers,
        })
        .then((res) => {
          setIsLoading(false)
          if (res.status === 200) {
            if (res?.data?.data.otp_sent === 1) {
              setTimeLeft(120)
              handleShow()
            }
            else if (res?.data?.data?.otp_sent === 0) {
              handleClearCart();
              router.push(`/${shop_name}/order_successfull/${res?.data?.data?.id}`);
            }
          }
          if (res.status == 251) {
            setIsLoading(false)
            alert("Something went wrong. Please contact us to get connected.")
            // showToast(`Something went wrong. Please contact us to get connected.`, "error")
          }

        })
        .catch((err) => {
          setIsLoading(false)
          showToast("Something went wrong. Please contact us to get connected.", "error")
        });
    } else if (show) {
      setIsLoading(false)
    }

  };

  const handldeResendOTP = () => {
    // setResetOTPLoading(true)
    const postBody = {
      customer_phone: customerPhone
    }
    axios
      .post(`${process.env.API_URL}/customer/resend-otp`, postBody, {
        headers: { "shop-id": shopID },
      })
      .then((res) => {
        setTimeLeft(120)
        // setResetOTPLoading(false)
        if (res.status === 200) {
          if (res?.data?.data?.otp_sent) {
            showToast("Resend OTP send Success")
          } else {
            showToast("Somethig went wrong", "error")
          }
        }
      })
      .catch((err) => {
        // setResetOTPLoading(false)
        showToast("Internal server error", "error")
      });
  }

  return (<>
    <section style={{ padding: "0px" }} className='CheckOut'>
      <Container>
        <div className='CheckOutContent'>
          <Row className='justify-content-center mb-5'>
            <Col xs={12} lg={6}>
              <div></div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} lg={6}>
              <div className='Header my-3'>
                <h2>Shopping cart ({cart.length} Items)</h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} lg={8}>
              <div className='CheckOutTable'>
                {cart?.length === 0 ? (
                  <h2 className="text-center mt-3 text-warning">Your Cart is empty</h2>
                ) : (
                  <table className='table roundedCorners'>
                    <thead>
                      <tr className='tablecategoryName'>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>

                      {cart &&
                        cart?.map((item, index) => {
                          return (
                            <tr key={index} className="ProductFstdBlock">
                              <td className="ProductFstdBlocktd1">
                                <div className='ProductFst d_flex'>
                                  <div className='svg'>
                                    <MdOutlineClose
                                      onClick={() => handleRemoveFromCart(item)}
                                    />
                                  </div>

                                  <div className='img'>
                                    {cart.length > 0 && (
                                      <img
                                        src={item?.main_image}
                                        alt=''
                                      />
                                    )}
                                  </div>

                                  <div className='Description'>
                                    <p style={{ paddingLeft: "15px" }}>
                                      {item?.product_name}
                                    </p>
                                    <p style={{ paddingLeft: "15px" }}>
                                      {item?.variant}
                                    </p>
                                  </div>
                                </div>
                              </td>



                              <td className="ProductFstdBlocktd2">
                                <p style={{ textAlign: "left" }}>
                                  TK{" "}
                                  <span
                                    style={{
                                      fontSize: "15px",
                                      color: "#3BB77E",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {
                                      item?.discounted_price?.toFixed(0)
                                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                                    }
                                  </span>
                                </p>
                              </td>


                              <td className="ProductFstdBlocktd3">
                                <div className='PlusMinus'>
                                  <div
                                    onClick={() => handleDecreaseCart(item)}
                                    className='Minus'
                                  >
                                    <AiOutlineMinus />
                                  </div>

                                  <div className='InputNumber'>
                                    <h6 className='py-2'>
                                      {item.cartQuantity}
                                    </h6>
                                  </div>

                                  <div
                                    onClick={() => handleAddToCart(item)}
                                    className='Minus'
                                  >
                                    <AiOutlinePlus />
                                  </div>
                                </div>
                              </td>

                              <td className="ProductFstdBlocktd4">
                                <h3 style={{ textAlign: "left", fontSize: "20px" }}>
                                  ৳ {(item?.discounted_price * item?.cartQuantity)?.toFixed(0)
                                    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </h3>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>


            </Col>

            <Col xs={12} lg={4}>
              <div className='product_part'>
                <ul>
                  <li className='d_flex'>
                    <h3>Order Summary</h3>
                  </li>



                  <li className='d_flex'>
                    <h5>Subtotal</h5>
                    <p> ৳ {Number(cartSubTotal)?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      || 0}</p>
                  </li>
                  <li className='d_flex'>
                    <h5>Total Item</h5>
                    <p>{totalItem}</p>
                  </li>

                  <li className='d_flex'>
                    <h5>Shipping</h5>
                    {
                      checkDeliveryCharge !== undefined && cart?.length !== 0 ? <div style={{ width: "60%", textAlign: "right" }}>
                        <div> <input style={{ width: "8%" }} type='checkbox' value={checkDeliveryCharge?.inside_dhaka} onChange={handleChange} id="insideDhaka" checked={isCheckedInSideDhaka} />
                          {shopInfo?.default_delivery_location ? `Inside 
                              ${shopInfo?.default_delivery_location}` : "Inside Dhaka"} ৳
                          <span style={{ fontWeight: "bold" }}> {checkDeliveryCharge?.inside_dhaka}</span>
                        </div>
                        <div>
                          <input style={{ width: "8%" }} type='checkbox' value={checkDeliveryCharge?.outside_dhaka} onChange={handleChange} id="outSideDhaka" checked={isCheckedInOutSideDhaka} />
                          {shopInfo?.default_delivery_location ? `Outside 
                              ${shopInfo?.default_delivery_location}` : "Outside Dhaka"} ৳ <span style={{ fontWeight: "bold" }}>
                            {checkDeliveryCharge.outside_dhaka}
                          </span>
                        </div>
                        {
                          checkDeliveryCharge?.sub_area_charge > 0 &&
                          <div>
                            <input style={{ width: "8%" }} type='checkbox' value={checkDeliveryCharge?.sub_area_charge} onChange={handleChange} id="subArea" checked={isCheckedSubArea} />
                            Sub Area ৳
                            <span style={{ fontWeight: "bold" }}>{checkDeliveryCharge?.sub_area_charge}</span>
                          </div>
                        }
                      </div> : <p> {cart?.length === 0 ? "0" : "Free"}</p>
                    }

                  </li>
                  <li className='d_flex'>
                    <h3>Total</h3>
                    <h4>TK {cart?.length < 1 ? 0 : (parseInt(cartSubTotal) + parseInt(shippingCost))?.toFixed(0)
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0}</h4>
                  </li>
                </ul>
              </div>
            </Col>



          </Row>


          <Row>

            <Col xs={12} lg={8}>

              <section className='CheckOut ShippingAddressTop'>
                {/* CheckOutContent */}
                <div className='CheckOutContent'>
                  <h2>Shipping Address</h2>
                  <div className='ProductDescriptionLeft'>
                    <form onSubmit={handleSubmit(handleSubmitOrder)}>
                      <div className='LoginItem'>
                        <div className='CustomeInput'>
                          <TextField
                            id='outlined-basic'
                            label='Name *'
                            variant='outlined'
                            {...register("customerName", { required: true })}
                          />
                          {errors.customerName && (
                            <span style={{ color: "red" }}>
                              Name is required
                            </span>
                          )}
                        </div>

                        <div className='CustomeInput'>
                          <TextField
                            id='outlined-basic'
                            label='Phone Number *'
                            variant='outlined'
                            {...register(
                              "customerMobile",
                              { required: true, pattern: /^(?:\+8801|01)[3-9]\d{8}$/ }

                            )}
                          />
                          {errors.customerMobile && (
                            <span style={{ color: "red" }}>
                              Valid Mobile Number require
                            </span>
                          )}
                        </div>

                        <div className='CustomeInput'>
                          <TextField
                            id='outlined-basic'
                            label='Street address *'
                            variant='outlined'
                            {...register("customerAddress", { required: true })}
                          />
                          {errors.customerAddress && (
                            <span style={{ color: "red" }}>
                              Address is required
                            </span>
                          )}
                        </div>
                        {/* <div className='CustomeInput'>
													<TextField
														id='outlined-basic'
														label='Note(Optional)'
														variant='outlined'
														{...register("customerOrderNote")}
													/>
												</div> */}

                        <div className='ProceedToCheckout'>
                          <Button disabled={isLoading} style={{ padding: isLoading ? "0 0" : "7px 0px" }} type='submit' variant='contained'>
                            {isLoading ? <> <Loader /></> : <>PLACE ORDER TK  {cart?.length < 1 ? 0 : parseInt(cartSubTotal) + parseInt(shippingCost)} </>}
                          </Button>
                          <OrderOtp handldeResendOTP={handldeResendOTP} restOtpLoading={restOtpLoading} timeLeft={timeLeft} shopID={shopID} show={show} handleClose={handleClose} />

                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </section>

            </Col>

          </Row>


        </div>
      </Container>
    </section >
    <Footer shopInfo={shopInfo} />
  </>

  );
};

export default CheckOut;