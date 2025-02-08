import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { CSSTransition } from "react-transition-group";
import "../styles/InformationPage.css";

const InformationPage = ({ mobileMenuOpen }) => {
  // 초기 렌더링 시 필요한 상태들
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // 추가된 상태: exit 애니메이션 동안 카테고리 정보를 유지
  const [displayedCategory, setDisplayedCategory] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
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
  const targetContentX = contentWidth / 2 + desktopInitialPositionX; // 예: 640 - 400 = 240
  const targetContentY = contentHeight / 2 + desktopInitialPositionY; // 예: 360 - 200 = 160

  // 디버그용: true이면 모바일 offset을 0으로 적용
  const debugMobileOffset = false;

  // 초기 transform 값 계산 (화면 크기에 따라)
  useLayoutEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    let newTransform;
    if (mobile) {
      const mobileScale = 1.5;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let mobileInitialX = viewportWidth / 2 - targetContentX * mobileScale;
      let mobileInitialY = viewportHeight / 2 - targetContentY * mobileScale;
      if (!debugMobileOffset) {
        const baseMobileWidth = 768; // 디자인 기준 모바일 너비
        const mobileOffsetX = -1080 * (viewportWidth / baseMobileWidth);
        mobileInitialX += mobileOffsetX;
      } else {
        console.log("DEBUG: Mobile offset disabled (set to 0)");
      }
      newTransform = { x: mobileInitialX, y: mobileInitialY, scale: mobileScale };
      console.log("Mobile transform:", newTransform);
    } else {
      newTransform = { x: desktopInitialPositionX, y: desktopInitialPositionY, scale: desktopInitialScale };
      console.log("Desktop transform:", newTransform);
    }
    setInitialTransform(newTransform);
  }, [debugMobileOffset, targetContentX, targetContentY]);

  // 카테고리 데이터 (각 항목에 description 포함)
  const categories = [
    {
      id: "kalts",
      title: "계산식 및 메커니즘",
      charName: "kalts",
      position: { x: 60, y: 30 },
      link: "https://gall.dcinside.com/m/mibj/3513106",
      description: "명일방주 대미지 계산식 및 전투 메커니즘",
    },
    {
      id: "amiya",
      title: "오퍼레이터 정가 미래시",
      charName: "amiya",
      position: { x: 50, y: 25 },
      link: "https://gall.dcinside.com/m/mibj/3449066",
      description: "오퍼레이터 노티 정가 및 한정 규칙",
    },
    {
      id: "ths",
      title: "스토리 및 설정",
      charName: "ths",
      position: { x: 40, y: 26 },
      link: "https://gall.dcinside.com/m/mibj/4449436",
      description: "명일방주 스토리 리더 및 배경설정 관련",
    },
    {
      id: "rosmon",
      title: "카카오토 및 MAA 설정",
      charName: "rosmon",
      position: { x: 46, y: 48 },
      link: "https://gall.dcinside.com/m/mibj/4449432",
      description: "MAA 등의 보조 외부프로그램 설정 등",
    },
    {
      id: "huang",
      title: "뉴비 가이드",
      charName: "huang",
      position: { x: 40, y: 47 },
      link: "https://gall.dcinside.com/mibj",
      description: "뉴비가이드 누가 작성 좀 해봐라",
    },
  ];

  // 이미지 URL 생성 함수
  const getImageUrl = (charName, type, active) => {
    const fileName =
      type === "face" ? (active ? "face_active.png" : "face.png") : `${type}.png`;
    return `${import.meta.env.BASE_URL}images/char/${charName}/${fileName}`;
  };

  // 이미지 프리로딩
  useEffect(() => {
    categories.forEach((cat) => {
      const faceUrl = getImageUrl(cat.charName, "face", false);
      const faceActiveUrl = getImageUrl(cat.charName, "face", true);
      const fullUrl = getImageUrl(cat.charName, "full");

      new Image().src = faceUrl;
      new Image().src = faceActiveUrl;
      new Image().src = fullUrl;
    });
  }, [categories]);

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (cat, ref) => {
    // 같은 카테고리를 다시 클릭하면 exit 애니메이션을 위해 selectedCategory만 null로 변경
    if (selectedCategory && selectedCategory.id === cat.id) {
      setSelectedCategory(null);
    } else {
      // 새 카테고리 선택 시, 두 상태 모두 업데이트하여 내용이 바로 표시되도록 함
      setSelectedCategory(cat);
      setDisplayedCategory(cat);
      const transformRef = ref || transformComponentRef.current;
      if (transformRef) {
        const targetScale = isMobile ? 1.5 : 2.5;
        // 콘텐츠 내 캐릭터 좌표 계산
        const targetX = (cat.position.x / 100) * contentWidth;
        const targetY = (cat.position.y / 100) * contentHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const newX = viewportWidth / 2 - targetX * targetScale;
        const newY = viewportHeight / 2 - targetY * targetScale;
        transformRef.setTransform(newX, newY, targetScale);
      }
    }
  };

  return (
    <div className="information-page info">
      {initialTransform ? null : (
        <div style={{ color: "#fff", padding: "20px" }}>Loading...</div>
      )}
      {initialTransform && (
        <>
          <div className="category-nav">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-nav-button ${
                  selectedCategory?.id === cat.id ? "active" : ""
                }`}
                onClick={() =>
                  handleCategoryClick(cat, transformComponentRef.current)
                }
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
                          selectedCategory && selectedCategory.id === cat.id
                            ? "selected"
                            : ""
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

          {/* 카테고리 정보 패널: CSSTransition을 이용한 애니메이션 */}
          {!mobileMenuOpen && (
            <CSSTransition
              in={!!selectedCategory}
              timeout={500}
              classNames="info-fade"
              unmountOnExit
              appear
              appearTimeout={500}
              onExited={() => setDisplayedCategory(null)}
            >
              <div className="category-info">
                <h2 className="category-title">
                  {displayedCategory?.title}
                </h2>
                <div className="underline"></div>
                <p className="category-description">
                  {displayedCategory?.description ||
                    "여기에 카테고리 설명이 들어갑니다."}
                </p>
                <a
                  href={displayedCategory?.link || "#"}
                  className="read-more-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  READ MORE
                </a>
              </div>
            </CSSTransition>
          )}
        </>
      )}
    </div>
  );
};

export default InformationPage;
