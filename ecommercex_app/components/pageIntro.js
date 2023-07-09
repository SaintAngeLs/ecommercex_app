import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation } from 'swiper/core';
import 'swiper/css'
import styled from 'styled-components';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react';

import SwiperNavButtons from './SwiperNavButtons';
import ShopData from './ShopData';


SwiperCore.use([EffectFade, Navigation]);

const Slide = styled.div`
  height: 650px;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #FAFAFA;
  @media (max-width: 600px) {
    height: 90vh;
  }
  &:before {
    content: '';
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Container = styled.div`
  z-index: 10;
  display: flex;
  position: relative;
  align-items: center;
  height: 100%;
`;

const SlideContent = styled.div`
  margin-top: auto;
  margin-bottom: 40px;
  margin-left: 5rem;
  @media (max-width: 600px) {
    margin-bottom: 80px;
    margin-top: 0;
  }
`;

const Title = styled.h2`
  font-size: 36px;
  color: #fff;
  font-weight: 600;
  line-height: 120%;
  margin-bottom: 45px;

  @media (max-width: 600px) {
    font-size: 64px;
    width: 600px;
  }
`;

const ShopButton = styled.a`
  display: flex;
  color: #fff;
  align-items: center;
`;

const Icon = styled.i`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 50px;
  margin-right: 10px;
  background-color: var(--color-orange);
  border-radius: 100%;
  margin-right: 2rem;
`;


const PageIntro = () => {

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [swiper, updateSwiper] = useState(null);



  return (
    <section>
       <Swiper
        navigation
        effect="fade"
        observer={true}
        observeParents={true}
        parallax={true}
        className="swiper-wrapper"
        onSwiper={updateSwiper}
        >

        
        <SwiperSlide>
          <Slide style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584811644165-33db3b146db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')" }}>
            <Container>
              <SlideContent>
                <Title>Sale of the summer collection</Title>
                <ShopButton href="#">
                    <Icon className="icon-right"><FontAwesomeIcon icon={faArrowRight} /></Icon>Shop now
                </ShopButton>
              </SlideContent>
            </Container>
          </Slide>
        </SwiperSlide>

        <SwiperSlide>
          <Slide style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578469488462-96f9af23e4b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80')" }}>
            <Container>
              <SlideContent>
                <Title>Make your house into a home</Title>
                <ShopButton href="#">
                  <Icon className="icon-right"><FontAwesomeIcon icon={faArrowRight} /></Icon>Shop now
                </ShopButton>
              </SlideContent>
            </Container>
          </Slide>
        </SwiperSlide>
        <SwiperNavButtons/>
        
      </Swiper>
      
      <ShopData/>
      {/* <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over $199</p>
              </div>
            </li>

            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our clients' opinions speak for themselves</p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product from our store</p>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
    </section>
  );
};

export default PageIntro;
