import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorMessages from '../common/ErrorMessages';

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const roleRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMessages(['Passwords do not match']);
      return;
    }


    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
          role: roleRef.current.value,
        }),
       
      });

      const data = await response.json();
      if (response.status === 201) {
        navigate("/login");
      } else {
        setErrorMessages(data.errors ? data.errors.map(err => err.msg) : [data.message]);
      }
    } catch (error) {
      setErrorMessages([error.message]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div>
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-2">Sign Up</h1>
          <p className="text-center text-gray-600 text-sm">Create your account to get started</p>
        </div>

        <ErrorMessages errorMessages={errorMessages} />

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-6">
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
                  required
                  placeholder="Enter your email address"
                />
                
              </div>
            </div>

          

            <div className="mb-6">
              <label htmlFor="userType" className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
              <select
                id="role"
                ref={roleRef}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
                required
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
                required
                placeholder="Create a strong password"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                ref={confirmPasswordRef}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
                required
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 transform hover:scale-[1.02]"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;
