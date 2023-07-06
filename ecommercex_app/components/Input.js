import styled from "styled-components";

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;

`;

export default function Input(props) {
    return <StyledInput {...props}/>
}