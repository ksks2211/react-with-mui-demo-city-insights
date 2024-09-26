import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { throttle } from "lodash-es";
import { setScrollY } from "../../redux/features/windowState/windowStateSlice";

export function useScrollY() {
  const scrollY = useSelector((state: RootState) => state.windowState.scrollY);
  return { scrollY };
}

export function useListenScrollY(wait = 250) {
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
