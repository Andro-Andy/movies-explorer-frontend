import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const LayoutWithHeaderAndFooter = () => {

  return (
    <>
      <Header/>
      <main className="content">
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default LayoutWithHeaderAndFooter;
