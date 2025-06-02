// services/api.js
import axiosInstance from './axiosInstance';


// 로그인 요청
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post(`/api/user/login/`, credentials);
    const { access, refresh } = response.data;

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    return response.data;
  } catch (err) {
    console.error('로그인 실패:', err.response?.data || err.message);
    throw err;
  }
};

// 직원 등록 요청
export const registerEmployee = async (formData) => {
  try {
    const response = await axiosInstance.post(`/api/user/signup/`, formData);
    return response.data;
  } catch (err) {
    console.error('직원 등록 실패:', err.response?.data || err.message);
    throw err;
  }
};

// 직원 목록 요청
export const fetchEmployees = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/api/user/admin-list/?page=${page}`);
    return response.data;
  } catch (err) {
    console.error('직원 목록 로드 실패:', err.response?.data || err.message);
    throw err;
  }
};

// 배송 접수 목록 요청
export const fetchDeliveryList = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/api/delivery/delivery-list/?page=${page}`);
    return response.data;
  } catch (err) {
    console.error('배송 목록 로드 실패:', err.response?.data || err.message);
    throw err;
  }
};

// api.js
export const googleLoginRedirect = () => {
  window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/user/google/login/`;
};


// 직원 실시간 목록 가져오기
export const fetchEmployeeStatuses = async () => {
  try {
    const response = await axiosInstance.get('/api/user/active-courier-list/');
    return response.data;
  } catch (err) {
    console.error('직원 상태 목록 조회 실패:', err.response?.data || err.message);
    throw err;
  }
};

// 단건 배송 상세 조회
export const fetchDeliveryDetail = async (requestId) => {
  try {
    const response = await axiosInstance.get(`/api/delivery/delivery-detail/${requestId}/`);
    return response.data;
  } catch (err) {
    console.error('배송 상세 불러오기 실패:', err);
    throw err;
  }
};


export const fetchCustomerDeliveries = async () => {
  const res = await axiosInstance.get('/api/delivery/client-delivery-list/');
  return res.data.results;
};

export const fetchCusDeliveryDetail = async (requestId) => {
  try {
    const res = await axiosInstance.get(`/api/delivery/delivery-detail/${requestId}/`);
    return res.data;
  } catch (err) {
    console.error('배송 상세 불러오기 실패:', err);
    throw err;
  }
};

// 회원가입 요청 함수
export const createDeliveryRequest = async (formData) => {
  const payload = {
    pickup_location: formData.pickupLocation,
    pickup_time: new Date().toISOString(), // 또는 formData.pickupTime이 ISO 형식이면 그대로 사용
    instructions: formData.note,
    recipient: {
      name: formData.receiverName,
      phone: formData.receiverPhone,
      address: formData.deliveryLocation,
    },
    item_type: formData.itemType,
    item_name: formData.itemName,
    item_weight: parseFloat(formData.itemWeight), // 문자열이면 숫자로 변환
    item_value: parseInt(formData.itemDeclaredValue.replace(/[^0-9]/g, ''), 10), // "10,000원" → 10000
  };

  const response = await axiosInstance.post('/api/delivery/request-create/', payload);
  return response.data;
};

export const fetchUserInfo = async () => {
  const res = await axiosInstance.get('/api/delivery/request-create/');
  return res.data;
};

// 배송 취소 요청
export const cancelDeliveryRequest = async (requestId) => {
  try {
    const res = await axiosInstance.patch(`/api/delivery/client-delivery-cancel/${requestId}/`);
    return res.data;
  } catch (err) {
    console.error('배송 취소 실패:', err);
    throw err;
  }
};
