import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import FlyingButton from "./FlyingButton";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import axios from "axios";


const ProductWrapper = styled.div`

`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: .8rem;
    margin: 0;
    color: inherit;
    text-decoration: none;
`;
const WhiteBox = styled(Link)`
    position: relative;
    background-color: #fff;
    padding: 30px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 100%;
        max-height: 80px;
    }
`;
const Price = styled.div`
    font-size: 1rem;
    font-weight: 600;
    text-align: right;
    @media screen  and (min-width: 768px){
        font-size: 1.3rem;
    }
`;

const PriceRow = styled.div`
    display: block;
    @media screen  and (min-width: 768px){
        display: flex;
        gap: 10px;
    }
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;

const ProducInfoBox = styled.div`
    margin-top: 3px;
`;



const WishlistButton = styled.button`
  border:0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top:0;
  right:0;
  background:transparent;
  cursor: pointer;
  ${props => props.wished ? `
    color:red;
  ` : `
    color:black;
  `}
  svg{
    width: 16px;
  }
`;


export default function ProductBox({_id, title, description, price, images,wished=false,
    onRemoveFromWishlist=()=>{}}) {
    const url = '/product/'+_id;
    const {addProduct} = useContext(CartContext);

    const [isWished,setIsWished] = useState(wished);
    function addToWishlist(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const nextValue = !isWished;
        if (nextValue === false && onRemoveFromWishlist) 
        {
            onRemoveFromWishlist(_id);
        }
        axios.post('/api/wishlist', {
                                    product: _id,
                                    }).then(() => {});
        setIsWished(nextValue);
    }
    return (
        <ProductWrapper>
            <WhiteBox href = {url}>
                <div>
                    <WishlistButton wished={isWished} onClick={addToWishlist}>
                        {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
                    </WishlistButton>
                    <img src={images?.[0]}></img>
                </div>   
            </WhiteBox>
            <ProducInfoBox>
                <Title href = {url}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <FlyingButton _id={_id} src={images?.[0]}>Add to cart</FlyingButton>
                </PriceRow>
            </ProducInfoBox>
        </ProductWrapper>
        
    );
};