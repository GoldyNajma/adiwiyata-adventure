import React from 'react';
import { LeafIcon, RecycleIcon, SunIcon, BookIcon, TreePineIcon, DropletsIcon, LightbulbIcon } from 'lucide-react';
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}
export interface Stage {
  id: number;
  title: string;
  icon: React.ReactNode;
  // description: string;
  content: React.ReactNode;
  questions: Question[];
}
export const stages: Stage[] = [{
    id: 0,
    title: "Pembahasan Adiwiyata",
    icon: <BookIcon className="w-6 h-6" />,
    content: (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4" >
          Kalian tau ga sih apa itu adiwiyata?
        </h2>
        <p className="mb-4 text-lg">
          Jadi adiwiyata adalah penghargaan untuk sekolah yang peduli dengan lingkungan.
          Pada dasarnya, adiwiyata merupakan program yang ditujukan untuk mengatasi berbagai
          masalah terkait pencemaran lingkungan, adiwiyata mengajarkan kita untuk mencintai
          lingkungan hidup. Contohnya pengelolaan sampah (pemilahan, daur ulang, pembuatan
          kompos.), penghijaun (penanaman pohon, pembuatan taman.), penyediaan fasilitas
          (tong sampah, dan cuci tangan).
        </p>
        <p className="mb-4 text-lg">
          Kira-kira kalian udah tau belum kalau spensaged memiliki banyak pokja (kelompok
          kerja) yaitu pokja sanitasi, pokja inovasi, pokja konservasi energi, pokja
          konsevasi air, pokja UKS, pokja PJAS/kantin sehat, nah spensaged mendapatkan
          penghargaan juara 1 lomba PJAS aman Tingkat nasional. Bangga ga sih kalian jadi
          warga spensaged yang sudah memenangkan PJAS Tingkat nasional.
        </p>
      </div>
    ),
    questions: [
      {
        id: 1,
        text: "Program adiwiyata merupakan Program yang di tujukan untuk?",
        options: [
          "Untuk mencitai lingkungan sekitar",
          "Untuk mencintai lingkungan hidup",
          "Untuk mencintai alam",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: "Spensaged memenangkan penghargaan dalam pokja apa?",
        options: ["Konservasi energi", "Inovasi", "pangan jajan anak sekolah"],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: "Contoh kegiatan adiwiyata yang ada di sekolah?",
        options: [
          "Pembuatan kompos",
          "Pembasmian serangga",
          "Penyediaan trash bag di area sekolah",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 1,
    title: "Aspek 1: Kebersihan dan Fungsi Sanitasi",
    icon: <LeafIcon className="w-6 h-6 text-green-600" />,
    content: (
      <div>
        <p className="mb-4 text-lg">
          Nah disini kalian pernah mendengar/tidak mengenai aspek yang ada dalam adiwiyata.
          Jadi didalam adiwiyata terdapat 6 aspek.
        </p>
        <p className="mb-4 text-lg">
          Aspek yang pertama kebersihan dan fungsi sanitasi. Sanitasi merupakan upaya menjaga
          kebersihan lingkungan dan kesehatan masyarakat melalui pengawasan terhadap faktor
          lingkungan. Fungi sanitasi sendiri mencegah penyakit dan meningkatkan kesehatan
          masyarakat dengan cara mengelola lingkungan hidup secara bersih dan sehat melalui
          pengelolaan air, limbah, sampah, serta kebiasaan hidup bersih dan sehat. Di dalam aspek
          yang pertama ini meliputi upaya menjaga kebersihan sekolah secara menyeluruh, termasuk
          menjaga kebersihan toilet, tidak membuang sampah di area dekat sekolah, menjaga
          kebersihan masjid, dan menjaga lingkungan hutan sekolah agar sekolah menjadi lebih asri,
          dan pemeliharaan drainase secara rutin.
        </p>
      </div>
    ),
    questions: [
      {
        id: 1,
        text: "Apa fungsi sanitasi di area sekolah",
        options: [
          "Membuang sampah pada tempatnya",
          "Mengotori area masjid",
          "Mematahkan ranting pohon sembarangan",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        text: "Dalam bacaan disebutkan bahwa fungsi sanitasi dalah mencegah penyakit dengan cara mengelola lingkungan hidup yang sehat. Jika sekolah sudah memiliki salura drainase yang baik, namun siswa masih sering membuang sampah sembarangan, dampak apa yang paling mungkin terjadi?",
        options: [
          "Sekolah tetap bersih karena drainase sudah memadai",
          "Air hujan akan membawa sampah sehingga menimbulkan banjir dan penyakit",
          "Sampah tidak berpengaruh pada kesehatan warga sekolah",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: "Bacaan menyebutkan bahwa menjaga kebersihan sekolah mencakup area masjid, hutan sekolah, dan saluran air. Jika suatu sekolah hanya focus membersihakn area masjid tetapi mengabaikan hutan sekolah, nilai karakter apa yang paling tidak tercermin dalam upaya tersebut?",
        options: [
          "Tanggung jawab terhadap lingkungan",
          "Disiplin menjaga fasilitas sekolah",
          "Kepedulian terhadap Kesehatan",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Aspek 2: Pengelolaan Sampah",
    icon: <RecycleIcon className="w-6 h-6  text-green-600" />,
    content: (
      <div>
        <p className="mb-4 text-lg">
          Kamu tau nggak kenapa tong sampah ada 3 jenisnya?, ternyata itu karena jenis sampah
          berbeda beda dan harus dikelompokkan masing masing. Disekolah kita ada 3 jenis tong
          sampah yaitu:
        </p>
        <p className="mb-4 text-lg">
          1. Tong sampah hijau: Fungsinya adalah menampung sampah organik, seperti sisa plastik,
          daun dan ranting.
        </p>
        <p className="mb-4 text-lg">
          2. Tong sampah kuning: Fungsinya adalah menampung sampah anorganik, seperti sisa plastik,
          styrofom dan kaleng.
        </p>
        <p className="mb-4 text-lg">
          3. Tong sampah merah: Fungsinya adalah menampung limbah  B3(berbahayadanberacun)
          Contoh:baterai,komponen elektronik,dan limba medis.
        </p>
        <p className="mb-4 text-lg">
          Sebenarnya kalau sampah dikelola dengan benar, sampah bisa bermanfaat lho. Misalnya:
          Sampah organik (daun, sisa makanan) bisa dijadikan kompos buat pupuk tanaman sekolah.
          Sampah anorganik (plastik, botol, kertas) bisa dipilah, terus didaur ulang atau dijual.
        </p>
        <p className="mb-4 text-lg">
          Intinya: Mengelola sampah bukan cuma bikin sekolah bersih, tapi juga melatih kita buat
          lebih peduli sama lingkungan. Jadi, daripada buang sampah sembarangan, mending kita
          kelola dengan cerdas dan kreatif.
        </p>
      </div>
    ),
    questions: [
      {
        id: 1,
        text: "Jika sekolah ingin mengurangi jumlah sampah plastic, sebagai siswa, sikap apa yang kita ambil untuk membantu sekolah?",
        options: [
          "Membawa masuk jajanan dari luar sekolah yang menggunakan kemasan plastic",
          "Tidak membawa kemasan plastik kedalam sekolah",
          "Membuang sampah pada tempatnya",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: "Disekolah ada 3 jenis sampah tong sampah, saat siswa ingin membuang limbah bekas komponen elektronik ke sampah hijau, padahal fungsi tong sampah hijau untuk limbah organic, apa dampak yang mungkin terjadi?",
        options: [
          "Mengurangi jumlah sampah B3 yang menumpuk",
          "Mempermudah pemilahan sampah",
          "Mendukung penghijaun sekolah",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: "Sampah organik seperti daun daun sisa bisa, dijadikan pupuk kompos, jika kegiatan ini dilakukan secara rutin disekolah, manfaat yang akan dirasakan adalah?",
        options: [
          "Mempercapat proses daur ulang sampah plastic",
          "Mengurangi jumlah samapah B3",
          "Mendukung penghijauan sekolah dengan pupuk alami dari sampah kita sendiri",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Aspek 3: Penanaman dan Pemeliharaan Pohon",
    icon: <TreePineIcon className="w-6 h-6  text-green-600" />, // gunakan icon pohon
    content: (
      <div>
        <p className="mb-4 text-lg">
          Kalian tau gak nih aspek ketiga dalam adiwiyata adalah penanaman pohon dan
          pemeliharaan pohon atau tanaman di lingkungan sekolah kegiatan ini bermanfaat
          bukan sekedar untuk membuat sekolah terlihat hijau, tapi juga menjaga kualitas
          udara, mencegah banjir lewat resapan air, serta mengurangi populasi debu, jenis
          tanaman yang ditanam di lingkungan sekolah biasanya menyesuaikan kebutuhan dan
          lahan di sekolah, contoh jenis tanaman yang ada di spensaged adalah tanaman pule
          yang banyak terletak di sekeliling lapangan basket, tanaman pule ini ditanam
          bertujuan untuk menyerap polusi, mengingat di daerah kita sering macet yang
          mengakibatkan banyak kendaraan yang melepaskan karbon monoksida yang mencemari
          udara. Jadi aspek ketiga mengajarkan pentingnya menanam dan merawat berbagai jenis
          tanaman di sekolah untuk manfaat bagi diri kita sendiri maupun lingkungan sekitar
          kita.
        </p>
      </div>
    ),
    questions: [
      {
        id: 1,
        text: "Salah satu tujuan penanaman pohon di sekolah adalah mencegah banjir melalui resapan air. Tapi jika sekolah hanya menanam tanaman hias kecil dipot tanpa ada pohon besar, apa dampak yang mungkin terjadi?",
        options: [
          "Sekolah tetap aman dari banjir karena ada tanaman hias",
          "Fungsi dari resapan air berkurang sehingga risiko banjir jadi lebih besar",
          "Udara di sekolah otomatis tetap segar meskipun tidak ada pohon besar",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: "Di teks dijelaskan bahwa tanaman pule banyak ditanam di sekitar lapangan basket sekolah. Mengapa pilihan ini dianggap tepat?",
        options: [
          "Karena pule sebagai tanaman hias",
          "Karena pule mampu menyerap polusi dan mengurangi karbon monoksida dari kendaraan",
          "Karena pule membutuhkan sedikit perawatan dan bisa tumbuh tanpa air",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: "Aspek ketiga adiwiyata menekankan pentingnya merawat tanaman, bukan hanya menanamnya. Jika siswa hanya menanam tanpa merawat, apa akibatnya?",
        options: [
          "Tanaman tetap tumbuh subur karena tetap tumbuh di tanah",
          "Tanaman bisa mati atau tidak berkembang sehingga tujuan limgkungan sehat tidak tercapai",
          "Tanaman tetap memberi oksigen meskipun tidak dirawat",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 4,
    title: "Aspek 4: Konservasi Air",
    icon: <DropletsIcon className="w-6 h-6  text-green-600" />, // icon tetesan air
    content: (
      <div>
        <p className="mb-4 text-lg">
          Adiwiyata aspek ke 4 adalah Konservasi Air pada dasarnya mengajarkan kita untuk
          lebih bijak dalam menggunakan air, karena air adalah sumber kehidupan yang tidak
          bisa tergantikan. Konservasi air adalah perilaku yang disengaja dengan tujuan
          mengurangi penggunaan air, melalui metode teknologi atau perilaku sosial.
        </p>
        <p className="mb-4 text-lg">
          Di dalam sekolah kita bisa melakukan hal hal sederhana untuk konservasi air,
          contohnya : menutup keran air setelah di pakai, menggunakan air secukupnya saat
          mencuci tangan. Jadi siswa bisa menerapkan sistem hemat air agar terbiasa,
          sekolah tidak hanya menjadi tempat belajar, tetapi juga contoh nyata bagaimana
          menjaga bumi.
        </p>
        <p className="mb-4 text-lg">
          Kebiasaan ini juga menanamkan rasa peduli lingkungan sejak dini. Jadi konservasi
          air bukan hanya soal mengurangi pemakaian, tapi juga memanfaatkan air dengan
          cerdas.
        </p>
      </div>
    ),
    questions: [
      {
        id: 1,
        text: "Jika siswa terbiasa menutup keran dengan benar setelah dipakai, dampak positif jangka panjang yang paling nyata adalah",
        options: [
          "Mengurangi pemborosan air dan melatih kebiasaan hemat sejak dini",
          "Air akan selalu tersedia tanpa batas di sekolah",
          "Sekolah tidak perlu membayar biaya air bulanan",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        text: "Salah satu bentuk konservasi Air adalah menggunakan air secukupnya saat mencuci tangan. Jika siswa justru membuka keran terlalu besar, apa konsekuensi yang mungkin terjadi?",
        options: [
          "Proses mencuci tangan lebih cepat dan lebih bersih",
          "Air terbuang sia-sia sehingga berlawanan dengan prinsip konservasi",
          "Tidak ada dampak karena air akan kembali ke tanah",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: "Konservasi air di sekolah bukan hanya soal mengurangi pemakaian, tapi jugsa memanfaatkan air dengan cerdas. Contoh penerapan sikap ini adalah",
        options: [
          "Menggunakan air bekas wudhu untuk menyiram tanaman sekolah.",
          "Membiarkan air hujan mengalir begitu saja di selokan.",
          "Membuka semua keran saat membersihkan kelas agar pekerjaan lebih cepat selesai",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 5,
    title: "Aspek 5: Konservasi Energi",
    icon: <SunIcon className="w-6 h-6  text-green-600" />, // pakai icon matahari
    content: (
      <div>
        <p className="mb-4 text-lg">
          Apakah kalian tahu? aspek kelima dalam adiwiyata adalah konservasi energi, yaitu
          bagaimana cara kita menggunakan energi dengan bijak supaya tidak boros.
        </p>
        <p className="mb-4 text-lg">
          Energi itu bukan hanya listrik di sekolah, tapi juga bensin untuk kendaran atau
          bahkan cahaya matahari yang bisa dimanfaatkan.
        </p>
        <p className="mb-4 text-lg">
          Di sekolah, kita bisa mulai dari hal-hal kecil, misalnya mematikan lampu di siang
          hari, mencabut charger setelah dipakai, atau lebih memilih naik sepeda/berjalan
          kaki dari pada motor kalau jarak dari rumah dekat.
        </p>
        <p className="mb-4 text-lg">
          Kebiasaan kecil ini ternyata berdampak besar lho, karena selain menghemat biaya
          sekolah, juga membantu mengurangi polusi dan pemanasan global.
        </p>
        <p className="mb-4 text-lg">
          Jadi, intinya konservasi energi adalah tindakan mengurangi jumlah energi, menghemat
          energi berarti menggunakan energi listrik bukan untuk suatu hal yang tidak berguna.
        </p>
      </div>
    ),
    questions: [
      {
        id: 1,
        text: "Jika sekolah memanfaatkan cahaya alami di siang hari, dampak jangka Panjang yang paling tepat adalah",
        options: [
          "Ruangan jadi lebih panas karena sinar matahari langsung",
          "Konsumsi listrik berkurang sehingga biaya dan emisi energi lebih rendah",
          "Siswa tidak perlu lagi menggunakan listrik untuk kegiatan lain",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: "Seorang siswa memilih naik sepeda ke sekolah daripada di jemput motor. Hal ini termasuk konservasi energi karena…",
        options: [
          "Membuat tubuh lebih sehat dan kuat",
          "Menambah jumlah kendaraan ramah lingkungan di sekolah",
          "Mengurangi ketergantungan pada bahan bakar fosil yang menghasilkan polusi",
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: "Mematikan kipas angin saat kelas kosong adalah contoh konservasi energi karena",
        options: [
          "Menghindari pemborosan listrik dengan cara sederhana yang bisa dilakukan semua siswa",
          "Membuat ruangan lebih dingin sehingga nyaman saat dipakai",
          "Mengurangi ketergantungan pada cahaya alami",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
  id: 6,
  title: "Aspek 6: Inovasi Ramah Lingkungan",
  icon: <LightbulbIcon className="w-6 h-6  text-green-600" />, // pakai icon ide/lampu
  content: (
    <div>
      <p className="mb-4 text-lg">
        Pada aspek keenam dalam adiwiyata adalah inovasi ramah lingkungan, inovasi ramah
        lingkungan adalah segala jenis pengembangan produk, proses, atau model yang dirancang
        untuk meminimalkan dampak negatif terhadap lingkungan dan mendukug pembangunan
        berkelanjutan, dengan cara mengurangi konsumsi sumber daya energi, limbah, dan polusi,
        serta memanfaatkan bahan yang dapat di daur ulang.
      </p>
      <p className="mb-4 text-lg">
        Di sekolah, inovasi ini bisa berupa hal sederhana tapi bermanfaat, misalnya membuat
        ecobrick dari botol plastik berisi sampah organik, ecobrick adalah botol plastik yang
        telah dipadatkan untuk membuat sejenis blok yang dapat digunakan kembali, konsep
        dibalik ecobrick adalah untuk menggunakan dan mendaur ulang plastik bekas konsumsi,
        membuatnya jadi ramah lingkungan dan bermanfaat.
      </p>
      <p className="mb-4 text-lg">
        Bahkan, ide-ide kecil seperti memanfaatkan sampah bekas gelas plastik menjadi hiasan itu
        juga termasuk inovasi lho! Intinya, kita kita diajak untuk nggak cuma mengikuti aturan,
        tapi juga berpikir kreaif dan solutif supaya sekolah makin hijau, sehat, dan jadi contoh
        keren bagi lingkungan sekitar.
      </p>
    </div>
  ),
  questions: [
    {
      id: 1,
      text: "Dari bacaan diatas, apa alasan utama eco-brick dianggap sebagai inovasi ramah lingkungan?",
      options: [
        "Karena mampu mengurangi jumlah sampah plastic yang sulit terurai sambil menghasilkan produk yang bermanfaat",
        "Karena menjadikan botol plastik lebih menarik secara estetika",
        "Karena lebih cepat dibuat dibandingkan dengan daur ulang biasa",
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      text: "Pada bacaan di jelaskan konsep di balik ecobrick, dari konsep tersebut apa yang ada di sekolahmu?",
      options: [
        "Membuat pupuk kompos",
        "Menanam tanaman hidroponik",
        "Membuat hiasan kelas dengan menggunakan botol bekas",
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      text: "Sebuah kelas ingin ikut lomba adiwiyata. Mereka punya banyak kertas bekas ujian. Agar sesuai dengan semangat kreatif sekaligus ramah lingkungan, langah terbaik yang bisa mereka lakukan adalah",
      options: [
        "Membakar kertas bekas supaya cepat habis",
        "Mengubah kertas bekas menjadi kerajinan tangan bernilai guna",
        "Membuang semua kertas ke tempat sampah tanpa dipilah",
      ],
      correctAnswer: 1,
    },
  ],
}];
export const getLeaderboard = () => {
  const leaderboardData = localStorage.getItem('adiwiyataLeaderboard');
  return leaderboardData ? JSON.parse(leaderboardData) : [];
};
export const updateLeaderboard = (user: {
  name: string;
  className: string;
  totalScore: number;
}) => {
  const leaderboard = getLeaderboard();
  // Check if user already exists in leaderboard
  const existingUserIndex = leaderboard.findIndex((entry: { 
    name: string; 
    className: string; 
  }) => entry.name === user.name && entry.className === user.className);
  if (existingUserIndex >= 0) {
    // Update existing user if new score is higher
    if (user.totalScore > leaderboard[existingUserIndex].totalScore) {
      leaderboard[existingUserIndex].totalScore = user.totalScore;
    }
  } else {
    // Add new user
    leaderboard.push({
      name: user.name,
      className: user.className,
      totalScore: user.totalScore
    });
  }
  // Sort by score (highest first)
  leaderboard.sort((a: { totalScore: number; }, b: { totalScore: number; }) => b.totalScore - a.totalScore);
  localStorage.setItem('adiwiyataLeaderboard', JSON.stringify(leaderboard));
  return leaderboard;
};