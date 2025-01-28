import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { notes } = useSelector((state) => state.admin);
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-indigo-900 sm:text-5xl md:text-6xl animate-pulse hover:scale-105 transition-transform duration-300">
           
            Welcome to Creating Dimensions 
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Empowering students with knowledge and creativity
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-12 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm">
              Quote 
            </span>
          </div>
          <blockquote className="text-xl italic text-gray-700 text-center">
            {notes.length > 0 && notes[0]?.quote ? (
              notes[0].quote
            ) : (
              "Education is not preparation for life; education is life itself."
            )}
          </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="text-indigo-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Content</h3>
            <p className="text-gray-600">Access high-quality educational materials curated by experts.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="text-indigo-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Access</h3>
            <p className="text-gray-600">Download and access your study materials anytime, anywhere.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="text-indigo-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-600">Join a community of learners and share knowledge.</p>
          </div>
        </div>
        
        <div className="text-center">
          {!useSelector((state) => state.auth.isLoggedIn) && (
            <div className="bg-indigo-100 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">
                Ready to start your learning journey?
              </h2>
              <Link
                to="/signup"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transform hover:scale-105 transition duration-300 hover:shadow-lg"
              >
                Sign Up Now
              </Link>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Home;
