import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllStudents } from '../../store/slices/adminSlice';

const ViewStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, isLoading, error } = useSelector((state) => state.admin);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      return;
    }
    dispatch(fetchAllStudents());
  }, [dispatch, role, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">All Students</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">{student.role}</td>
                <td className="px-6 py-4">
                  {new Date(student.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudents;
