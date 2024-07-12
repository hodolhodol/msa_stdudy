import React, { useEffect, useRef } from 'react';

interface ConfluenceContentsProps {
  url: string;
}

const ConfluenceContents: React.FC<ConfluenceContentsProps> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // 처음에는 iframe 내의 모든 요소를 숨김
    const hideAllElements = () => {
      const allElements = iframeDoc.body.querySelectorAll('*');
      allElements.forEach((elem) => {
        (elem as HTMLElement).style.display = 'none';
      });
    };

    // content 영역을 찾고 보여주기
    const showContentArea = () => {
      const contentArea = iframeDoc.querySelector('.page.view') as HTMLElement;
      if (contentArea) {
        contentArea.style.display = 'block'; // content 영역만 보이도록
      }
    };

    // iframe이 로드될 때 실행할 함수
    const handleIframeLoad = () => {
      hideAllElements(); // 모든 요소 숨기기

      setTimeout(() => {
        showContentArea(); // 일정 시간 후에 content 영역 보이기
      }, 1000); // 1초 후에 content 영역 보이기 (1000ms = 1초)
    };

    // iframe의 load 이벤트 리스너 추가
    iframe.addEventListener('load', handleIframeLoad);

    // 컴포넌트가 언마운트될 때 load 이벤트 리스너 제거
    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
    };
  }, [url]);

  return (
    <iframe 
      ref={iframeRef}
      src={url}
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
};

export default ConfluenceContents;
