import Layout from '@/components/Layout'
import Link from 'next/link';





export default function Home() {

  return (
    <Layout>
      <section className="error-page">
        <div className="container">
          <h1 className="text-4xl md:text-7xl">Error 404</h1>
          <p className="leading-6 md:leading-7 text-base md:text-lg mb-8 md:mb-10">
            Woops... Looks like this page doesn't exist.
          </p>
          <Link href ={'/'} >
                Settings Go to home
            </Link>
        </div>
      </section>
    </Layout>
  );
};

