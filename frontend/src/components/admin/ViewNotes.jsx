import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllNotes, deleteNote } from '../../store/slices/adminSlice';

const ViewNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notes, isLoading, error } = useSelector((state) => state.admin);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is admin
    if (role !== 'admin') {
      navigate('/');
      return;
    }

    // Fetch notes when component mounts
    const loadNotes = async () => {
      try {
        await dispatch(fetchAllNotes()).unwrap();
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    loadNotes();
  }, [dispatch, role, navigate]);

  const handleEdit = (noteId) => {
    navigate(`/edit-notes/${noteId}`);
  };

  const handleDelete = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const result = await dispatch(deleteNote(noteId)).unwrap();
        if (result) {
          // Refresh the notes list after successful deletion
          dispatch(fetchAllNotes());
        }
      } catch (error) {
        alert(error.message || 'Error deleting note');
      }
    }
  };

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Notes</h2>
        <button
          onClick={() => navigate('/upload-notes')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Upload New Note
        </button>
      </div>
      
      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note._id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 font-bold">{note.title}</h3>
              <p className="text-gray-600 mb-2 font-bold">Subject: {note.subject}</p>
              <p className="text-gray-600 mb-2"><span className="line-through font-bold"> Rs.{note.originalPrice}</span></p>
              <p className="text-gray-600 mb-4 font-bold">Discount Price: Rs.{note.discountPrice}</p>
              {note.pdfUrl && (
                <div className="mb-4">
                  <iframe
                    src={`http://localhost:3000/${note.pdfUrl}`}
                    className="w-full h-48 mb-2 border border-gray-300 rounded"
                    title={`PDF preview for ${note.title}`}
                  >
                    <p>Your browser does not support iframes. <a href={`http://localhost:3000/${note.pdfUrl}`} target="_blank" rel="noopener noreferrer">Click here to view the PDF</a></p>
                  </iframe>
                  <div className="flex space-x-2">
                    <a 
                      href={`http://localhost:3000/${note.pdfUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Full PDF
                    </a>
                    <span className="text-gray-400">|</span>
                    <a
                      href={`http://localhost:3000/${note.pdfUrl}`}
                      download
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(note._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewNotes;
