import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { googleLoginRedirect } from '../services/api';

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

const GoogleButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background-color: white;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  img {
    width: 20px;
    height: 20px;
  }
`;


const LoginForm = () => {

  const handleGoogleLogin = () => {
    googleLoginRedirect();
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo src="/images/icon/login_3.png" alt="logo" />
        <FormGroup>
          <GoogleButton onClick={handleGoogleLogin}>
            <img src="/images/icon/googlelogo.png" alt="google" />
            구글 로그인
          </GoogleButton>

        </FormGroup>
      </Container>
    </>
  );
};

export default LoginForm;
