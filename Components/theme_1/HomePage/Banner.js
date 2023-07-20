import Image from "next/image";
import Link from "next/link";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";

// Import Swiper React components
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import { Autoplay, Pagination, Navigation, } from "swiper";

const Banner = ({ shopInfo }) => {
  return (
    <section >
      <div className='Multipage__1__SwiperDiv'>
        <Container>
          <Row>
            <Col xs={12}>
              <div className='BannerSlider'>
                <Swiper
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  centeredSlides={true}
                  autoplay={{
                    delay: 100,
                    disableOnInteraction: true,
                  }}
                  modules={[Pagination]}
                  className='mySwiper'
                >
                  {
                    shopInfo?.slider != null && shopInfo?.slider?.length > 0 && shopInfo?.slider?.map((item, index) => <SwiperSlide key={index}>
                      <div className='BannerItem'>
                        <img src={item?.image} alt='Banner' />
                      </div>
                    </SwiperSlide>)
                  }

                  {
                    shopInfo?.slider.length === 0 && <SwiperSlide>
                      <div className='BannerItem'>
                        <img src='/images/multipage-1/banner.png' alt='Banner' />
                      </div>
                    </SwiperSlide>
                  }

                  
                </Swiper>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </section>


  );
};

export default Banner;
