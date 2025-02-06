// src/App.jsx
import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import MainContent from './pages/MainContent';
import EventsPage from './pages/EventsPage';
import ModulesPage from './pages/ModulesPage';

// 데스크탑 전용 네비게이션 (가로 메뉴)
function DesktopNav({ currentPage, onPageChange }) {
  return (
    <nav className="hidden md:block bg-black text-white p-4">
      <div className="w-full flex justify-between items-center">
        <div className="text-xl font-bold">명갤 정보글 모음</div>
        <div className="flex space-x-6">
          <button
            onClick={() => onPageChange('main')}
            className={`hover:text-blue-400 ${currentPage === 'main' ? 'text-blue-400' : 'text-white'}`}
          >
            메인
          </button>
          <button
            onClick={() => onPageChange('events')}
            className={`hover:text-blue-400 ${currentPage === 'events' ? 'text-blue-400' : 'text-white'}`}
          >
            이벤트 미래시
          </button>
          <button
            onClick={() => onPageChange('modules')}
            className={`hover:text-blue-400 ${currentPage === 'modules' ? 'text-blue-400' : 'text-white'}`}
          >
            모듈 상세 정보
          </button>
        </div>
      </div>
    </nav>
  );
}

// 모바일 전용 네비게이션 (햄버거 메뉴)
function MobileNav({ currentPage, onPageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { label: "메인", english: "MAIN", value: "main" },
    { label: "이벤트 미래시", english: "EVENT PREVIEW", value: "events" },
    { label: "모듈 상세 정보", english: "MODULES", value: "modules" },
  ];

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    console.log("Toggle menu, new state:", !isOpen);
  };

  return (
    <nav className="md:hidden bg-black text-white p-4 relative z-50">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="mobile-menu-overlay"
        unmountOnExit
      >
        <div className="mobile-menu-overlay fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto">
          <div
            className="mobile-menu-content w-full pt-8 pb-4 px-4 bg-transparent"
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
                      currentPage === item.value ? 'text-blue-400' : 'text-white'
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
    </nav>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('main');

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainContent />;
      case 'events':
        return <EventsPage />;
      case 'modules':
        return <ModulesPage />;
      default:
        return <MainContent />;
    }
  };

  return (
    // 최상위 컨테이너: #root에 적용된 전역 스타일(예: max-width, padding)이 있다면 이를 덮어쓰도록 합니다.
    <div className="min-h-screen bg-black text-white relative overflow-auto">
      {/* 데스크탑 네비게이션 */}
      <div className="hidden md:block">
        <DesktopNav currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      {/* 모바일 네비게이션 */}
      <div className="block md:hidden">
        <MobileNav currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      {/* 페이지 전환 영역: 전역 스타일의 제한을 피하기 위해 래퍼를 사용 */}
      <div className="w-full min-h-screen m-0 p-0">
        <SwitchTransition>
          <CSSTransition key={currentPage} timeout={500} classNames="fade" unmountOnExit>
            <div>{renderPage()}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

export default App;
