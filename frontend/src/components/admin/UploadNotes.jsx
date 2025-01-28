import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadNotes } from '../../store/slices/adminSlice';
import { useDispatch } from 'react-redux';


const UploadNotes = () => {
  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    originalPrice: '',
    discountPrice: '',
    pdfFile: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for token when component mounts
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to upload notes');
      navigate('/login');
    }
  }, [navigate]);

  // Redirect if not admin
  if (role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      pdfFile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to upload notes');
      navigate('/login');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('originalPrice', formData.originalPrice);
    formDataToSend.append('discountPrice', formData.discountPrice);
    formDataToSend.append('pdfFile', formData.pdfFile);

    try {
      const result = await dispatch(uploadNotes(formDataToSend)).unwrap();
      alert(result.message || 'Notes uploaded successfully!');
      setFormData({
        title: '',
        subject: '',
        originalPrice: '',
        discountPrice: '',
        pdfFile: null
      });
      navigate('/');
    } catch (error) {
      if (error.message === 'Please login again to upload notes') {
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login');
      }
      alert(error.message || 'Error uploading notes');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Notes</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
            placeholder="Title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
            placeholder="Subject"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
            placeholder="Original Price"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
            placeholder="Discount Price"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">PDF File</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp"
            onChange={handleFileChange}
            className="w-full p-2 border rounded focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Uploading...' : 'Upload Notes'}
        </button>
      </form>
    </div>
  );
};

export default UploadNotes;
