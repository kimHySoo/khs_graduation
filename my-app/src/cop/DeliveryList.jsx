import React, { useEffect, useState } from 'react';
import './DeliveryList.css';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

export default function DeliveryList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/data/delivery_data.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageData = data.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleRowClick = (item) => {
    navigate(`/employee/${item.requestId}`, { state: { item } });
  };

  return (
    <div className="delivery-container">
      {/* --- 상단 로고 + 탭 --- */}
      <div className="header">
        <img src="/images/icon/login_1.png" alt="logo" className="logo" />
        <img src="/images/icon/login_2.png" alt="company" className="company"/>
        <div className="nav-tabs">
          <span className="active-tab">배송 접수 리스트</span>
          <span onClick={() => navigate('/cop/dashboard')}>대시 보드</span>
          <span onClick={() => navigate('/cop/employeelist')}>직원 리스트</span>
        </div>
      </div>

      {/* --- 페이지 제목 --- */}
      <h2 className="page-title">배송 접수 리스트</h2>

      {/* --- 테이블 --- */}
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
              <tr
                key={i}
                onClick={() => handleRowClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <td>{item.requestId}</td>
                <td>{item.clientName}</td>
                <td>{item.clientPhone}</td>
                <td>{item.courierName}</td>
                <td>{item.courierPhone}</td>
                <td>{item.receiverName}</td>
                <td>{item.receiverPhone}</td>
                <td>{item.pickupTime}</td>
                <td>{item.deliveryTime}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- 페이지네이션 --- */}
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
