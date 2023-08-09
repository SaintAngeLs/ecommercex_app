import { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//import Swiper from 'react-id-swiper';

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;

`;
const BigImageWrapper = styled.div`
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 200px;
    overflow: hidden;

`;
const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;

`;
const ImageButton = styled.div`
    border: 2px solid #ccc;
    ${props => props.active ? `
        border-color: #ccc;
    ` : `
        border-color: transparent;
    `}
    
    height: 40px;
    padding: 1px;
    cursor: pointer;
    border-radius: 5px;

`;

const SwiperModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: #ffffff;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    line-height: 28px;
`;

export default function ProductImges({images}) {
    
    const [activeImage, setActiveImage] = useState(images?.[0]);
    const [showSwiper, setShowSwiper] = useState(false);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
      };

    

    return(
        <>
        
            <BigImageWrapper onClick={() => setShowSwiper(true)}>
                <BigImage src={activeImage}/>
            </BigImageWrapper>

            {showSwiper && (
                <SwiperModal>
                    <CloseButton onClick={() => setShowSwiper(false)}>&times;</CloseButton>
                    <Slider {...sliderSettings}>
                        {images.map(image => (
                            <div key={image._id}>
                                <Image src={image}/>
                            </div>
                        ))}
                    </Slider>
                </SwiperModal>
            )}
            
            <ImageButtons>
                {images.map(image => (
                    <ImageButton key = {image} 
                    active = {image === activeImage} 
                    onClick = {() => {setActiveImage(image)}}>
                        <Image src={image} />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
}