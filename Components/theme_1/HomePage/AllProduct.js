import Link from "next/link";
import {
  Container,
} from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/stateSlices/CartSlice";

const axios = require("axios");
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const AllProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [shop_name, setShop_name] = useState("");
  const ShopID = Cookies.get("shop_id");

  useEffect(() => {
    const headers = {
      "shop-id": localStorage.getItem("shop_id"),
    };
    setShop_name(localStorage.getItem("shop_name"));

    const fetchData = async () => {
      let response;
      if (router?.query?.id !== undefined && router?.query?.shop !== undefined) {
        response = await axios.get(
          `${process.env.API_URL}/customer/category-product/list/${router?.query?.id}`,
          {
            headers: {
              "shop-id": router?.query?.shop,
            },
          }
        );
      } if (router?.query?.search !== undefined) {
        response = await axios.get(
          `${process.env.API_URL}/customer/product-search?search=${router?.query?.search}`,
          {
            headers: {
              "shop-id": ShopID,
            },
          }
        );
      }
      else {
        response = await axios.get(
          `${process.env.API_URL}/customer/products`,
          {
            headers: headers,
          }
        );
      }
      if (response?.data?.success) {
        setAllProducts(response?.data?.data);
      }
    };

    fetchData();
  }, [router?.query?.id, router?.query?.shop]);

  const handleAddToCart = (product, detailsPageUrl) => {
    if (product?.attributes?.length) {
      router.push(detailsPageUrl)
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleBuyNow = (product, detailsPageUrl) => {
    if (product?.attributes?.length) {
      router.push(detailsPageUrl)
    } else {
      dispatch(addToCart(product));
      router.push(`/${shop_name}/checkout`)
    }
  };


  return (
    <section className="Multipage__1">
      <Container>
        <div className='Multipage__1__AllProductDiv'>
          <h2>All Products {router?.query?.category !== undefined ? `of ${router?.query?.category} Category` : null}</h2>
        </div>
        <div className="Multipage__1__grid-container">

          {allProducts?.length ?
            allProducts.map((item, index) => {
              return (
                <div className="Multipage__1__grid-item" key={item.id}>
                  <div className="Multipage__1__grid-itemAbs">
                  </div>
                  <div className="Multipage__1__CardImgBox">
                    <Link href={`/${shop_name}/details/${item?.slug}?id=${item?.id}`}>
                      <img src={item?.main_image} alt={item?.product_name} />
                    </Link>
                  </div>
                  <div className="Multipage__1__CardTxtBox">
                    <h5> <Link href={`/${shop_name}/details/${item?.slug}?id=${item?.id}`}> {item?.product_name} </Link></h5>
                    <h4>৳ {item?.discounted_price }
                      {
                        <del>৳{item?.price}</del>
                      }

                    </h4>
                    <div className="d_flex MultiDuelBtn">
                      <Link onClick={() => handleAddToCart(item, `/${shop_name}/details/${item?.slug}?id=${item?.id}`)} href='#' className="bg6"> Add To Cart</Link>
                      <Link onClick={() => handleBuyNow(item, `/${shop_name}/details/${item?.slug}?id=${item?.id}`)} href="#" className="bg5"> Order Now</Link>
                    </div>
                  </div>
                </div>
              );
            }) : <div style={{ width: '100%' }}>Products Not Found</div>
          }

        </div>
      </Container>
    </section>
  );
};

export default AllProduct;
