import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../../store/slices/studentSlice";

const FetchNote = () => {
    const dispatch = useDispatch();
    const { notes, isLoading, error } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Available Notes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                    <div key={note._id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                        <p className="text-gray-600 mb-2">Subject: {note.subject}</p>
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-green-600 font-semibold">₹{note.discountPrice}</p>
                            <p className="text-gray-400 line-through">₹{note.originalPrice}</p>
                        </div>
                        {note.locked && (
                            <div className="mb-4">
                               This is a good quality notes collection of {note.title} of {note.subject}. You can buy these notes and download them
                                
                            </div>
                        )}
                        <div className="mt-4 flex justify-between items-center">
                            {note.locked ? (
                                <div className="flex items-center text-red-500">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Locked</span>
                                </div>
                            ) : (
                                <div className="flex items-center text-green-500">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                    <span>Unlocked</span>
                                </div>
                            )}
                            <button 
                                className={`px-4 py-2 rounded-full ${
                                    note.locked 
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                        : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                            >
                                {note.locked ? 'Buy Now' : 'Download PDF'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FetchNote;
