// src/components/DesktopNav.jsx
import React from 'react';

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
          <button
            onClick={() => onPageChange('information')}
            className={`hover:text-blue-400 ${currentPage === 'information' ? 'text-blue-400' : 'text-white'}`}
          >
            게임정보
          </button>
          <button
            onClick={() => onPageChange('operations')}
            className={`hover:text-blue-400 ${currentPage === 'operations' ? 'text-blue-400' : 'text-white'}`}
          >
            작전
          </button>
        </div>
      </div>
    </nav>
  );
}

export default DesktopNav;
