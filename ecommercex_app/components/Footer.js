import Link from "next/link";
import styled from "styled-components";
import { SocialNetworks, FooterSection } from './FooterComponents';

const StyledFooter = styled.footer`
  margin-top: 50px;
  background-color: #222;
  color: #fff;
  padding: 20px;
  text-align: center;

  
  @media screen and (min-width: 576px) {
    padding: 40px;
  }

  @media screen and (min-width: 768px) {
    padding: 60px;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  
  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #b2b2b2;
  }
`;


const FooterTop = styled.div`
  display: grid;
  gap: 10px;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    font-size: 11px;
  }
`;

const FooterBottom = styled.div`
  padding: 20px 0;
  border-top: 1px solid #EBEBEB;
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
              { href: '#', text: 'store@uikit.com' },
              { href: '#', text: 'Hotline: +1 131 138 138' },
            ]}
          />
        </FooterContent>
      </FooterTop>

      <FooterBottom>
        <p>
          &copy; {new Date().getFullYear()} Ecommerce. All rights reserved. DESIGN
          BY ICEO.CO - © 2019.
        </p>
        <div>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
        </div>
      </FooterBottom>
    </StyledFooter>
  );
};

