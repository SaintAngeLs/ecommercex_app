import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {useState, useEffect, useRef} from "react";
import Input from "../components/Input";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";

const SearchInput = styled(Input)`
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 20px 0 30px;
    font-size: 1.2rem;
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
            <Center>
                <SearchInput 
                 autoFocus
                 value={phrase}
                 onChange={(ev) => setPhrase(ev.target.value)}    
                 placeholder="Search for products..." />
                 <ProductsGrid products={products} />
            </Center>
        </>
    )
}