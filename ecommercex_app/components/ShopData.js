import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faPeopleArrows, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

const ShopDataStyled = styled.div`
  bottom: 0;
  left: 0;
  width: 60%;
  position: absolute;
  padding: 46px 70px 20px 0px;

  @media (max-width: 600px) {
    display: block;
  }
  
  &:before {
    background: #FFF;
    content: '';
    left: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    display: block;
    z-index: 1;
    border-radius: 0 70px 0 0;
    position: absolute;
  }
`;

const ShopDataItems = styled.ul`
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const DataItem = styled.li`
  display: flex;
  margin-left: 50px;

  @media (max-width: 600px) {
    display: block;
    margin-left: 30px;
  }

  @media (min-width: 960px) {
    margin-left: 30px;
    display: flex;
  }
`;

const DataItemIcon = styled(FontAwesomeIcon)`

  margin: 30px;
  height: 39px;
  width: 39px;
  font-size: 13px;
  flex-shrink: 0;
  display: flex;
  border-radius: 10px;
  color: var(--color-orange);
  background: var(--color-orange-light);
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    margin-bottom: 15px;
  }

  @media (min-width: 960px) {
    margin-bottom: 0;
  }
`;

const DataItemContent = styled.div`
  h4 {
    font-size: 14px;
    margin-bottom: 7px;
  }
  p {
    font-size: 12px;
    line-height: 135%;
  }
`;


const ShopData = () => {
  return (
    <ShopDataStyled>
        <ShopDataItems>
            <DataItem>
                <DataItemIcon icon={faTruck} />
                <DataItemContent>
                    <h4>Free Shipping</h4>
                    <p>On purchases over $199</p>
                </DataItemContent>
            </DataItem>
            <DataItem>
                <DataItemIcon icon={faPeopleArrows} />
                <DataItemContent>
                    <h4>99% Satisfied Customers</h4>
                    <p>Our clients' opinions speak for themselves</p>
                </DataItemContent>
            </DataItem>
            <DataItem>
                <DataItemIcon icon={faHandHoldingDollar} />
                <DataItemContent>
                    <h4>Originality Guaranteed</h4>
                    <p>30 days warranty for each product from our store</p>
                </DataItemContent>
            </DataItem>
            {/* More items... */}
        </ShopDataItems>
    </ShopDataStyled>
  );
};

export default ShopData;
