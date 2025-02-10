// src/components/MobileNav.jsx
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";

const MobileNav = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { label: "메인", english: "MAIN", value: "main" },
    { label: "이벤트 미래시", english: "EVENTS PREVIEW", value: "events" },
    { label: "모듈 상세 정보", english: "MODULES", value: "modules" },
    { label: "게임정보", english: "INFORMATION", value: "information" },
    { label: '작전', english: "OPERATIONS", value:"operations"},
  ];

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // 모바일 메뉴 오버레이를 Portal을 통해 document.body에 렌더링하여 항상 최상단에 보이도록 함.
  const mobileMenuOverlay = (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="mobile-menu-overlay"
      unmountOnExit
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto"
        style={{ zIndex: 9999 }} // 매우 높은 z-index로 다른 모든 요소 위에 표시됨.
      >
        <div
          className="w-full pt-8 pb-4 px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col space-y-6">
            {menuItems.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() => {
                    onPageChange(item.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left flex justify-between items-center py-2 border-b border-white/30 ${
                    currentPage === item.value ? "text-blue-400" : "text-white"
                  }`}
                >
                  <span className="font-bold">{item.label}</span>
                  <span className="text-sm opacity-80">{item.english}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 w-full text-center text-blue-400 hover:text-blue-600"
          >
            닫기
          </button>
        </div>
      </div>
    </CSSTransition>
  );

  return (
    <>
      <nav className="md:hidden bg-black text-white p-4 relative">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">명갤 정보글 모음</div>
          <button
            onClick={toggleMenu}
            aria-label="메뉴 열기/닫기"
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {createPortal(mobileMenuOverlay, document.body)}
    </>
  );
};

export default MobileNav;
