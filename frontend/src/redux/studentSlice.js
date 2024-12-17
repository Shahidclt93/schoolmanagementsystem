import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance"


// Fetch all Students
export const fetchStudents = createAsyncThunk("view all students", async (token, thunkAPI) => {
  try {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
    const response = await axiosInstance.get("/staff/view-students",config);
    return response.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Add new student
export const addStudent = createAsyncThunk("students/addStudent", async (studentData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token; 

    const response = await axiosInstance.post("/admin/add-student",studentData,
        {
          headers: { Authorization: `Bearer ${token}` },
  });
    return response.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Update student

export const updateStudent = createAsyncThunk("students/updateStudent", async ({ id, studentData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Delete student
export const deleteStudent = createAsyncThunk("students/deleteStudent", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token; 

    await axiosInstance.delete(`/admin/delete-student/${id}` , {
      headers: { Authorization: `Bearer ${token}` },
});
    return id; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Initial State
const initialState = {
  students: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

// Student Slice
const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    resetState: (state) => {
      state.students = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload.students;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Student
      .addCase(addStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Student
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.students.findIndex((student) => student.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = state.students.filter((student) => student.id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetState } = studentSlice.actions;
export default studentSlice.reducer;
