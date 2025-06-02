import React, { useEffect, useRef, useState } from 'react';
import './DeliveryDashboard.css';
import { useNavigate } from 'react-router-dom';
import { loadGoogleMapsApi } from '../utils/loadGoogleMaps';
import { fetchEmployeeStatuses } from '../services/api';

export default function DeliveryDashboard() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerMap = useRef(new Map());
  const employeesRef = useRef([]);

  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [locations, setLocations] = useState({}); // ✅ 직원 위치 저장
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadGoogleMapsApi().then(() => {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.5665, lng: 126.9780 },
        zoom: 13,
      });
    });

    fetchEmployeeStatuses()
      .then((res) => {
        setEmployees(res);
        employeesRef.current = res;
      })
      .catch((err) => {
        console.error('직원 상태 목록 불러오기 실패:', err);
      });

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('access_token 없음. 로그인 필요');
      return;
    }

    let socket = null;
    let reconnectTimeout = null;

    const connectWebSocket = () => {
      socket = new WebSocket(`wss://largeredjade.site/ws/admin/location/?token=${token}`);

      socket.onopen = () => {
        console.log('WebSocket 연결됨');
        socket.send(JSON.stringify({ type: 'ping' }));
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const { courier_id, latitude, longitude } = data;

          if (courier_id && latitude && longitude) {
            const position = new window.google.maps.LatLng(latitude, longitude);

            setLocations(prev => ({
              ...prev,
              [courier_id]: { lat: latitude, lng: longitude }
            }));

            const matched = employeesRef.current.find(emp => String(emp.id) === String(courier_id));
            const profileImage = matched?.profile_image;

            if (markerMap.current.has(courier_id)) {
              markerMap.current.get(courier_id).setPosition(position);
            } else {
              const marker = new window.google.maps.Marker({
                position,
                map: mapInstance.current,
                title: `기사 ID: ${courier_id}`,
                icon: profileImage
                  ? {
                      url: profileImage,
                      scaledSize: new window.google.maps.Size(40, 40),
                    }
                  : undefined,
              });
              markerMap.current.set(courier_id, marker);
            }
          }
        } catch (e) {
          console.error('⚠️ 메시지 파싱 실패:', e);
        }
      };

      socket.onclose = (event) => {
        reconnectTimeout = setTimeout(connectWebSocket, 3000);
      };

      socket.onerror = (err) => {
        console.error('WebSocket 오류:', err);
      };
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
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
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            alert('로그아웃 되었습니다.');
            navigate('/cop/login');
          }}
          style={{ cursor: 'pointer' }}
        />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
        <div className="nav-tabs">
          <span onClick={() => navigate('/cop/deliverylist')}>배송 접수 리스트</span>
          <span className="active-tab" onClick={() => navigate('/cop/dashboard')}>대시 보드</span>
          <span onClick={() => navigate('/cop/employeelist')}>직원 리스트</span>
        </div>
      </div>

      {/* 본문 */}
      <div className="dashboard-content">
        {/* 직원 리스트 */}
        <div className="employee-list">
          {paginatedEmployees.map((item, idx) => (
            <div
              className="employee-card"
              key={idx}
              onClick={() => {
                const loc = locations[item.id];
                if (loc && mapInstance.current) {
                  mapInstance.current.panTo(new window.google.maps.LatLng(loc.lat, loc.lng));
                  mapInstance.current.setZoom(15);
                } else {
                  alert('위치 정보가 아직 없습니다.');
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="profile-pic">
                {item.profile_image ? (
                  <img
                    src={item.profile_image}
                    alt="profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: '#ddd',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </div>
              <div className="employee-info">
                <p className="employee-name">{item.name} 기사님</p>
                <div className="status">
                  <span className={`dot ${item.current_status === '배달중' ? 'active' : ''}`} />
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
