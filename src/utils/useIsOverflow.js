//https://www.robinwieruch.de/react-custom-hook-check-if-overflow/
import { useState, useLayoutEffect } from "react";


 export const useIsOverflow = (ref, callback) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth;
      setIsOverflow(hasOverflow);
      if (callback) callback(hasOverflow);
    };
    if (current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current);
      }
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};