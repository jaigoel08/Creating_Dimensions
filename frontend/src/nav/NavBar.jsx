import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../store/slices/authSlice';
import { useState } from 'react';


const NavBar = () => {
  const { isLoggedIn, role } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home + Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 sm:px-5 py-2 rounded-full text-sm font-medium transition duration-300 border m-10">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="hidden sm:block">Home</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn && role === 'admin' && (
                <>
                  <Link to="/upload-notes" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Upload Notes
                  </Link>
                  <Link to="/view-notes" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Notes
                  </Link>
                  <Link to="/view-students" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    View Students
                  </Link>
                </>
              )}

              {isLoggedIn && role === 'student' && (
                <>
                  <Link to="/view-note" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Notes
                  </Link>
                  <Link to="/my-note" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Notes
                  </Link>
                  <Link to="/feedback" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Feedback
                  </Link>
                  <Link to="/mentor" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Talk to Mentor
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 hover:bg-indigo-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </Link>
                <Link to="/signup" className="flex items-center bg-indigo-600 text-white hover:bg-indigo-500 px-3 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-xl transition duration-300 border">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link to='/profile' className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">Profile</Link>
                <button onClick={handleLogout} className="flex items-center text-white hover:text-red-200 hover:bg-red-600 px-3 py-2 rounded-full text-sm font-medium transition duration-300 border">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isLoggedIn && role === 'admin' && (
                <>
                  <Link to="/upload-notes" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    Upload Notes
                  </Link>
                  <Link to="/view-notes" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    View Notes
                  </Link>
                  <Link to="/view-students" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    View Students
                  </Link>
                </>
              )}

              {isLoggedIn && role === 'student' && (
                <>
                  <Link to="/view-note" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    View Notes
                  </Link>
                  <Link to="/my-note" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    My Notes
                  </Link>
                  <Link to="/feedback" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    Feedback
                  </Link>
                  <Link to="/mentor" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    Talk to Mentor
                  </Link>
                </>
              )}

              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    Login
                  </Link>
                  <Link to="/signup" className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/profile' className="flex items-center text-white hover:text-indigo-200 hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="flex w-full items-center text-white hover:text-red-200 hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;