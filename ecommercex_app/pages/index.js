import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'
import Featured from '@/components/Featured'
import { Product } from '@/models/Product'
import { mongooseConnect } from '@/lib/mongoose'
import NewProducts from '@/components/NewProducts'
import Footer from '@/components/Footer'
import PageIntro from '@/components/pageIntro'

const inter = Inter({ subsets: ['latin'] })

export default function Home({featuredProduct, newProducts}) {
  console.log({newProducts})
  return (
    <div>
      <Header/>
      <PageIntro/>
      <Featured product = {featuredProduct}/>
      <NewProducts products = {newProducts}/>
      <Footer/>
    </div>
  );
}

// avoid "error selrializing from getServerSideProps()

export async function getServerSideProps() {
  const featuredProductId = '647b72fbf76d05b05ac76bac';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 10})
  return{
    // JSON.pase => having the product as an object
    props: {
      featuredProduct:JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),

    },
  };
}
