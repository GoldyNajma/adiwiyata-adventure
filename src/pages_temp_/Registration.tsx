import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Leaf, Sparkles, Users } from 'lucide-react';

const Registration = () => {
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
      setError('Masukkan namamu terlebih dahulu');
      return;
    }
    if (!className.trim()) {
      setError('Masukkan kelasmu terlebih dahulu');
      return;
    }
    register(name, className);
    navigate('/stage/0');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {i % 3 === 0 ? <Leaf className="w-6 h-6 text-white" /> : 
             i % 3 === 1 ? <Sparkles className="w-4 h-4 text-yellow-200" /> :
             <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
        ))}
      </div>

      <div className="max-w-lg w-full bg-white/95 rounded-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Header with character */}
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-blue-700 p-8 text-white text-center relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Siap Berpetualang? 🚀</h1>
            <p className="text-green-100 text-lg">Mari bergabung menjadi Pahlawan Adiwiyata!</p>
            
          </div>
        </div>

        {/* Registration Form */}
        <div className="p-8">
          {/* Welcome message */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Daftar Sekarang!</h2>
            <p className="text-gray-600">Cukup nama dan kelas, langsung main! 🎮</p>
          </div>

          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center animate-shake">
                  <span className="font-medium">Oops! {error}</span>
                </div>
              )}

              {/* Name Input */}
              <div className="mt-4 relative">
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  Siapa nama lengkapmu? ✨
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition-all duration-300 text-lg"
                  placeholder="Contoh: Budi Santoso"
                  maxLength={50}
                />
                <div className="absolute right-3 top-12">
                  {name && <span className="text-green-500 text-xl">✓</span>}
                </div>
              </div>

              {/* Class Input */}
              <div className="mt-4 relative">
                <label htmlFor="class" className="block text-sm font-bold text-gray-700 mb-2">
                  Kelas berapa nih? 📚
                </label>
                <input
                  type="text"
                  id="class"
                  value={className}
                  onChange={(e) => setClassName(e.target.value.toUpperCase())}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all duration-300 text-lg"
                  placeholder="Masukkan kelas saat ini"
                  maxLength={10}
                />
                <div className="absolute right-3 top-12">
                  {className && <span className="text-blue-500 text-xl">✓</span>}
                </div>
              </div>

              {/* Preview Card */}
              {name && className && (
                <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-4 animate-fade-in">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{name}</div>
                      <div className="text-sm text-gray-600">Kelas {className}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!name || !className}
                className={`mt-6 w-full font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform ${
                  name && className
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {name && className ? '🚀 Mulai Petualangan!' : 'Lengkapi data dulu ya!'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Registration;