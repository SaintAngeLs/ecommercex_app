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
import { WishedProduct } from '@/models/WishedProduct'
import { authOptions } from './api/auth/[...nextauth]'
import { Setting } from '@/models/Setting'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ featuredProduct, newProducts, wishedNewProducts }) {
  return (
    <div>
      <Head>
        <title>Eccommerce</title>
      </Head>
      <Header />

      
      <PageIntro />
      
      <Featured product={featuredProduct} />
  
      {newProducts && (
        <NewProducts products={newProducts} wishedProducts={wishedNewProducts}/>
      )}

      <Footer />
    </div>
  );
}

export async function getServerSideProps(categoryx) {
  const featuredProductId = '64a853129268e294d796a570';
  await mongooseConnect();
  
  // const featuredProductSetting = await Setting.findOne({name:'64a853129268e294d796a570'});
  // const featuredProductId = featuredProductSetting.value;
  const featuredProduct = await Product.findById(featuredProductId);
  console.log("featuredProduct: ", featuredProduct._id);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  
  const session = await getServerSession(categoryx.req, categoryx.res, authOptions);
  const wishedNewProducts = session?.user
  ? await WishedProduct.find({
      userEmail:session.user.email,
      product: newProducts.map(p => p._id.toString()),
    })
  : [];

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
    },
  };
}
