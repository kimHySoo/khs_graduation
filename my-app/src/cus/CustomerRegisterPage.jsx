import React, { useState } from 'react';
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
  min-height: 1024px;
  margin: 0 auto;
  background: #ffffff;
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

const Title = styled.h2`
  position: absolute;
  top: 137px;
  left: 69px;
  font-size: 28px;
  font-weight: 700;
  color: #171a1c;
`;

const Box = styled.div`
  position: absolute;
  top: 202px;
  left: 50%;
  transform: translateX(-50%);
  width: 568px;
  background: #ffffff;
  border: 2px solid #d8dbdf;
  border-radius: 20px;
  padding: 72px 50px 100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 18px;
    font-weight: 600;
    color: #2e3338;
  }

  input {
    padding: 12px 16px;
    font-size: 18px;
    border: 1px solid #d8dbdf;
    border-radius: 10px;
    background: #ffffff;
    color: #2e3338;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;

  label {
    font-size: 16px;
    color: #2e3338;
    display: flex;
    align-items: center;
    gap: 8px;
    user-select: none;

    input[type='checkbox'] {
      width: 18px;
      height: 18px;
      accent-color: #1a1a1a;
    }
  }
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  padding: 14px 0;
  font-size: 20px;
  font-weight: 600;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #333333;
  }
`;

export default function CustomerRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birth: '',
    address: '',
    agreeAll: false,
    agreePrivacy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeAll || !formData.agreePrivacy) {
      alert('모든 약관에 동의해 주세요.');
      return;
    }
    console.log('회원가입 정보:', formData);
    alert('회원가입이 완료되었습니다.');
    navigate('/cus/login');
  };

  return (
    <>
      <GlobalStyle />
      <Page>
        <Header>
          <LogoImg src="/images/icon/login_1.png" alt="logo" />
          <LogoText src="/images/icon/login_2.png" alt="text-logo" />
        </Header>

        <Title>회원 정보 등록</Title>

        <Box>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <label>이름</label>
              <input
                type="text"
                name="name"
                placeholder="예) 홍길동"
                value={formData.name}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <label>전화번호</label>
              <input
                type="text"
                name="phone"
                placeholder="예) 010-1234-1234"
                value={formData.phone}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <label>생년월일</label>
              <input
                type="text"
                name="birth"
                placeholder="예) 2000-01-01"
                value={formData.birth}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <label>주소</label>
              <input
                type="text"
                name="address"
                placeholder="예) 경기도 용인시 모현읍 외대로 81"
                value={formData.address}
                onChange={handleChange}
              />
            </InputGroup>

            <CheckboxGroup>
              <label>
                <input
                  type="checkbox"
                  name="agreeAll"
                  checked={formData.agreeAll}
                  onChange={handleChange}
                />
                필수 약관 전체 동의
              </label>
              <label>
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                />
                개인정보 수집 · 이용 동의
              </label>
            </CheckboxGroup>

            <SubmitButton type="submit">회원가입</SubmitButton>
          </Form>
        </Box>
      </Page>
    </>
  );
}
