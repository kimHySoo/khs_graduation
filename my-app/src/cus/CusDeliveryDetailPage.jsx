import React, { useState, useEffect } from 'react';
import './CusDeliveryDetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCusDeliveryDetail } from '../services/api';

export default function DeliveryDetailPage() {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await fetchCusDeliveryDetail(requestId);

        const formattedItem = {
          requestId: data.requestId,
          status: data.status,
          pickupLocation: data.pickup_location,
          pickupTime: data.pickup_time,
          note: data.instructions,
          deliveryLocation: data.recipient?.address,
          receiverName: data.recipient?.name,
          receiverPhone: data.recipient?.phone,
          itemType: data.item_type,
          itemName: data.item_name,
          itemWeight: data.item_weight,
          itemDeclaredValue: data.item_value,
          clientName: data.client?.name,
          clientPhone: data.client?.phone,
          courierName: data.courier?.name,
          courierPhone: data.courier?.phone,
        };

        setItem(formattedItem);
      } catch (err) {
        console.error('❌ 배송 상세 정보 불러오기 실패:', err);
        setItem(null);
      }
    };

    getDetail();
  }, [requestId]);

  if (!item) {
    return <div className="delivery-detail-page">배송 정보를 불러오는 중입니다…</div>;
  }

  return (
    <div className="cus-delivery-detail-page">
      {/* 상단 네비게이션 */}
      <header className="header">
        <img
          src="/images/icon/login_1.png"
          alt="logo"
          className="logo"
        />
        <img
          src="/images/icon/login_2.png"
          alt="company"
          className="company"
        />
        <nav className="nav-tabs">
          <span
            className="active"
            onClick={() => navigate('/cus/deliverylist')}
          >내 배송 접수 리스트
          </span>
        </nav>
      </header>

      {/* 주문 번호 */}
      <h2 className="order-number">주문 번호 {item.requestId}</h2>

      {/* 배송 단계 아이콘 및 텍스트 */}
    <div className="delivery-steps">
        <div className={`step ${item.status === '배송 접수' ? 'active' : ''}`}>
            <img src="/icons/order-completed.svg" alt="배달 접수" />
            <span>배송 접수</span>
        </div>
        <div className="step-line" />

        <div className={`step ${item.status === '기사 배정' ? 'active' : ''}`}>
            <img src="/icons/deliveryman.svg" alt="기사 배정" />
            <span>기사 배정</span>
        </div>
        <div className="step-line" />

        <div className={`step ${item.status === '상품 인수' ? 'active' : ''}`}>
            <img src="/icons/import.svg" alt="상품 인수" />
            <span>상품 인수</span>
        </div>
        <div className="step-line" />

        <div className={`step ${item.status === '배송 출발' || item.status === '배송중' ? 'active' : ''}`}>
            <img src="/icons/walk.svg" alt="배송 출발" />
            <span>배송 출발</span>
        </div>
        <div className="step-line" />

        <div className={`step ${item.status === '배송 완료' ? 'active' : ''}`}>
            <img src="/icons/delivery-complete.svg" alt="배송 완료" />
            <span>배송 완료</span>
        </div>
        </div>


      <div className="detail-card">
        <div className="detail-left">
          <div className="info-group">
            <div className="detail-section">
              <label>수령 장소</label>
              <span>{item.pickupLocation}</span>
            </div>
            <div className="detail-section">
              <label>수령 시간</label>
              <span>{item.pickupTime}</span>
            </div>
          </div>
          <hr />

          <div className="info-group">
            <div className="detail-section">
              <label>물품 종류</label>
              <span>{item.itemType}</span>
            </div>
            <div className="detail-section">
              <label>물품명</label>
              <span>{item.itemName}</span>
            </div>
            <div className="detail-section">
              <label>물품 무게</label>
              <span>{item.itemWeight}</span>
            </div>
            <div className="detail-section">
              <label>물품 액면가</label>
              <span>{item.itemDeclaredValue}</span>
            </div>
          </div>
          <hr />

          <div className="info-group">
            <div className="detail-section">
              <label>배송 장소</label>
              <span>{item.deliveryLocation}</span>
            </div>
            <div className="detail-section">
              <label>유의사항</label>
              <span>{item.note}</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 사진 업로드 & 인물 정보 */}
        <div className="detail-right">
          <div className="upload-box">
            <div className="upload-placeholder">
              <i className="icon-plus">+</i>
            </div>
          </div>
          <div className="person-info">
            <h3>택배원</h3>
            <strong>{item.courierName}</strong>
            <p>{item.courierPhone}</p>
            <div className="sub-info">
              <div>
                <span className="label">의뢰인</span>
                <span className="value">{item.clientName}</span>
              </div>
              <div>
                <span className="label">전화번호</span>
                <span className="value">{item.clientPhone}</span>
              </div>
              <div>
                <span className="label">인수인</span>
                <span className="value">{item.receiverName}</span>
              </div>
              <div>
                <span className="label">전화번호</span>
                <span className="value">{item.receiverPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
