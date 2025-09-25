import React from 'react';
import { Link } from 'react-router-dom';
import { LeafIcon } from 'lucide-react';
const Welcome: React.FC = () => {
  // return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
  return <div className="min-h-screen flex flex-col items-center justify-center bg-transparent p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 p-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <LeafIcon className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Adiwiyata Adventure
          </h1>
          <p className="mt-2 text-green-100">
            Pelajari tentang pelestarian lingkungan dan jadilah juara Adiwiyata!
          </p>
        </div>
        <div className="p-6 md:p-8">
          {/* <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              What is Adiwiyata?
            </h2>
            <p className="text-gray-700">
              Adiwiyata is an environmental education program that encourages
              schools to develop environmentally friendly policies, curriculum,
              activities, and infrastructure. Through this interactive
              adventure, you'll learn all about the six key aspects of Adiwiyata
              and test your knowledge with fun quizzes!
            </p>
          </div> */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <LeafIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">
                  7 Tahap Pembelajaran
                </h3>
                <p className="text-sm text-gray-600">
                  Jelajahi 7 tahap interaktif tentang Adiwiyata!
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <LeafIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">
                  Jawab Kuis
                </h3>
                <p className="text-sm text-gray-600">
                  Uji pengetahuanmu dengan kuis di setiap tahap!
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <LeafIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">Leaderboard</h3>
                <p className="text-sm text-gray-600">
                  Lihat peringkatmu dibandingkan dengan siswa lain!
                </p>
              </div>
            </div>
          </div>
          <Link to="/register" className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-300">
            Mulai Penjelajahanmu!
          </Link>
        </div>
      </div>
      {/* <p className="mt-6 text-sm text-green-800">
        Created for middle school environmental education
      </p> */}
    </div>;
};
export default Welcome;