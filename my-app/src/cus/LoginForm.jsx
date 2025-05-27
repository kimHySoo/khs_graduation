import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

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

const SignupLink = styled.div`
  text-align: center;
  font-size: 16px;
  color: #888;
  cursor: pointer;
  margin-top: -10px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo src="/images/icon/login_3.png" alt="logo" />
        <FormGroup>
          <InputBox>
            <input type="text" placeholder="아이디를 입력해주세요" />
          </InputBox>
          <InputBox>
            <input type="password" placeholder="비밀번호를 입력해주세요" />
          </InputBox>
          <SubmitButton onClick={() => navigate('/cus/landing')}>
            로그인
          </SubmitButton>
          <SignupLink onClick={() => navigate('/cus/register')}>
            회원가입
          </SignupLink>
        </FormGroup>
      </Container>
    </>
  );
};

export default LoginForm;
