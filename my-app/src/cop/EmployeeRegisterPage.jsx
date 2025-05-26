import React from 'react';
import './EmployeeRegisterPage.css';
import { useNavigate } from 'react-router-dom';

const EmployeeRegisterPage = () => {
    const navigate = useNavigate();

    return (
    <div className="employee-register-page">
      <header className="header">
        <img src="/images/KakaoTalk_20250513_154435824-removebg-preview.png" alt="logo" className="logo" />
        <img src="/images/112e.png" alt="company" className="company" />
        <nav className="nav-tabs">
          <span>배송 접수 리스트</span>
          <span className="active">직원 리스트</span>
          <span>내 배송 접수 리스트</span>
        </nav>
      </header>

      <h2 className="form-title">직원 등록</h2>

      <div className="form-wrapper">
        <div className="upload-area">
          <div className="upload-box">
            <i className="icon-plus">+</i>
          </div>
        </div>

        <form className="register-form">
          <div className="form-group">
            <label>이름</label>
            <input type="text" placeholder="이름을 입력하세요" />
          </div>

          <div className="form-group">
            <label>전화번호</label>
            <input type="text" placeholder="010-0000-0000" />
          </div>

          <div className="form-group">
            <label>생년월일</label>
            <input type="text" placeholder="YYYY-MM-DD" />
          </div>

          <div className="form-group">
            <label>주소</label>
            <input type="text" placeholder="주소를 입력하세요" />
          </div>

          <div className="form-group">
            <label>직원 유형</label>
            <div className="radio-group">
              <label><input type="radio" name="role" value="manager" /> 관리자</label>
              <label><input type="radio" name="role" value="courier" /> 배달원</label>
            </div>
          </div>

          <button type="submit" className="submit-button">직원 등록 완료</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegisterPage;
