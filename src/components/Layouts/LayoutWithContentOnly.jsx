import { Outlet } from 'react-router-dom';

const LayoutWithContentOnly = () => {
  return (
    <main className="content">
      <Outlet/>
    </main>
  );
};

export default LayoutWithContentOnly;
