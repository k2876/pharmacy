"use client";

import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";
import colors from "@/assets/colors";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import alert from "../../functions/alert";
import { useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import axios from "axios";

type Props = {
  data: ListInfo;
};

const days = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
  "공휴일",
];

const format = (text: number | string) => {
  return String(text).replace(/(.{2})/, "$1:") || "";
};

export default function List({ data }: Props) {
  const [detail, setDetail] = useState<boolean>(false);

  const arr = useMemo(() => {
    let result = days?.map((day, i) => {
      const c = "dutyTime" + (i + 1);
      const t = (s: string) => format(data[(c + s) as keyof ListInfo] ?? "");
      const time = t("s") && t("c") ? t("s") + " ~ " + t("c") : "-";
      return { day, time };
    });
    return result;
  }, [data]);

  const onCopy = () => {
    try {
      alert.info("주소가 복사되었습니다");
      copy(`${data?.dutyAddr}`);
    } catch (e) {
      console.log(e);
    }
  };

  const onDetailInfo = () => {
    detail ? setDetail(false) : setDetail(true);
  };

  const onCall = () => {
    location.href = `tel:${data?.dutyTel1}`;
  };

  return (
    <Container>
      <Contents onClick={onDetailInfo}>
        <Header>{data?.dutyName}</Header>
        <Adress>{data?.dutyAddr}</Adress>
        {detail && (
          <DetailInfo>
            <div>전화번호 : {data?.dutyTel1}</div>
            <div>{data?.dutyMapimg}</div>
            <div>{data?.dutyInf}</div>
            <div>{data?.dutyEtc}</div>

            {arr?.map((item) => (
              <Day key={item?.day}>
                {item?.day} {item?.time}
              </Day>
            ))}
          </DetailInfo>
        )}
      </Contents>
      <Buttons>
        <Icon onClick={onCopy}>
          <ContentCopyIcon />
        </Icon>
        <Icon onClick={onCall}>
          <CallIcon />
        </Icon>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  box-shadow: 1px 2px 3px #00000050;
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
  cursor: pointer;
  transition: 0.3s;
  &:last-of-type {
    margin-bottom: 10px;
  }
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
const Day = styled.div`
  border-top: 1px solid #eee;
  font-weight: 500;
  padding: 3px;
`;
const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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
