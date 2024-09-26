import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PaletteMode } from "@mui/material";
import { setMode } from "../../redux/features/preferences/preferencesSlice";

export function useMode() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.preferences.mode);

  const changeMode = (mode: PaletteMode) => {
    dispatch(setMode(mode));
  };

  return {
    mode,
    changeMode,
  };
}
