import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const LayoutWithHeader = () => {
  return (
    <>
      <Header/>
      <main className="content">
        <Outlet/>
      </main>
    </>
  );
};

export default LayoutWithHeader;
