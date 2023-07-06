import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { createContext, useContext } from "react";
import { CartContext } from "./CartContext";

const BG = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;
    @media screen  and (min-width: 768px){
        font-size: 3rem;
    }
`;

const Description = styled.p`
    color: #aaa;
    font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    
    gap: 50px;
    img{
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1){
        order: 2;
    }
    @media screen  and (min-width: 768px){
        grid-template-columns: 1.1fr .9fr;
        div:nth-child(1){
            order: 0;
        }
        img{
            max-width: 100%;
        }

    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`;
const Column = styled.div`
    display: flex;
    align-items:center;
`;


export default function Featured({product}) {
    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart() {
        addProduct(previous => [...previous, product._id]);
    }
    return(
        <BG>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product?.title}</Title>
                                <Description>
                                    {product?.description}
                                </Description>
                                <ButtonsWrapper>
                                    <ButtonLink href = {'/product/'+product?._id}  outline white>
                                        Read more
                                    </ButtonLink>
                                    <Button white onClick = {addFeaturedToCart}>
                                        <CartIcon/>
                                        Add to card
                                    </Button>
                                </ButtonsWrapper>
                                
                        </div>
                    </Column>
                    <Column>
                        <img src = "https://ecommersenextapp.s3.amazonaws.com/1685811922548-3948159092.jpg"></img>
                    </Column>
                </ColumnsWrapper>
                
            </Center>
            
        </BG>
    )
}