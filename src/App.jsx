// src/App.jsx
import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import MainContent from './pages/MainContent';
import EventsPage from './pages/EventsPage';
import ModulesPage from './pages/ModulesPage';
import InformationPage from './pages/InformationPage';
import OperationsPage from './pages/OperationsPage';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';

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
      case 'information':
        return <InformationPage />;
      case 'operations':
        return <OperationsPage/>;
      default:
        return <MainContent />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-auto">
      {/* 데스크탑 네비게이션 */}
      <div className="hidden md:block">
        <DesktopNav currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      {/* 모바일 네비게이션 */}
      <div className="block md:hidden">
        <MobileNav currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      {/* 페이지 전환 영역 */}
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
