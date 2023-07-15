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

export default function Home({ featuredProduct, newProducts }) {
  return (
    <div>
      <Head>
        <title>Eccommerce</title>
      </Head>
      <Header />

      
      <PageIntro />
      
      <Featured product={featuredProduct} />
  
      {newProducts && (
        <NewProducts products={newProducts} />
      )}

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '64a853129268e294d796a570';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  console.log("featuredProduct: ", featuredProduct._id);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
