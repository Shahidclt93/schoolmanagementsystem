import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Add  fee record student
export const addFeeRecord = createAsyncThunk(
  "fees/addFeeRecord",
  async ({studentId, feeData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token; 
      const response = await axiosInstance.post(
        `staff/student/${studentId}/fee`,
        feeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message); 
    }
  }
);

// Edit fee record student
export const editFeeRecord = createAsyncThunk(
  "fees/editFeeRecord",
  async ({ studentId, feeId, feeData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token; // Get token from auth state
      const response = await axiosInstance.put(
        `staff/student/${studentId}/fee/${feeId}`,
        feeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the updated fee record
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message); // Handle error
    }
  }
);

const initialState = {
  feeRecords: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

// Slice 
const feesSlice = createSlice({
  name: "fees",
  initialState,
  reducers: {
    resetState: (state) => {
      state.feeRecords = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Fee Record
      .addCase(addFeeRecord.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addFeeRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feeRecords.push(action.payload); 
      })
      .addCase(addFeeRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      })

      // Edit Fee Record
      .addCase(editFeeRecord.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editFeeRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { feeId, ...updatedData } = action.payload;
        state.feeRecords = state.feeRecords.map((feeRecord) =>
          feeRecord.id === feeId ? { ...feeRecord, ...updatedData } : feeRecord
        );
      })
      .addCase(editFeeRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      });
  },
});

export const { resetState } = feesSlice.actions;

export default feesSlice.reducer;
