import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import studentReducer from "./slices/studentSlice";

import adminReducer from "./slices/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    student: studentReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;