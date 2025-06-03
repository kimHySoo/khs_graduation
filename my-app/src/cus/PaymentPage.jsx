import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import './PaymentPage.css';
import { createDeliveryRequest } from '../services/api';
import axiosInstance from '../services/axiosInstance';

export default function PaymentPage() {
  const totalAmount = 35000;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    pickupLocation: '',
    pickupDetail: '',
    receiverName: '',
    receiverPhone: '',
    deliveryLocation: '',
    itemType: '',
    itemName: '',
    itemDeclaredValue: '',
    itemWeight: '',
    pickupTime: '',
    note: '',
  });

  const [openPostcodePickup, setOpenPostcodePickup] = useState(false);
  const [openPostcodeDelivery, setOpenPostcodeDelivery] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get('/api/delivery/user-info/');
        const user = res.data;

        setFormData((prev) => ({
          ...prev,
          clientName: user.name || '',
          clientPhone: user.phone || '',
        }));
      } catch (err) {
        console.error('❌ 사용자 정보 불러오기 실패:', err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayClick = (method) => {
    alert(`${method} 결제가 진행됩니다.`);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert('모든 필수 정보를 입력해 주세요.');
      return;
    }

    try {
      await createDeliveryRequest(formData);
      alert('배송이 성공적으로 접수되었습니다.');
      navigate('/cus/deliverylist');
    } catch (error) {
      console.error('배송 접수 실패:', error);
      alert('배송 접수에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCompletePickup = (data) => {
    setFormData((prev) => ({ ...prev, pickupLocation: data.address }));
    setOpenPostcodePickup(false);
  };

  const handleCompleteDelivery = (data) => {
    setFormData((prev) => ({ ...prev, deliveryLocation: data.address }));
    setOpenPostcodeDelivery(false);
  };

  const isFormValid =
    formData.clientName.trim() &&
    formData.clientPhone.trim() &&
    formData.pickupLocation.trim() &&
    formData.pickupDetail.trim() &&
    formData.receiverName.trim() &&
    formData.receiverPhone.trim() &&
    formData.deliveryLocation.trim() &&
    formData.itemType.trim() &&
    formData.itemName.trim() &&
    formData.itemDeclaredValue.trim() &&
    formData.itemWeight.trim();

  return (
    <div className="payment-page">
      <div className="header">
        <img src="/images/icon/login_1.png" alt="logo" className="logo" />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
        <div className="nav-tabs">
          <span onClick={() => navigate('/cus/deliverylist')}>내 배송 접수 리스트</span>
          <span className="active-tab" onClick={() => navigate('/cus/payment')}>배송 접수</span>
        </div>
      </div>

      <h1 className="page-title">배송 접수</h1>

      <div className="form-grid">
        <div className="form-box">
          <h2 className="section-title">의뢰인 정보</h2>
          <label>
            <span className="label-text">
              의뢰인<span className="asterisk">*</span>
            </span>
            <input name="clientName" value={formData.clientName} readOnly />
          </label>
          <label>
            <span className="label-text">
              의뢰인 연락처<span className="asterisk">*</span>
            </span>
            <input name="clientPhone" value={formData.clientPhone} readOnly />
          </label>

          {/* 수령 장소 */}
          <label>
            <span className="label-text">
              수령 장소<span className="asterisk">*</span>
            </span>
            <div className="address-search-wrapper large">
              <input
                name="pickupLocation"
                value={formData.pickupLocation}
                readOnly
              />
              <button
                type="button"
                onClick={() => setOpenPostcodePickup(true)}
              >
                주소 검색
              </button>
            </div>
            {openPostcodePickup && (
              <>
                <div
                  className="address-modal-backdrop"
                  onClick={() => setOpenPostcodePickup(false)}
                />
                <div className="react-daum-postcode-wrapper">
                  <DaumPostcode
                    onComplete={handleCompletePickup}
                    autoClose
                  />
                </div>
              </>
            )}
          </label>

          {/* 세부 장소 (수령) */}
          <label>
            <span className="label-text">
              세부 장소<span className="asterisk">*</span>
            </span>
            <input
              name="pickupDetail"
              value={formData.pickupDetail}
              onChange={handleChange}
              placeholder="예: 건물명, 동호수 등"
            />
          </label>

          <label>
            <span className="label-text">수령 시간</span>
            <input
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              placeholder="(예: 2025-06-01T14:30)"
            />
          </label>
          <label>
            <span className="label-text">유의 사항</span>
            <input name="note" value={formData.note} onChange={handleChange} />
          </label>

          <h2 className="section-title">인수인 정보</h2>
          <label>
            <span className="label-text">
              인수인<span className="asterisk">*</span>
            </span>
            <input
              name="receiverName"
              value={formData.receiverName}
              onChange={handleChange}
            />
          </label>
          <label>
            <span className="label-text">
              인수인 연락처<span className="asterisk">*</span>
            </span>
            <input
              name="receiverPhone"
              value={formData.receiverPhone}
              onChange={handleChange}
            />
          </label>
          <label>
            <span className="label-text">
              배달 장소<span className="asterisk">*</span>
            </span>
            <div className="address-search-wrapper large">
              <input
                name="deliveryLocation"
                value={formData.deliveryLocation}
                readOnly
              />
              <button
                type="button"
                onClick={() => setOpenPostcodeDelivery(true)}
              >
                주소 검색
              </button>
            </div>
            {openPostcodeDelivery && (
              <>
                <div
                  className="address-modal-backdrop"
                  onClick={() => setOpenPostcodeDelivery(false)}
                />
                <div className="react-daum-postcode-wrapper">
                  <DaumPostcode
                    onComplete={handleCompleteDelivery}
                    autoClose
                  />
                </div>
              </>
            )}
          </label>
        </div>

        <div className="form-box">
          <h2 className="section-title">물품 정보</h2>
          <p className="warning">
            실버로드는 실버 근로자를 위하여 물품 5kg 한도로 접수 가능합니다.
          </p>
          <label>
            <span className="label-text">
              물품 종류<span className="asterisk">*</span>
            </span>
            <input
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
            />
          </label>
          <label>
            <span className="label-text">
              물품명<span className="asterisk">*</span>
            </span>
            <input
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
            />
          </label>
          <label>
            <span className="label-text">
              물품 액면가<span className="asterisk">*</span>
            </span>
            <input
              name="itemDeclaredValue"
              value={formData.itemDeclaredValue}
              onChange={handleChange}
            />
          </label>
          <label>
            <span className="label-text">
              물품 무게<span className="asterisk">*</span>
            </span>
            <input
              name="itemWeight"
              value={formData.itemWeight}
              onChange={handleChange}
            />
          </label>

          <div className="payment-footer-area">
            <div className="footer-text">위 주문의 총 접수 금액입니다.</div>

            <div className="payment-methods">
              <button
                className="pay-button"
                onClick={() => handlePayClick('네이버페이')}
              >
                <div
                  className="pay-logo"
                  style={{ backgroundColor: '#00DE5A' }}
                >
                  <img src="/images/cus/naver.svg" alt="naver" />
                </div>
                네이버페이
              </button>
              <button
                className="pay-button"
                onClick={() => handlePayClick('카카오페이')}
              >
                <div
                  className="pay-logo"
                  style={{ backgroundColor: '#FFEB00' }}
                >
                  <img src="/images/cus/kakao.svg" alt="kakao" />
                </div>
                카카오페이
              </button>
              <button
                className="pay-button"
                onClick={() => handlePayClick('토스페이')}
              >
                <div
                  className="pay-logo"
                  style={{ backgroundColor: '#E6F9FF' }}
                >
                  <img src="/images/cus/toss.png" alt="toss" />
                </div>
                토스페이
              </button>
            </div>

            <div className="total-area">
              <div className="total-label">결제 금액</div>
              <div className="total-amount">
                {totalAmount.toLocaleString()}원
              </div>
            </div>

            <button
              className="submit-button"
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              접수 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
