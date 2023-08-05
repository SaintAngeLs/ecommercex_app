import styled from "styled-components";
import {device} from '../styles/breacpoints';  
import Center from "./Center";
import Button from "./Button";

import { useState } from "react";
import { RevealWrapper } from "next-reveal";


const SybscriptionWrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;
const SubscriptionStyled = styled.section`

    width: 80%;
    position: relative;
    background-color: #222;
    margin: auto;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column; 
    @media screen and (min-width: ${device.tablet}) {
      display: flex; 
      flex-direction: row;
  }
    
`;

const SubscribeContent = styled.div`
  padding: 35px 20px;
  background-color: #222;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  background-position: center;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${device.phone}) {
    padding: 40px 60px 40px 60px;
    
  }
  @media screen and (min-width: ${device.tablet}) {
    padding: 80px 125px 80px 105px;
    flex-direction: row;
    //justify-content: space-between;
    
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
  @media screen and (min-width: ${device.tablet}) {
    width: 504px;
    font-size: 26px;
    margin-bottom: 0;
  }
`;

const SubscribeForm = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media screen and (min-width: ${device.tablet}) {
    width: auto;
    height: 48px;
    padding: 0 10px;
    flex-direction: row; // add this
    //align-items: stretch; // add this
  }
`;

const SubscribeInput = styled.input`
  width: 80%;
  height: 40px;
  padding: 0 25px;
  color: #ABABAB;
  font-size: 13px;
  background-color: #FFF;
  border-radius: 30px;
  margin-right: 5px;
  margin-bottom: 5px;
  @media screen and (min-width: ${device.phone}) {
    width: auto;
    height: 48px;
    padding: 0 10px;
  }
`;

const SubscribeButton = styled.button`
  margin-top: 10px;
  font-size: 11px;
  padding-top: 10px;
  padding-bottom: 10px;
  @media screen and (min-width: ${device.phone}) {
    padding: 15px 25px;
    font-size: 13px;
    margin-top: 0;
  }
`;

export default function Subscribe() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); // add this line

    const handleSubmit = async (e) => {
        e.preventDefault();  // prevent page from refreshing when form is submitted
    
        // make a POST request to the /api/subscribe route
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        });
    
        if (response.ok) {
          // handle success - clear the form, show a success message, etc.
          setMessage('Subscription successful'); // update the message
          setEmail('');  // clear the form
        } else {
          // handle error - show an error message, etc.
          setMessage('Subscription failed'); // update the message
        }
    };

    return (
      <RevealWrapper delay={500}>
      <SybscriptionWrapper>
        <Center>
        <SubscriptionStyled>
           
            <SubscribeContent style={{backgroundImage: 'url(/images/subscribe.jpg)'}}>
                <SubscribeH4>
                Subscribe to our newsletter and receive exclusive offers every week
                </SubscribeH4>

                {/* Display the message */}
                <p>{message}</p>

                <SubscribeForm onSubmit={handleSubmit}>
                <SubscribeInput 
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <Button type="white" size="m">Subscribe</Button>
                </SubscribeForm>
            </SubscribeContent>
            
        </SubscriptionStyled>
        </Center>
        </SybscriptionWrapper>
        </RevealWrapper>
    );
}