import { useState, useRef, useEffect } from 'react';
import './style.css';

declare global {
  interface Window {
    scrollHandlers: Array<[any, Function]> | undefined;
  }
}

const handleScroll = () => {
  if (!window.scrollHandlers) {
    return;
  }

  window.scrollHandlers.forEach(([_, trigger]) => {
    trigger();
  });
};

const useScrollDisplay = (offset = 200) => {
  const ref = useRef<any>(null);
  const [showElement, setShowElement] = useState<boolean>(false);

  useEffect(() => {
    if (window.scrollHandlers) {
      return;
    }

    const scrollHandlers: Array<[any, Function]> = [];
    window.scrollHandlers = scrollHandlers;
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    calculatePosition();
    ref.current.classList.add('animatable');

    if (window.scrollHandlers) {
      const exists = window.scrollHandlers.find(([handlerRef, _]) => handlerRef === ref.current);

      if (!exists) {
        window.scrollHandlers.push([ref.current, calculatePosition]);
      }
    }
  }, [ref.current]);

  useEffect(() => {
    if (!showElement || !ref.current) {
      return;
    }

    ref.current.style.animationPlayState = 'running';

    if (window.scrollHandlers) {
      window.scrollHandlers = window.scrollHandlers.filter(
        ([handlerRef, _]) => handlerRef !== ref.current,
      );
    }
  }, [showElement]);

  const calculatePosition = () => {
    if (!ref.current) {
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const { top } = bounds;

    if (top - window.innerHeight < -offset) {
      setShowElement(true);
    }
  };

  return [ref, showElement];
};

export default useScrollDisplay;
