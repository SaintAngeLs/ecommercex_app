import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const ProductsWrapper = styled.div`
    margin-top: 10rem;
`;

export default function ProductsPage({products}) {
    console.log('Products',{products})
    return(
        <>
        <Header/>
        <ProductsWrapper>
            <Center>
            <Title>All Products</Title>
            <ProductsGrid products = {products}/>
            </Center>   
        </ProductsWrapper>
        <Footer/>
        
        </>
    );
};

export async function getServerSideProps() {
    await mongooseConnect(); 
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
        props:{
            products:JSON.parse(JSON.stringify(products)),
    }
};
}