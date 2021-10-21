import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      let flag = event?.currentTarget?.body?.className === 'ReactModal__Body--open';
      if (!ref.current || ref.current.contains(event.target) || flag) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
