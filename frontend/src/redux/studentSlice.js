import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Fetch all Students
export const fetchStudents = createAsyncThunk(
  "view all students",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get("/staff/view-students", config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add new student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await axiosInstance.post(
        "/admin/add-student",
        studentData,
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

// Update student

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, studentData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, studentData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      await axiosInstance.delete(`/admin/delete-student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Add  fee record student
export const addFeeRecord = createAsyncThunk(
  "fees/addFeeRecord",
  async ({ studentId, feeData }, thunkAPI) => {
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
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message); 
    }
  }
);

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


// Initial State
const initialState = {
  students: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  feeStatus: "idle",
  feeError: null,
  libStatus: "idle",
  libError: null,
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
      state.feeStatus = "idle";
      state.feeError = null;
      state.libStatus = "idle";
      state.libError = null;
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
        state.students.push(action.payload.student);
        
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
        const index = state.students.findIndex(
          (student) => student._id === action.payload.id
        );
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
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Fee Record
      .addCase(addFeeRecord.pending, (state) => {
        state.feeStatus = "loading";
        state.feeError = null;
      })
      .addCase(addFeeRecord.fulfilled, (state, action) => {
        state.feeStatus = "succeeded";
        const { studentId, feesHistory } = action.payload;
        
        const student = state.students.find(
          (student) => student._id === studentId
        );
        // console.log(JSON.parse(JSON.stringify(student)))
        student.feesHistory.push(feesHistory);
        console.log(action.payload)
      })
      .addCase(addFeeRecord.rejected, (state, action) => {
        state.feeStatus = "failed";
        state.feeError = action.payload;
      })

      // Edit Fee Record
      .addCase(editFeeRecord.pending, (state) => {
        state.feeStatus = "loading";
        state.feeError = null;
      })
      .addCase(editFeeRecord.fulfilled, (state, action) => {
        state.feeStatus = "succeeded";
        const { studentId, feeId, feesHistory } = action.payload;
        const student = state.students.find(
          (student) => student._id === studentId
        );

        if (student && student.feesHistory) {
          student.feesHistory = student.feesHistory.map((feeRecord) =>
            feeRecord._id === feeId
          ? { ...feeRecord, ...feesHistory }
          : feeRecord
        );
        }
      })
      .addCase(editFeeRecord.rejected, (state, action) => {
        state.feeStatus = "failed";
        state.feeError = action.payload;
      })

      // Add Library Record
            .addCase(addLibraryRecord.pending, (state) => {
              state.libStatus = "loading";
            })
            .addCase(addLibraryRecord.fulfilled, (state, action) => {
              state.libStatus = "succeeded";
              console.log(action.payload)

              const {studentId, libraryHistory} = action.payload
              const student = state.students.find(
                (student) => student._id === studentId
              );
              
              student.libraryHistory.push(libraryHistory)
            })
            .addCase(addLibraryRecord.rejected, (state, action) => {
              state.libStatus = "failed";
              state.libError = action.payload;
            })
      
          // Edit Library Record
            .addCase(editLibraryRecord.pending, (state) => {
              state.libStatus = "loading";
            })
            .addCase(editLibraryRecord.fulfilled, (state, action) => {
              state.libStatus = "succeeded";
              const { studentId, libraryId, libraryHistory } = action.payload;
              const student = state.students.find(
                (student) => student._id === studentId
              );
      
              if (student && student.libraryHistory) {
                student.libraryHistory = student.libraryHistory.map((libRecord) =>
                  libRecord._id === libraryId
                ? { ...libRecord, ...libraryHistory }
                : libRecord
              );
              }
            })
            .addCase(editLibraryRecord.rejected, (state, action) => {
              state.libStatus = "failed";
              state.libError = action.payload;
            });
  },
});

export const { resetState } = studentSlice.actions;
export default studentSlice.reducer;
