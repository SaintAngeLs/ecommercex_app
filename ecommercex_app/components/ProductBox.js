import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";


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
export default function ProductBox({_id, title, description, price, images}) {
    const url = '/product/'+_id;
    const {addProduct} = useContext(CartContext);
    return (
        <ProductWrapper>
            <WhiteBox href = {url}>
                <div>
                    <img src={images[0]}></img>
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
                    <Button block onClick={() => addProduct(_id)} primary outline>
                        To cart
                    </Button>
                </PriceRow>

               
            </ProducInfoBox>
        </ProductWrapper>
        
    );
};