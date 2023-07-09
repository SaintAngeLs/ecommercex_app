import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { useSwiper } from 'swiper/react';
import styled from 'styled-components';


const SwiperButtonPrev = styled.button`
  bottom: 20px;
  top: auto;
  transform: translateX(50%);
  right: 14%;
  left: auto;
  width: 42px;
  height: 42px;
  z-index: 100;
  font-size: 13px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: none;
  background-color: rgba(255, 255, 255, 0.12);
  
  @media (max-width: 600px) {
    width: 52px;
    height: 52px;
    bottom: 30px;
    font-size: 17px;
    display: flex;
  }
  
  @media (max-width: 992px) {
    width: 72px;
    height: 72px;
    bottom: 30px;
    font-size: 21px;
    display: flex;
  }
  
  &:before {
    color: #FFF;

    font-family: 'Font Awesome';
    svg {
      // Set the size and color of the icon
      width: 15px;
      height: 15px;
      color: #FFF;
    }
  }
  
  &:hover {
    background: #FFF;
    
    &:before {
      color: #000;
    }
  }
  
  &.swiper-button-prev {
    display: flex;
  }
`;

const SwiperButtonNext = styled.button`
  bottom: 20px;
  top: auto;
  transform: translateX(50%);
  right: 7%;
  left: auto;
  width: 42px;
  height: 42px;
  z-index: 100;
  font-size: 13px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: none;
  background-color: rgba(255, 255, 255, 0.12);
  
  @media (max-width: 600px) {
    width: 52px;
    height: 52px;
    bottom: 30px;
    font-size: 17px;
    display: flex;
  }
  
  @media (max-width: 992px) {
    width: 72px;
    height: 72px;
    bottom: 30px;
    font-size: 21px;
    display: flex;
  }
  
  &:before {
    color: #FFF;
    font-family: 'Font Awesome';
  }
  
  &:hover {
    background: #FFF;
    svg {
      // Set the size and color of the icon
      width: 15px;
      height: 15px;
      color: #FFF;
    }
    
    &:before {
      color: #000;
    }
  }
  
  &.swiper-button-next {
    display: flex;
  }
`;


const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div>
        <SwiperButtonPrev className="swiper-button-prev" onClick = {() => swiper.slidePrev()}><FontAwesomeIcon icon={faArrowLeft} /></SwiperButtonPrev>
        <SwiperButtonNext className="swiper-button-next" onClick = {() => swiper.slideNext()}><FontAwesomeIcon icon={faArrowRight} /></SwiperButtonNext>
    </div>
  );
};

export default SwiperNavButtons;