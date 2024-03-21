"use client";

import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";
import colors from "@/assets/colors";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import alert from "../../functions/alert";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  data: ListInfo;
};

export default function List({ data }: Props) {
  const [detail, setDetail] = useState<boolean>(false);
  const onCopy = () => {
    try {
      alert.info("이름,주소가 복사되었습니다");
      copy(`${data?.dutyName}, ${data?.dutyAddr}`);
    } catch (e) {
      console.log(e);
    }
  };

  const onDetailInfo = () => {
    detail ? setDetail(false) : setDetail(true);
  };

  return (
    <Container>
      <Contents>
        <Header>{data?.dutyName}</Header>
        <Adress>{data?.dutyAddr}</Adress>
        {detail && (
          <DetailInfo>
            <div>상세정보 : {data?.dutyMapimg ?? "정보없음"}</div>
            <div>전화번호 : {data?.dutyTel1}</div>
            <div>{data?.dutyInf}</div>
            <div>{data?.dutyEtc}</div>
          </DetailInfo>
        )}
      </Contents>
      <Buttons>
        <Icon onClick={onCopy}>
          <ContentCopyIcon />
        </Icon>
        <Icon onClick={onDetailInfo}>
          {!detail ? <InfoIcon /> : <CloseIcon />}
        </Icon>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  box-shadow: 1px 2px 4px #00000050;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  gap: 10px;
  align-items: center;
  background-color: #f5f5f5;
`;
const Header = styled.div`
  flex: 1;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 5px;
`;
const Adress = styled.span`
  font-size: 12px;
  color: #999;
`;
const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: #777;
`;
const Icon = styled.span`
  color: ${colors?.main};
  cursor: pointer;
  & > svg {
    font-size: 20px;
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 5px;
`;
