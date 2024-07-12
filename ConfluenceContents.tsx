import React, { useEffect, useRef } from 'react';

interface ConfluenceContentsProps {
  url: string;
}

const ConfluenceContents: React.FC<ConfluenceContentsProps> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeLoad = () => {
      const iframe = iframeRef.current;
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          // 원하는 영역을 숨기거나 제거하는 함수
          const adjustContent = () => {
            // 탐색기 영역을 완전히 제거
            const explorer = iframeDoc.querySelector('.explorer-class-name') as HTMLElement;
            if (explorer) {
              explorer.remove();
            }

            // 전체 페이지에서 content 영역을 제외한 다른 요소 숨기기
            const contentArea = iframeDoc.querySelector('.content-class-name') as HTMLElement;
            if (contentArea) {
              contentArea.style.width = '100%'; // 전체 너비로 확장
              // 부모 요소들 중 필요 없는 요소를 제거하거나 숨기기
              const parentElements = contentArea.parentElement?.children;
              if (parentElements) {
                Array.from(parentElements).forEach((elem) => {
                  if (elem !== contentArea) {
                    (elem as HTMLElement).style.display = 'none';
                  }
                });
              }
            }
          };
          adjustContent();
        }
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
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
