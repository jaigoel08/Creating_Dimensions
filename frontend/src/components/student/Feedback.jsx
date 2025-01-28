import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendFeedback } from "../../store/slices/studentSlice";

const Feedback = () => {
    const dispatch = useDispatch();
    const [feedback, setFeedback] = useState({
        name: "",
        message: ""
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(sendFeedback(feedback)).unwrap();
            setFeedback({ name: "", message: "" });
            setStatus({ type: 'success', message: 'Feedback sent successfully!' });
        } catch (error) {
            setStatus({ type: 'error', message: error.message || 'Failed to send feedback' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Send Feedback</h1>
                    <p className="text-gray-500">We value your thoughts and suggestions</p>
                </div>
                {status.message && (
                    <div className={`p-4 rounded-lg mb-4 ${
                        status.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'
                    }`}>
                        {status.message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                value={feedback.name}
                                onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                            <textarea
                                value={feedback.message}
                                onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm h-32"
                                placeholder="Write your message here..."
                                required
                            />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1"
                    >
                        Send Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
