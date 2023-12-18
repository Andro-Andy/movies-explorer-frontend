import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ hasHeader, hasFooter, children }) => {
  return (
    <>
      {hasHeader && <Header />}
      <main className="content">
        <Outlet />
        {children}
      </main>
      {hasFooter && <Footer />}
    </>
  );
};

export default Layout;
