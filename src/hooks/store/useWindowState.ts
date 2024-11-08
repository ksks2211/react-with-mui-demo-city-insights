import { throttle } from "lodash-es";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setScrollBarWidth,
  setScrollY,
} from "../../redux/features/windowState/windowStateSlice";
import { RootState } from "./../../redux/store";

export function useScrollY() {
  const scrollY = useSelector((state: RootState) => state.windowState.scrollY);
  return { scrollY };
}

export function useListenScrollY(wait = 500) {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScrollY = throttle(() => {
      dispatch(setScrollY(window.scrollY));
    }, wait);
    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [wait, dispatch]);
}

export function useListenBoxScrollY(
  ref: React.RefObject<HTMLDivElement>,
  wait = 250
) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current === null) return;

    const handleScrollY = throttle(() => {
      if (ref.current) {
        dispatch(setScrollY(ref.current.scrollTop));
      }
    }, wait);

    const element = ref.current;

    if (element) {
      element.addEventListener("scroll", handleScrollY);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScrollY);
      }
    };
  }, [dispatch, ref, wait]);
}

export function useScrollBarWidth() {
  const scrollBarWidth = useSelector(
    (state: RootState) => state.windowState.scrollBarWidth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getScrollbarWidth = () => {
      // Create a temporary element
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll"; // forces scrollbar to appear
      outer.style.width = "100px"; // set a fixed width

      outer.style.position = "absolute"; // Ensure it's positioned off-screen
      outer.style.top = "-9999px"; // Position off-screen
      document.body.appendChild(outer);

      // Create an inner element and append it to the outer
      const inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      // Calculate the width difference between the outer and the inner
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      // Clean up
      outer.parentNode?.removeChild(outer);

      return scrollbarWidth;
    };

    // Set the scrollbar width in state
    const width = getScrollbarWidth();

    // css variable
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${width}px`
    );

    // setScrollbarWidth(width);
    dispatch(setScrollBarWidth(width));
  }, [dispatch]); // Run once on component mount

  return { scrollBarWidth };
}
