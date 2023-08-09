import Button from "@/components/Button";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Googleimage from "@/components/GoogleImage";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductBox from "@/components/ProductBox";
import SingleOrder from "@/components/SingleOrder";
import Spinner from "@/components/Spinner";
import Tabs from "@/components/Tabs";
import WhiteBox from "@/components/WhiteBox";

import axios from "axios";
import {signIn, signOut, useSession} from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledAccountPage = styled.div`
    margin-top: 10rem;
`;
const ColsWrapper = styled.div`
    
    display:grid;
    grid-template-columns: 1.2fr .8fr;
    gap: 40px;
    margin: 40px 0;
    p{
        margin:5px;
    }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;


export default function AccountPage(){
    const {data:session} = useSession();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const [addressLoaded,setAddressLoaded] = useState(true);
    const [wishlistLoaded,setWishlistLoaded] = useState(true);
    const [orderLoaded,setOrderLoaded] = useState(true);
    const [wishedProducts,setWishedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('Orders');
    const [orders, setOrders] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Added state for tracking editing mode
    
   

    async function logout() {
        await signOut({
        callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }
    async function login() {
        await signIn('google');
    }
    function saveAddress() {
        const data = {name,email,city,streetAddress,postalCode,country};
        axios.put('/api/address', data);
        setIsEditing(false); // Disable editing mode after saving
    }
    useEffect(() => {
        if (!session) {
        return;  
        }
        setAddressLoaded(false);
        setWishlistLoaded(false);
        setOrderLoaded(false);
        axios.get('/api/address').then(response => {
        setName(response?.data?.name);
        setEmail(response.data?.email);
        setCity(response.data?.city);
        setPostalCode(response.data?.postalCode);
        setStreetAddress(response.data?.streetAddress);
        setCountry(response.data?.country);
        setAddressLoaded(true);

                // Check if all account details are filled up
                const isAccountDetailsFilled =
                name !== '' &&
                email !== '' &&
                city !== '' &&
                postalCode !== '' &&
                streetAddress !== '' &&
                country !== '';
                // Update editing mode based on account details filled status
                setIsEditing(!isAccountDetailsFilled);
        });
        axios.get('/api/wishlist').then(response => {
        setWishedProducts(response.data.map(wp => wp.product));
        setWishlistLoaded(true);
        });
        axios.get('/api/orders').then(response => {
        setOrders(response.data);
        setOrderLoaded(true);
        });

    }, [session]);
    function productRemovedFromWishlist(idToRemove) {
        setWishedProducts(products => {
        return [...products.filter(p => p._id.toString() !== idToRemove)];
        });
    }
    return (
        <>
        <Header/>
        <StyledAccountPage>
        <Center>
            <ColsWrapper>
            <div>
                <RevealWrapper delay={0}>
                <WhiteBox>
                    <Tabs
                    tabs={['Orders','Wishlist']}
                    active={activeTab}
                    onChange={setActiveTab}
                    />
                    {activeTab === 'Orders' && (
                    <>
                        {!orderLoaded && (
                        <Spinner fullWidth={true} />
                        )}
                        {orderLoaded && (
                        <div>
                            {orders.length === 0 && (
                            <p>Login to see your orders</p>
                            )}
                            {orders.length > 0 && orders.map(o => (
                            <SingleOrder {...o} />
                            ))}
                        </div>
                        )}
                    </>
                    )}
                    {activeTab === 'Wishlist' && (
                    <>
                        {!wishlistLoaded && (
                        <Spinner fullWidth={true} />
                        )}
                        {wishlistLoaded && (
                        <>
                            <WishedProductsGrid>
                            {wishedProducts.length > 0 && wishedProducts.map(wp => (
                                <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                            ))}
                            </WishedProductsGrid>
                            {wishedProducts.length === 0 && (
                            <>
                                {session && (
                                <p>Your wishlist is empty</p>
                                )}
                                {!session && (
                                <p>Login to add products to your wishlist</p>
                                )}
                            </>
                            )}
                        </>
                        )}
                    </>
                    )}
                </WhiteBox>
                </RevealWrapper>
            </div>
            <div>
                <RevealWrapper delay={100}>
                <WhiteBox>
                <Googleimage session={session} />
                    <h2>{session ? 'Account details' : 'Login'}</h2>
                    {!addressLoaded && (
                    <Spinner fullWidth={true} />
                    )}
                    {addressLoaded && session && (
                    <>
                        <Input type="text"
                            placeholder="Name"
                            value={name}
                            name="name"
                            onChange={ev => setName(ev.target.value)} />
                        <Input type="text"
                            placeholder="Email"
                            value={email}
                            name="email"
                            onChange={ev => setEmail(ev.target.value)}/>
                        <Input type="text"
                            placeholder="Country"
                            value={country}
                            name="country"
                            onChange={ev => setCountry(ev.target.value)}/>
                        <CityHolder>
                        <Input type="text"
                                placeholder="City"
                                value={city}
                                name="city"
                                onChange={ev => setCity(ev.target.value)}/>
                        <Input type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                name="postalCode"
                                onChange={ev => setPostalCode(ev.target.value)}/>
                        </CityHolder>
                        <Input type="text"
                            placeholder="Street Address"
                            value={streetAddress}
                            name="streetAddress"
                            onChange={ev => setStreetAddress(ev.target.value)}/>
                        

                    
                                            
                                            <Button black block
                                onClick={saveAddress}>
                {isEditing ? 'Save' : 'Edit'} {/* Change button text based on editing mode */}
                        </Button>
                        <hr/>
                    </>
                    )}
                    {session && (
                    <Button primary onClick={logout}>Logout</Button>
                    )}
                    {!session && (
                    <Button primary onClick={login}>Login with Google</Button>
                    )}
                </WhiteBox>
                </RevealWrapper>
            </div>
            </ColsWrapper>
        </Center>
        </StyledAccountPage>
        <Footer/>
        </>
    );
};