import React from 'react';
import './LoginChoice.css';

const LoginChoice = () => {
  return (
    <div className="container">
      <div className="logo-group">
        <img
          src="/images/login_1.png"
          alt="logo"
          className="logo"
        />
        <img
          src="/images/login_2.png"
          alt="company"
          className="company"
        />
        <p className="slogan">경험이 만든 신뢰, 실버로드 배송</p>
      </div>

      <div className="button-group">
        <div className="login-button corporate">기업 로그인</div>
        <div className="login-button user">사용자 로그인</div>
      </div>
    </div>
  );
};

export default LoginChoice;
