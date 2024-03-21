// "use client";

// import Script from "next/script";
// import { useEffect, useMemo } from "react";
// import styled from "styled-components";
// import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
// const appkey = "90e7d6d58167445a0210854e8a32a949";
// declare global {
//   interface Window {
//     kakao: any;
//   }
// }
// export default function KakaoMap() {
//   const [loading, error] = useKakaoLoader({
//     appkey: "90e7d6d58167445a0210854e8a32a949",
//   });
//   // const options = {
//   //   //지도를 생성할 때 필요한 기본 옵션
//   //   center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//   //   level: 3, //지도의 레벨(확대, 축소 정도)
//   // };

//   useEffect(() => {
//     const container = document.getElementById("map") as HTMLElement;
//     const options = {
//       center: new window.kakao.maps.LatLng(
//         37.365264512305174,
//         127.10676860117488
//       ),
//       level: 3,
//     };
//     const map = new window.kakao.maps.Map(container, options);
//   }, []);

//   return (
//     <Container>
//       <Script
//         type="text/javascript"
//         src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false`}
//       />
//       <div id="map" style={{ width: "500px", height: "400px" }}></div>
//     </Container>
//   );
// }

// const Container = styled.div``;
// const Contents = styled.div``;
