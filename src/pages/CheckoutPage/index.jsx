import { Link } from 'react-router-dom';
import './checkoutpage.css';


function CheckoutPage() {

    return (
        <div className='checkout-success'>
            <h2>Thank you for your purchase!</h2>
            <Link to='/'><button>Continue Shopping</button></Link>
        </div>
    );
}

export default CheckoutPage
