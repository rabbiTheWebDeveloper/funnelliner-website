import Image from "next/image";
import Link from "next/link";
import {
  Col,
  Container,
  Dropdown,
  Nav,
  Row,
  Tab,
  Tabs,
  Form,
} from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/stateSlices/CartSlice";
import { baseUrl } from "../../../constant/constant";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import Context from "../../Context";
const axios = require("axios");
import { useRouter } from "next/router";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = ({ title, fontSize }) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected.size > 0,
    hasDraggedNode: state.events.dragged.size > 0,
  }));
  const dispatch = useDispatch();
  const router = useRouter();
  const editActive = useContext(Context);
  const [allProducts, setAllProducts] = useState();
  const [allCategories, setAllCategories] = useState([]);

  const [shopId, setShopId] = useState();
  const [shop_name, setShop_name] = useState();

  const handleFetchProduct = async (headers) => {
    // axios
    // .get(`${process.env.API_URL}v1/customer/products`, { headers: headers })
    // .then((res) => {
    //   setAllProducts(res?.data?.data);
    // });

    try {
      let res = await axios({
        method: "get",
        url: `${process.env.API_URL}v1/customer/products`,
        headers: headers,
      });
      setAllProducts(res.data.data);
    } catch (err) {
      // console.log("all products", err.response.data.msg);
    }
  };
  const handleFetchCategories = async (headers) => {
    // axios
    // .get(`${process.env.API_URL}v1/customer/products`, { headers: headers })
    // .then((res) => {
    //   setAllCategories(res?.data?.data);
    // });
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.API_URL}v1/customer/products`,
        headers: headers,
      });
      setAllCategories(res?.data?.data);

    } catch (err) {
      // console.log("all products", err.response.data.msg);
    }
  };
  useEffect(() => {
    const headers = {
     "shop-id": localStorage.getItem("shop_id"),
    };
    handleFetchProduct(headers);
    handleFetchCategories(headers)
    // axios
    //   .get(`${baseUrl}/api/v1/customer/products`, { headers: headers })
    //   .then((res) => {
    //     setAllProducts(res.data.data);
    //   });
    setShopId(localStorage.getItem("shop_id"));
    setShop_name(localStorage.getItem("shop_name"));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <section className='PopularProduct AllProduct'>
      <Container>
        <Row>
          {/* item */}
          <Col xs={12}>
            {editActive === false && <h2>{title}</h2>}
            {editActive === true && (
              <ContentEditable
                html={title}
                onChange={(e) =>
                  setProp(
                    (props) =>
                      (props.title = e.target.value.replace(
                        /<\/?[^>]+(>|$)/g,
                        ""
                      ))
                  )
                }
                tagName='h2'
                style={{ fontSize: `${fontSize}px` }}
              />
            )}
            {editActive === true && (
              <Form.Range
                min={1}
                defaultvalue={fontSize}
                style={{ width: "200px" }}
                max={50}
                onChange={(e) => {
                  setProp((props) => (props.fontSize = e.target.value));
                }}
              />
            )}
            <div className='AllProductTabs'>
              <Tabs variant='pills' defaultActiveKey='PackOne'>
                <Tab eventKey='PackOne' title='All Products'>
                  <div className='PopularProductContent'>
                    <Row>
                      <Col xs={12}>
                        <div className='PopularProductGrid'>
                          {Array.isArray(allProducts)?
                          allProducts.map((item, index) => {
                            return (
                              <Link href={`${shop_name}/details/${item?.id}`}  key={item.id}>
                                <div
                                  className='PopularProductItem'
                                >
                                  <div className='img'>
                                    <img
                                      src={item?.main_image?.name}
                                      alt=''
                                      style={{ width: "250px" }}
                                    />
                                  </div>
                                  <div className='text'>
                                    <h3>
                                      {item?.price} <del>{item?.discount}</del>
                                    </h3>
                                    <p>{item?.product_name}</p>
                                    <div className='duelButton'>
                                      <Link
                                        onClick={() => handleAddToCart(item)}
                                        className='addToCart'
                                        href='#'
                                      >
                                        {/* <ToastContainer pauseOnHover={false} autoClose={1000}/> */}
                                        Add To Cart
                                      </Link>
                                      <Link
                                        onClick={() => handleBuyNow(item)}
                                        href={`/${shop_name}/checkout`}
                                      >
                                        Buy Now
                                      </Link>
                                    </div>

                                  </div>
                                </div>
                              </Link>
                            );
                          }):null
                        }
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>

              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProduct;
