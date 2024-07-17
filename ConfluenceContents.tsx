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
          const adjustContent = () => {
            // content 영역을 찾고 복사
            const contentArea = iframeDoc.querySelector('.wiki-content') as HTMLElement;
            if (contentArea) {
              const clonedContent = contentArea.cloneNode(true) as HTMLElement;
              clonedContent.style.width = '100%';
              clonedContent.style.height = '100%';

              // iframe의 body를 비우고 복사한 contentArea를 추가
              iframeDoc.body.innerHTML = '';
              iframeDoc.body.appendChild(clonedContent);

              // 스타일 시트를 복사
              const styles = iframeDoc.querySelectorAll('style, link[rel="stylesheet"]');
              styles.forEach(style => {
                iframeDoc.head.appendChild(style.cloneNode(true));
              });
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

/*
Refused to apply style from 'https://xxxx/_next/static/css/81aea823ad47b2b4.css' because its MIME type ('text/plain') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
*/
