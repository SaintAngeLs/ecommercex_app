import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";

const StyledHeader = styled.header`
    background-color: #222;
    font-weight: 500;
    position: relative;
`;
const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    position: relative;
    z-index: 1000;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 0;
    align-items: center;
`;

const StyledMavigation = styled.nav`
    display: ${props => props.mobileNavActive ? 'block' : 'none'};

    gap: 20px;
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 20px;
    right: 0;
    padding: 10px 10px 20px;
    background-color: #222;
    z-index: 1000;
    @media screen  and (min-width: 768px){
        display: flex;
        position: sticky;
        padding: 0;
        z-index: 1000;
    }
`;
const NavigationLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
    padding: 10px 0 ;
    @media screen  and (min-width: 768px){
        padding: 0;
    }
`;
const NavButton = styled.button`
    background-color: transparent;
    width: 30px;
    height: 30px;
    border: 0;
    color: #fff;
    position: relative;
    z-index: 1000;
    cursor: pointer;
    @media screen  and (min-width: 768px){
        display: none;
        position: static;
        padding: 0;
    }
`;

export default function Header() {
    const {cartProducts} = useContext(CartContext)
    const [mobileNavActive, setMobileNavActive] = useState(false);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href = {'/'}>Ecommerce</Logo>
                    <StyledMavigation mobileNavActive = {mobileNavActive}>
                        <NavigationLink href={'/'}>Home</NavigationLink>
                        <NavigationLink href={'/products'}>All products</NavigationLink>
                        <NavigationLink href={'/categories'}>Categories</NavigationLink>
                        <NavigationLink href={'/account'}>Account</NavigationLink>
                        <NavigationLink href={'/cart'}>Cart ({cartProducts.length})</NavigationLink>
                    </StyledMavigation>
                    <NavButton onClick= {() => setMobileNavActive(previous => !previous)}> 
                        <BarsIcon/>
                    </NavButton>
                </Wrapper>
            </Center>
            
        </StyledHeader>
    )
}