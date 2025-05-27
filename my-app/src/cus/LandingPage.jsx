import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Pretendard Variable', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Page = styled.div`
  position: relative;
  width: 1440px;
  height: 1040px;
  margin: 0 auto;
  background-color: #ffffff;
  overflow: hidden;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 20px;
  padding: 28px 48px 12px;
  border-bottom: 1px solid #e0e0e0;
`;

const LogoImg = styled.img`
  width: 50px;
  height: 51px;
  margin-right: -15px;
`;

const LogoText = styled.img`
  width: 250px;
  height: 60px;
  margin-left: -15px;
`;

const Title = styled.div`
  position: absolute;
  top: 182px;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  line-height: 130%;
  white-space: nowrap;
  z-index: 2;

  .gray-text {
    color: #707070;
  }

  .black-text {
    color: #1a1a1a;
  }
`;

const CTAButton = styled.button`
  position: absolute;
  top: 304px;
  left: 50%;
  transform: translateX(-50%);
  width: 252px;
  height: 57px;
  background-color: #1A1A1A;
  color: white;
  font-size: 23px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &:hover {
    background-color: #333;
  }
`;

const SloganSub = styled.div`
  position: absolute;
  top: 645px;
  left: 200px;
  font-size: 30px;
  font-weight: 700;
  color: white;
  line-height: 130%;
  text-align: left;
  z-index: 2;
`;

const Slogan = styled.div`
  position: absolute;
  top: 700px;
  right: 100px;
  font-size: 30px;
  font-weight: 700;
  color: white;
  line-height: 130%;
  text-align: right;
  z-index: 2;
`;

const ImageLayer = styled.div`
  position: absolute;
  top: 438px;
  left: 0;
  width: 1440px;
  height: 960px;
  z-index: 0;
`;

const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: -96px;
  left: 0;
  width: 1440px;
  height: 118px;
  background: linear-gradient(180deg, #FFFFFF 79.81%, rgba(255, 255, 255, 0) 100%);
  z-index: 1;
`;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Page>
        <Header>
          <LogoImg src="/images/icon/login_1.png" alt="logo" />
          <LogoText src="/images/icon/login_2.png" alt="company" />
        </Header>

        <Title>
          <span className="gray-text">경험이 만든 신뢰, </span>
          <span className="black-text">실버로드 배송</span>
        </Title>

        <CTAButton onClick={() => navigate('/cus/deliverylist')}>
          배송 의뢰하기
        </CTAButton>

        <SloganSub>일상에 가치를 더하는 배송</SloganSub>
        <Slogan>든든한 손길, 믿을 수 있는 배송</Slogan>

        <ImageLayer>
          <Overlay />
          <Background src="/images/cus/landing.png" alt="main" />
        </ImageLayer>
      </Page>
    </>
  );
}
