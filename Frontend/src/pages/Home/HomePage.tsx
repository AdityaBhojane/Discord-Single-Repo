import React, { ReactNode } from 'react';
import SideBar from '../../components/Sidebar/SideBar';

interface HomePageProps {
  children: ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({children}) => {


  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <SideBar/>
     {children}
    </div>
  );
};

export default HomePage;
