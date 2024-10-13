import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Contact from './pages/ContactPage/';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<NotFound />} />{' '}
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/CheckoutPage' element={<CheckoutPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;