import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";


import BarsIcon from "./icons/Bars";
import CartIcon from "./icons/CartIcon";
import HomeIcon from "./icons/HomeIcon";
import AllProducts from "./icons/AllProductsIcon";
import CategoriesIcon from "./icons/CategoriesIcon";
import UserIcon from "./icons/UserIcon";

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
    padding: 20px 10px 20px;
    background-color: #222;
    z-index: 1000;
    @media screen  and (min-width: 768px){
        display: flex;
        position: sticky;
        padding: 10px 20px 10px;
        z-index: 1000;
    }
`;
const NavigationLink = styled(Link)`
    display: flex;
    align-items: center;
    color: #aaa;
    text-decoration: none;
    padding: 10px;
    min-width: 100px; 
    margin-left: px;

    @media screen  and (min-width: 768px){
        padding: 0;
    }
`;

const NavigationLinkContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    @media screen  and (max-width: 768px){
        max-width: 40%;
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
const IconWrapper = styled.div`
  width: 24px; // Set to your preferred width
  height: 24px; // Set to your preferred height
  display: inline-flex;
  justify-content: center;
  align-items: center;
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
                    <NavigationLink href={'/'}>
                        <NavigationLinkContainer> 
                            <IconWrapper>
                                <HomeIcon/>
                            </IconWrapper>
                            Home
                        </NavigationLinkContainer>
                    </NavigationLink>
                    <NavigationLink href={'/products'}>
                        <NavigationLinkContainer>
                            <IconWrapper>
                                <AllProducts/>
                            </IconWrapper>
                            All products
                        </NavigationLinkContainer>
                    </NavigationLink>
                    <NavigationLink href={'/categories'}>
                        <NavigationLinkContainer>
                            <IconWrapper>
                                <CategoriesIcon/>
                            </IconWrapper>
                            Categories
                        </NavigationLinkContainer>
                    </NavigationLink>
                    <NavigationLink href={'/account'}>
                        <NavigationLinkContainer>
                            <IconWrapper>
                                <UserIcon/>
                            </IconWrapper>
                            Account
                        </NavigationLinkContainer>
                        </NavigationLink>
                    <NavigationLink href={'/cart'}>
                    <NavigationLinkContainer>
                        <IconWrapper>
                            <CartIcon/>
                        </IconWrapper>
                        <span>Cart</span>
                        <span>({cartProducts.length})</span>
                    </NavigationLinkContainer>
                    </NavigationLink>
                    </StyledMavigation>
                    <NavButton onClick= {() => setMobileNavActive(previous => !previous)}> 
                        <BarsIcon/>
                    </NavButton>
                </Wrapper>
            </Center>
            
        </StyledHeader>
    )
}