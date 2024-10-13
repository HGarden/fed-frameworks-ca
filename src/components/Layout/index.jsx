import { Outlet } from 'react-router-dom';
import Header from "../Header/index.jsx";
import Footer from "../Footer/index.jsx";


function Layout() {  
  return (
    <>
      <Header />
      <Outlet />     
      <Footer />
    </>
  );
}

export default Layout;