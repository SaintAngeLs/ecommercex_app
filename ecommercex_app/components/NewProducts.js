import styled from "styled-components"
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";


const Title = styled.h2`
    font-size: 2rem;
    margin: 40px 0px 20px;
    font-weight: normal;
`;

export default function NewProducts({ products, wishedProducts }) {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid products = {products}  wishedProducts={wishedProducts} />
        </Center>
      
    );
  }
  