import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import {useGlobalContext} from '../context/context';

const Dashboard = () => {
  const { followers, githubUser, repos} = useGlobalContext()
  
  return (
    <main>
      {/* <Navbar></Navbar> */}
      <Search />
      <Info />
      <User />
      <Repos/>
    </main>
  );
};

export default Dashboard;
