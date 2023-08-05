import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {useState, useEffect, useRef} from "react";
import Input from "../components/Input";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import Featured from "@/components/Featured";

const SearchInput = styled(Input)`
    margin-top: 10rem;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 20px 0 30px;
    font-size: 1.2rem;
`;

const CenterFlex = styled(Center)`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 10vh);
`;

const ProductsGridFlex = styled(ProductsGrid)`
    flex-grow: 1;
    overflow: auto;
`;


export default function SearchPage() {

    const [phrase, setPhrase] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(phrase.length > 0){
            axios.get("/api/products?phrase=" + encodeURIComponent(phrase)).then(res => {
                setProducts(res.data);
            });
        }
    }
    , [phrase]);
    return (
    <>
        <Header />
            <CenterFlex>
                <SearchInput 
                 autoFocus
                 value={phrase}
                 onChange={(ev) => setPhrase(ev.target.value)}    
                 placeholder="Search for products..." />
                 <ProductsGridFlex products={products} />
            </CenterFlex>

            
            <Footer/>
        </>
    )
}