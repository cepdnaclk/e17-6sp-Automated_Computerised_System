import React from 'react';

import TopBar from '../../components/topBar/TopBar';
import FactoryManager from '../users/FactoryManager/FactoryManager';
import DistributionManager from '../users/DistributionManager/DistributionManager';

function Home() {
  return (
    <>
      <TopBar />
      <DistributionManager />
      {/* <FactoryManager /> */}
    </>
  );
}

export default Home;
