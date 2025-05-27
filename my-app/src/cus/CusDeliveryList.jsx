import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Pretendard Variable', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  padding: 20px 40px;
  background: #fff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled.img`
  margin-right: -20px;
  width: 50px;
  height: 51px;
`;

const Company = styled.img`
  margin-left: -20px;
  width: 195px;
  height: 60px;
`;

const NavTabs = styled.div`
  margin-left: auto;

  span {
    color: #6a7581;
    cursor: pointer;
    padding: 8px 12px;

    &.active-tab {
      color: #000;
      font-weight: 700;
      border-bottom: 2px solid #000;
    }
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #171A1C;
`;

const ActionButton = styled.button`
  padding: 10px 18px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #1A1A1A;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #333;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 1400px;
  table-layout: fixed;

  th, td {
    padding: 12px;
    border: 1px solid #d8dbdf;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  th {
    background: #f8f8f8;
    font-weight: 600;
    color: #6a7581;
  }

  td {
    background: #fff;
    color: #171A1C;
  }

  tbody tr:hover {
    background-color: #f4f4f4;
  }
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 8px;
`;

const PageNumber = styled.button`
  padding: 6px 12px;
  border: none;
  background: ${props => props.active ? '#0759e6' : '#eee'};
  color: ${props => props.active ? '#fff' : '#000'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border-radius: 4px;
  cursor: pointer;
`;

const ITEMS_PER_PAGE = 10;

export default function CusDeliveryList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/data/delivery_data.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageData = data.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleRowClick = (item) => {
    navigate(`/employee/${item.requestId}`, { state: { item } });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Logo src="/images/icon/login_1.png" alt="logo" />
          <Company src="/images/icon/login_2.png" alt="company" />
          <NavTabs>
            <span className="active-tab">내 배송 접수 리스트</span>
          </NavTabs>
        </Header>

        <PageHeader>
          <PageTitle>내 배송 접수 리스트</PageTitle>
          <ActionButton onClick={() => navigate('/cus/payment')}>
            신규 의뢰
          </ActionButton>
        </PageHeader>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>요청번호</th>
                <th>의뢰인</th>
                <th>의뢰인 전화번호</th>
                <th>배달원</th>
                <th>배달원 전화번호</th>
                <th>인수인</th>
                <th>인수인 전화번호</th>
                <th>수령 시간</th>
                <th>배달 완료 시간</th>
                <th>진행 상태</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item, i) => (
                <tr
                  key={i}
                  onClick={() => handleRowClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{item.requestId}</td>
                  <td>{item.clientName}</td>
                  <td>{item.clientPhone}</td>
                  <td>{item.courierName}</td>
                  <td>{item.courierPhone}</td>
                  <td>{item.receiverName}</td>
                  <td>{item.receiverPhone}</td>
                  <td>{item.pickupTime}</td>
                  <td>{item.deliveryTime}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Pagination>
          {Array.from({ length: totalPages }, (_, idx) => (
            <PageNumber
              key={idx}
              active={page === idx + 1}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </PageNumber>
          ))}
        </Pagination>
      </Container>
    </>
  );
}
