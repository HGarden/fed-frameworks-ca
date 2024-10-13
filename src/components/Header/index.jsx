import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import './navbar.css'
import { Link } from 'react-router-dom';
import useStore from '../Store/store.jsx';

function CartQuantity() {
  const { cart } = useStore();
  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <span className='cart-quantity'>
      {quantity > 0 ? quantity : ''}
    </span>
  );
}

function Header() {
  return (
    <header>
      <Link className='logo' to='/'>
        eCom
        </Link>
      <nav className="navbar">
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/Contact'>Contact</NavLink></li>
          <li><NavLink to='/Cart'><ShoppingCart size={32}/><CartQuantity/></NavLink></li>
          </ul>  
      </nav>
    </header>
  );
}

export default Header;