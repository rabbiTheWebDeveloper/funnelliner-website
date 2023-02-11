import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect, useRef } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { FaCentos } from "react-icons/fa";
import { useSelector } from "react-redux";
const axios = require("axios");
import store from "../../../redux/store";
import { SetSearchInput } from "../../../redux/stateSlices/SearchInputSlice";

import { useRouter } from "next/router";
import Context from "../../Context";
// import Images from "/frontend_asset/img/logo.png";

const Header = ({ save }) => {
  const cartlength = useSelector((state) => state.cart?.cartItems.length);
  const [shop_name, setShopName] = useState();
  const [cart, setCart] = useState(0);
  const [logo, setLogo] = useState();
  useEffect(() => {
    setCart(cartlength);
    setShopName(localStorage.getItem("shop_name"));
  }, [cartlength]);

  const contextValue = useContext(Context);
  let editActive = false;
  if (contextValue !== undefined) {
    editActive = contextValue.value;
    useEffect(() => {
      if (contextValue.value1) {
        if (logo !== undefined) {
          save(JSON.stringify(logo));
        }
        // JSON.stringify(logo)
      }
    }, [contextValue.value1]);
  }

  const router = useRouter();
  const inputFile = useRef(null);
  const [searchString, setSearchString] = useState("");
  const handleChange = (e) => {
    // console.log(e.target.value)
    setSearchString(e.target.value);
    store.dispatch(SetSearchInput(searchString));
  };
  const handleSearchBtn = () => {
    router.push({
      pathname: `/${shop_name}/shop`,
      // query: { data: searchString}
    });

  };
  const searchText = useSelector((state) => state.searchInput.searchString);
  const onButtonClick = () => {
    inputFile.current.click();
  };
  const handleChangeLogo = (e) => {
    setLogo(URL.createObjectURL(e.target.files[0]));
  };

  //add to cart total item count
  const [cart1, setCart1] = useState([]);
  const carts = useSelector((state) => state.cart);
  useEffect(() => {
    setCart1(carts?.cartItems);
  }, [carts]);
  const cartQuantitys = [];
  cart1.map((item, index) => {
    return [cartQuantitys.push(item.cartQuantity)];
  });
  const totalItem = cartQuantitys.reduce((partialSum, a) => partialSum + a, 0);

  return (
    <section className='Header'>
      <Container>
        <Row className='d_flex'>
          {/* left  */}
          <Col>
            <div className='HeaderLeftLogo'>
              <Link href={`/${shop_name}`}>
                <img
                  src={logo === undefined ? "/theme_1/images/logo.png" : logo}
                  alt=''
                />
              </Link>
              {editActive === true && (
                <>
                  {" "}
                  <input
                    type='file'
                    id='file'
                    onChange={handleChangeLogo}
                    ref={inputFile}
                    style={{ display: "none" }}
                  />
                  <span
                    style={{ marginLeft: "4px", cursor: "pointer" }}
                    onClick={onButtonClick}
                  >
                    <svg
                      fill='#000'
                      height='20px'
                      width='20px'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 306.637 306.637'
                      xmlSpace='preserve'
                    >
                      <path d='M12.809 238.52L0 306.637l68.118-12.809 184.277-184.277-55.309-55.309L12.809 238.52zm47.981 41.423l-41.992 7.896 7.896-41.992L197.086 75.455l34.096 34.096L60.79 279.943zM251.329 0l-41.507 41.507 55.308 55.308 41.507-41.507L251.329 0zm-20.294 41.507l20.294-20.294 34.095 34.095-20.294 20.294-34.095-34.095z' />
                    </svg>
                  </span>
                </>
              )}
            </div>
          </Col>

          <Col xs={6}>
            <div className='HeaderMiddle'>
              <input
                defaultValue={searchText}
                onChange={handleChange}
                type='text'
                name=''
                placeholder='Search here...'
              />
              <div
                onClick={handleSearchBtn}
                className='svg'
                style={{ cursor: "pointer" }}
              >
                <AiOutlineSearch />
              </div>
            </div>
          </Col>

          <Col>
            <div className='HeaderRight'>
              <ul>
                {/* <li>
                  <Link href='' className='d_flex'>
                    <div className='svg'>
                      <AiOutlineHeart />
                    </div>
                    Wishlist
                    <span>2</span>
                  </Link>
                </li> */}

                <li>
                  <Link href={`/${shop_name}/checkout`} className='d_flex'>
                    <div className='svg'>
                      <AiOutlineShoppingCart />
                    </div>
                    Cart
                    <span>{totalItem}</span>
                  </Link>
                </li>

                {/* <li>
                  <a href='' className='d_flex'>
                    <div className='svg'>
                      <AiOutlineUser />
                    </div>
                    Account
                  </a>
                </li> */}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Header;
