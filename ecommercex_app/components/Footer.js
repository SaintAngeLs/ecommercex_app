import Link from "next/link";
import styled from "styled-components";

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
  align-items: center;
  justify-content: center;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #b2b2b2;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FooterContent>
        <p>
          &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.
        </p>
        <div>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
        </div>
        <div>
          <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
        </div>
      </FooterContent>
    </StyledFooter>
  );
}
