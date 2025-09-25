import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { LeafIcon } from 'lucide-react';
const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');
  const {
    register
  } = useUser();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!className.trim()) {
      setError('Please enter your class');
      return;
    }
    register(name, className);
    navigate('/stage/0');
  };
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 p-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <LeafIcon className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Bergabunglah dalam Penjelajahan!</h1>
          <p className="mt-1 text-green-100">
            Daftar untuk mulai menjelajahi Adiwiyata
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Masukkan Namamu!
              </label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors" placeholder="Masukkan nama lengkapmu" />
            </div>
            <div className="mb-6">
              <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                Masukkan Kelasmu!
              </label>
              <input type="text" id="class" value={className} onChange={e => setClassName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors" placeholder="Contoh: 7A, 8B, 9C" />
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-300">
              Mulai Penjelajahan!
            </button>
          </form>
        </div>
      </div>
    </div>;
};
export default Registration;