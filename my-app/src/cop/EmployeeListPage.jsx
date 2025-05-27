import React, { useEffect, useState } from 'react';
import './EmployeeListPage.css';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

export default function EmployeeListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/data/employeelist_data.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('데이터 불러오기 오류:', err));
  }, []);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageData = data.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  return (
    <div className="delivery-container">
      {/* 상단 로고 및 탭 */}
      <div className="header">
        <img src="/images/icon/login_1.png" alt="logo" className="logo" />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
        <div className="nav-tabs">
          <span onClick={() => navigate('/cop/deliverylist')}>배송 접수 리스트</span>
          <span onClick={() => navigate('/cop/dashboard')}>대시 보드</span>
          <span className="active-tab">직원 리스트</span>
        </div>
      </div>

      {/* 제목 */}
      <div className="page-header">
        <h2 className="page-title">직원 리스트</h2>

        <div
          className="register-button"
          onClick={() => navigate('/cop/register')}
        >
          직원 등록
        </div>
      </div>


      {/* 테이블 */}
      <div className="table-wrapper">
        <table className="delivery-table">
          <thead>
            <tr>
              <th>요청번호</th>
              <th>직원 유형</th>
              <th>이름</th>
              <th>생년월일</th>
              <th>전화번호</th>
              <th>주소</th>
              <th>계약일</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, i) => (
              <tr key={i}>
                <td>{item.request_number}</td>
                <td>{item.employee_type}</td>
                <td>{item.name}</td>
                <td>{item.birth_date}</td>
                <td>{item.phone_number}</td>
                <td>{item.address}</td>
                <td>{item.hire_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
}
