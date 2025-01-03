import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Modetate {
  value: string;
}

const initialState: Modetate = {
  value: "light",
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const {setValue } = modeSlice.actions;

export default modeSlice.reducer;