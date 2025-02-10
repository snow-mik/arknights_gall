import React, { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../styles/OperationsPage.css";

const OperationsPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentMenu, setCurrentMenu] = useState([]);

  const banners = [
    {
      id: 1,
      title: "섬멸작전",
      subtitle: "Annihilation",
      image: "/images/integrated-strategies.jpg",
      details: "섹스!!!!!",
    },
    {
      id: 2,
      title: "통합전략 (로그라이크)",
      subtitle: "INTEGRATED STRATEGIES",
      image: "/images/reclamation-algorithm.jpg",
      submenus: [
        { id: 1, title: "고성", image: "/images/tower.jpg", link: "/castle" },
        { id: 2, title: "미즈키", image: "/images/mizuki.jpg", link: "/mizuki" },
        { id: 3, title: "사미", image: "/images/sami.jpg", link: "/sami" },
        { id: 4, title: "살카즈", image: "/images/sarkaz.jpg", link: "/sarkaz" },
      ],
    },
    {
      id: 3,
      title: "생존연산",
      subtitle: "RECLAMATION ALGORITHM",
      image: "/images/animation.jpg",
      details: "내 연산에 어서와라라",
    },
    {
      id: 4,
      title: "보오지이이이잇",
      subtitle: "BOZZZZIIII",
      image: "/images/terra-historicus.jpg",
      details: "보보보보지지지지지오오오봊지이이이",
    },
  ];

  const handleExpand = (menu) => {
    setExpanded(true);
    setCurrentMenu(menu.submenus || []);
  };

  const handleReturn = () => {
    setExpanded(false);
    setCurrentMenu([]);
  };

  return (
    <div className="operations">
      <SwitchTransition>
        <CSSTransition
          key={expanded ? "submenu" : "banners"}
          timeout={500}
          classNames="fade"
        >
          {!expanded ? (
            <div className="operations-container">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="operations-banner"
                  style={{ backgroundImage: `url(${banner.image})` }}
                  onClick={() => handleExpand(banner)}
                >
                  <div className="operations-overlay">
                    <div className="operations-subtitle">{banner.subtitle}</div>
                    <div className="operations-title">
                      {banner.title}
                      <div className="operations-underline"></div>
                    </div>
                    <div className="operations-view-more">View More &gt;</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="submenu-container">
              <button className="submenu-return-button" onClick={handleReturn}>
                &larr; Return
              </button>
              <div className="submenu-grid">
                {currentMenu.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="submenu-item"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="submenu-overlay">
                      <div className="submenu-title">{item.title}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default OperationsPage;
