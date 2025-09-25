import { Link } from 'react-router-dom';
import { Leaf, Trophy, Star, Zap, ArrowRight } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {i % 4 === 0 ? <Leaf className="w-6 h-6 text-white" /> : 
             i % 4 === 1 ? <Star className="w-4 h-4 text-yellow-200" /> :
             i % 4 === 2 ? <Trophy className="w-5 h-5 text-yellow-300" /> :
             <div className="w-3 h-3 bg-white rounded-full"></div>}
          </div>
        ))}
      </div>

      <div className="max-w-5xl w-full bg-white/95 rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <Zap className="absolute top-8 left-8 w-8 h-8 text-yellow-300 opacity-50 animate-pulse" />
            <Star className="absolute top-16 right-16 w-6 h-6 text-yellow-200 opacity-40 animate-pulse delay-1000" />
            <Trophy className="absolute bottom-8 left-16 w-7 h-7 text-yellow-100 opacity-30 animate-pulse delay-500" />
          </div>
          
          <div className="mt-8 relative z-10">
            <div className="flex justify-center mb-6 ">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 animate-bounce">
                <Leaf className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Adiwiyata Adventure
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-6 animate-fade-in-delayed">
              Bergabunglah dalam petualangan seru wujudkan sekolah yang hijau! Jadilah pahlawan Adiwiyata dan pelajari cara menjaga lingkungan untuk bumi yang lebih baik.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-4xl mx-auto">
            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Feature 1: 7 Tahap Learning */}
              <div className="group bg-white rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-green-200 hover:border-green-400">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:from-green-600 group-hover:to-green-700 transition-colors">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-green-800 mb-3 text-xl">7 Tahap Petualangan</h3>
                <p className="text-green-600 leading-relaxed">
                  Jelajahi setiap aspek Adiwiyata melalui pembelajaran interaktif yang dirancang khusus untuk siswa SMP
                </p>
              </div>

              {/* Feature 2: Interactive Quiz */}
              <div className="group bg-white rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-blue-200 hover:border-blue-400">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:from-blue-600 group-hover:to-blue-700 transition-colors">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-blue-800 mb-3 text-xl">Kuis Interaktif</h3>
                <p className="text-blue-600 leading-relaxed">
                  Uji pemahamanmu dengan kuis menarik di setiap tahap. Dapatkan poin dan raih skor tertinggi!
                </p>
              </div>

              {/* Feature 3: Leaderboard Competition */}
              <div className="group bg-white rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-yellow-200 hover:border-yellow-400">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:from-yellow-600 group-hover:to-orange-600 transition-colors">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-yellow-800 mb-3 text-xl">Papan Juara</h3>
                <p className="text-yellow-700 leading-relaxed">
                  Bersaing dengan teman-temanmu! Lihat siapa yang paling paham tentang lingkungan hidup
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="p-8 md:p-12 text-center bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Siap Menjadi Pahlawan Adiwiyata?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan penjelajah lain yang sudah memulai perjalanan mereka mewujudkan sekolah yang lebih hijau!
          </p>
          
          <div className="max-w-md mx-auto">
           <Link to="/register" 
              onClick={() => {
                // Navigate to registration page
                console.log('Navigate to /register');
              }}
              className="group inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl text-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <span>Mulai Petualangan Sekarang!</span>
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 text-center border-t">
          <p className="text-sm text-gray-600">
            Adiwiyata Adventure
          </p>
          <p className="text-xs text-gray-500 mt-1">
            SMP Negeri 1 Gedangan
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate3d(0, 0, 0) rotate(0deg); 
          }
          50% { 
            transform: translate3d(0, -30px, 0) rotate(180deg); 
          }
        }
        
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in-delayed {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-float { 
          animation: float 6s ease-in-out infinite; 
          will-change: transform, opacity;
        }
        .animate-fade-in { 
          animation: fade-in 1s ease-out; 
        }
        .animate-fade-in-delayed { 
          animation: fade-in-delayed 1s ease-out 0.5s both; 
        }
      `}</style>
    </div>
  );
};

export default Welcome;