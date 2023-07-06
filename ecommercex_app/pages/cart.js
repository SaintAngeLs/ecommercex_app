import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";


const ColumnsWarapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen  and (min-width: 768px){
        grid-template-columns: 1.2fr .8fr;
    }
    gap: 50px;
    margin-top: 40px;

`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 40px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
    
`;

const ProductImageBox = styled.div`
    width: 60px;
    height: 60px;
    padding: 2px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,.1);
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        max-width: 50px;
        max-height: 50px;
    }
    @media screen  and (min-width: 768px){
        width: 100px;
        height: 100px;
        padding: 10px;
        img{
            max-width: 80px;
            max-height: 80px;
        }
    }
`;

const QuantityLabel = styled.span`
    padding: 0 15px;
    display: block;
    @media screen  and (min-width: 768px){
        display: inline-block;
        padding: 0 10px;
    }

`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;


export default function CartPage() {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPopstalCode] = useState('');
    const [streetAdress, setStreetAddress] = useState('');
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if(cartProducts.length > 0)
        {
            axios.post('/api/cart', {ids:cartProducts}).then(response => {
                setProducts(response.data);
            })
        }
        else
        {
            setProducts([]);
        }
    }, [cartProducts])
    function moreOfThisProduct(id) {
        addProduct(id);
    }
    function lessOfThisProduct(id) {
        removeProduct(id);
    }
    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, country, city, postalCode, streetAdress, cartProducts, 
        });
        if(response.data.url)
        {
            window.location = response.data.url;
        }
    }
    let total = 0;
    for (const productId of cartProducts){
        const price = products.find(product => product._id === productId)?.price || 0;
        total += price;
    }
    
    useEffect(() => {
        if (window.location.href.includes('success')) {
            clearCart();
            setSuccess(true);
        
        }
    }, [])
    
    if(success)
    {
        return(
            <>
                <Header/>
                <Center>
                    <ColumnsWarapper>
                        <Box>
                            <h1>Thanks for your order</h1>
                            <p>We will get in touch with you soon!</p>
                        </Box>
                    </ColumnsWarapper>
                </Center>
                <Footer/>
            </>
        );
    }
    return (
        <>
            <Header/>
            <Center>
                <ColumnsWarapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cartProducts?.length && (
                            <div>Your cart is empty!</div>
                        )}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                    
                                </thead>
                                <tbody>   
                                    {products.map(product => (
                                        <tr>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                   <img src={product.images[0]}/> 
                                                </ProductImageBox>
                                                
                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <Button onClick = {() => lessOfThisProduct(product._id)}>
                                                    -
                                                </Button>

                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                
                                                <Button onClick = {() => moreOfThisProduct(product._id)}>
                                                    +
                                                </Button>
                                            </td>
                                            <td>${product.price * cartProducts.filter(id => id === product._id).length}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td>Total: </td>
                                        <td>${total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                        
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>
                           
                                <Input type="text" placeholder="Name" value = {name} 
                                name = {name}
                                onChange={event => setName(event.target.value)}/>
                                <Input type="text" placeholder="Email" value = {email} 
                                name = { email}
                                onChange={event => setEmail(event.target.value)}/>
                                <Input type="text" placeholder="Country" value = {country} 
                                name = { country}
                                onChange={event => setCountry(event.target.value)}/>
                                <CityHolder>
                                    <Input type="text" placeholder="City" value = {city} 
                                    name = {city}
                                    onChange={event => setCity(event.target.value)}/>
                                    <Input type="text" placeholder="Postal Code" value = {postalCode} 
                                    name = { postalCode}
                                    onChange={event => setPopstalCode(event.target.value)}/>
                                </CityHolder>
                                <Input type="text" placeholder="Street adress" value = {streetAdress} 
                                name = { streetAdress}
                                onChange={event => setStreetAddress(event.target.value)}/>

                                <Button block black 
                                onClick={goToPayment}>
                                    Continue to payment
                                </Button>

                            
                        </Box>
                    )}
                    
                </ColumnsWarapper>
            </Center>
            <Footer/>
            
        </>
    );
};