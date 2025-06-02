import React, { useEffect, useState } from 'react';
import './EmployeeListPage.css';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees } from '../services/api';

const ITEMS_PER_PAGE = 10;

export default function EmployeeListPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchEmployees(page);
        setData(res.results || []);
        setTotalCount(res.count || 0);
      } catch (error) {
        console.error('직원 목록 로드 실패:', error.response?.data || error.message);
      }
    };
    loadData();
  }, [page]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="delivery-container">
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
          style={{ cursor: 'pointer' }} // 커서 모양 변경
        />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
        <div className="nav-tabs">
          <span onClick={() => navigate('/cop/deliverylist')}>배송 접수 리스트</span>
          <span onClick={() => navigate('/cop/dashboard')}>대시 보드</span>
          <span className="active-tab">직원 리스트</span>
        </div>
      </div>

      {/* 타이틀 및 버튼 */}
      <div className="page-header">
        <h2 className="page-title">직원 리스트</h2>
        <div className="register-button" onClick={() => navigate('/cop/register')}>
          직원 등록
        </div>
      </div>

      {/* 테이블 */}
      <div className="table-wrapper">
        <table className="delivery-table">
          <thead>
            <tr>
              <th>아이디</th>
              <th>직원 유형</th>
              <th>이름</th>
              <th>생년월일</th>
              <th>전화번호</th>
              <th>주소</th>
              <th>계약일</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.role}</td>
                <td>{item.name}</td>
                <td>{item.birth}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.created_date}</td>
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
