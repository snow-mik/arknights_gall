import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import MainContent from './pages/MainContent';
import EventsPage from './pages/EventsPage';
import ModulesPage from './pages/ModulesPage';

// 데스크탑 전용 네비게이션 (가로 메뉴)
function DesktopNav({ currentPage, onPageChange }) {
  return (
    <nav className="hidden md:block bg-black text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">명일방주 마이너 갤러리</div>
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
    { label: "메인", value: "main" },
    { label: "이벤트 미래시", value: "events" },
    { label: "모듈 상세 정보", value: "modules" },
    // 필요시 "기타" 항목 등 추가 가능
  ];

  return (
    <nav className="md:hidden bg-black text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">명일방주 마이너 갤러리</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
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
              // 닫기 아이콘 (X)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // 햄버거 아이콘
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
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="mobile-menu"
        unmountOnExit
      >
        <div className="mt-4">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() => {
                    onPageChange(item.value);
                    setIsOpen(false);
                  }}
                  className="block hover:text-blue-400 text-left w-full"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 데스크탑 네비게이션 */}
      <DesktopNav currentPage={currentPage} onPageChange={handlePageChange} />
      {/* 모바일 네비게이션 */}
      <MobileNav currentPage={currentPage} onPageChange={handlePageChange} />

      {/* 페이지 전환 애니메이션 적용 영역 */}
      <main className="max-w-7xl mx-auto p-4 mt-16 pb-16">
        <SwitchTransition>
          <CSSTransition key={currentPage} timeout={500} classNames="fade" unmountOnExit>
            <div>{renderPage()}</div>
          </CSSTransition>
        </SwitchTransition>
      </main>
    </div>
  );
}

export default App;
