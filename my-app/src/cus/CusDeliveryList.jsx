  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import './CusDeliveryList.css';

  const ITEMS_PER_PAGE = 10;

  export default function CusDeliveryList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [dropdownIndex, setDropdownIndex] = useState(null);

    useEffect(() => {
      fetch('/data/delivery_data.json')
        .then(res => res.json())
        .then(setData);
    }, []);

    const start = (page - 1) * ITEMS_PER_PAGE;
    const pageData = data.slice(start, start + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    const handleRowClick = (item) => {
      navigate(`/customer/${item.requestId}`, { state: { item } });
    };

    const toggleDropdown = (index) => {
      setDropdownIndex(prev => (prev === index ? null : index));
    };

    return (
      <div className="cus-delivery-container">
        {/* Header */}
        <div className="header">
          <img src="/images/icon/login_1.png" alt="logo" className="logo" />
          <img src="/images/icon/login_2.png" alt="company" className="company" />
          <div className="nav-tabs">
            <span className="active-tab">내 배송 접수 리스트</span>
          </div>
        </div>

        {/* Title + 신규 의뢰 버튼 */}
        <div className="page-header">
          <h3 className="page-title">내 배송 접수 리스트</h3>
          <button className="action-button" onClick={() => navigate('/cus/payment')}>
            신규 의뢰
          </button>
        </div>

        {/* Table */}
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
                <tr key={i} onClick={() => handleRowClick(item)}>
                  <td>{item.requestId}</td>
                  <td>{item.clientName}</td>
                  <td>{item.clientPhone}</td>
                  <td>{item.courierName}</td>
                  <td>{item.courierPhone}</td>
                  <td>{item.receiverName}</td>
                  <td>{item.receiverPhone}</td>
                  <td>{item.pickupTime}</td>
                  <td>{item.deliveryTime}</td>
                  <td className="status-cell" onClick={(e) => e.stopPropagation()}>
                    <div className="status-wrapper">
                      <span className="status-text">{item.status}</span>
                      <div className="more-actions" onClick={() => toggleDropdown(i)}>
                        <img src="/images/cus/more.svg" alt="more" className="more-icon" />
                        {dropdownIndex === i && item.status === '배송 접수' && (
                          <div className="dropdown">
                            <button className="cancel-btn">취소</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              className={`page-number ${page === idx + 1 ? 'active' : ''}`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
