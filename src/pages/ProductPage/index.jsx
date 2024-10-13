import { useParams } from 'react-router-dom';
import { apiURL } from '../../api/apiURL';
import { useEffect, useState } from 'react';
import useStore from '../../components/Store/store.jsx';
import './productPage.css'; 

function ProductPage() {
  const { addToCart } = useStore();

  const handle = (product) => {
    const productToAdd = {
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      id: product.id,
      img: product.image.url,
      isDiscounted: product.discountedPrice !== product.price,
    };
    addToCart(productToAdd);
  };

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();

  useEffect(() => {
    async function getProduct(id) {
      try {
        const response = await fetch(apiURL + id);
        const result = await response.json();

        setProduct(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getProduct(params.id);
  }, [params.id]);

  console.log(product);
  return (
    <>
      {loading && <div>Loading products...</div>}
      {error && <div>{error}</div>}
      {product && (
        <div className='product-page-container'>
        <div className='product-page'>
          <div>
            <img src={product.image.url} alt={product.title} />
          </div>
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
            <button className='buy-button' onClick={() => handle(product)}>Add to Cart</button>
            <p>{product.description}</p>
          </div>
        </div> 
        </div>
      )}
    </>
  );
}

export default ProductPage;