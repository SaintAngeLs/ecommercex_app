import Link from "next/link";
import styled from "styled-components";
import {devices} from '../styles/breacpoints'
import { SocialNetworks, FooterSection } from './FooterComponents';
import Center from "./Center";


const PageWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  min-height: 20vh;
  background-color: #222;
`;

const StyledFooter = styled.footer`
  bottom: 0;
  width: 100%;
  margin-top: 50px;
  
  color: #EEE;
  //padding: 10px;
  text-align: center;

  /* @media screen and (min-width: 576px) {
    padding: 40px;
  }

  @media screen and (min-width: 768px) {
    padding: 60px;
  } */
`;

const FooterContent = styled.div`
  display: grid;
  
  font-size: 12px;
  //justify-content: flex-end;
  flex-direction: row;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  align-items: start;
  
  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterLink = styled(Link)`
  color: #EEE;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  white-space: nowrap; 

  &:hover {
    color: #b2b2b2;
  }
`;


const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 5fr repeat(3, 1fr);
  gap: 5px;
  align-items: start; // align the grid items to start
  
  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 5fr repeat(3, 1fr);
  }
`;

const FooterBottom = styled.div`
  padding: 20px 0;
  border-top: 1px solid #EEE;
  text-align: center;
  font-size: 14px;

  @media screen and (min-width: 576px) {
    padding: 10px 0;
    font-size: 10px;
  }

  p {
    margin-bottom: 10px;
  }

  div {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;

export default function Footer() {
  return (
    

    
    <PageWrapper>
    <Center>
    <StyledFooter>
      <FooterTop>
        
        <div>
          <h6>
            
            <span>E</span>-Shop
          </h6>
          <p>
            House My Brand designs clothing for the young, the old & everyone in
            between – but most importantly, for the fashionable
          </p>
          <SocialNetworks />
        </div>
      
        <FooterContent>
          <FooterSection
            title="Shopping online"
            links={[
              { href: '#', text: 'Order Status' },
              { href: '#', text: 'Shipping and Delivery' },
              { href: '#', text: 'Returns' },
              { href: '#', text: 'Payment options' },
              { href: '#', text: 'Contact Us' },
            ]}
          />
          <FooterSection
            title="Information"
            links={[
              { href: '#', text: 'Gift Cards' },
              { href: '#', text: 'Find a store' },
              { href: '#', text: 'Newsletter' },
              { href: '#', text: 'Become a member' },
              { href: '#', text: 'Site feedback' },
            ]}
          />
          <FooterSection
            title="Contact"
            links={[
              { href: '#', text: 'the_site_of_the_store@mail.com' },
              { href: '#', text: 'Hotline: +1 123 234 567' },
            ]}
          />
        </FooterContent>
      </FooterTop>

      <FooterBottom>
        <p>
          &copy; {new Date().getFullYear()} Ecommerce. All rights reserved. DESIGN
          BY A.V. 2023.
        </p>
        <div>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
        </div>
      </FooterBottom>
    </StyledFooter>
      </Center>
    </PageWrapper>
    
  );
};

