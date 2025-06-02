// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// 로그인 선택 화면
import LoginChoice from './login/LoginChoice';

// 고객 관련 페이지
import CusLoginForm from './cus/LoginForm';
import CusRegisterForm from './cus/CustomerRegisterPage';
import LoginSuccess from './cus/LoginSuccess'; 
import LandingPage from './cus/LandingPage';
import CusDeliveryList from './cus/CusDeliveryList';
import PaymentPage from './cus/PaymentPage';
import CusDeliveryDetailPage from './cus/CusDeliveryDetailPage';

// 기업(관리자/기사) 관련 페이지
import CopLoginForm from './cop/LoginForm';
import EmployeeRegisterPage from './cop/EmployeeRegisterPage';
import DeliveryList from './cop/DeliveryList';
import DeliveryDetailPage from './cop/DeliveryDetailPage';
import EmployeeListPage from './cop/EmployeeListPage';
import DeliveryDashboard from './cop/DeliveryDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* 비로그인 가능 경로 */}
        <Route path="/" element={<LoginChoice />} />
        <Route path="/cop/login" element={<CopLoginForm />} />
        <Route path="/cus/login" element={<CusLoginForm />} />
        <Route path="/cus/register" element={<CusRegisterForm />} />
        <Route path="/cus/success" element={<LoginSuccess />} />

        {/* 고객 로그인 필요 경로 */}
        <Route
          path="/cus/landing"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cus/deliverylist"
          element={
            <ProtectedRoute>
              <CusDeliveryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cus/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/:requestId"
          element={
            <ProtectedRoute>
              <CusDeliveryDetailPage />
            </ProtectedRoute>
          }
        />


        {/* 기업/기사 로그인 필요 경로 */}
        <Route
          path="/cop/register"
          element={
            <ProtectedRoute>
              <EmployeeRegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cop/deliverylist"
          element={
            <ProtectedRoute>
              <DeliveryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/:requestId"
          element={
            <ProtectedRoute>
              <DeliveryDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cop/detail"
          element={
            <ProtectedRoute>
              <DeliveryDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cop/employeelist"
          element={
            <ProtectedRoute>
              <EmployeeListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cop/dashboard"
          element={
            <ProtectedRoute>
              <DeliveryDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
