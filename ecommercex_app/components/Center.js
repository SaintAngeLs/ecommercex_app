import styled from "styled-components"

const StyleDiv = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;

`;

export default function Center({children}) {
    return (
        <StyleDiv>
            {children}
        </StyleDiv>
    )
}