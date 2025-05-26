import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

export default function LandingPage() {
  const navigate = useNavigate(); // ✅ 추가

  return (
    <div className="landing-page">
      <div className="register-header">
        <img src="/images/icon/login_1.png" alt="logo" className="register-logo-img" />
        <img src="/images/icon/login_2.png" alt="company" className="register-logo-text" />
      </div>

      <div className="landing-title">
        <span className="gray-text">경험이 만든 신뢰, </span>
        <span className="black-text">실버로드 배송</span>
      </div>

      {/* ✅ 클릭 시 페이지 이동 */}
      <button className="landing-button" onClick={() => navigate('/cus/deliverylist')}>
        배송 의뢰하기
      </button>

      <div className="landing-slogan">든든한 손길, 믿을 수 있는 배송</div>
      <div className="landing-slogan-sub">일상에 가치를 더하는 배송</div>

      <div className="landing-image-layer">
        <div className="landing-overlay"></div>
        <img src="/images/cus/landing.png" alt="main" className="landing-background" />
      </div>
    </div>
  );
}
