import Link from "next/link"
import { ButtonStyle } from "./Button";
import styled from "styled-components";

const StyledLink = styled(Link)`
    ${ButtonStyle}
`;
// do not destructure the object as it may caouse probelems according 
// to finding the original props like href 
export default function ButtonLink(props) {
    return(
        <StyledLink {...props}/>
    );
};