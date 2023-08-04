import styled from "styled-components";
import {device} from '../styles/breacpoints';  
import Center from "./Center";
import Button from "./Button";

const SubscriptionStyled = styled.section`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const SubscribeContent = styled.div`
  padding: 35px 20px;
  background-color: #FAFAFA;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  background-position: center;
  @media ${device.phone} {
    padding: 40px 60px;
  }
  @media ${device.tabletLg} {
    padding: 80px 125px 80px 105px;
    display: flex;
    align-items: center;
  }
  &:before {
    content: '';
    width: 100%;
    left: 0;
    top: 0;
    z-index: 5;
    height: 100%;
    position: absolute;
    background-color: rgba(0,0,0, 0.4);
  }
  * {
    z-index: 10;
    position: relative;
  }
`;

const SubscribeH4 = styled.h4`
  font-size: 18px;
  color: #FFF;
  margin-bottom: 20px;
  line-height: 130%;
  margin-right: auto;
  @media ${device.phone} {
    font-size: 23px;
  }
  @media ${device.tabletLg} {
    width: 504px;
    font-size: 26px;
    margin-bottom: 0;
  }
`;

const SubscribeForm = styled.form`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const SubscribeInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 25px;
  color: #ABABAB;
  font-size: 13px;
  background-color: #FFF;
  border-radius: 30px;
  margin-right: 5px;
  margin-bottom: 5px;
  @media ${device.phone} {
    width: auto;
    height: 48px;
    padding: 0 35px;
  }
`;

const SubscribeButton = styled.button`
  margin-top: 10px;
  font-size: 11px;
  padding-top: 10px;
  padding-bottom: 10px;
  @media ${device.phone} {
    padding: 15px 25px;
    font-size: 13px;
    margin-top: 0;
  }
`;

export default function Subscribe() {
  return (
    <Center>
      <SubscriptionStyled>
        <div className="container">
          <SubscribeContent style={{backgroundImage: 'url(/images/subscribe.jpg)'}}>
            <SubscribeH4>
              Subscribe to our newsletter and receive exclusive offers every week
            </SubscribeH4>

            <SubscribeForm>
              <SubscribeInput type="email" placeholder="Email address" />
              <Button type="white4" size="l">Subscribe</Button>
            </SubscribeForm>
          </SubscribeContent>
        </div>
        </SubscriptionStyled>
    </Center>
  );
}