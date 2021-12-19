import { useCallback, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';

export function useThrottle(cb, delay = 300, options = { leading: false, trailing: true }) {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    throttle((...args) => cbRef.current(...args), delay, options),
    [delay],
  );
}
