import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateNote } from '../../store/slices/adminSlice';

const EditNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { notes } = useSelector((state) => state.admin);
  const { role } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    originalPrice: '',
    discountPrice: ''
  });

  useEffect(() => {
    // Check if user is admin
    if (role !== 'admin') {
      navigate('/');
      return;
    }

    // Find the note to edit
    const noteToEdit = notes.find(note => note._id === noteId);
    if (noteToEdit) {
      setFormData({
        title: noteToEdit.title,
        subject: noteToEdit.subject,
        originalPrice: noteToEdit.originalPrice,
        discountPrice: noteToEdit.discountPrice
      });
    } else {
      navigate('/view-notes');
    }
  }, [noteId, notes, navigate, role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateNote({ 
        noteId, 
        noteData: {
          title: formData.title,
          subject: formData.subject,
          originalPrice: parseFloat(formData.originalPrice),
          discountPrice: parseFloat(formData.discountPrice)
        }
      })).unwrap();
      
      if (result.success) {
        alert('Note updated successfully!');
        navigate('/view-notes');
      } else {
        alert(result.message || 'Failed to update note');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert(error?.message || 'An error occurred while updating the note');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Edit Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Note
          </button>
          <button
            type="button"
            onClick={() => navigate('/view-notes')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotes;
