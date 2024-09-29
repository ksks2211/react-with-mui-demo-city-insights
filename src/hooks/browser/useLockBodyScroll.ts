import { useScrollBarWidth } from "hooks/store";
import { useLayoutEffect } from "react";

const useLockBodyScroll = (lock: boolean) => {
  const { scrollBarWidth } = useScrollBarWidth();
  useLayoutEffect(() => {
    const isBodyScrollable = document.body.scrollHeight > window.innerHeight;
    if (!isBodyScrollable) return;

    if (lock) {
      // Lock the scroll
      const { overflow, marginRight } = window.getComputedStyle(document.body);

      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${scrollBarWidth}px`;
      return () => {
        // Unlock the scroll
        document.body.style.overflow = overflow;
        document.body.style.marginRight = marginRight;
      };
    }
  }, [lock, scrollBarWidth]);
};

export default useLockBodyScroll;
