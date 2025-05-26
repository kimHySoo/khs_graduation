import React from 'react';
import './DeliveryDetailPage.css';

import { useNavigate } from 'react-router-dom';

const DeliveryDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="delivery-detail-page">
      {/* 상단 로고 및 내비게이션 */}
      <header className="header">
        <img src="/images/KakaoTalk_20250513_154435824-removebg-preview.png" alt="logo" className="logo" />
        <img src="/images/112e.png" alt="company" className="company" />
        <nav className="nav-tabs">
          <span className="active">배송 접수 리스트</span>
          <span>내 배송 접수 리스트</span>
          <span onClick={() => navigate('/cop/employeregister')}> 직원 리스트</span>
        </nav>
  
      </header>

      {/* 주문번호 */}
      <h2 className="order-number">주문 번호 T0161AS15</h2>

      {/* 배송 단계 아이콘 및 텍스트 */}
      <div className="delivery-steps">
        <div className="step">
          <img src="/icons/order-completed.svg" alt="주문완료" />
          <span>배달 접수</span>
        </div>
        <div className="step">
          <img src="/icons/deliveryman.svg" alt="기사 배정" />
          <span>기사 배정</span>
        </div>
        <div className="step">
          <img src="/icons/import.svg" alt="상품 인수" />
          <span>상품 인수</span>
        </div>
        <div className="step">
          <img src="/icons/walk.svg" alt="배송 출발" />
          <span>배송 출발</span>
        </div>
        <div className="step active">
          <img src="/icons/delivery-complete.svg" alt="배송 완료" />
          <span>배송 완료</span>
        </div>
      </div>

      {/* 상세 정보 카드 */}
      <div className="detail-card">
        <div className="detail-section">
          <label>수령 장소</label>
          <span>경기도 용인시 모현읍 외대로 81, 공학관 502호</span>
        </div>
        <div className="detail-section">
          <label>수령 시간</label>
          <span>2025-05-14 00:00:00</span>
        </div>
        <div className="detail-section">
          <label>물품 종류</label>
          <span>의류</span>
        </div>
        <div className="detail-section">
          <label>물품명</label>
          <span>카라티</span>
        </div>
        <div className="detail-section">
          <label>물품 무게</label>
          <span>3kg</span>
        </div>
        <div className="detail-section">
          <label>물품 액면가</label>
          <span>1만원</span>
        </div>
        <div className="detail-section">
          <label>배달 장소</label>
          <span>경기도 용인시 모현읍 외대로 81, 백년관 라운지</span>
        </div>
        <div className="detail-section">
          <label>유의사항</label>
          <span>조심히 다뤄주세요.</span>
        </div>
      </div>

      {/* 인물 정보 */}
      <div className="people-info">
        <div className="person">
          <h3>택배원</h3>
          <strong>홍 길 동</strong>
          <p>010-0000-0000</p>
        </div>
        <div className="person">
          <h3>의뢰인</h3>
          <p>이홍규</p>
          <p>010-0000-0000</p>
        </div>
        <div className="person">
          <h3>인수인</h3>
          <p>김형수</p>
          <p>010-0000-0000</p>
        </div>
      </div>

      {/* 사진 등록용 박스 */}
      <div className="upload-box">
        <div className="upload-placeholder">
          <i className="icon-plus">+</i>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailPage;
