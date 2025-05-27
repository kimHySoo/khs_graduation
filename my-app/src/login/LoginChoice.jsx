import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LogoGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  display: block;
  width: 80vw;
  max-width: 300px;
  height: auto;
  margin-bottom: -25px;
`;

const Slogan = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 130%;
  color: #000000;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const LoginButton = styled.button`
  width: 280px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  border-radius: 20px;
  cursor: pointer;
  user-select: none;

  &.corporate {
    background: #000000;
    color: #FFFFFF;
    border: none;
  }

  &.user {
    background: #FFFFFF;
    color: #000000;
    border: 1px solid #D9D9D9;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
  }
`;

export default function LoginChoice() {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Container>
        <LogoGroup>
          <Logo src="/images/icon/login_3.png" alt="logo" />
          <Slogan>경험이 만든 신뢰, 실버로드 배송</Slogan>
        </LogoGroup>

        <ButtonGroup>
          <LoginButton className="corporate" onClick={() => navigate('/cop/login')}>
            기업 로그인
          </LoginButton>
          <LoginButton className="user" onClick={() => navigate('/cus/login')}>
            사용자 로그인
          </LoginButton>
        </ButtonGroup>
      </Container>
    </>
  );
}
