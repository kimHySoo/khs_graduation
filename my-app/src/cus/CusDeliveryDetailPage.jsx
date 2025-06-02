import React, { useState, useEffect } from 'react';
import './CusDeliveryDetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCusDeliveryDetail } from '../services/api';

export default function DeliveryDetailPage() {
  console.log("✅ CusDeliveryDetailPage 렌더링됨");

  const navigate = useNavigate();
  const { requestId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await fetchCusDeliveryDetail(requestId);

        const formattedItem = {
          id: data.id,
          status: data.status,
          pickup_location: data.pickup_location,
          pickup_time: data.pickup_time,
          item_type: data.item_type,
          item_name: data.item_name,
          item_weight: data.item_weight,
          item_value: data.item_value,
          address: data.address,
          instructions: data.instructions,
          requester_name: data.requester_name,
          requester_phone: data.requester_phone,
          recipient_name: data.recipient_name,
          recipient_phone: data.recipient_phone,
          delivery_person_name: data.delivery_person_name,
          delivery_person_phone: data.delivery_person_phone,
          delivery_peroson_profile_image: data.delivery_peroson_profile_image,
          photos: data.photos || { pickup: [], delivery: [] },
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
      {/* 상단 네비 */}
      <header className="header">
        <img src="/images/icon/login_1.png" alt="logo" className="logo" />
        <img src="/images/icon/login_2.png" alt="company" className="company" />
        <nav className="nav-tabs">
          <span className="active" onClick={() => navigate('/cus/deliverylist')}>
            내 배송 접수 리스트
          </span>
        </nav>
      </header>

      <h2 className="order-number">주문 번호 {item.id}</h2>

      <div className="delivery-steps">
        {['배송 접수', '기사 배정', '상품 인수', '배송 출발', '배송 완료'].map((step, index) => (
          <React.Fragment key={step}>
            <div
              className={`step ${
                item.status === step || (step === '배송 출발' && item.status === '배송중') ? 'active' : ''
              }`}
            >
              <img
                src={`/icons/${['order-completed', 'deliveryman', 'import', 'walk', 'delivery-complete'][index]}.svg`}
                alt={step}
              />
              <span>{step}</span>
            </div>
            {index < 4 && <div className="step-line" />}
          </React.Fragment>
        ))}
      </div>

      <div className="detail-card">
        <div className="detail-left">
          <div className="info-group">
            <div className="detail-section">
              <label>수령 장소</label>
              <span>{item.pickup_location}</span>
            </div>
            <div className="detail-section">
              <label>수령 시간</label>
              <span>{item.pickup_time}</span>
            </div>
          </div>
          <hr />
          <div className="info-group">
            <div className="detail-section">
              <label>물품 종류</label>
              <span>{item.item_type}</span>
            </div>
            <div className="detail-section">
              <label>물품명</label>
              <span>{item.item_name}</span>
            </div>
            <div className="detail-section">
              <label>물품 무게</label>
              <span>{item.item_weight}g</span>
            </div>
            <div className="detail-section">
              <label>물품 액면가</label>
              <span>{item.item_value.toLocaleString()}원</span>
            </div>
          </div>
          <hr />
          <div className="info-group">
            <div className="detail-section">
              <label>배송 장소</label>
              <span>{item.address}</span>
            </div>
            <div className="detail-section">
              <label>유의사항</label>
              <span>{item.instructions}</span>
            </div>
          </div>
          <hr />
          <div className="info-group">
            <div className="detail-section">
              <label className="pickup-photo-label">수령 완료 이미지</label>
              <span>
                {item.photos?.pickup?.length > 0 ? (
                  <a
                    href={`https://largeredjade.site${item.photos.pickup[0].photo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    사진 보기
                  </a>
                ) : (
                  '없음'
                )}
              </span>
            </div>
          </div>
          <div style={{ height: '24px' }}></div>
          <div className="info-group">
            <div className="detail-section">
              <label className="delivery-photo-label">배송 완료 이미지</label>
              <span>
                {item.photos?.delivery?.length > 0 ? (
                  <a
                    href={`https://largeredjade.site${item.photos.delivery[0].photo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    사진 보기
                  </a>
                ) : (
                  '없음'
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-right">
          <div className="upload-box">
            {item.delivery_peroson_profile_image ? (
              <img
                src={`https://largeredjade.site${item.delivery_peroson_profile_image}`}
                alt="택배원 프로필"
                className="courier-profile-image"
              />
            ) : (
              <div className="upload-placeholder">
                <i className="icon-plus">+</i>
              </div>
            )}
          </div>

          <div className="person-info">
            <h3>택배원</h3>
            <strong>{item.delivery_person_name || '미배정'}</strong>
            <p>{item.delivery_person_phone || '-'}</p>
            <div className="sub-info">
              <div><span className="label">의뢰인</span><span className="value">{item.requester_name}</span></div>
              <div><span className="label">전화번호</span><span className="value">{item.requester_phone}</span></div>
              <div><span className="label">인수인</span><span className="value">{item.recipient_name}</span></div>
              <div><span className="label">전화번호</span><span className="value">{item.recipient_phone}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
