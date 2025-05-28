import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import './CustomerRegisterPage.css';

export default function CustomerRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birth: '',
    address: '',
    agreeAll: false,
    agreePrivacy: false,
  });
  const [isAddressOpen, setIsAddressOpen] = useState(false); // 주소창 열림 여부

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddressComplete = (data) => {
    setFormData((prev) => ({
      ...prev,
      address: data.address, // 도로명 주소 입력
    }));
    setIsAddressOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('모든 정보를 입력하고 약관에 동의해 주세요.');
      return;
    }
    console.log('회원가입 정보:', formData);
    alert('회원가입이 완료되었습니다.');
    navigate('/cus/login');
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.birth.trim() !== '' &&
    formData.address.trim() !== '' &&
    formData.agreeAll &&
    formData.agreePrivacy;

  return (
    <div className="register-page">
      <div className="header">
        <img src="/images/icon/login_1.png" alt="logo" className="logo" />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
        <div className="nav-tabs">
          <span className="active-tab" onClick={() => navigate('/cus/register')}>회원가입</span>
          <span onClick={() => navigate('/cus/login')}>로그인</span>
        </div>
      </div>

      <h2 className="page-title">회원 정보 등록</h2>

      <div className="register-box">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-input-group">
            <label>이름</label>
            <input
              type="text"
              name="name"
              placeholder="예) 홍길동"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <label>전화번호</label>
            <input
              type="text"
              name="phone"
              placeholder="예) 010-1234-1234"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <label>생년월일</label>
            <input
              type="text"
              name="birth"
              placeholder="예) 2000-01-01"
              value={formData.birth}
              onChange={handleChange}
            />
          </div>

          <div className="register-input-group">
            <label>주소</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                name="address"
                placeholder="예) 경기도 용인시 모현읍 외대로 81"
                value={formData.address}
                onChange={handleChange}
                readOnly
                style={{ flex: 1 }}
              />
              <button type="button" onClick={() => setIsAddressOpen(true)}>
                주소 찾기
              </button>
            </div>
            {isAddressOpen && (
              <div style={{ position: 'absolute', zIndex: 1000, marginTop: '10px' }}>
                <DaumPostcode onComplete={handleAddressComplete} />
              </div>
            )}
          </div>

          <div className="register-checkbox-group">
            <label>
              <input
                type="checkbox"
                name="agreeAll"
                checked={formData.agreeAll}
                onChange={handleChange}
              />
              필수 약관 전체 동의
            </label>
            <label>
              <input
                type="checkbox"
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={handleChange}
              />
              개인정보 수집 · 이용 동의
            </label>
          </div>

          <button
            type="submit"
            className="register-submit-button"
            disabled={!isFormValid}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
