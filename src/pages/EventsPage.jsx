// src/pages/EventsPage.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import '../styles/EventsPage.css';

function StickyFooter() {
  return (
    <div className="sticky-footer fixed bottom-0 left-0 right-0 z-50 bg-black py-2 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-end space-x-4">
        <a 
          href="https://gall.dcinside.com/m/mibj/4713556" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400"
        >
          가챠 요약
        </a>
        <a 
          href="https://gall.dcinside.com/m/mibj/3997217" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400"
        >
          파밍 요약
        </a>
      </div>
    </div>
  );
}

function MenuItem({ item, activeId, onPointerDown, onPointerUp }) {
  return (
    <div
      className={`menu-item ${activeId === item.id ? 'active' : ''}`}
      onPointerDown={() => onPointerDown(item.id)}
      onPointerUp={onPointerUp}
    >
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-full"
      >
        <div
          className="bg-image"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}${item.bgImage})`,
            backgroundSize: "cover",
            // 인라인 backgroundPosition은 제거합니다.
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="menu-text">{item.text}</div>
      </a>
    </div>
  );
}

const EventsPage = () => {
  const [activeId, setActiveId] = useState(null);
  const timeoutRef = useRef(null);

  const menuItems = [
    { id: 'preview-dungeon-meshi', text: '테라밥', bgImage: '/images/event-dungeon-meshi.jpg', link: 'https://gall.dcinside.com/m/mibj/5436645' },
    { id: 'preview-vector', text: '벡터 브레이크스루', bgImage: '/images/event-vector-breakthrough.jpg', link: 'https://gall.dcinside.com/m/mibj/5461517' },
    { id: 'preview-west', text: '해 지는 곳을 따라서', bgImage: '/images/event-west.jpg', link: 'https://gall.dcinside.com/m/mibj/5462923' },
    { id: 'preview-ggozzil', text: '벨벳의 폭로자들', bgImage: '/images/event-ggozzil.jpg', link: 'https://gall.dcinside.com/m/mibj/5515560' },
    { id: 'preview-stronghold', text: '방어협정', bgImage: '/images/event-stronghold.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-wife-rerun', text: '츠빌링슈튀르메의 가을 재개방', bgImage: '/images/event-wife-rerun.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-pale-sea', text: '창백한 바다를 떠나며', bgImage: '/images/event-pale-sea.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-china-film', text: '흔적을 남겨 현재를 빛내다', bgImage: '/images/event-china-film.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-lake-rerun', text: '은심호 재개방', bgImage: '/images/event-lake-rerun.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-new-year-2025', text: '2025년 신년 기념 이벤트 (CN기준)', bgImage: '/images/event-new-year-2025.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-lunear-moon-2025', text: '상견환', bgImage: '/images/event-lunar-moon-2025.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-operation-atone', text: '정죄작전', bgImage: '/images/event-operation-cc-atone.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489'},
    { id: 'preview-cu-tomorow', text: '내일 다시 만나요', bgImage: '/images/event-cu-tomorrow.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489'},
    { id: 'preview-roguelike-mizuki-extension-ii', text: '통합전략#2 카에룰라 아버 확장 (2차)', bgImage: '/images/event-roguelike-mizuki-extension-ii.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489'},
    { id: 'preview-shu-rerun', text: '회서리 재개방', bgImage: '/images/event-shu-rerun.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489'},
    { id: 'preview-eblana', text: '슬픔마저 타오르고', bgImage: '/images/event-eblana.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489'},
  ];

  const handlePointerDown = useCallback((id) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveId(id);
    timeoutRef.current = setTimeout(() => {
      setActiveId(null);
    }, 600);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveId(null);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="container events-page">
      <StickyFooter />
      {/* 메인 컨테이너의 좌우 패딩을 모바일에서 줄임 */}
      <main className="max-w-7xl mx-auto px-1 md:px-3 py-8 mb-16">
        <div className="grid grid-cols-1 gap-2 md:gap-3">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              activeId={activeId}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            />
          ))}
        </div>
      </main>
    </div>
  );  
};

export default EventsPage;