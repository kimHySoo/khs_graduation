import React, { useEffect, useRef } from 'react';
import './DeliveryDashboard.css';
import { loadGoogleMapsApi } from '../utils/loadGoogleMaps';
import { useNavigate } from 'react-router-dom';

export default function GoogleMapDashboard() {
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadGoogleMapsApi().then(() => {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.5665, lng: 126.9780 },
        zoom: 13,
      });
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header">
        <img src="/images/icon/login_1.png" alt="logo" className="logo" />
        <img src="/images/icon/login_2.png" alt="company" className="company"/>
        <div className="nav-tabs">
          <span onClick={() => navigate('/cop/deliverylist')}>배송 접수 리스트</span>
          <span className="active-tab" onClick={() => navigate('/cop/dashboard')}>대시 보드</span>
          <span onClick={() => navigate('/cop/employeelist')}>직원 리스트</span>
        </div>
      </div>
      <h2 className="page-title">활동중인 노예</h2>
      {/* 직원 목록 */}
      <div className="employee-list">
        <h2 className="title">활동 중인 직원</h2>
        {[...Array(6)].map((_, idx) => (
          <div className="employee-card" key={idx}>
            <div className="profile-pic" />
            <div className="employee-info">
              <p className="employee-name">이홍규 기사님</p>
              <div className="status">
                <span className={`dot ${idx % 2 === 0 ? 'active' : ''}`} />
                <span className="status-label">{idx % 2 === 0 ? '배송중' : '대기중'}</span>
              </div>
            </div>
            <div className="actions">
              <img src="/images/cop/call.svg" alt="phone" />
              <img src="/images/cop/message.svg" alt="msg" />
            </div>
          </div>
        ))}
      </div>

      {/* 지도 영역 */}
      <div className="map-wrapper">
        <div className="map-title">배송 활동 지도</div>
        <div className="map-area" ref={mapRef}></div>
      </div>
    </div>
  );
}
