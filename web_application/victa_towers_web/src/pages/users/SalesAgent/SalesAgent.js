import React from 'react';
import SMSideBar from '../../../components/SalesAgent/SMSideBar/SMSideBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SMHomePage from './SMHomePage';
import SalesAgentOrders from './SalesAgentOrders';

export default function SalesAgent() {
  return (
    <div>
      <Router>
        <div className="row">
          <div className="col-2">
            <SMSideBar />
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/smhome" element={<SMHomePage />} />
            </Routes>
            <Routes>
              <Route path="/smorders" element={<SalesAgentOrders />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}
