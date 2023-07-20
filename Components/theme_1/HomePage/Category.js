
import {  Container, } from "react-bootstrap";

// Import Swiper React components
import React, { useEffect,  useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation,  FreeMode } from "swiper";
import Link from "next/link";



const Category = () => {
  const [categories, setCategories] = useState([])
  async function handleFetchCategories(headers) {
    const response = await fetch(
      `${process.env.API_URL}v1/customer/categories`, { headers: headers }
    );
    const data = await response.json();
    if (data.success === true) {
      setCategories(data?.data)
    }
  }
  useEffect(() => {
    const headers = {
      "shop-id": localStorage.getItem('shop_id'),
    }
    handleFetchCategories(headers).then(r => console.log())
  }, [])

  return (
  
    <section>
      <Container>
        <div className='Multipage__1__CategoriesDiv'>
          <h2>Categories</h2>
          <div>
            <Swiper
              slidesPerView={7}
              spaceBetween={30}
              slidesPerGroup={1}
              freeMode={true}
              modules={[FreeMode, Navigation]}
              className="mySwiper2"
              navigation={true}
              breakpoints={{
                300: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },

                1280: {
                  slidesPerView: 6,
                  spaceBetween: 50,
                },

                1480: {
                  slidesPerView: 7,
                  spaceBetween: 50,
                },

              }}
            >
              {categories?.map((item, index) => {
                return (
                  <SwiperSlide key={item.id}>


                      <div className='CategoryItem'>
                        <div className='img'>
                          <img
                          className="Multipage__1__Categoriy_image"
                            src={item?.image?.name}
                            alt=''
                          />
                        </div>
                        <div className='text'>
                          <p>{item?.name}</p>
                        </div>
                      </div>

                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Category;
