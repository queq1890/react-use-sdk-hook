import { useState, useEffect, useCallback } from 'react';

type Options = {
  src: string;
  cleanUpFlag?: boolean;
};

const useSDK = ({ src, cleanUpFlag = false }: Options) => {
  const [loaded, setLoaded] = useState(false);
  const cleanUp = useCallback(() => {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) document.body.removeChild(script);
  }, [src]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
    setLoaded(true);

    return () => {
      if (cleanUpFlag) {
        cleanUp();
      }
    };
  }, [src, cleanUpFlag, cleanUp]);

  return [loaded, cleanUp];
};

export default useSDK;
