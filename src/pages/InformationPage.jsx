import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/InformationPage.css";

const InformationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);

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
        initialScale={2.5}
        initialPositionX={960}
        initialPositionY={200}
        minScale={2.5}
        maxScale={3}
        limitToBounds={true}
        limitToWrapper={true}
        boundariesPadding={{ top: 0, bottom: 0, left: 0, right: 0 }}
        wheel={{ step: 0.1 }}
        panning={{ velocityAnimation: false }}
        doubleClick={{ disabled: true }}
        onPanningStart={() => setUserInteracted(true)}
        onPanning={(ref) => {
          if (!userInteracted) return; // 초기 상태에서는 onPanning 무시
          const { scale, positionX, positionY } = ref.state;
          const containerWidth = 1280;
          const containerHeight = 720;
          const scaledWidth = containerWidth * scale;
          const scaledHeight = containerHeight * scale;
          const maxX = (scaledWidth - containerWidth) / 2;
          const maxY = (scaledHeight - containerHeight) / 2;

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
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="control-buttons">
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>-</button>
              <button onClick={resetTransform}>Reset</button>
            </div>
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
