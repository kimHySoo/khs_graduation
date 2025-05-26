import React from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <div className="login-form-container">
      <img
        src="/images/icon/login_3.png"
        alt="logo"
        className="logo"
      />

      <div className="form-group">
        <div className="input-box">
          <input type="text" placeholder="아이디를 입력해주세요" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="비밀번호를 입력해주세요" />
        </div>

        <div
          className="submit-button"
          onClick={() => navigate('/cus/landing')}
        >
          로그인
        </div>

        <div
          className="signup-link"
          onClick={() => navigate('/cus/register')}
        >
          회원가입
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
