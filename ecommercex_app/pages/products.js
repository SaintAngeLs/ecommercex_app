import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import styled from "styled-components";
import { authOptions } from "./api/auth/[...nextauth]";

const ProductsWrapper = styled.div`
    margin-top: 10rem;
`;

export default function ProductsPage({products, wishedProducts}) {
    console.log('Products',{products})
    return(
        <>
        <Header/>
        <ProductsWrapper>
            <Center>
            <Title>All Products</Title>
            <ProductsGrid products = {products} wishedProducts={wishedProducts} />
            </Center>   
        </ProductsWrapper>
        <Footer/>
        
        </>
    );
};

export async function getServerSideProps(ctx) {
    await mongooseConnect(); 
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const wishedProducts = session?.user
        ? await WishedProduct.find({
            userEmail:session?.user.email,
            product: products.map(p => p._id.toString()),
          })
        : [];
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
            wishedProducts: wishedProducts.map(i => i.product.toString()),
    }
};
}