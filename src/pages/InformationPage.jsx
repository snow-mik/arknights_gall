import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/InformationPage.css";

const InformationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 각 캐릭터 데이터 (좌표는 CSS에서 조정)
  const categories = [
    { id: "kalts", title: "계산식 및 메커니즘", charName: "kalts" },
    { id: "amiya", title: "오퍼레이터 정가 미래시", charName: "amiya" },
    { id: "ths", title: "스토리 및 설정", charName: "ths" },
    { id: "rosmon", title: "카카오토 및 MAA 설정", charName: "rosmon" },
    { id: "huang", title: "뉴비 가이드", charName: "huang" },
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory((prev) => (prev && prev.id === cat.id ? null : cat));
  };

  // 이미지 URL 생성 함수 (import.meta.env.BASE_URL 활용)
  const getImageUrl = (charName, type, active) => {
    const fileName =
      type === "face"
        ? active
          ? "face_active.png"
          : "face.png"
        : `${type}.png`;
    return `${import.meta.env.BASE_URL}images/char/${charName}/${fileName}`;
  };

  return (
    <div className="information-page">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="control-buttons">
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>-</button>
              <button onClick={resetTransform}>Reset</button>
            </div>
            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
              <div className="character-container">
                {/* 배경 이미지: placeholder 사용 */}
                <div
                  className="background-image"
                  style={{
                    backgroundImage:
                      "url('https://via.placeholder.com/1920x1080?text=Park+Scene')",
                  }}
                ></div>
                {/* 캐릭터 아이템들 */}
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
                    {/* 전신 이미지 */}
                    <div
                      className="character-full"
                      style={{
                        backgroundImage: `url('${getImageUrl(cat.charName, "full")}')`,
                      }}
                    ></div>
                    {/* 얼굴 이미지 */}
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
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      {selectedCategory && (
        <div className="category-details">
          <h2 className="category-title">{selectedCategory.title}</h2>
          <p className="category-description">관련 설명이 여기에 표시됩니다.</p>
        </div>
      )}
    </div>
  );
};

export default InformationPage;
