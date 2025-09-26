import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { TrophyIcon, HomeIcon, RefreshCwIcon, DownloadIcon, ChevronDownIcon, FileTextIcon, FileSpreadsheetIcon } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import * as XLSX from 'xlsx';

interface LeaderboardEntry {
  name: string;
  className: string;
  totalScore: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const {
    user,
    resetProgress
  } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLeaderboardLoading(true);
        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);

        const fetchedLeaderboard: LeaderboardEntry[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Only include registered users who have completed at least one stage (totalScore > 0)
          if (data.isRegistered && data.totalScore > 0) {
            fetchedLeaderboard.push({
              name: data.name,
              className: data.className,
              totalScore: data.totalScore
            });
          }
        });

        // Sort the leaderboard in memory by totalScore, descending
        fetchedLeaderboard.sort((a, b) => b.totalScore - a.totalScore);
        
        setLeaderboard(fetchedLeaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLeaderboardLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);

  const getUserRank = () => {
    const userIndex = leaderboard.findIndex(entry => entry.name === user.name && entry.className === user.className);
    return userIndex >= 0 ? userIndex + 1 : '-';
  };
  
  const handlePlayAgain = () => {
    resetProgress();
    navigate('/register');
  };

  const getFileName = (extension: string) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID').replace(/\//g, '-');
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '');
    return `leaderboard-adiwiyata-${dateStr}-${timeStr}.${extension}`;
  };

  const exportToExcel = () => {
    setIsExporting(true);
    setShowExportMenu(false);
    
    try {
      // Prepare data for Excel
      const excelData = [
        ['Peringkat', 'Nama', 'Kelas', 'Skor Total'], // Headers
        ...leaderboard.map((entry, index) => [
          index + 1,
          entry.name,
          entry.className,
          entry.totalScore
        ])
      ];
      
      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      
      // Set column widths
      ws['!cols'] = [
        { wch: 10 }, // Peringkat
        { wch: 25 }, // Nama
        { wch: 15 }, // Kelas
        { wch: 12 }  // Skor Total
      ];
      
      // Style the header row
      const headerRange = XLSX.utils.decode_range(ws['!ref'] || 'A1');
      for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!ws[cellRef]) continue;
        ws[cellRef].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "E5F3E5" } }
        };
      }
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Leaderboard Adiwiyata');
      
      // Save file
      XLSX.writeFile(wb, getFileName('xlsx'));
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Terjadi kesalahan saat mengekspor Excel. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = () => {
    setIsExporting(true);
    setShowExportMenu(false);
    
    try {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Popup diblokir. Silakan izinkan popup untuk mengekspor PDF.');
        setIsExporting(false);
        return;
      }
      
      // Generate HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Leaderboard Adiwiyata</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              color: #333;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px;
              border-bottom: 2px solid #16a34a;
              padding-bottom: 20px;
            }
            .header h1 { 
              color: #16a34a; 
              margin-bottom: 5px;
              font-size: 24px;
            }
            .header p { 
              color: #666; 
              margin-bottom: 10px;
            }
            .export-info {
              font-size: 12px;
              color: #888;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 12px 8px; 
              text-align: left;
            }
            th { 
              background-color: #f8f9fa; 
              font-weight: bold;
              color: #16a34a;
            }
            .rank-medal { 
              font-size: 18px; 
              margin-right: 5px;
            }
            tr:nth-child(even) { 
              background-color: #f9f9f9; 
            }
            tr:hover { 
              background-color: #f5f5f5; 
            }
            .total-count {
              margin-top: 20px;
              text-align: center;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🏆 Para Juara Adiwiyata</h1>
            <p>Leaderboard Program Adiwiyata</p>
            <div class="export-info">
              Diekspor pada: ${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID')}
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 15%">Peringkat</th>
                <th style="width: 35%">Nama</th>
                <th style="width: 25%">Kelas</th>
                <th style="width: 25%">Skor Total</th>
              </tr>
            </thead>
            <tbody>
              ${leaderboard.map((entry, index) => `
                <tr>
                  <td>
                    ${index === 0 ? '<span class="rank-medal">🥇</span>' : ''}
                    ${index === 1 ? '<span class="rank-medal">🥈</span>' : ''}
                    ${index === 2 ? '<span class="rank-medal">🥉</span>' : ''}
                    ${index + 1}
                  </td>
                  <td>${entry.name}</td>
                  <td>${entry.className}</td>
                  <td><strong>${entry.totalScore}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total-count">
            Total Peserta: ${leaderboard.length}
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait a moment for content to load, then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setIsExporting(false);
      }, 500);
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Terjadi kesalahan saat mengekspor PDF. Silakan coba lagi.');
      setIsExporting(false);
    }
  };

  const exportOptions = [
    { label: 'Excel (.xlsx)', icon: FileSpreadsheetIcon, action: exportToExcel },
    { label: 'PDF Document', icon: FileTextIcon, action: exportToPDF },
  ];

  const completedStagesCount = user.scores.filter(score => score > 0).length;

  return (
    <div className="min-h-screen bg-green-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => {
            resetProgress();
            navigate('/');
          }} className="flex items-center text-green-700 hover:text-green-900">
            <HomeIcon className="w-5 h-5 mr-1" />
            <span>Halaman Awal</span>
          </button>
          <div className="text-sm text-green-700">
            {user.isRegistered && (
              <>
                <span className="font-semibold">{user.name}</span> | Kelas:{' '}
                {user.className}
              </>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Leaderboard header */}
          <div className="bg-green-600 p-6 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-3">
                <TrophyIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold">Para Juara Adiwiyata</h1>
            <p className="text-green-100">
              Lihat peringkat para Juara Adiwiyata!
            </p>
          </div>
          {/* User score summary */}
          {user.isRegistered && (
            <div className="bg-green-50 border-b border-green-100 p-4">
              <div className="max-w-md mx-auto">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  Hasilmu
                </h2>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Skor Total</p>
                      <p className="text-2xl font-bold text-green-700">
                        {user.totalScore}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Peringkat</p>
                      <p className="text-2xl font-bold text-green-700">
                        {getUserRank()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Stage Selesai</p>
                      <p className="text-2xl font-bold text-green-700">
                        {completedStagesCount}/{user.scores.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Leaderboard content */}
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Leaderboard
              </h2>
              {leaderboard.length > 0 && (
                <div className="relative">
                  <button 
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    disabled={isExporting}
                    className="flex items-center bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    {isExporting ? 'Mengekspor...' : 'Ekspor'}
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                  
                  {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        {exportOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={option.action}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <option.icon className="w-4 h-4 mr-3 text-gray-500" />
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {isLeaderboardLoading ? (
              <div className="text-center py-6 text-gray-500 flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat...
              </div>
            ) : leaderboard.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Peringkat
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Nama
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Kelas
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Skor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => {
                      const isCurrentUser = user.isRegistered && entry.name === user.name && entry.className === user.className;
                      return <tr key={index} className={`border-t border-gray-200 ${isCurrentUser ? 'bg-green-50' : ''}`}>
                          <td className="px-4 py-3">
                            {index === 0 && <span className="text-yellow-500 font-bold">
                                🥇
                              </span>}
                            {index === 1 && <span className="text-gray-400 font-bold">
                                🥈
                              </span>}
                            {index === 2 && <span className="text-amber-700 font-bold">
                                🥉
                              </span>}
                            {index > 2 && <span className="font-medium">{index + 1}</span>}
                          </td>
                          <td className={`px-4 py-3 ${isCurrentUser ? 'font-semibold' : ''}`}>
                            {entry.name}
                            {isCurrentUser && <span className="ml-2 text-green-600 text-xs">
                                (Kamu)
                              </span>}
                          </td>
                          <td className="px-4 py-3">{entry.className}</td>
                          <td className="px-4 py-3 font-medium">
                            {entry.totalScore}
                          </td>
                        </tr>;
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Belum ada juara. Jadilah yang pertama menyelesaikan semua tahapan!
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <button onClick={handlePlayAgain} className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Jelajahi Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;