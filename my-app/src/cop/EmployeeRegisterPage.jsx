import React, { useState } from 'react';
import './EmployeeRegisterPage.css';
import { useNavigate } from 'react-router-dom';

export default function EmployeeRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    request_number: '',
    employee_type: '',
    name: '',
    birth_date: '',
    address: '',
    hire_date: '',
    phone_number: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData(prev => ({ ...prev, employee_type: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: reader.result
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0];
    const newFormData = {
      ...formData,
      hire_date: today
    };

    const existing = JSON.parse(localStorage.getItem('employees') || '[]');
    const updated = [...existing, newFormData];
    localStorage.setItem('employees', JSON.stringify(updated));
    alert('직원 정보가 추가되었습니다.');
    navigate('/cop/employeelist');
  };

  return (
    <div className="delivery-container">
      <div className="header">
        <img src="/images/icon/login_1.png" alt="logo" className="logo" />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
        <div className="nav-tabs">
          <span onClick={() => navigate('/cop/deliverylist')}>배송 접수 리스트</span>
          <span>내 배송 접수 리스트</span>
          <span className="active-tab">직원 리스트</span>
        </div>
      </div>

      <h2 className="form-title">직원 등록</h2>

      <div className="form-wrapper">
        <div className="upload-area">
          <label htmlFor="image-upload" className="upload-box" style={{ cursor: 'pointer' }}>
            {formData.image ? (
              <img
                src={formData.image}
                alt="preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
              />
            ) : (
              <i className="icon-plus" style={{ fontSize: '40px' }}>+</i>
            )}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이름</label>
            <input name="name" type="text" placeholder="이름" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>전화번호</label>
            <input name="phone_number" type="text" placeholder="010-0000-0000" value={formData.phone_number} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>생년월일</label>
            <input name="birth_date" type="text" placeholder="YYYY-MM-DD" value={formData.birth_date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>주소</label>
            <input name="address" type="text" placeholder="주소 입력" value={formData.address} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>직원 유형</label>
            <div className="radio-group">
              <label>
                <input type="radio" value="관리자" checked={formData.employee_type === '관리자'} onChange={handleRadioChange} />
                관리자
              </label>
              <label>
                <input type="radio" value="배달원" checked={formData.employee_type === '배달원'} onChange={handleRadioChange} />
                배달원
              </label>
            </div>
          </div>

          <button type="submit" className="register-button">직원 등록 완료</button>
        </form>
      </div>
    </div>
  );
}
