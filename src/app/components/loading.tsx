"use client";

import Image from "next/image";
import styled from "styled-components";

export default function Loading() {
  return (
    <Container>
      <div>로딩중입니다...</div>
      <Image width={50} height={50} src="/images/loading.gif" alt="loading" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  gap: 10px;
  color: #999;
`;
