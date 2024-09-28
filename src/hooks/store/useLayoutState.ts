import { useDispatch, useSelector } from "react-redux";
import {
  setHeaderVisibility,
  setNav,
  setOverlayState,
} from "../../redux/features/layoutState/layoutStateSlice";
import { RootState } from "../../redux/store";

export function useHeaderVisibility() {
  const isHeaderVisible = useSelector(
    (state: RootState) => state.layoutState.isHeaderVisible
  );
  const dispatch = useDispatch();

  const showHeader = () => {
    dispatch(setHeaderVisibility(true));
  };

  const hideHeader = () => {
    dispatch(setHeaderVisibility(false));
  };

  return { isHeaderVisible, showHeader, hideHeader };
}

export function useNavOpen() {
  const isNavOpen = useSelector(
    (state: RootState) => state.layoutState.isNavOpen
  );
  const dispatch = useDispatch();

  const closeNav = () => {
    dispatch(setNav(false));
  };

  const openNav = () => {
    dispatch(setNav(true));
  };

  return { isNavOpen, closeNav, openNav };
}

export function useOverlay() {
  const isOverlayOpen = useSelector(
    (state: RootState) => state.layoutState.isOverlayOpen
  );
  const dispatch = useDispatch();

  const openOverlay = () => {
    dispatch(setOverlayState(true));
  };

  const closeOverlay = () => {
    dispatch(setOverlayState(false));
  };

  return { isOverlayOpen, openOverlay, closeOverlay };
}
