"use client";

import axios from "axios";
import styled from "styled-components";
import CommonContaienr from "./components/CommonContainer";
import config from "@/assets/config";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import List from "./components/list";
import colors from "@/assets/colors";
import CheckIcon from "@mui/icons-material/Check";

// import KakaoMap from "./components/kakaoMap";

type State = {
  Q0?: string;
  Q1?: string;
  QT?: string;
  QN?: string;
};
type Day = {
  name: string;
  state: boolean;
}[];

const day: Day = [
  { name: "월", state: false },
  { name: "화", state: false },
  { name: "수", state: false },
  { name: "목", state: false },
  { name: "금", state: false },
  { name: "토", state: false },
  { name: "일", state: false },
  { name: "공휴일", state: false },
];

export default function Home() {
  const [data, setData] = useState<ListInfo[]>([]);
  const [nameValue, SetNameValue] = useState("");
  const [firstAdressValue, SetFirstAdressValue] = useState("");
  const [dayValue, SetDayValue] = useState<Day>(day);
  const [search, setSearch] = useState<boolean>(false);

  const post = async () => {
    const { data: res } = await axios.get(
      config.baseUrl +
        `&numOfRows=100` +
        `&QN=${nameValue}` +
        `&Q0=${firstAdressValue}`
    );
    setData(res?.response?.body?.items?.item);
  };
  console.log(data);

  const copy = useDeferredValue(dayValue);

  const onDayClick = (name: string) => {
    SetDayValue((prev) =>
      prev?.map((item) => {
        if (item?.name !== name) return item;
        return { ...item, state: !item?.state };
      })
    );
    post();
  };

  useEffect(() => {
    post();
  }, []);
  return (
    <CommonContaienr>
      <Container>
        <Header>약국 찾기</Header>

        <InputBox>
          <SearchInputBox>
            <Input
              placeholder="약국명을 입력해주세요."
              value={nameValue}
              onChange={(e) => SetNameValue(e?.target?.value)}
            />
          </SearchInputBox>

          <SearchInputBox>
            <Input
              placeholder="주소를 입력해주세요."
              value={firstAdressValue}
              onChange={(e) => SetFirstAdressValue(e?.target?.value)}
            />
          </SearchInputBox>

          <Button onClick={post}>검색</Button>
        </InputBox>

        <DayBox>
          {copy?.map((item, i) => (
            <DayItem
              className={item?.state ? "active" : ""}
              onClick={() => onDayClick(item?.name)}
              key={i}
            >
              {item?.name}
            </DayItem>
          ))}
        </DayBox>
        <Count>
          {data?.length ? `검색결과 ${data?.length}개` : "검색결과가 없습니다"}
        </Count>
        <ListBox>
          {data?.map((item) => (
            <List key={item?.hpid} data={item} />
          ))}
        </ListBox>
      </Container>

      {/* <KakaoMap /> */}
    </CommonContaienr>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80vw;
  @media screen and (max-width: 1000px) {
    width: 90vw;
  }
`;
const Header = styled.div`
  padding: 5px 10px;
  font-size: 20px;
  font-weight: 700;
  color: ${colors?.main};
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 5px;
  margin-bottom: 10px;
  @media screen and (max-width: 500px) {
    width: 80%;
  }
`;
const Input = styled.input`
  border: none;
  padding: 7px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 20px;
  &:focus {
    outline: none;
  }
`;
const InputBottom = styled.div`
  display: flex;
  gap: 5px;
`;
const Button = styled.div`
  background-color: #4d93f0;
  color: #fff;
  padding: 3px 5px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchInputBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  & span {
    font-size: 14px;
  }
`;
const DayBox = styled.div`
  display: flex;
  gap: 10px;
`;
const DayItem = styled.div`
  /* border: 1px solid #ddd; */
  border-radius: 10px;
  padding: 3px;
  background-color: #fff;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
  font-style: 12px;
  user-select: none;
  &.active {
    background-color: ${colors?.main};
    color: #fff;
  }
`;
const Count = styled.div`
  font-size: 12px;
  margin: 10px 0;
  color: #999;
  display: flex;
  width: 100%;
  justify-content: center;
`;
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 10px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
