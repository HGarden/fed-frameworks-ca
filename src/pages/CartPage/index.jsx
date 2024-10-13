import { Link } from 'react-router-dom';
import useStore from '../../components/Store/store.jsx';
import './cart.style.css'; 



export default function CartPage() { 
    const { cart, removeFromCart, clearCart } = useStore();
    

    const totalPrice = cart.reduce((acc, product) => 
        acc + (product.isDiscounted ? product.discountedPrice : product.price) * product.quantity, 0
    ).toFixed(2);


    return (
        <div className='cart-container'>
            <h2>Cart</h2>
            <div className='cart-products'>
                {cart.map((product) => (
                    <div key={product.id} className='cart-product'>
                        <div>
                            <h3>{product.title}</h3>
                            <img src={product.img} alt={product.title} />
                            <p>
                                Price: 
                                {product.isDiscounted ? (
                                    <>
                                        <span className="original-price">${product.price}</span> ${product.discountedPrice}
                                    </>
                                ) : (
                                    `$${product.price}`
                                )}
                            </p>
                            <p>Quantity: {product.quantity}</p>
                            <button onClick={() => removeFromCart(product.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='cart-total'>
                <h3>Total: ${totalPrice}</h3>
                <Link to='/checkoutPage'><button onClick={clearCart}>Purchase</button></Link>
            
                <button>Clear Cart</button>
                <Link to='/'>Continue Shopping</Link>
            </div>
        </div>
    );
}
