import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/stateSlices/CartSlice";
import { baseUrl } from "../../../constant/constant";
import { useRouter } from "next/router";

import { useNode, useEditor } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import Context from "../../Context";

const axios = require("axios");
const PopularProduct = ({ title, fontSize, save }) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected.size > 0,
    hasDraggedNode: state.events.dragged.size > 0,
  }));
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: true,
  }));
  const dispatch = useDispatch();
  const router = useRouter();

  const { value, value1 } = useContext(Context);
  const editActive = value;
  useEffect(() => {
    if (value1 === true) {
      const serialize = query.serialize();
      save(serialize);
    }
  }, [value1]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [shopId, setShopId] = useState();

  const handleFetchProduct = async (headers) => {
    try {
      let res = await axios({
        method: "get",
        url: `${baseUrl}/api/v1/customer/top-selling-product`,
        headers: headers,
      });
      setPopularProducts(res.data.data);
    } catch (err) {
      // console.log(err)
    }
  };

  useEffect(() => {
    const headers = {
      'shop-id': localStorage.getItem("shop_id"),
    };
    handleFetchProduct(headers);
    setShopId(localStorage.getItem("shop_id"));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
    router.push("/theme_1/check_out");
  };

  return (
    <section className='PopularProduct'>
      <Container>
        <Row>
          {/* item */}
          <Col xs={12}>
			{popularProducts.length>0&&editActive === false && <h2>{title}</h2>}

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
          </Col>
        </Row>
        <div className='PopularProductContent'>
          {/* total Item */}
          {/* <Row>
            {popularProducts.map((pd, index) => {
              return (
                <Col key={pd.id} md={3}>
                  <Link href={`theme_1/${shopId}/${pd?.slug}`}>
                    <div className='PopularProductItem'>
                      <div className='img'>
                        <img src={pd?.product_image} alt='' />
                      </div>
                      <div className='text'>
                        <h3>
                          BDT {pd?.price} <del>{pd?.discount}</del>
                        </h3>
                        <p>{pd?.short_description}</p>
                        <div className='duelButton'>
                          <Link
                            href=''
                            onClick={() => handleAddToCart(pd)}
                            className='addToCart'
                          >
                            Add To Cart
                          </Link>

                          <Link onClick={() => handleBuyNow(pd)} href=''>
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row> */}
        </div>
      </Container>
    </section>
  );
};

export default PopularProduct;
