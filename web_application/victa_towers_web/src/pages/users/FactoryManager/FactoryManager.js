import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import FMSideBar from '../../../components/FactoryManager/SideBar/FMSideBar';
import FMProductPage from '../ProductPage/FMProductPage';

function FactoryManager() {
  return (
    <Router>
      <div className="row">
        <div className="col-2">
          <FMSideBar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/fmproducts" element={<FMProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default FactoryManager;
