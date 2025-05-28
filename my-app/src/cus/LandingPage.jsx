// LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="header">
        <img src="/images/icon/login_1.png" alt="logo" className="logo" />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
      </div>

      <div className="title">
        <span className="gray-text">경험이 만든 신뢰, </span>
        <span className="black-text">실버로드 배송</span>
      </div>

      <button className="cta-button" onClick={() => navigate('/cus/deliverylist')}>
        배송 의뢰하기
      </button>

      <div className="slogan-sub">일상에 가치를 더하는 배송</div>
      <div className="slogan">든든한 손길, 믿을 수 있는 배송</div>

      <div className="image-layer">
        <div className="overlay" />
        <img className="background" src="/images/cus/landing.png" alt="main" />
      </div>
    </div>
  );
}
