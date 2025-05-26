import React from 'react';
import './LoginChoice.css';
import { useNavigate } from 'react-router-dom';

const LoginChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="logo-group">
        <img
          src="/images/icon/login_3.png"
          alt="logo"
          className="logo"
        />
        <p className="slogan">경험이 만든 신뢰, 실버로드 배송</p>
      </div>

      <div className="button-group">
        <div
          className="login-button corporate"
          onClick={() => navigate('/cop/login')}
        >기업 로그인</div>
        <div className="login-button user"
          onClick={() => navigate('/cus/login')}
        >사용자 로그인</div>
      </div>
    </div>
  );
};

export default LoginChoice;
