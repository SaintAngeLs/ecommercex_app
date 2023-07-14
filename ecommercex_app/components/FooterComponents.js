import React from 'react';
import styled from 'styled-components';

const SocialNetworksList = styled.ul`
  display: flex;
  list-style: none;
`;

const SocialNetworkItem = styled.li`
  margin-right: 15px;
`;

const SocialNetworkLink = styled.a`
  color: #fff;
`;

const FooterList = styled.ul`
  list-style: none;
  display: grid;
`;

const FooterListItem = styled.li`
  margin-bottom: 5px;
  display: flex;
`;

const FooterLink = styled.a`
  color: #fff;
`;

const FooterSectionStyled = styled.div`
  margin: 20px;
  @media screen and (max-width: 576px) {
    margin: 5px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SocialNetworks = () => {
  return (
    <SocialNetworksList>
      <SocialNetworkItem>
        <SocialNetworkLink href="#"><i className="icon-facebook"></i></SocialNetworkLink>
      </SocialNetworkItem>
      <SocialNetworkItem>
        <SocialNetworkLink href="#"><i className="icon-twitter"></i></SocialNetworkLink>
      </SocialNetworkItem>
      <SocialNetworkItem>
        <SocialNetworkLink href="#"><i className="icon-linkedin"></i></SocialNetworkLink>
      </SocialNetworkItem>
      <SocialNetworkItem>
        <SocialNetworkLink href="#"><i className="icon-instagram"></i></SocialNetworkLink>
      </SocialNetworkItem>
      <SocialNetworkItem>
        <SocialNetworkLink href="#"><i className="icon-youtube-play"></i></SocialNetworkLink>
      </SocialNetworkItem>
    </SocialNetworksList>
  );
};

const FooterSection = ({ title, links }) => {
  return (
    <FooterSectionStyled>
      <h6>{title}</h6>
      <FooterList>
        {links.map((link, index) => (
          <FooterListItem key={index}>
            <FooterLink href={link.href}>{link.text}</FooterLink>
          </FooterListItem>
        ))}
      </FooterList>
    </FooterSectionStyled>
  );
};

export { SocialNetworks, FooterSection, FooterContent };
