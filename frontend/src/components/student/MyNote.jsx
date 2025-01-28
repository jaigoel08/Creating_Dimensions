import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyNotes } from "../../store/slices/studentSlice";

const MyNote = () => {
    const dispatch = useDispatch();
    const { myNotes, isLoading, error } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(fetchMyNotes());
    }, [dispatch]);

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Notes</h1>
            {myNotes.length === 0 ? (
                <div className="text-center text-gray-600 py-8">
                    You haven't purchased any notes yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {myNotes.map((note) => (
                        <div key={note._id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                            <p className="text-gray-600 mb-4">Subject: {note.subject}</p>
                            <div className="flex justify-between items-center">
                                <a 
                                    href={note.pdfUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-500 hover:text-blue-700"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    View PDF
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyNote;
