import React, { useEffect, useState } from 'react';
import './DeliveryList.css';
import { useNavigate } from 'react-router-dom';
import { fetchDeliveryList } from '../services/api'; // API 연결 함수

const ITEMS_PER_PAGE = 10;

export default function DeliveryList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDeliveryList(page);
        setData(response.results);
      } catch (error) {
        console.error('배송 목록 로드 실패:', error);
      }
    };

    loadData();
  }, [page]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageData = data.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleRowClick = (item) => {
    navigate(`/employee/${item.id}`, { state: { item } });
  };

  return (
    <div className="delivery-container">
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
          style={{ cursor: 'pointer' }} // 커서 모양 변경
        />
        <img src="/images/icon/login_2.png" alt="company" className="company"/>
        <div className="nav-tabs">
          <span className="active-tab">배송 접수 리스트</span>
          <span onClick={() => navigate('/cop/dashboard')}>대시 보드</span>
          <span onClick={() => navigate('/cop/employeelist')}>직원 리스트</span>
        </div>
      </div>

      <h2 className="page-title">배송 접수 리스트</h2>

      <div className="table-wrapper">
        <table className="delivery-table">
          <thead>
            <tr>
              <th>요청번호</th>
              <th>의뢰인</th>
              <th>의뢰인 전화번호</th>
              <th>배달원</th>
              <th>배달원 전화번호</th>
              <th>인수인</th>
              <th>인수인 전화번호</th>
              <th>수령 시간</th>
              <th>배달 완료 시간</th>
              <th>진행 상태</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, i) => (
              <tr key={i} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                <td>{item.id}</td>
                <td>{item.requester_name}</td>
                <td>{item.requester_phone}</td>
                <td>{item.delivery_person_name || '-'}</td>
                <td>{item.delivery_person_phone || '-'}</td>
                <td>{item.recipient_name}</td>
                <td>{item.recipient_phone}</td>
                <td>{item.pickup_time ? new Date(item.pickup_time).toLocaleString() : '-'}</td>
                <td>{item.delivery_time ? new Date(item.delivery_time).toLocaleString() : '-'}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
}
