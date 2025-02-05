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
            backgroundSize: "110% auto",
            backgroundPosition: "left center",
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
    { id: 'preview-nymph', text: '용광로의 부활', bgImage: '/images/event-nymph.jpg', link: 'https://gall.dcinside.com/m/mibj/5212701' },
    { id: 'preview-roguelike-sarkaz', text: '통합전략#5 살카즈의 영원한 불가사의', bgImage: '/images/event-roguelike-sarkaz.png', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-concert-2024-ii', text: 'Ambience Synesthesia 2024 II', bgImage: '/images/event-concert-2024-ii.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-dungeon-meshi', text: '테라밥', bgImage: '/images/event-dungeon-meshi.jpg', link: 'https://gall.dcinside.com/m/mibj/5436645' },
    { id: 'preview-moon', text: '아름다운때에 달을 맞이한다', bgImage: '/images/event-moon.jpg', link: 'https://gall.dcinside.com/m/mibj/5459774' },
    { id: 'preview-black-money-rerun', text: '부정축재 재개방', bgImage: '/images/event-black-money-rerun.jpg', link: 'https://gall.dcinside.com/m/mibj/5459920' },
    { id: 'preview-vector', text: '벡터 브레이크스루', bgImage: '/images/event-vector-breakthrough.jpg', link: 'https://gall.dcinside.com/m/mibj/5461517' },
    { id: 'preview-west', text: '해 지는 곳을 따라서', bgImage: '/images/event-west.jpg', link: 'https://gall.dcinside.com/m/mibj/5462923' },
    { id: 'preview-ggozzil', text: '벨벳의 폭로자들', bgImage: '/images/event-ggozzil.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-stronghold', text: '방어협정', bgImage: '/images/event-stronghold.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-wife-rerun', text: '츠빌링슈튀르메의 가을 재개방', bgImage: '/images/event-wife-rerun.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-pale-sea', text: '창백한 바다를 떠나며', bgImage: '/images/event-pale-sea.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-china-film', text: '흔적을 남겨 현재를 빛내다', bgImage: '/images/event-china-film.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-lake-rerun', text: '은심호 재개방', bgImage: '/images/event-lake-rerun.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-new-year-2025', text: '2025년 신년 기념 이벤트 (CN기준)', bgImage: '/images/event-new-year-2025.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
    { id: 'preview-lunear-moon-2025', text: '상견환', bgImage: '/images/event-lunar-moon-2025.jpg', link: 'https://gall.dcinside.com/m/mibj/5464489' },
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
      <main className="max-w-7xl mx-auto px-4 py-8 mb-16">
        <div className="grid grid-cols-1 gap-3">
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
