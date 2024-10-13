import { Link } from 'react-router-dom';
import { apiURL } from '../../api/apiURL';
import { useEffect, useState } from 'react';
import './homePage.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await fetch(apiURL);
        const result = await response.json();
        
        setProducts(result.data);
      } catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);}  
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

const productCards = filteredProducts.map((product) => (
  <div key={product.id} className='product-card'>
    <Link to={`/product/${product.id}`}>
      <img src={product.image.url} alt={product.title} />
      </Link>
      <div className='product-info'>
        <h2>{product.title}</h2>
        <p className='price'>
          {product.discountedPrice !== product.price && (
            <>
              <span>On Sale for: </span>
              <br />
            </>
          )}
          $
          {product.discountedPrice !== product.price ? (
            <>
              {product.discountedPrice}
              <br />
              save: <span className='discount'>{Math.ceil(product.price - product.discountedPrice)}$</span>
            </>
          ) : (
            product.price
          )}
        </p>
      </div>
      <Link to={`/product/${product.id}`}>
      <button>View</button>
      </Link>
  </div>
));

  return (
<div>
  {loading && <p>Loading...</p>}
  {error && <p>Error: {error}</p>}
  {products && (
    <div className='product-container'>
      <h1>List of our Products</h1>
      <input
        type='text'
        placeholder='Search products'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search-input'
      />
    </div>
  )}
  <div className='product-list'>{productCards}
  </div>
</div>
  );
};

export default Home;