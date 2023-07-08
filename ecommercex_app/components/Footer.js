import Link from "next/link";
import styled from "styled-components";
import { SocialNetworks, FooterSection } from './FooterComponents';

const StyledFooter = styled.footer`
  margin-top: 50px;
  background-color: #222;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
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
`;

const FooterBottom = styled.div`
  padding: 20px 0;
  border-top: 1px solid #EBEBEB;
  text-align: center;
  font-size: 11px;
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



/*
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <h6><Logo /> <span>E</span>-Shop</h6>
            <p>House My Brand designs clothing for the young, the old & everyone in between – but most 
              importantly, for the fashionable</p>
            <ul className="site-footer__social-networks">
              <li><a href="#"><i className="icon-facebook"></i></a></li>
              <li><a href="#"><i className="icon-twitter"></i></a></li>
              <li><a href="#"><i className="icon-linkedin"></i></a></li>
              <li><a href="#"><i className="icon-instagram"></i></a></li>
              <li><a href="#"><i className="icon-youtube-play"></i></a></li>
            </ul>
          </div>

          <div className="site-footer__links">
            <ul>
              <li>Shopping online</li>
              <li><a href="#">Order Status</a></li>
              <li><a href="#">Shipping and Delivery</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Payment options</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
            <ul>
              <li>Information</li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Find a store</a></li>
              <li><a href="#">Newsletter</a></li>
              <li><a href="#">Bacome a member</a></li>
              <li><a href="#">Site feedback</a></li>
            </ul>
            <ul>
              <li>Contact</li>
              <li><a href="#">store@uikit.com</a></li>
              <li><a href="#">Hotline: +1 131 138 138</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="site-footer__bottom">
        <div className="container">
          <p>DESIGN BY ICEO.CO - © 2019. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
};


export default Footer
*/