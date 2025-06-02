import axios from 'axios';

const BASE_URL = 'https://largeredjade.site';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 요청 시 access 토큰 자동 포함
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 오류 시 access 토큰 재발급 및 재요청 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh')
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem('refresh');
        const res = await axios.post(`${BASE_URL}/users/refresh/`, { refresh });

        const newAccess = res.data.access_token;
        localStorage.setItem('access', newAccess);

        // 기존 요청에 새 access 토큰 추가
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 재발급 실패 시 로그아웃 처리
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/cop/login'; // 또는 '/cus/login' 등 상황에 맞게 설정
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

