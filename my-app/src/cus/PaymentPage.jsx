import React from 'react';
import './PaymentPage.css';

export default function PaymentPage() {
  const totalAmount = 35000;

  const handlePayClick = (method) => {
    alert(`${method} 결제가 진행됩니다.`);
  };

  const handleSubmit = () => {
    alert('배송이 접수되었습니다.');
  };

  return (
    <div className="payment-page">
      {/* 헤더 */}
      <div className="header">
        <img src="/images/icon/login_1.png" alt="logo" className="logo" />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
      </div>

      {/* 접수 제목 */}
      <h1 className="payment-title">배송 접수</h1>

      {/* 입력 영역 */}
      <div className="payment-grid">
        {/* 왼쪽 - 의뢰인/인수인 */}
        <div className="form-box">
          <h2 className="form-title">의뢰인 정보</h2>
          <label>의뢰인* <input className="form-input" placeholder="( 예시 : 의류 )" /></label>
          <label>의뢰인 연락처* <input className="form-input" placeholder="( 예시 : 의류 )" /></label>
          <label>수령 장소* <input className="form-input" placeholder="( 예시 : 의류 )" /></label>
          <label>수령 시간 <input className="form-input" placeholder="( 예시 : 의류 )" /></label>

          <h2 className="form-title">인수인 정보</h2>
          <label>인수인* <input className="form-input" placeholder="( 예시 : 의류 )" /></label>
          <label>인수인 연락처* <input className="form-input" placeholder="( 예시 : 의류 )" /></label>
          <label>배달 장소* <input className="form-input" placeholder="( 예시 : 의류 )" /></label>
        </div>

        {/* 오른쪽 - 물품 + 결제 */}
        <div className="form-box">
          <h2 className="form-title">물품 정보</h2>
          <p className="form-warning">실버로드는 실버 근로자를 위하여 물품 5kg 한도로 접수 가능합니다.</p>
          <label>물품 종류* <input className="form-input" placeholder="( 예시 : 의류 )" /></label>
          <label>물품명* <input className="form-input" placeholder="( 예시 : 정장 )" /></label>
          <label>물품 액면가* <input className="form-input" placeholder="원 단위로 입력해주세요.( 예시 : 10,000원 )" /></label>
          <label>물품 무게* <input className="form-input" placeholder="키로그램 단위로 입력해주세요" /></label>

          {/* 결제 및 접수 영역 (form-box 내부로 이동) */}
          <div className="payment-footer-area">
            <div className="footer-text">위 주문의 총 접수 금액입니다.</div>

            <div className="payment-methods">
              <button className="pay-button" onClick={() => handlePayClick('네이버페이')}>
                <div className="pay-logo" style={{ backgroundColor: '#00DE5A' }}>
                  <img src="/images/cus/naver.svg" alt="Naver" className="naver-symbol" />
                </div>
                <span className="pay-text">네이버페이</span>
              </button>

              <button className="pay-button" onClick={() => handlePayClick('카카오페이')}>
                <div className="pay-logo" style={{ backgroundColor: '#FFEB00' }}>
                  <img src="/images/cus/kakao.svg" alt="Kakao" className="kakao-symbol" />
                </div>
                <span className="pay-text">카카오페이</span>
              </button>

              <button className="pay-button" onClick={() => handlePayClick('토스페이')}>
                <div className="pay-logo" style={{ backgroundColor: '#E6F9FF' }}>
                  <img src="/images/cus/toss.png" alt="Toss" className="toss-symbol" />
                </div>
                <span className="pay-text">토스페이</span>
              </button>
            </div>

            <div className="payment-total">
              <div className="total-label">결제 금액</div>
              <div className="total-amount">{totalAmount.toLocaleString()}원</div>
            </div>

            <button className="submit-button" onClick={handleSubmit}>접수 하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
