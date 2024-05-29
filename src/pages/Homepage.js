import React from 'react'
import { makeStyles } from '@material-ui/core';
import Banner from '../components/Banner/Banner';
import CoinsTable from '../components/CoinsTable';


const Homepage = () => {
  return (
   <div>
     <Banner />  
     <CoinsTable />
   </div>
  )
}

export default Homepage;
