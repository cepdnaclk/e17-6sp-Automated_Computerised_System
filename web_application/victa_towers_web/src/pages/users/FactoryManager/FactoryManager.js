import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import FMSideBar from '../../../components/FactoryManager/SideBar/FMSideBar';
import FMProductPage from './ProductPage/FMProductPage';
import FMIssuedProductPage from './IssuedProdutcPage/FMIssuedProductPage';
import FMPredictionPage from './PredictionsPage/FMPredictionPage';

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
            <Route path="/fmissuedproducts" element={<FMIssuedProductPage />} />
            <Route path="/fmpredictions" element={<FMPredictionPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default FactoryManager;
