import React from 'react';

import TopBar from '../../components/topBar/TopBar';
import FactoryManager from '../users/FactoryManager/FactoryManager';
import DistributionManager from '../users/DistributionManager/DistributionManager';
import SalesAgent from '../users/SalesAgent/SalesAgent';

function Home() {
  return (
    <>
      <TopBar />
      { <SalesAgent /> }
      {/* <DistributionManager /> */}
      {/* <FactoryManager /> */}
    </>
  );
}

export default Home;
