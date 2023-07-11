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
  height: 600px;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #FAFAFA;
  transition: transform 0.3s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  @media (max-width: 600px), (max-height: 600px){
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
    background-position: center;
    background-size: cover;
    z-index: 5;
    transition: transform 5s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    background-image: ${props => `url(${props.bgImage})`};
  }
  &:hover::before {
    transform: scale(1.05); // 5% scaling effect on ho
    transition: transform 10s cubic-bezier(0.25, 0.45, 0.45, 0.95);
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
  margin-bottom: 300px;
  margin-left: 5rem;
  font-size: 64px;
  @media (max-width: 600px), (max-height: 600px) {
    margin-bottom: 80px;
    margin-top: 6rem;
    margin-left: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 36px;
  color: #fff;
  font-weight: 600;
  line-height: 120%;
  margin-bottom: 45px;

  @media (max-width: 600px) {
    font-size: 45px;
    width: 260px;
    margin-left: 10px 
  }
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
  transition: all 0.3s ease;
  svg {
    color: ${props => props.color || "#fff"};
  }
`;


const ShopButton = styled.a`
  display: flex;
  color: #fff;
  align-items: center;
  transition: all 0.5s ease;
  text-decoration: none;

  &:hover {
    color: silver; // Change color to silver on hover
    transform: scale(1.1) translateX(10px);
    ${Icon} {
      svg {
        transform: scale(1.2) ; 
        color: silver;
      }
    }
  }

`;




const PageIntro = () => {


  return (
    <section>
       <Swiper
        navigation
        effect="fade"
        observer={true}
        observeParents={true}
        parallax={true}
        className="swiper-wrapper"

        >

        
        <SwiperSlide>
          <Slide bgImage="https://images.unsplash.com/photo-1584811644165-33db3b146db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80">
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
          <Slide bgImage="https://images.unsplash.com/photo-1578469488462-96f9af23e4b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80">
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
    </section>
  );
};

export default PageIntro;
