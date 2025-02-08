// src/pages/ModulesPage.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/ModulesPage.css"; // 수정된 CSS 파일 불러오기

const ModulesPage = () => {
  // 상태 및 데이터 캐싱
  const [operatorsData, setOperatorsData] = useState([]);
  const [classesData, setClassesData] = useState({});
  const [currentOperators, setCurrentOperators] = useState([]);
  const [currentMainClass, setCurrentMainClass] = useState(null);
  const [currentSubClass, setCurrentSubClass] = useState(null);
  const [subClasses, setSubClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotice, setShowNotice] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);

  const cache = useRef({
    operators: null,
    classes: null,
  });

  // 데이터 가져오기 함수
  const fetchData = async (url) => {
    if (url === "operators.json" && cache.current.operators) {
      return cache.current.operators;
    } else if (url === "classes.json" && cache.current.classes) {
      return cache.current.classes;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`네트워크 에러: ${response.status}`);
    }
    const data = await response.json();
    if (url === "operators.json") cache.current.operators = data;
    if (url === "classes.json") cache.current.classes = data;
    return data;
  };

  useEffect(() => {
    fetchData("operators.json")
      .then((data) => setOperatorsData(data))
      .catch((err) => console.error(err));
    fetchData("classes.json")
      .then((data) => setClassesData(data))
      .catch((err) => console.error(err));
  }, []);

  const showNotices = () => {
    setShowNotice(true);
    setSubClasses([]);
    setCurrentOperators([]);
    setCurrentMainClass(null);
    setCurrentSubClass(null);
  };

  const loadSubClasses = async (mainClass) => {
    setShowNotice(false);
    setCurrentMainClass(mainClass);
    setCurrentSubClass(null);
    const subs = classesData[mainClass] || [];
    setSubClasses(subs);
    const ops = operatorsData
      .filter((op) => op.mainClass === mainClass)
      .sort((a, b) => b.rarity - a.rarity);
    setCurrentOperators(ops);
  };

  const loadOperators = (mainClass, subClass = null) => {
    let ops = operatorsData.filter((op) => op.mainClass === mainClass);
    if (subClass) {
      ops = ops.filter((op) => op.subClass === subClass);
    }
    ops.sort((a, b) => b.rarity - a.rarity);
    setCurrentOperators(ops);
  };

  const searchOperator = async () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      alert("오퍼레이터 이름을 입력하세요.");
      return;
    }
    const results = operatorsData
      .filter((op) => op.name.toLowerCase().includes(term))
      .sort((a, b) => b.rarity - a.rarity);
    setCurrentOperators(results);
    setShowNotice(false);
    setSubClasses([]);
    setCurrentMainClass(null);
    setCurrentSubClass(null);
  };

  const OperatorCard = ({ operator }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleDetails = () => setExpanded((prev) => !prev);
    const handleZoom = (e, imageUrl) => {
      e.stopPropagation();
      setZoomImage(imageUrl);
    };

    return (
      <div className="operator-card" onClick={toggleDetails}>
        <div className="card-header">
          <img
            src={operator.imageUrl}
            alt={operator.name}
            className="operator-thumb"
          />
          <div className="operator-info">
            <div className="operator-name">{operator.name}</div>
            <div className="operator-class">
              {operator.mainClass} - {operator.subClass}
            </div>
            <div className="operator-rarity">
              {"★".repeat(operator.rarity)}
            </div>
          </div>
        </div>
        {/* 항상 렌더링하고 상태에 따라 "expanded" 클래스를 토글 */}
        <div className={`card-details ${expanded ? "expanded" : ""}`}>
          <h3 style={{ color: "#00d1d4", margin: "0.5rem 0" }}>
            모듈 정보
          </h3>
          <div className="module-grid">
            {["module1", "module2", "module3", "module4"].map(
              (key, index) => {
                if (operator[key]) {
                  const types = ["X형", "Y형", "Δ형", "α형"];
                  return (
                    <div key={index} className="module-item">
                      <h4>{types[index]} 모듈</h4>
                      <img
                        src={operator[key]}
                        alt={`${types[index]} 모듈`}
                        className="module-img"
                        onClick={(e) => handleZoom(e, operator[key])}
                      />
                    </div>
                  );
                }
                return null;
              }
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    // 최상위 컨테이너에 "modules-page" 클래스를 추가하여, ModulesPage.css가 이 영역에만 적용되도록 함
    <div className="container modules-page">
      {/* 검색 섹션 */}
      <div id="search-section">
        <div className="search-wrapper">
          <input
            type="text"
            id="operator-search"
            placeholder="오퍼레이터 이름으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="search-button"
            id="search-button"
            onClick={searchOperator}
          >
            검색
          </button>
        </div>
      </div>

      {/* 클래스 및 공지사항 버튼 */}
      <div id="class-selection">
        <button className="fancy-button" onClick={showNotices}>
          공지사항
        </button>
        {[
          "뱅가드",
          "가드",
          "디펜더",
          "스나이퍼",
          "캐스터",
          "메딕",
          "서포터",
          "스페셜리스트",
        ].map((mainClass) => (
          <button
            key={mainClass}
            className={`fancy-button ${
              currentMainClass === mainClass ? "active" : ""
            }`}
            onClick={() => loadSubClasses(mainClass)}
          >
            {mainClass}
          </button>
        ))}
      </div>

      {/* 공지사항 섹션 */}
      {showNotice && (
        <div id="notice-section">
          <div className="notice-card">
            <h2 className="notice-title">[공지사항]</h2>
            <p className="notice-text">
              최종 업데이트 일자: 2025년 1월 22일 <br />
              중섭기준 [상견환] 까지 업데이트 <br />
              나무위키에서 [상견환] 업데이트 해놔서 긴빠이 칸료
              <br />
              <br />
              이상이 있는 경우, 호출벨에서 알투콘을 찾을 것 <br />
              이제 나도 힘들어서 나무위키거 훔쳐오는데 그건 시꺼먼거고 내가 직접 제작한건
              하얀색임 그러니 꺼먼색은 나한테 오지마
            </p>
          </div>
        </div>
      )}

      {/* 서브클래스 선택 영역 */}
      {subClasses.length > 0 && (
        <div id="subclass-selection">
          <button
            className={`fancy-button ${!currentSubClass ? "active" : ""}`}
            onClick={() => {
              setCurrentSubClass(null);
              loadOperators(currentMainClass);
            }}
          >
            전체
          </button>
          {subClasses.map((subClass) => (
            <button
              key={subClass}
              className={`fancy-button ${
                currentSubClass === subClass ? "active" : ""
              }`}
              onClick={() => {
                setCurrentSubClass(subClass);
                loadOperators(currentMainClass, subClass);
              }}
            >
              {subClass}
            </button>
          ))}
        </div>
      )}

      {/* 오퍼레이터 그리드 */}
      {currentOperators.length > 0 && (
        <div id="operator-list" className="operator-grid">
          {currentOperators.map((operator) => (
            <OperatorCard key={operator.id} operator={operator} />
          ))}
        </div>
      )}

      {/* 줌 오버레이 */}
      {zoomImage && (
        <div
          id="zoom-overlay"
          className="zoom-overlay"
          style={{ display: "flex" }}
          onClick={() => setZoomImage(null)}
        >
          <div className="zoom-content">
            <span className="zoom-close" onClick={() => setZoomImage(null)}>
              &times;
            </span>
            <img id="zoomed-image" src={zoomImage} alt="Zoomed" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;