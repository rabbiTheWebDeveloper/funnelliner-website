import Image from "next/image";
import Link from "next/link";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { baseUrl, shopId } from "../../../../constant/constant";
import { TbCurrencyTaka } from "react-icons/tb";
// ../../../constant/constant
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../../../redux/stateSlices/CartSlice";
// ../../../redux/stateSlices/CartSlice
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

const CheckOut = () => {
  const carts = useSelector((state) => state.cart);
  const [cart, setCart] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const [shopID, setShopID] = useState();
  const [shopName, setShopName] = useState();

  useEffect(() => {
    setShopID(localStorage.getItem("shop_id"));
    setShopName(localStorage.getItem("shop_name"));
    setCart(carts?.cartItems);
    setCartSubTotal(carts.cartTotalAmount);
  }, [carts]);

  useEffect(() => {
    dispatch(getTotals());
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

  //order place
  const cartQuantitys = [];
  const productsId = [];
  cart.map((item, index) => {
    return [cartQuantitys.push(item.cartQuantity), productsId.push(item.id)];
  });
  const totalItem = cartQuantitys.reduce((partialSum, a) => partialSum + a, 0);

  const headers = {
    "shop-id": shopID,
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleSubmitOrder = (data) => {
    const postBody = {
      customer_name: data.customerName,
      customer_phone: data.customerMobile,
      customer_address: data.customerAddress,
      product_id: productsId,
      product_qty: cartQuantitys,
    };
    axios
      .post(`${baseUrl}/api/v1/customer/order/store`, postBody, {
        headers: headers,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log("order res", res?.data?.data?.id)
          router.push(`/${shopName}/order_successfull/${res?.data?.data?.id}`);
          handleClearCart();
        }
      })
      .catch((err) => {
        swal("Something went wrong !", "error");
      });
  };

  return (
    <section className='CheckOut'>
      <Container>
        <div className='CheckOutContent'>
          <Row className='justify-content-center mb-5'>
            <Col xs={6}>
              <div></div>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <div className='Header my-3'>
                <h3>Shopping cart ({cart.length} Items)</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={8}>
              <div className='CheckOutTable'>
                {cart.length < 1 ? (
                  <h3 className='text-center mt-3 text-warning'>
                    Your Cart is empty
                  </h3>
                ) : (
                  <table className='table roundedCorners'>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cart &&
                        cart.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className='ProductFst d_flex'>
                                  <div className='svg'>
                                    <MdOutlineClose
                                      onClick={() => handleRemoveFromCart(item)}
                                    />
                                  </div>

                                  <div className='img'>
                                    {cart.length > 0 && (
                                      <img
                                        src={item?.main_image?.name}
                                        alt=''
                                      />
                                    )}
                                  </div>

                                  <div className='Description'>
                                    <p style={{ paddingLeft: "15px" }}>
                                      {item.product_name}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <p style={{ textAlign: "left" }}>
                                  TK{" "}
                                  <span
                                    style={{
                                      fontSize: "15px",
                                      color: "#3BB77E",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.price}
                                  </span>
                                </p>
                              </td>

                              <td>
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

                              <td>
                                <h3 style={{ textAlign: "left" }}>
                                  TK {item.price * item.cartQuantity}
                                </h3>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>

              <section className='CheckOut'>
                {/* CheckOutContent */}
                <div className='CheckOutContent'>
                  <h3>Shipping Address</h3>
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
                              { required: true },
                              { min: 11, max: 15 }
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
                        <div className='ProceedToCheckout'>
                          <Button style={{backgroundColor:"#6F533E"}} type='submit' variant='contained'>
                            PLACE ORDER TK {cartSubTotal}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </Col>

            <Col xs={4}>
              <div className='product_part'>
                <ul>
                  <li className='d_flex'>
                    <h3>Product</h3>
                    <h4>Subtotal</h4>
                  </li>

                  <li className='d_flex'>
                    <div className='img'>
                      <img src={cart[0]?.main_image?.name} alt='' />
                    </div>
                    <p>TK {cartSubTotal}</p>
                  </li>

                  <li className='d_flex'>
                    <h5>Total Item</h5>
                    <p>{totalItem}</p>
                  </li>

                  <li className='d_flex'>
                    <h5>Delivery fee</h5>
                    <p>0</p>
                  </li>

                  <li className='d_flex'>
                    <h3>Grand total</h3>
                    <h4>TK {cartSubTotal}</h4>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default CheckOut;
