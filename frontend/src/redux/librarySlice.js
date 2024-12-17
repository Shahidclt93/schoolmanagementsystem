import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";




// Add library record for a student
export const addLibraryRecord = createAsyncThunk(
  "library/addLibraryRecord",
  async ({ studentId, recordData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token; 
      const response = await axiosInstance.post(
        `/librarian/student/${studentId}/library`,
        recordData,
        {
            headers: { Authorization: `Bearer ${token}` },
          }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Edit a library record for a student
export const editLibraryRecord = createAsyncThunk(
  "library/editLibraryRecord",
  async ({ studentId, libraryId, updatedData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token; 
      const response = await axiosInstance.put(

        `librarian/student/${studentId}/library/${libraryId}`,
        updatedData,
        {
            headers: { Authorization: `Bearer ${token}` },
          }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice
const librarySlice = createSlice({
  name: "library",
  initialState: {
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
   

    // Add Library Record
    builder
      .addCase(addLibraryRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLibraryRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Handle the addition logic if needed
      })
      .addCase(addLibraryRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Edit Library Record
    builder
      .addCase(editLibraryRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editLibraryRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Handle the edit logic if needed
      })
      .addCase(editLibraryRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export default librarySlice.reducer;
