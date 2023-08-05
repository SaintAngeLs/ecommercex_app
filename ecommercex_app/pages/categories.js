import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import styled from "styled-components";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import ProductBox from "@/components/ProductBox";
import { RevealWrapper } from "next-reveal";
import { WishedProduct } from "@/models/WishedProduct";
import Footer from "@/components/Footer";


const MaintCategoryWrapper = styled.div`
    margin-top: 8rem;
    margin-bottom: 60px;
`;
const CategoryWrapper = styled.div`
    //margin-top: 8rem;
    margin-bottom: 60px;
`;

const CategoryTitle = styled.div`
  display:flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;
  h2{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a{
    color:#555;
    display: inline-block;
  }
`;

const CategoryGridDisp = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function CategoriesPage({mainCategories, categoriesProducts, wishedProducts = []}){
    return(
        <>
            <Header/>
            <Center>
            <MaintCategoryWrapper>  
            {
                mainCategories.map( category => (
                    <CategoryWrapper>
                        <CategoryTitle>
                            <h2>{category.name}</h2>
                            <div>
                                <Link href = {'/category/' + category._id}>
                                    Show all products
                                </Link>
                            </div>
                        </CategoryTitle>
                        <CategoryGridDisp>
                        {categoriesProducts[category._id]?.length ? (
                            categoriesProducts[category._id].map((product, pIndex) => (
                            <RevealWrapper key={product._id} delay={pIndex * 50}>
                                <ProductBox {...product} wished={wishedProducts.includes(product._id)} />
                            </RevealWrapper>
                            ))
                        ) : (
                            <div>The products will be added sooner.</div>
                        )}

                        </CategoryGridDisp>
                    </CategoryWrapper>
                ))
            }
            </MaintCategoryWrapper> 
            </Center>
            <Footer/>
        </>
    );
};

export async function getServerSideProps(categoryx){
    await mongooseConnect();
    const categories = await Category.find();
    const mainCategories = categories.filter(category => !category.parent);

    const categoriesProducts = {};
    const allFethcedProdutctsIds = [];

    for(const mainCategory of mainCategories)
    {
        const mainCategoryId = mainCategory._id.toString();
        const childCategoryIds = categories.filter(category => category?.parent?.toString() === mainCategoryId).map(category => category._id.toString());
        const categoriesIds = [mainCategoryId, ...childCategoryIds];
        const products = await Product.find({category: categoriesIds}, null, {limit: 2, sort: {'_id':-1}});
        allFethcedProdutctsIds.push(...products.map(product => product._id.toString()));
        categoriesProducts[mainCategory._id] = products;
    }

    const session = await getServerSession(categoryx.req, categoryx.res, authOptions);

    const wishedProducts = session?.user ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: allFethcedProdutctsIds,
    })
    : [];

    return {
        props: {
            mainCategories: JSON.parse(JSON.stringify(mainCategories)),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
            wishedProducts: wishedProducts.map(wished => wished.product.toString()),
        },
    };
}; 