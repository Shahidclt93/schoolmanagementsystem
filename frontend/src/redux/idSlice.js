import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feeId: null,
  libraryId: null,
};
 // Deep nested ids
const idSlice = createSlice({
  name: 'ids',
  initialState,
  reducers: {
    setFeeId(state, action) {
      state.feeId = action.payload;
    },
    clearFeeId(state) {
      state.feeId = null;
    },
    setLibraryId(state, action) {
      state.libraryId = action.payload;
    },
    clearLibraryId(state) {
      state.libraryId = null;
    },
  },
});

export const { setFeeId, clearFeeId, setLibraryId, clearLibraryId } = idSlice.actions;

export default idSlice.reducer;
