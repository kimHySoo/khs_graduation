import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Pretendard Variable', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const Page = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px;
  background: #ffffff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled.img`
  width: 50px;
  height: 51px;
  margin-right: -20px;
`;

const Company = styled.img`
  width: 195px;
  height: 60px;
  margin-left: -20px;
`;

const Title = styled.h1`
  font-size: 46px;
  font-weight: 700;
  color: #171a1c;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 48px;
`;

const Box = styled.div`
  border: 1px solid #d8dbdf;
  border-radius: 12px;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Warning = styled.p`
  color: #ea4335;
  font-size: 16px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #ffffff;
`;

const Footer = styled.div`
  margin-top: 20px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FooterText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #222;
  text-align: center;
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const PayButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #dfe7eb;
  border-radius: 10px;
  background: #ffffff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #89949b;
`;

const PayLogo = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PayIcon = styled.img`
  width: 13px;
  height: 13px;
`;

const TotalArea = styled.div`
  text-align: center;
`;

const TotalLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const TotalAmount = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #000;
`;

const Submit = styled.button`
  background: #000;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  padding: 14px 32px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background: #222;
  }
`;

export default function PaymentPage() {
  const totalAmount = 35000;

  const handlePayClick = (method) => {
    alert(`${method} 결제가 진행됩니다.`);
  };

  const handleSubmit = () => {
    alert('배송이 접수되었습니다.');
  };

  return (
    <>
      <GlobalStyle />
      <Page>
        <Header>
          <Logo src="/images/icon/login_1.png" alt="logo" />
          <Company src="/images/icon/login_2.png" alt="company" />
        </Header>

        <Title>배송 접수</Title>

        <Grid>
          {/* 왼쪽 폼 */}
          <Box>
            <SectionTitle>의뢰인 정보</SectionTitle>
            <Label>의뢰인* <Input placeholder="( 예시 : 홍길동 )" /></Label>
            <Label>의뢰인 연락처* <Input placeholder="( 예시 : 010-1234-1234 )" /></Label>
            <Label>수령 장소* <Input placeholder="( 예시 : 서울시 강남구 )" /></Label>
            <Label>수령 시간 <Input placeholder="( 예시 : 오후 2시 )" /></Label>

            <SectionTitle>인수인 정보</SectionTitle>
            <Label>인수인* <Input placeholder="( 예시 : 김철수 )" /></Label>
            <Label>인수인 연락처* <Input placeholder="( 예시 : 010-5678-5678 )" /></Label>
            <Label>배달 장소* <Input placeholder="( 예시 : 서울시 마포구 )" /></Label>
          </Box>

          {/* 오른쪽 폼 */}
          <Box>
            <SectionTitle>물품 정보</SectionTitle>
            <Warning>실버로드는 실버 근로자를 위하여 물품 5kg 한도로 접수 가능합니다.</Warning>
            <Label>물품 종류* <Input placeholder="( 예시 : 의류 )" /></Label>
            <Label>물품명* <Input placeholder="( 예시 : 정장 )" /></Label>
            <Label>물품 액면가* <Input placeholder="( 예시 : 10,000원 )" /></Label>
            <Label>물품 무게* <Input placeholder="( 예시 : 3kg )" /></Label>

            <Footer>
              <FooterText>위 주문의 총 접수 금액입니다.</FooterText>

              <PaymentMethods>
                <PayButton onClick={() => handlePayClick('네이버페이')}>
                  <PayLogo style={{ backgroundColor: '#00DE5A' }}>
                    <PayIcon src="/images/cus/naver.svg" alt="naver" />
                  </PayLogo>
                  네이버페이
                </PayButton>

                <PayButton onClick={() => handlePayClick('카카오페이')}>
                  <PayLogo style={{ backgroundColor: '#FFEB00' }}>
                    <PayIcon src="/images/cus/kakao.svg" alt="kakao" />
                  </PayLogo>
                  카카오페이
                </PayButton>

                <PayButton onClick={() => handlePayClick('토스페이')}>
                  <PayLogo style={{ backgroundColor: '#E6F9FF' }}>
                    <PayIcon src="/images/cus/toss.png" alt="toss" />
                  </PayLogo>
                  토스페이
                </PayButton>
              </PaymentMethods>

              <TotalArea>
                <TotalLabel>결제 금액</TotalLabel>
                <TotalAmount>{totalAmount.toLocaleString()}원</TotalAmount>
              </TotalArea>

              <Submit onClick={handleSubmit}>접수 하기</Submit>
            </Footer>
          </Box>
        </Grid>
      </Page>
    </>
  );
}
