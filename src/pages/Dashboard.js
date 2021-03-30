import React, { useContext } from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
// import { GithubContext } from '../context/context';
import {useGlobalContext} from '../context/context';

const Dashboard = () => {
  const data = useGlobalContext()
  return (
    <main>
      <p>{data}</p>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />
      <Repos/>
    </main>
  );
};

export default Dashboard;
