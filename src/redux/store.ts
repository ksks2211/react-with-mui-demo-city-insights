import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./features/preferences/preferencesSlice";
import windowStateReducer from "./features/windowState/windowStateSlice";
import layoutStateReducer from "./features/layoutState/layoutStateSlice";

const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    windowState: windowStateReducer,
    layoutState: layoutStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
