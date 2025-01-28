import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  students: [],
  isLoading: false,
  error: null,
};
export const uploadNotes = createAsyncThunk(
  'admin/uploadNotes',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      // Check if token exists
      if (!token) {
        return rejectWithValue({ message: 'Authentication token not found' });
      }

      // Log token for debugging (remove in production)
      console.log('Token being sent:', token);

      const response = await axios.post(
        'http://localhost:3000/admin/upload-notes', 
        formData, 
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Upload error:', error.response || error);
      if (error.response?.status === 401) {
        return rejectWithValue({ message: 'Please login again to upload notes' });
      }
      return rejectWithValue({ 
        message: error.response?.data?.message || 'Error uploading notes'
      });
    }
  }
);

export const fetchAllNotes = createAsyncThunk(
  'admin/fetchAllNotes',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        return rejectWithValue({ message: 'Authentication token not found' });
      }

      console.log('Fetching notes with token:', token);

      const response = await axios.get('http://localhost:3000/admin/notes', {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });

      console.log('Notes response:', response.data);

      // Check if response.data.notes exists, otherwise use response.data
      const notes = response.data.notes || response.data;
      
      if (!notes) {
        throw new Error('No notes data in response');
      }

      return notes;
    } catch (error) {
      console.error('Error fetching notes:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch notes'
      );
    }
  }
);

export const fetchAllStudents = createAsyncThunk(
  'admin/fetchAllStudents',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:3000/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNote = createAsyncThunk(
  'admin/updateNote',
  async ({ noteId, noteData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue({ message: 'Authentication token not found' });
      }

      const response = await axios.patch(
        `http://localhost:3000/admin/notes/${noteId}`,
        { ...noteData, noteId }, // Include noteId in the request body
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Update error:', error);
      return rejectWithValue(error.response?.data || { message: 'Error updating note' });
    }
  }
);

export const deleteNote = createAsyncThunk(
  'admin/deleteNote',
  async (noteId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue({ message: 'Authentication token not found' });
      }

      await axios.delete(`http://localhost:3000/admin/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { noteId } // Include noteId in the request body
      });

      return noteId; // Return the noteId for state updates
    } catch (error) {
      console.error('Delete error:', error);
      return rejectWithValue(error.response?.data || { message: 'Error deleting note' });
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    uploadNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note._id !== action.payload);
    },  
    updateNote: (state, action) => {
      const index = state.notes.findIndex(note => note._id === action.payload._id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    fetchNotes: (state, action) => {

      state.notes = action.payload;

    },
    fetchStudents: (state, action) => {
      state.students = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload;
        state.error = null;
        console.log('Notes stored in state:', state.notes);
      })
      .addCase(fetchAllNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch notes';
        console.error('Notes fetch failed:', state.error);
      })
      .addCase(fetchAllStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
        state.error = null;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note._id !== action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note._id === action.payload._id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(uploadNotes.fulfilled, (state, action) => {
        if (action.payload.note) {
          state.notes.push(action.payload.note);
        }
        state.error = null;
      })
      .addCase(uploadNotes.rejected, (state, action) => {
        state.error = action.payload?.message || 'An error occurred';
      });
  },
});

export const { addNote  } = adminSlice.actions;
export default adminSlice.reducer;
