import { primary } from "@/lib/Colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-sherif;
  font-weight: 700;
  svg {
    height: 15px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
    
  `}

  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}

  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
  `}
  
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #fff;
  `}
  
  

  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    color: #fff;
    border: 1px solid ${primary};
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    color: ${primary};
    border: 1px solid ${primary};
  `}


  ${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 15px;

    svg {
      height: 20px;
    }
  `} 

  ${props => props.size === 'm' && css`
    font-size: 1.0rem;
    padding: 10px 15px;
    

    svg {
      height: 20px;
    }
  `} 
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({children, ...restProps}) {
    return(
        <StyledButton {...restProps}>{children}</StyledButton>
    );
}
