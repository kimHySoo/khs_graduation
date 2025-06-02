//쿠키 기반 인증에 적합한 useraxiosInstance.js
import axios from 'axios';

const BASE_URL = 'https://largeredjade.site';
const useraxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //쿠키 자동 포함
});

//설정 확인 로그 (밖에서 찍기)
console.log('[axios] withCredentials:', useraxiosInstance.defaults.withCredentials); // true


//Authorization 헤더 직접 설정 안 함
//localStorage 접근 안 함

useraxiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

//access_token 만료 시 refresh 요청
useraxiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${BASE_URL}/api/user/refresh/`, {}, {
          withCredentials: true,
        });

        return useraxiosInstance(originalRequest); // 다시 시도
      } catch (e) {
        window.location.href = '/cus/login';
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

export default useraxiosInstance;
