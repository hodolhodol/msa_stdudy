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
          const hideElements = () => {
            const explorer = iframeDoc.querySelector('.explorer-class-name'); // 탐색기 영역의 클래스 이름
            if (explorer) {
              explorer.style.display = 'none';
            }
          };
          hideElements();
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
