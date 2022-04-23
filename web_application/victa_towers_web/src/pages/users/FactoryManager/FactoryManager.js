import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import FMSideBar from '../../../components/FactoryManager/SideBar/FMSideBar';
import FMProductPage from './ProductPage/FMProductPage';
import FMIssuedProductPage from './IssuedProductPage/FMIssuedProductPage';
import FMPredictionPage from './PredictionsPage/FMPredictionPage';
import FMManufactureProductPage from './ManufactureProducts/FMManufactureProducts';
import FMProductDetailsAddForm from '../../../forms/FMProductDetailsAddForm';
import FMHomePage from './FMHomePage/FMHomePage';
import FMIssueProductForm from '../../../forms/FMIssueProductForm';

function FactoryManager() {
  return (
    <Router>
      <div className="row">
        <div className="col-2">
          <FMSideBar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/fmhome" element={<FMHomePage />} />
            <Route path="/fmproducts" element={<FMProductPage />} />
            <Route
              path="/fmproducts/form"
              element={<FMProductDetailsAddForm />}
            />
            <Route path="/fmissuedproducts" element={<FMIssuedProductPage />} />
            <Route
              path="/fmissuedproducts/form"
              element={<FMIssueProductForm />}
            />

            <Route path="/fmpredictions" element={<FMPredictionPage />} />
            <Route
              path="/fmmanufactureproducts"
              element={<FMManufactureProductPage />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default FactoryManager;
