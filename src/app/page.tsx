"use client";

import axios from "axios";
import styled from "styled-components";
import CommonContaienr from "./components/CommonContainer";
import config from "@/assets/config";
import { useEffect, useState, useTransition } from "react";
import List from "./components/list";
import colors from "@/assets/colors";
import Loading from "./components/loading";
import Head from "next/head";

type Day = {
  code: number;
  name: string;
}[];

const day: Day = [
  { code: 1, name: "월요일" },
  { code: 2, name: "화요일" },
  { code: 3, name: "수요일" },
  { code: 4, name: "목요일" },
  { code: 5, name: "금요일" },
  { code: 6, name: "토요일" },
  { code: 7, name: "일요일" },
  { code: 8, name: "공휴일" },
];

export default function Home() {
  const [pharmacyList, setPharmacyList] = useState<ListInfo[]>([]);
  const [nameValue, SetNameValue] = useState("");
  const [firstAdressValue, SetFirstAdressValue] = useState("");
  const [dayValue, SetDayValue] = useState<number>(1);

  const [isPending, transitionStart] = useTransition();

  const post = async () => {
    const { data: res } = await axios.get(
      config.baseUrl +
        `&numOfRows=100` +
        `&QN=${nameValue}` +
        `&Q0=${firstAdressValue}` +
        `&QT=${dayValue}`
    );
    const data = res?.response?.body?.items?.item;
    if (!data) return setPharmacyList([]);
    const isArray = Array.isArray(data);
    if (isArray) return setPharmacyList(data);
    transitionStart(() => setPharmacyList([data]));
  };

  const onSelect = (e: { target: { value: any } }) => {
    SetDayValue(e?.target?.value);
  };

  return (
    <>
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
            <Select onChange={onSelect}>
              {day?.map((x) => (
                <option value={x?.code} key={x?.code}>
                  {x?.name}
                </option>
              ))}
            </Select>
            <Button onClick={() => transitionStart(() => post())}>검색</Button>
          </InputBox>
          <DayBox></DayBox>
          <Count>{`검색결과 ${pharmacyList?.length}개`}</Count>
          <ListBox>
            {isPending ? (
              <Loading />
            ) : (
              pharmacyList?.map((item) => (
                <List key={item?.rnum + 1} data={item} />
              ))
            )}
          </ListBox>
        </Container>
      </CommonContaienr>
    </>
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
  font-size: 25px;
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
    outline: 1px solid ${colors?.main};
  }
`;
const Select = styled.select`
  width: 100%;
  padding: 5px;
  background-color: inherit;
  border-radius: 10px;
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
