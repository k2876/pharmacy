"use client";

import styled from "styled-components";

export default function CommonContaienr({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}) {
  return <Container>{children ?? null}</Container>;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
