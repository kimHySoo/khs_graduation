import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEmployee } from '../services/api';
import './EmployeeRegisterPage.css';

export default function EmployeeRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    name: '',
    phone: '',
    role: '',
    birth: '',
    address: '',
    profile_image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profile_image: file
      }));
      setImagePreview(URL.createObjectURL(file)); // 미리보기용 URL 생성
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("id", formData.id);
      form.append("password", formData.password);
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("role", formData.role);
      form.append("birth", formData.birth);
      form.append("address", formData.address);
      form.append("profile_image", formData.profile_image);

      await registerEmployee(form);
      alert('직원 등록 완료!');
      navigate('/cop/employeelist');
    } catch (err) {
      alert('직원 등록 실패!');
      console.error('에러 응답:', err.response?.data);
    }
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
        <img src="/images/icon/login_2.png" alt="company" className="company" />
        <div className="nav-tabs">
          <span onClick={() => navigate('/cop/deliverylist')}>배송 접수 리스트</span>
          <span onClick={() => navigate('/cop/dashboard')}>대시 보드</span>
          <span className="active-tab">직원 리스트</span>
        </div>
      </div>

      <h2 className="form-title">직원 등록</h2>

      <div className="form-wrapper">
        <div className="upload-area">
          <label htmlFor="image-upload" className="upload-box" style={{ cursor: 'pointer' }}>
            {imagePreview ? (
              <img
                src={imagePreview}
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
            <label>아이디</label>
            <input name="id" type="text" value={formData.id} onChange={handleChange} placeholder="아이디" />
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="비밀번호" />
          </div>

          <div className="form-group">
            <label>이름</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="이름" />
          </div>

          <div className="form-group">
            <label>전화번호</label>
            <input name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="010-0000-0000" />
          </div>

          <div className="form-group">
            <label>생년월일</label>
            <input name="birth" type="text" value={formData.birth} onChange={handleChange} placeholder="YYYY-MM-DD" />
          </div>

          <div className="form-group">
            <label>주소</label>
            <input name="address" type="text" value={formData.address} onChange={handleChange} placeholder="주소 입력" />
          </div>

          <div className="form-group role-group">
            <label>직원 유형</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="관리자"
                  checked={formData.role === '관리자'}
                  onChange={handleChange}
                />
                관리자
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="배달원"
                  checked={formData.role === '배달원'}
                  onChange={handleChange}
                />
                배달원
              </label>
            </div>
          </div>

          <button type="submit" className="cor-register-button">직원 등록 완료</button>
        </form>
      </div>
    </div>
  );
}
