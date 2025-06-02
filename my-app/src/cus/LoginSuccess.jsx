import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

function parseQuery(queryString) {
  const params = new URLSearchParams(queryString);
  return {
    access_token: params.get("access_token"),
    refresh_token: params.get("refresh_token"),
    message: params.get("message"),
  };
}

export default function LoginSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLogin = async () => {
      const { access_token, refresh_token } = parseQuery(location.search);

      if (!access_token) {
        alert("로그인 실패: access_token 없음");
        navigate('/cus/login');
        return;
      }

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      try {
        const res = await axiosInstance.get('/api/delivery/user-info/');
        const userInfo = res.data;

        if (!userInfo.address) {
          navigate('/cus/register');
        } else {
          navigate('/cus/landing');
        }
      } catch (err) {
        console.error('로그인 확인 실패:', err);
        navigate('/cus/login');
      }
    };

    handleLogin();
  }, [location, navigate]);

  return null;
}
