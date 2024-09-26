import { useLayoutEffect } from "react";

const useLockBodyScroll = (lock: boolean) => {
  useLayoutEffect(() => {
    if (lock) {
      // Lock the scroll
      const originalStyle = window.getComputedStyle(document.body).overflow;

      document.body.style.overflow = "hidden";
      return () => {
        // Unlock the scroll
        document.body.style.overflow = originalStyle;
      };
    }
  }, [lock]);
};

export default useLockBodyScroll;
