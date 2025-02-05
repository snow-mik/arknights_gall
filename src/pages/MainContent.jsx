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
      playlist: "03uwZdGm104",
    },
  };

  const onReady = (event) => {
    // 필요 시 추가 제어 가능 (이미 autoplay와 mute 설정되어 있음)
    // event.target.playVideo();
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)]">
      {/* 영상 배경 */}
      <div className="absolute inset-0 overflow-hidden">
        <YouTube
          videoId="03uwZdGm104"
          opts={opts}
          onReady={onReady}
          containerClassName="w-full h-full"
          // 추가로 inline 스타일을 사용해서 확실히 채우도록 할 수도 있습니다.
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      {/* 영상 위 콘텐츠 */}
      <div className="relative z-10 flex items-left justify-left h-full">
        <div className="text-left text-white">
          <h1 className="text-8xl font-bold tracking-tight">
            ARK-<br />NIGHTS
          </h1>
          <p className="mt-4 text-xl text-gray-300 font-bold">명일방주 마이너 갤러리</p>
          <p className="text-gray-400">https://gall.dcinside.com/mibj/</p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
