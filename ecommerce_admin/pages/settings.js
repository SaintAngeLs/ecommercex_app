import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import {withSwal} from "react-sweetalert2";
import HomeHeader from "@/components/HomeHeader";

function SettingsPage({swal}) {
  const [products, setProducts] = useState([]);
  const [featuredProductId, setFeaturedProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchAll() {
     
    await axios.get('/api/products').then(res => {
      setProducts(res.data);
    });
    //start uncomment this 2 function to add products
    await axios.get('/api/settings?name=featuredProductId').then(res => {
      setFeaturedProductId(res.data?.value);
    });
    await axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data?.value);
    });
    //end uncomment this 2 function to add first products
    
  }

  async function saveSettings() {
    setIsLoading(true);
    await axios.put('/api/settings', {
      name: 'featuredProductId',
      value: featuredProductId,
    });
    await axios.put('/api/settings', {
      name: 'shippingFee',
      value: shippingFee,
    });
    setIsLoading(false);
    await swal.fire({
      title: 'Settings saved!',
      icon: 'success',
    });
  }

  return (
    <Layout>
      <HomeHeader />
      <div className="mt-5">
        <h1>Settings</h1>
        {isLoading && (
          <Spinner />
        )}
        {!isLoading && (
          <>
            <label className="font-semibold">Featured product</label>
            <select value={featuredProductId} onChange={ev => setFeaturedProductId(ev.target.value)}>
              {products.length > 0 && products.map(product => (
                <option value={product._id}>{product.title}</option>
              ))}
            </select>
            <label className="font-semibold">Shipping price (in USD)</label>
            <input type="number"
                  value={shippingFee}
                  onChange={ev => setShippingFee(ev.target.value)}
            />
            <div>
              <button onClick={saveSettings} className="btn-primary">Save settings</button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default withSwal(({swal}) => (
  <SettingsPage swal={swal} />
));