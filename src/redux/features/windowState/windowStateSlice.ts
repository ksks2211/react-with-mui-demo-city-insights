import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WindowState {
  scrollY: number;
  scrollBarWidth: number;
  direction: "up" | "down";
}

export const initialState: WindowState = {
  scrollY: 0,
  scrollBarWidth: 0,
  direction: "down",
};

const windowStateSlice = createSlice({
  name: "windowState",
  initialState,
  reducers: {
    setScrollY: (state, action: PayloadAction<number>) => {
      if (state.scrollY > action.payload) {
        state.direction = "up";
      } else if (state.scrollY < action.payload) {
        state.direction = "down";
      }
      state.scrollY = action.payload;
    },
    setScrollBarWidth: (state, action: PayloadAction<number>) => {
      state.scrollBarWidth = action.payload;
    },
  },
});

export const { setScrollY, setScrollBarWidth } = windowStateSlice.actions;

export default windowStateSlice.reducer;
