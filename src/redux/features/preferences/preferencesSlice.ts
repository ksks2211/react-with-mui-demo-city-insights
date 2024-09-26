import type { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface PreferencesState {
  mode:PaletteMode;
}


export const initialState : PreferencesState = {
  mode:'light'
};




const preferencesSlice = createSlice({
  name:"preferences",
  initialState, 
  reducers:{
    setMode:(state,action:PayloadAction<PaletteMode>)=>{
      state.mode = action.payload;
    }
  }
})



export const {setMode} = preferencesSlice.actions
export default preferencesSlice.reducer





