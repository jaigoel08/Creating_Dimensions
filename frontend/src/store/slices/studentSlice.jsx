import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

// Add request interceptor to add token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const initialState = {
    notes: [],
    myNotes: [],
    isLoading: false,
    error: null,
}

export const fetchNotes = createAsyncThunk(
    'student/fetchNotes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/student/notes');
            return response.data.notes;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to fetch notes' }
            );
        }
    }
);

export const fetchMyNotes = createAsyncThunk(
    'student/fetchMyNotes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/student/my-notes');
            return response.data.notes;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: 'Failed to fetch my notes' }
            );
        }
    }
);

export const sendFeedback = createAsyncThunk(
    'student/sendFeedback',
    async (feedback, { rejectWithValue }) => {
        try {
            const response = await api.post('/student/feedback', feedback);
            return response.data;
        } catch (error) {
            if (error.response) {
                // Server responded with an error
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                // Request was made but no response
                return rejectWithValue({ message: 'No response from server' });
            } else {
                // Something else went wrong
                return rejectWithValue({ message: error.message });
            }
        }
    }
);

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to fetch notes';
            })
            .addCase(fetchMyNotes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myNotes = action.payload;
            })
            .addCase(fetchMyNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to fetch my notes';
            })
            .addCase(sendFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendFeedback.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(sendFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Failed to send feedback';
            });
    }
});

export const { clearError } = studentSlice.actions;
export default studentSlice.reducer;
