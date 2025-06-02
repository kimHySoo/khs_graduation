import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CusDeliveryList.css';
import { fetchCustomerDeliveries, cancelDeliveryRequest } from '../services/api';

const ITEMS_PER_PAGE = 10;

export default function CusDeliveryList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchCustomerDeliveries();
        const formatted = res.map(item => ({
          requestId: item.id,
          clientName: item.requester_name,
          clientPhone: item.requester_phone,
          courierName: item.delivery_person_name || '-', // null 처리
          courierPhone: item.delivery_person_phone || '-',
          receiverName: item.recipient_name,
          receiverPhone: item.recipient_phone,
          pickupTime: item.pickup_time?.slice(0, 10) || '-',
          deliveryTime: item.delivery_time?.slice(0, 10) || '-',
          status: item.status,
        }));
        setData(formatted);
      } catch (err) {
        console.error('배송 목록 불러오기 실패:', err);
        alert('배송 리스트를 불러오는 데 실패했습니다.');
      }
    };
    loadData();
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

  const handleCancel = async (requestId) => {
    const confirmed = window.confirm("정말 취소하시겠습니까?");
    if (!confirmed) return;

    try {
      await cancelDeliveryRequest(requestId);
      alert('배송 요청이 취소되었습니다.');

      // 데이터 새로고침
      const res = await fetchCustomerDeliveries();
      const formatted = res.map(item => ({
        requestId: item.id,
        clientName: item.requester_name,
        clientPhone: item.requester_phone,
        courierName: item.delivery_person_name || '-',
        courierPhone: item.delivery_person_phone || '-',
        receiverName: item.recipient_name,
        receiverPhone: item.recipient_phone,
        pickupTime: item.pickup_time?.slice(0, 10) || '-',
        deliveryTime: item.delivery_time?.slice(0, 10) || '-',
        status: item.status,
      }));
      setData(formatted);
    } catch (err) {
      alert('배송 취소에 실패했습니다.');
    }
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
                          <button
                            className="cancel-btn"
                            onClick={() => handleCancel(item.requestId)}
                          >
                            취소
                          </button>
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
