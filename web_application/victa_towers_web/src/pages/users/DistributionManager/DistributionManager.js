import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DMSideBar from '../../../components/DistributionManager/Sidebar/DMSideBar';

import DMHomePage from './DMHomePage/DMHomePage';
import DMSalesAgent from './DMSalesAgent/DMSalesAgent';
import DMShops from './DMShops/DMShops';
import DMReceiveProduct from './DMReceiveProducts/DMReceiveProducts';
import DMIssueProduct from './DMIssueProduct/DMIssueProduct';
import DMSalesAgentForm from '../../../forms/DMSalesAgentForm';
import DMShopsForm from '../../../forms/DMShopsForm';
import DMReceiveProductForm from '../../../forms/DMReceiveProductForm';
import DMIssueProductForm from '../../../forms/DMIssueProductForm';

export default function DistributionManager() {
  return (
    <Router>
      <div className="row">
        <div className="col-2">
          <DMSideBar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/dmhome" element={<DMHomePage />} />
            <Route path="/dmsalesagent" element={<DMSalesAgent />} />
            <Route path="/dmsalesagent/form" element={<DMSalesAgentForm />} />
            <Route path="/dmshops" element={<DMShops />} />
            <Route path="/dmshops/form" element={<DMShopsForm />} />
            <Route path="/dmreceiveproducts" element={<DMReceiveProduct />} />
            <Route
              path="/dmreceiveproducts/form"
              element={<DMReceiveProductForm />}
            />
            <Route path="/dmissueproducts" element={<DMIssueProduct />} />
            <Route
              path="/dmissueproducts/form"
              element={<DMIssueProductForm />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
