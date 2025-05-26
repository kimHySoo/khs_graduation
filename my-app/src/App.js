import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginChoice from './login/LoginChoice';

import LoginForm from './cop/LoginForm';
import EmployeeRegisterPage from './cop/EmployeeRegisterPage';
import DeliveryList from './cop/DeliveryList';
import DeliveryDetailPage from './cop/DeliveryDetailPage';
import EmployeeListPage from './cop/EmployeeListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginChoice />} />
        <Route path="/cop/login" element={<LoginForm />} />
        <Route path="/cop/register" element={<EmployeeRegisterPage />} />
        <Route path="/cop/deliverylist" element={<DeliveryList />} />
        <Route path="/cop/detail" element={<DeliveryDetailPage />} />
        <Route path="/cop/employeelist" element={<EmployeeListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
