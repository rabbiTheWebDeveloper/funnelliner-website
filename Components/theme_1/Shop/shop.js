import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const axios = require("axios");
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/stateSlices/CartSlice";
import ReactPaginate from "react-paginate";
import { baseUrl } from "../../../constant/constant";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const shop = () => {
  const searchString = useSelector((state) => state.searchInput.searchString);
  const router = useRouter();
  const queryData = router?.query?.data;
  const [allProducts, setAllProducts] = useState([]);
  const [shopId, setShopId] = useState();
  const [shopName, setShopName] = useState();
  const [notFound, setNotFOund] = useState(false);

  const dispatch = useDispatch();
  // console.log(searchString);

  const handleFetchProduct = async (headers) => {
    try {
      let res = await axios({
        method: "post",
        url: `${process.env.API_URL}v1/customer/products/search`,
        // data: {
        //   search: searchString,
        // },
        headers,
      });
      setAllProducts(res.data.data);
    } catch (err) {
      setNotFOund(true);
      setAllProducts([]);
    }
  };

  useEffect(() => {
    const headers = {
      "shop-id": localStorage.getItem("shop_id"),
    };
    handleFetchProduct(headers);
    setShopId(localStorage.getItem("shop_id"));
    setShopName(localStorage.getItem("shop_name"));
  }, [searchString]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
    // router.push(`/${shopName}/check_out`);
  };

  return (
    // <section>
    //   <Container>
    //     <Row>
    //       {/* item */}
    //       <Col xs={12}>
    //         <div className='PopularProductGrid'>
    //           {allProducts.length > 0 &&
    //             allProducts.map((item, index) => {
    //               return (
    //                 <Link href={`/${shopName}/details/${item?.id}`} key={index}>
    //                   <div  className='PopularProductItem'>
    //                     <div className='img'>
    //                       <img
    //                         style={{ maxWidth: "250px" }}
    //                         src={item?.main_image?.name}
    //                         alt=''
    //                       />
    //                     </div>
    //                     <div className='text'>
    //                       <h3>
    //                         BDT {item?.price} <del>{item?.discount}</del>
    //                       </h3>
    //                       <p>{item?.product_name}</p>
    //                       <div className='duelButton'>
    //                         <Link
    //                           onClick={() => handleAddToCart(item)}
    //                           href='#'
    //                           className='addToCart'
    //                         >
    //                           Add To Cart
    //                         </Link>
    //                         <Link
    //                           onClick={() => handleBuyNow(item)}
    //                           href={`/${shopName}/checkout`}
    //                         >
    //                           Buy Now
    //                         </Link>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </Link>
    //               );
    //             })}
    //           <ToastContainer />
    //         </div>
    //       </Col>
    //     </Row>
    //     {notFound === true && (
    //       <h1
    //         className='text-center'
    //         style={{ color: "red", marginTop: "100px", marginBottom: "200px" }}
    //       >
    //         Product Not found
    //       </h1>
    //     )}
    //   </Container>
    // </section>


    <section className="Multipage__1">
      <Container>
        <div className='Multipage__1__AllProductDiv'>
          <h2>All Products</h2>
        </div>
        <div className="Multipage__1__grid-container">

          {Array.isArray(allProducts) ?
            allProducts.map((item, index) => {
              return (
                <div className="Multipage__1__grid-item" key={item.id}>
                  <div className="Multipage__1__grid-itemAbs">
                  </div>
                  <div className="Multipage__1__CardImgBox">
                    <Link href={`${shop_name}/details/${item?.id}`}>
                      <img src={item?.main_image?.name} alt="" />
                    </Link>
                  </div>
                  <div className="Multipage__1__CardTxtBox">
                    <h4>BDT  {item?.price} <span>{item?.discount}</span></h4>
                    <h5>{item?.product_name}</h5>
                    <Link onClick={() => handleAddToCart(item)} href='#' className="bg6"> Add To Cart</Link>
                    <Link onClick={() => handleBuyNow(item)} href={`/${shop_name}/checkout`} className="bg5"> Order Now</Link>
                  </div>
                </div>
              );
            }) : null
          }

        </div>
      </Container>
    </section>
  );
};

export default shop;
