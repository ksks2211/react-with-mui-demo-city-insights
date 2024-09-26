import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WindowState {
  scrollY: number;
}

export const initialState: WindowState = {
  scrollY: 0,
};

const windowStateSlice = createSlice({
  name: "windowState",
  initialState,
  reducers: {
    setScrollY: (state, action: PayloadAction<number>) => {
      state.scrollY = action.payload;
    },
  },
});

export const { setScrollY } = windowStateSlice.actions;

export default windowStateSlice.reducer;
