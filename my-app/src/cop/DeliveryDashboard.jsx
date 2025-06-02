import React, { useEffect, useRef, useState } from 'react';
import './DeliveryDashboard.css';
import { loadGoogleMapsApi } from '../utils/loadGoogleMaps';
import { useNavigate } from 'react-router-dom';
import { fetchEmployeeStatuses } from '../services/api'; // 실제 API 호출

export default function DeliveryDashboard() {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    // 구글 지도 로드
    loadGoogleMapsApi().then(() => {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.5665, lng: 126.9780 },
        zoom: 13,
      });
    });

    // 직원 상태 API 호출
    fetchEmployeeStatuses()
      .then((data) => {
        console.log('✅ 백엔드 응답:', data);

        const filtered = data.filter(
          (item) =>
            item.current_status === '배달중' ||
            item.current_status === '대기중'
        );

        const sorted = [...filtered].sort((a, b) => {
          const order = { '배달중': 0, '대기중': 1 };
          return order[a.current_status] - order[b.current_status];
        });

        setEmployees(sorted);
      })
      .catch((err) => {
        alert('직원 데이터를 불러오는 데 실패했습니다.');
        console.error(err);
      });
  }, []);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedEmployees = employees.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

  return (
    <div className="dashboard-container">
      {/* 헤더 */}
      <div className="header">
        <img
          src="/images/icon/login_1.png"
          alt="logo"
          className="logo"
          onClick={() => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            alert('로그아웃 되었습니다.');
            navigate('/cop/login');
          }}
          style={{ cursor: 'pointer' }}
        />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
        <div className="nav-tabs">
          <span onClick={() => navigate('/cop/deliverylist')}>배송 접수 리스트</span>
          <span className="active-tab" onClick={() => navigate('/cop/dashboard')}>
            대시 보드
          </span>
          <span onClick={() => navigate('/cop/employeelist')}>직원 리스트</span>
        </div>
      </div>

      {/* 본문 */}
      <div className="dashboard-content">
        {/* 직원 목록 */}
        <div className="employee-list">
          {paginatedEmployees.map((item, idx) => (
            <div className="employee-card" key={idx}>
              <div className="profile-pic">
                {item.profile_image ? (
                  <img src={item.profile_image} alt="profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#ddd', borderRadius: '50%' }} />
                )}
              </div>
              <div className="employee-info">
                <p className="employee-name">{item.name} 기사님</p>
                <div className="status">
                  <span
                    className={`dot ${item.current_status === '배달중' ? 'active' : ''}`}
                  />
                  <span className="status-label">{item.current_status}</span>
                </div>
              </div>
              <div className="actions">
                <a href={`tel:${item.phone}`}>
                  <img src="/images/cop/call.svg" alt="call" />
                </a>
                <a href={`sms:${item.phone}`}>
                  <img src="/images/cop/message.svg" alt="msg" />
                </a>
              </div>
            </div>
          ))}

          {/* 페이지네이션 */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                className={page === idx + 1 ? 'page-number active' : 'page-number'}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* 지도 */}
        <div className="map-wrapper">
          <div className="map-area" ref={mapRef}></div>
        </div>
      </div>
    </div>
  );
}
