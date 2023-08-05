import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";

const CartWrapper = styled.div`
    margin-top: 10rem;
`;

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
    const {data:session} = useSession();
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPopstalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [success, setSuccess] = useState(false);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [cityError, setCityError] = useState("");
    const [postalCodeError, setPostalCodeError] = useState("");
    const [streetAddressError, setStreetAddressError] = useState("");
    const [countryError, setCountryError] = useState("");
    const [history] = useState("");
    const [shippingFee, setShippingFee] = useState(null);

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

        const confirmed = window.confirm("Are you sure you want to proceed with the checkout?");

        if (!confirmed) 
        {
            return;
        }

        if (!name || !email || !city || !postalCode || !streetAddress || !country) {
            toast.error("Please fill in all required fields.");
            return;
        }
      

        const response = await axios.post('/api/checkout', {
            name, email, country, city, postalCode, streetAddress, cartProducts, 
        });
        if(response.data.url)
        {
            window.location = response.data.url;
        }
        else 
        {
            toast.error("Checkout failed. Please try again.");
        }
    }
    let total = 0;
    for (const productId of cartProducts){
        const price = products.find(product => product._id === productId)?.price || 0;
        total += price;
    }

    async function goToCOD() {
        const confirmed = window.confirm("Are you sure you want to proceed with the checkout?");
    
        if (!confirmed) {
          return;
        }
    
        if (!name || !email || !city || !postalCode || !streetAddress || !country) {
          toast.error("Please fill in all required fields.");
          return;
        }
    
        const response = await axios.post("/api/checkout", {
          name,
          email,
          city,
          postalCode,
          streetAddress,
          country,
          cartProducts,
        });
    
        if (response.data.url) {
          window.location = response.data.url;
        } else {
          toast.error("Checkout failed. Please try again.");
        }
        const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/cart?success=1`;

        window.location.href = redirectUrl;
      }
    
    useEffect(() => {

        if (typeof window === 'undefined') 
        {
            return;
        }
        if (window.location.href.includes('success')) 
        {
            setSuccess(true);
            clearCart();
        }
        axios.get('/api/settings?name=shippingFee').then(res => {
            setShippingFee(res.data.value);
        })
    }, [])

    useEffect(() => {
        if(!session)
        {
            return;
        }
        axios.get('/api/address').then(response => {
            setName(response.data?.name);
            setEmail(response.data?.email);
            setCity(response.data?.city);
            setPopstalCode(response.data?.postalCode);
            setStreetAddress(response.data?.streetAddress);
            setCountry(response.data?.country);
        }, [session]);
    })
    
    // inputs validation
    const validateName = () => {
        if (!name) {
            setNameError("Name is required.");
            toast.error("Please enter your name.");
        } else {
            setNameError("");
        }
    };
    const validateEmail = () => {
        if (!email) {
            setEmailError("Email is required.");
            toast.error("Please enter your email.");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email format.");
            toast.error("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const validateCity = () => {
        if (!city) {
            setCityError("City is required.");
            toast.error("Please enter your city.");
        } 
    };

    const validatePostalCode = () => {
        if (!postalCode) {
            setPostalCodeError("Postal Code is required.");
            toast.error("Please enter your Postal Code.");
        } else {
            setPostalCodeError("");
        }
    };

    const validateStreetAddress = () => {
        if (!streetAddress) {
            setStreetAddressError("Address is required.");
            toast.error("Please enter your Address.");
        } else {
            setStreetAddressError("");
        }
    };

    const validateCountry = () => {
        if (!country) {
            setCountryError("Country is required.");
            toast.error("Please enter your country.");
        }
    };
    

    if(success)
    {
        return(
            <>
                <Header/>
                <CartWrapper>
                    <Center>
                        <ColumnsWarapper>
                            <Box>
                                <h1>Thanks for your order</h1>
                                <p>We will get in touch with you soon!</p>
                            </Box>
                        </ColumnsWarapper>
                    </Center>
                </CartWrapper>
                <Footer/>
            </>
        );
    }
    return (
        <>
            <Header/>
            <CartWrapper>
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
                                    <tr className="subtotal">
                                        <td colSpan={2}>Subtotal</td>
                                        <td>${total}</td>
                                    </tr>
                                    <tr className="subtotal">
                                        <td colSpan={2}>Shipping</td>
                                        <td>${shippingFee}</td>
                                    </tr>
                                    <tr className="subtotal total">
                                        <td colSpan={2}>Total (VAT Included)</td>
                                        <td>${total + parseInt(shippingFee || 0)}</td>
                                    </tr>
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
                                onChange={event => setName(event.target.value)}
                                onBlur={validateName}/>

                                <Input type="text" placeholder="Email" value = {email} 
                                name = { email}
                                onChange={event => setEmail(event.target.value)}
                                onBlur={validateEmail}/>

                                <Input type="text" placeholder="Country" value = {country} 
                                name = { country}
                                onChange={event => setCountry(event.target.value)}
                                onBlur={validateCountry}/>

                                <CityHolder>
                                    <Input type="text" placeholder="City" value = {city} 
                                    name = {city}
                                    onChange={event => setCity(event.target.value)} onBlur={validateCity}/>
                                    
                                    <Input type="text" placeholder="Postal Code" value = {postalCode} 
                                    name = { postalCode}
                                    onChange={event => setPopstalCode(event.target.value)}
                                    onBlur={validatePostalCode}/>
                                </CityHolder>

                                <Input type="text" placeholder="Street adress" value = {streetAddress} 
                                name = { streetAddress}
                                onChange={event => setStreetAddress(event.target.value)}
                                onBlur={validateStreetAddress}/>

                                {/* <Button block black 
                                onClick={goToPayment}>
                                    Continue to payment
                                </Button> */}
                                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                    <Button black block onClick={goToPayment}>
                                        Checkout with Paypal
                                    </Button>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <Button black block onClick={goToPayment}>
                                        Checkout with Gcash
                                    </Button>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <Button black block onClick={goToCOD}>
                                        Cash on Delivery
                                    </Button>
                                </div>

                            
                        </Box>
                    )}
                    
                </ColumnsWarapper>
            </Center>
            </CartWrapper>
            <ToastContainer />
            <Footer/>
            
        </>
    );
};