import Link from "next/link";
import { Col, Container, Dropdown, Row, Form } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { GoSearch } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import { useSelector } from "react-redux";
const axios = require("axios");
import store from "../../../redux/store";

const Menubar = ({ shopInfo }) => {
  const { fb, instagram, youtube, twitter } = shopInfo;
  const router = useRouter()
  const cartlength = useSelector((state) => state.cart?.cartItems.length);
  const [searchInput, setSearchInput] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const shopName = router.query.shopName
  //category list
  const [categories, setCategories] = useState([]);

  async function handleFetchCategories(headers) {
    const response = await fetch(`${process.env.API_URL}/customer/categories`, {
      headers: headers,
    });
    const data = await response.json();

    if (data.success === true) {
      setCategories(data?.data);
    }
  }

  useEffect(() => {
    const headers = {
      "shop-id": localStorage.getItem("shop_id"),
    };
    handleFetchCategories(headers)

  }, []);


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
  const handleClickSearchBtn = () => {
    router.push(`/${shopInfo?.domain}/shop`)
  }
  return (
    <>
      <div className='Multipage__1__DextopVs'>
        <Container>
          <div className='Multipage__1__ManubarDiv'>
            <div className='Multipage__1__ManubarItem1'>
              <Link href={`/${shopInfo?.domain}`}>
                <img
                  src={shopInfo?.shop_logo}
                  alt='Shop Logo'
                />
              </Link>
            </div>
            <div className='Multipage__1__ManubarItem2'>
              <div className='Multipage__1__ManubarInputDiv'>
                <input type="text" placeholder="Search here..." onChange={(e) => setSearchInput(e.target.value)} />
                <button onClick={() => router.push(`/${shopInfo?.domain}/shop?search=${searchInput}`)} type="button" ><GoSearch /></button>
              </div>
            </div>
            <div className='Multipage__1__ManubarItem3'>
              <ul>
                <li>
                  <Link href={`/${shopInfo?.domain}/checkout`}>
                    <AiOutlineShoppingCart className="Multipage__1__menuicon"></AiOutlineShoppingCart>
                  </Link>
                  <div className="Multipage__1__TopNum">{totalItem}</div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
        <div className="Multipage__1__HrDiv"></div>
        <Container>
          <div className="Multipage__1__MenubarDiv2">
            <div className="Multipage__1__MenubarDiv2Item">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <div className='Multipage__1__MenubarImgDiv'>
                    <img src="/images/multipage-1/img.png" alt="" />
                    <span>Browse Categories</span>
                    <div>  <IoIosArrowDown /> </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className='Multipage__1__DropItem'>
                    {categories?.map((item, index) => {
                      return (
                        <Dropdown.Item key={index} onClick={() => router.push(`/${shopInfo?.domain}/shop?category=${item.name.split(" ").join("-")}&shop=${item?.shop_id}&id=${item?.id}`)}>{item.name}</Dropdown.Item>
                      );
                    })}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <div className='Multipage__1__MenuDiv'>
                <Link href={`/${shopInfo?.domain}`}>Home</Link>
                <Link href={`/${shopInfo?.domain}/shop`}>Shop</Link>
                <Link href={`/${shopInfo?.domain}/about_us`}>About Us</Link>

              </div>
            </div>
            <div className="Multipage__1__MenubarDiv2Item2">
              <Link href={fb ? fb : "https://www.facebook.com/"} target="_blank" > <FaFacebookF /> </Link>
              <Link href={instagram ? instagram : "https://www.instagram.com/"} target="_blank" > <FaInstagram /> </Link>
              <Link href={youtube ? youtube : "https://www.youtube.com/"} target="_blank" > <FaYoutube /> </Link>
              <Link href={twitter ? twitter : "https://twitter.com/"} target="_blank" > <FaTwitter /> </Link>
            </div>
          </div>
        </Container>
        <div className="Multipage__1__HrDiv"></div>
      </div>

      {/* Mobile Menue */}
      <div className='Multipage__1__MobileVs'>
        <div className='Multipage__1__MobileVsBg'>
          <Container>
            <div className='Multipage__1__MenubarMob1'>
              <div>
                <div className="Multipage__1__MenubarDiv2Item2 Multipage__1__MenubarDiv2Item3">
                  <Link href={fb ? fb : "https://www.facebook.com/"} target="_blank" > <FaFacebookF /> </Link>
                  <Link href={instagram ? instagram : "https://www.instagram.com/"} target="_blank" > <FaInstagram /> </Link>
                  <Link href={youtube ? youtube : "https://www.youtube.com/"} target="_blank" > <FaYoutube /> </Link>
                  <Link href={twitter ? twitter : "https://twitter.com/"} target="_blank" > <FaTwitter /> </Link>
                </div>
              </div>
              <div className='Multipage__1__ManubarItem2'>
                <div className='Multipage__1__ManubarInputDiv'>
                  <input type="text" placeholder="Search here..." onChange={(e) => setSearchInput(e.target.value)} />
                  <button onClick={() => router.push(`/shop?search=${searchInput}`)} type="button" ><GoSearch /></button>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <div className='Multipage__1__MobileVs2'>
            <div className="Multipage__1__MenubarDiv2">
              <div className="Multipage__1__MenubarDiv2Item">
                <Button variant="primary" onClick={handleShow}>
                  <div className='Multipage__1__MenubarImgDiv'>
                    <img src="/images/multipage-1/img28.png" alt="" />
                  </div>
                </Button>
                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                      <Link href={`/${shopInfo?.domain}`}>
                        <img className="multi_page_one_mobile_logo"
                          src={shopInfo?.shop_logo}
                          alt='Shop Logo'
                        />
                      </Link>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className='Multipage__1__OffCanDiv'>
                      <ul>
                        <li>
                          <Link href={`/${shopInfo?.domain}`}>Home</Link>

                        </li>
                        <li>
                          <Link href={`/${shopInfo?.domain}/shop`}>Shop</Link>

                        </li>
                        <li>
                          <Link href={`/${shopInfo?.domain}/about_us`}>About Us</Link>
                        </li>
                      </ul>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>

                <Link href={`/${shopInfo?.domain}`}>
                  <img
                    className="multi_page_one_mobile_logo"
                    src={shopInfo?.shop_logo}
                    alt='Shop Logo'
                  />
                </Link>
              </div>
            </div>

            <div className='Multipage__1__ManubarItem3'>
              <ul>

                <li>
                  <Link href={`/${shopInfo?.domain}/checkout`}> <AiOutlineShoppingCart className="Multipage__1__menuicon"></AiOutlineShoppingCart> </Link>
                  <div className="Multipage__1__TopNum">{totalItem}</div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Menubar;
