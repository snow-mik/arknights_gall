// src/pages/MainContent.jsx
import React from "react";
import YouTube from "react-youtube";

const MainContent = () => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      loop: 1,
      playlist: "vbywTPgz5xQ",
    },
  };

  const onReady = (event) => {
    // 필요 시 event.target.playVideo();
  };

  return (
    // 컨테이너 높이를 80vh로 설정 (영상 크기를 줄여 스크롤 발생 방지)
    // 데스크탑에서는 전체 뷰포트를 사용하고 싶다면 h-screen 대신 min-h-screen을 사용할 수도 있음
    <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      {/* 영상 배경 */}
      <div className="absolute inset-0">
        <YouTube
          videoId="vbywTPgz5xQ"
          opts={opts}
          onReady={onReady}
          containerClassName="w-full h-full"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      {/* 텍스트 오버레이 */}
      {/* 
          모바일: absolute, bottom-16 (즉, 컨테이너 바닥에서 약 4rem 위)
          데스크탑: fixed, bottom-0 (즉, 뷰포트 맨 아래)
      */}
      <div className="absolute md:fixed left-0 z-10 p-4 md:p-8 bottom-16 md:bottom-0">
        <div className="text-left text-white">
          <h1 className="text-4xl md:text-8xl font-bold tracking-tight">ARKNIGHTS</h1>
          <p className="mt-2 text-base md:text-xl font-bold text-gray-300">
            명일방주 마이너 갤러리
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
