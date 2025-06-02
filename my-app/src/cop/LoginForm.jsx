import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { loginUser } from '../services/api'; 

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`;

const Logo = styled.img`
  display: block;
  width: 80vw;
  max-width: 300px;
  height: auto;
  margin-bottom: 25px;
`;

const FormGroup = styled.div`
  width: 100%;
  max-width: 414px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

const InputBox = styled.div`
  input {
    width: 100%;
    padding: 12px 16px;
    font-size: 25px;
    border: 1px solid #d8dbdf;
    border-radius: 10px;
    outline: none;
    box-sizing: border-box;
  }
`;

const SubmitButton = styled.div`
  width: 100%;
  height: 50px;
  background: #000;
  color: #fff;
  font-size: 25px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(formData);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      alert('로그인 성공');
      navigate('/cop/deliverylist');
    } catch (err) {
      console.error('로그인 실패:', err);
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo src="/images/icon/login_3.png" alt="logo" />
        <FormGroup>
          <InputBox>
            <input
              type="text"
              name="id"
              placeholder="아이디를 입력해주세요"
              value={formData.id}
              onChange={handleChange}
            />
          </InputBox>
          <InputBox>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={formData.password}
              onChange={handleChange}
            />
          </InputBox>
          <SubmitButton onClick={handleLogin}>
            로그인
          </SubmitButton>
        </FormGroup>
      </Container>
    </>
  );
};

export default LoginForm;
