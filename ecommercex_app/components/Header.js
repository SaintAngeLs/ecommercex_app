import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";


import BarsIcon from "./icons/Bars";
import CartIcon from "./icons/CartIcon";
import HomeIcon from "./icons/HomeIcon";
import AllProducts from "./icons/AllProductsIcon";
import CategoriesIcon from "./icons/CategoriesIcon";
import UserIcon from "./icons/UserIcon";
import PartnershipIcon from "./icons/PartnershipIcon";
import SearchIcon from "./icons/SearchIcon";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
    background-color: #222;
    font-weight: 500;
    display: block;
    position: relative;
    font-size: 12px;
    z-index: 1000;
    //margin-bottom: 100px;
    

    ${props => props.isNotOnTop && `
        position: fixed;
        top: 0;
        margin-bottom: 100px;
        left: 0;
        right: 0;
    `}
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
    padding: 5px 0;
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
    margin-left: 0px;
    

    @media screen  and (max-width: 768px){
        padding: 0;
        margin-left: 100px;
    }
`;

const NavigationLinkContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    @media screen  and (max-width: 768px){
        max-width: 100%;
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
    @media screen  and (M-width: 768px){
        display: none;
        position: static;
        padding: 0;
    }
`;
const IconWrapper = styled.div`
  width: 20px; 
  height: 20px; 
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropdownContainer = styled.div`
  position: relative;
  
  
  //display: inline-block;
  
`;

const DropdownToggle = styled.button`
  display: block;
  font-size: 12px;
  color: #aaa;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  background: none;
  border: none;
  cursor: pointer;
  
  svg {
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
    
  }
`;

const DropdownMenu = styled.ul`
  position: relative;
  
  top: 100%;
  left: 0;
  display: ${(props) => (props.open ? "block" : "none")};
  background-color: #222;
  padding: 10px;
  margin: 0;
  list-style: none;
  z-index: 1;
`;

const DropdownItem = styled.li`
  margin-bottom: 5px;
`;



export default function Header({ isErrorPage }) {
    const {cartProducts} = useContext(CartContext)
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const router = useRouter();
    const arrayPaths = ['/'];  
    const [onTop, setOnTop] = useState(( !arrayPaths.includes(router.pathname) || isErrorPage ) ? false : true);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };

    const headerClass = () => {
        if(window.pageYOffset === 0) {
            setOnTop(true);
        } else {
            setOnTop(false);
        }
    }
    
    useEffect(() => {
        if(!arrayPaths.includes(router.pathname) || isErrorPage) {
          return;
        }
    
        headerClass();
        window.onscroll = function() {
          headerClass();
        };
    }, []);
    

    return (
        <StyledHeader isNotOnTop={!onTop}>
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
                    
                    {/* <DropdownContainer>
                        
                        
                             
                        <DropdownToggle onClick={toggleDropdown}>
                            <NavigationLinkContainer>
                                <IconWrapper>
                                    <PartnershipIcon />  
                                </IconWrapper>
                                Partnerships
                                </NavigationLinkContainer> 
                        </DropdownToggle>
                            
                        
                        <div className="flex items-center">
                            <DropdownMenu open={dropdownOpen}>
                                <DropdownItem>
                                    <NavigationLink href="#">Artist 1</NavigationLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavigationLink href="#">Artist 2</NavigationLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavigationLink href="#">Merchant</NavigationLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </div>
                    </DropdownContainer>
                    */}

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
                    <NavigationLink href={'/search'}>
                        <NavigationLinkContainer>
                            <IconWrapper>
                                <SearchIcon/>
                            </IconWrapper>
                        </NavigationLinkContainer>
                    </NavigationLink>
                    <NavButton onClick= {() => setMobileNavActive(previous => !previous)}> 
                        <BarsIcon/>
                    </NavButton>
                </Wrapper>
            </Center>
            
        </StyledHeader>
    )
}