import React, { useState, useLayoutEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { CSSTransition } from "react-transition-group";
import "../styles/InformationPage.css";

const InformationPage = ({ mobileMenuOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const [initialTransform, setInitialTransform] = useState(null);
  const transformComponentRef = useRef(null);

  // 데스크탑 초기 설정값
  const desktopInitialScale = 2.5;
  const desktopInitialPositionX = -400;
  const desktopInitialPositionY = -200;

  // 콘텐츠 사이즈 (고정)
  const contentWidth = 1280;
  const contentHeight = 720;

  // 데스크탑 기준 타겟 콘텐츠 좌표 (화면 중앙 기준)
  const targetContentX = contentWidth / 2 + desktopInitialPositionX;
  const targetContentY = contentHeight / 2 + desktopInitialPositionY;

  // 클라이언트 사이즈에 따라 초기 Transform 값을 계산
  useLayoutEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (mobile) {
      const mobileScale = 1.5;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let mobileInitialX = viewportWidth / 2 - targetContentX * mobileScale;
      let mobileInitialY = viewportHeight / 2 - targetContentY * mobileScale;
      // 모바일 전용 추가 오프셋 (필요시 미세 조정)
      const mobileOffsetX = -600;
      const mobileOffsetY = 0;
      mobileInitialX += mobileOffsetX;
      mobileInitialY += mobileOffsetY;
      setInitialTransform({ x: mobileInitialX, y: mobileInitialY, scale: mobileScale });
    } else {
      setInitialTransform({
        x: desktopInitialPositionX,
        y: desktopInitialPositionY,
        scale: desktopInitialScale,
      });
    }
  }, []);

  // isMobile 또는 initialTransform이 준비되지 않으면 렌더링 중단
  if (isMobile === null || initialTransform === null) {
    return null;
  }

  const categories = [
    {
      id: "kalts",
      title: "계산식 및 메커니즘",
      charName: "kalts",
      position: { x: 60, y: 30 },
      link: "https://gall.dcinside.com/m/mibj/3513106",
    },
    {
      id: "amiya",
      title: "오퍼레이터 정가 미래시",
      charName: "amiya",
      position: { x: 50, y: 25 },
      link: "https://gall.dcinside.com/m/mibj/3449066",
    },
    {
      id: "ths",
      title: "스토리 및 설정",
      charName: "ths",
      position: { x: 40, y: 26 },
      link: "https://gall.dcinside.com/m/mibj/4449436",
    },
    {
      id: "rosmon",
      title: "카카오토 및 MAA 설정",
      charName: "rosmon",
      position: { x: 46, y: 48 },
      link: "https://gall.dcinside.com/m/mibj/4449432",
    },
    {
      id: "huang",
      title: "뉴비 가이드",
      charName: "huang",
      position: { x: 40, y: 47 },
      link: "https://gall.dcinside.com/mibj",
    },
  ];

  const handleCategoryClick = (cat, ref) => {
    // 같은 카테고리 클릭 시 토글로 해제
    setSelectedCategory((prev) => (prev && prev.id === cat.id ? null : cat));
    const transformRef = ref || transformComponentRef.current;
    if (transformRef) {
      const targetScale = isMobile ? 1.5 : 2.5;
      // 콘텐츠 내 캐릭터 좌표 (픽셀 단위 계산)
      const targetX = (cat.position.x / 100) * contentWidth;
      const targetY = (cat.position.y / 100) * contentHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const newX = viewportWidth / 2 - targetX * targetScale;
      const newY = viewportHeight / 2 - targetY * targetScale;
      transformRef.setTransform(newX, newY, targetScale);
    }
  };

  const getImageUrl = (charName, type, active) => {
    const fileName =
      type === "face" ? (active ? "face_active.png" : "face.png") : `${type}.png`;
    return `${import.meta.env.BASE_URL}images/char/${charName}/${fileName}`;
  };

  return (
    <div className="information-page info">
      <div className="category-nav">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-nav-button ${
              selectedCategory?.id === cat.id ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat, transformComponentRef.current)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <TransformWrapper
        ref={transformComponentRef}
        initialScale={initialTransform.scale}
        initialPositionX={initialTransform.x}
        initialPositionY={initialTransform.y}
        minScale={isMobile ? 1.5 : 2.5}
        maxScale={3}
        limitToBounds={true}
        limitToWrapper={false}
        boundariesPadding={{ top: 0, bottom: 0, left: 0, right: 0 }}
        wheel={{ step: 0.1 }}
        panning={{
          velocityAnimation: true,
          velocityMinSpeed: 0.2,
          velocityBaseTime: 500,
          animationTime: 300,
          animationThreshold: 0.1,
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
        }}
        doubleClick={{ disabled: true }}
        onPanningStart={() => setUserInteracted(true)}
        onPanning={(ref) => {
          if (!userInteracted) return;
          const { scale, positionX, positionY } = ref.state;
          const scaledWidth = contentWidth * scale;
          const scaledHeight = contentHeight * scale;
          const maxX = (scaledWidth - contentWidth) / 2;
          const maxY = (scaledHeight - contentHeight) / 2;
          let newX = positionX;
          let newY = positionY;
          if (positionX > maxX) newX = maxX;
          if (positionX < -maxX) newX = -maxX;
          if (positionY > maxY) newY = maxY;
          if (positionY < -maxY) newY = -maxY;
          if (newX !== positionX || newY !== positionY) {
            ref.setTransform(newX, newY, scale);
          }
        }}
      >
        {() => (
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            <div className="subpage-content">
              <div className="background-image"></div>
              <div
                className="character-container"
                onClick={() => setSelectedCategory(null)}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`character-item ${cat.id} ${
                      selectedCategory && selectedCategory.id === cat.id ? "selected" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(cat);
                    }}
                  >
                    <div
                      className="character-full"
                      style={{
                        backgroundImage: `url('${getImageUrl(cat.charName, "full")}')`,
                      }}
                    ></div>
                    <div
                      className="character-face"
                      style={{
                        backgroundImage: `url('${getImageUrl(
                          cat.charName,
                          "face",
                          selectedCategory && selectedCategory.id === cat.id
                        )}')`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </TransformComponent>
        )}
      </TransformWrapper>

      {/* 모바일 메뉴가 닫힌 상태일 때만 정보 영역(READ MORE 등) 렌더링 */}
      {!mobileMenuOpen && (
        <CSSTransition
          in={!!selectedCategory}
          timeout={500}
          classNames="info-fade"
          unmountOnExit
          appear
          appearTimeout={500}
        >
          <div className="category-info">
            <h2 className="category-title">{selectedCategory?.title}</h2>
            <div className="underline"></div>
            <p className="category-description">
              {selectedCategory?.description || "여기에 카테고리 설명이 들어갑니다."}
            </p>
            <a
              href={selectedCategory?.link || "#"}
              className="read-more-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              READ MORE
            </a>
          </div>
        </CSSTransition>
      )}
    </div>
  );
};

export default InformationPage;
