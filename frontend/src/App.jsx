import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import NavBar from "./nav/NavBar";
import Profile from "./components/auth/Profile";
import EditProfile from "./components/auth/EditProfile";
import ForgotPassword from "./components/auth/ForgotPassword";
import Logout from "./components/auth/Logout";
import ViewNotes from "./components/admin/ViewNotes";
import ViewStudents from "./components/admin/ViewStudents";
import EditNotes from "./components/admin/EditNotes";
import UploadNotes from "./components/admin/UploadNotes";

import Home from "./components/common/Home";
import FetchNote from "./components/student/FetchNote";
import MyNote from "./components/student/MyNote";
import Feedback from "./components/student/Feedback";
import Mentor from "./components/student/Mentor";



function App() {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  // Protected Route Component
  const StudentRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    if (role !== 'student') {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Student Protected Routes */}
            <Route 
              path="/view-note" 
              element={
                <StudentRoute>
                  <FetchNote />
                </StudentRoute>
              } 
            />
            <Route 
              path="/my-note" 
              element={
                <StudentRoute>
                  <MyNote />
                </StudentRoute>
              } 
            />
            <Route 
              path="/feedback" 
              element={
                <StudentRoute>
                  <Feedback />
                </StudentRoute>
              } 
            />
            <Route 
              path="/mentor" 
              element={
                <StudentRoute>
                  <Mentor />
                </StudentRoute>
              } 
            />
            {/* Protected Routes */}
            <Route 
              path="/profile" 
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/auth/update/:id" 
              element={isLoggedIn ? <EditProfile /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/upload-notes" 
              element={
                isLoggedIn && role === 'admin' ? 
                <UploadNotes /> : 
                <Navigate to="/login" />
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/view-notes" 
              element={
                isLoggedIn && role === 'admin' ? 
                <ViewNotes /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/view-students" 
              element={
                isLoggedIn && role === 'admin' ? 
                <ViewStudents /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/edit-notes/:noteId" 
              element={
                isLoggedIn && role === 'admin' ? 
                <EditNotes /> : 
                <Navigate to="/login" />
              } 
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
