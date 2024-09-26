import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  isNavOpen: boolean;
  isHeaderVisible: boolean;
  isOverlayOpen: boolean;
}

export const initialState: LayoutState = {
  isNavOpen: false,
  isHeaderVisible: true,
  isOverlayOpen: false,
};

const layoutStateSlice = createSlice({
  name: "layoutState",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.isNavOpen = !state.isNavOpen;
    },
    setNav: (state, action: PayloadAction<boolean>) => {
      state.isNavOpen = action.payload;
    },
    setHeaderVisibility: (state, action: PayloadAction<boolean>) => {
      state.isHeaderVisible = action.payload;
    },
    setOverlayState: (state, action: PayloadAction<boolean>) => {
      state.isOverlayOpen = action.payload;
    },
  },
});

export const { toggleNav, setNav, setHeaderVisibility, setOverlayState } =
  layoutStateSlice.actions;
export default layoutStateSlice.reducer;
