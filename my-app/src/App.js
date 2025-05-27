import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginChoice from './login/LoginChoice';

import CopLoginForm from './cop/LoginForm';
import EmployeeRegisterPage from './cop/EmployeeRegisterPage';
import DeliveryList from './cop/DeliveryList';
import DeliveryDetailPage from './cop/DeliveryDetailPage';
import EmployeeListPage from './cop/EmployeeListPage';
import DeliveryDashboard from './cop/DeliveryDashboard'

import CusLoginForm from './cus/LoginForm';
import CusRegisterForm from './cus/CustomerRegisterPage';
import LandingPage from './cus/LandingPage';
import CusDeliveryList from './cus/CusDeliveryList';
import PaymentPage from './cus/PaymentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginChoice />} />
        <Route path="/cop/login" element={<CopLoginForm />} />
        <Route path="/cop/register" element={<EmployeeRegisterPage />} />
        <Route path="/cop/deliverylist" element={<DeliveryList />} />
        <Route path="/employee/:requestId" element={<DeliveryDetailPage />} />
        <Route path="/cop/detail" element={<DeliveryDetailPage />} />
        <Route path="/cop/employeelist" element={<EmployeeListPage />} />
        <Route path="/cop/dashboard" element={<DeliveryDashboard />} />
        <Route path="/cus/login" element={<CusLoginForm />} />
        <Route path="/cus/register" element={<CusRegisterForm />} />
        <Route path="/cus/landing" element={<LandingPage />} />
        <Route path="/cus/deliverylist" element={<CusDeliveryList />} />
        <Route path="/cus/payment" element={<PaymentPage />} />

      </Routes>
    </Router>
  );
}

export default App;
