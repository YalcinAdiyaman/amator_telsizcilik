export type Category = 'regulations' | 'technical' | 'operating';

export interface Question {
    id: number;
    text: string;
    options: string[];
    correct: number;
    category: Category;
}

export const QUESTIONS: Question[] = [
    // MEVZUAT (Regulations)
    { id: 1, text: "Amatör telsiz istasyonları arasındaki haberleşmede aşağıdakilerden hangisi yasaktır?", options: ["Teknik konular", "Şifreli haberleşme", "Hava durumu", "Acil durum bilgisi"], correct: 1, category: 'regulations' },
    { id: 2, text: "5809 sayılı Elektronik Haberleşme Kanunu'na göre amatör telsizcilik belgesi kaç yıl geçerlidir?", options: ["5 yıl", "10 yıl", "Ömür boyu", "Yenilenmesi gerekmez"], correct: 1, category: 'regulations' },
    { id: 3, text: "Türkiye'nin ITU (Uluslararası Telekomünikasyon Birliği) bölgesi aşağıdakilerden hangisidir?", options: ["1. Bölge", "2. Bölge", "3. Bölge", "4. Bölge"], correct: 0, category: 'regulations' },
    { id: 4, text: "Aşağıdaki çağrı işaretlerinden hangisi Türkiye'ye aittir?", options: ["DL1ABC", "W1AW", "TA2AD", "G3ZZZ"], correct: 2, category: 'regulations' },
    { id: 5, text: "Acil durum ve afet haberleşmesi sırasında amatör telsizcilerin önceliği nedir?", options: ["Yarışma yapmak", "DX çalışmak", "Hayati tehlike içeren mesajları iletmek", "Cihaz testi yapmak"], correct: 2, category: 'regulations' },
    { id: 6, text: "Amatör telsizcilikte 'üçüncü şahıs mesajı' ne demektir?", options: ["İki amatörün birbirine mesajı", "Amatör olmayan bir kişi adına iletilen mesaj", "Röle üzerinden görüşme", "Dijital mesaj"], correct: 1, category: 'regulations' },
    { id: 7, text: "TA öneki hangi belge sınıfını temsil eder?", options: ["A Sınıfı", "B Sınıfı", "C Sınıfı", "D Sınıfı"], correct: 0, category: 'regulations' },
    { id: 8, text: "TB öneki hangi belge sınıfını temsil eder?", options: ["A Sınıfı", "B Sınıfı", "C Sınıfı", "D Sınıfı"], correct: 1, category: 'regulations' },
    { id: 9, text: "YM öneki kime verilir?", options: ["Yabancı amatörlere", "Cemiyet/Dernek istasyonlarına", "Gemilere", "Uçaklara"], correct: 1, category: 'regulations' },
    { id: 10, text: "Amatör telsiz istasyonu kurmak ve işletmek için yaş sınırı (veli izni ile) kaçtır?", options: ["18", "15", "12", "10"], correct: 2, category: 'regulations' },

    // TEKNİK (Technical)
    { id: 11, text: "VHF bandı hangi frekans aralığını kapsar?", options: ["3-30 MHz", "30-300 MHz", "300-3000 MHz", "30-300 kHz"], correct: 1, category: 'technical' },
    { id: 12, text: "Ohm Kanunu formülü aşağıdakilerden hangisidir?", options: ["V = I / R", "I = V * R", "V = I * R", "R = V * I"], correct: 2, category: 'technical' },
    { id: 13, text: "Dönüş Kaybı (Return Loss) 0 dB ise SWR kaçtır?", options: ["1:1", "Sonsuz (Açık Devre)", "1.5:1", "2:1"], correct: 1, category: 'technical' },
    { id: 14, text: "50 Ohm'luk bir antene 50 Ohm'luk kablo ile bağlandığında ideal SWR nedir?", options: ["1:1", "1.5:1", "2:1", "3:1"], correct: 0, category: 'technical' },
    { id: 15, text: "Yagi antenin kazancı neye bağlıdır?", options: ["Sadece eleman uzunluğuna", "Eleman sayısına ve boom uzunluğuna", "Kablonun rengine", "Cihazın markasına"], correct: 1, category: 'technical' },
    { id: 16, text: "Bir diyotun temel işlevi nedir?", options: ["Akımı güçlendirmek", "Akımı tek yönde geçirmek", "Voltajı düşürmek", "Frekansı değiştirmek"], correct: 1, category: 'technical' },
    { id: 17, text: "Kondansatörün birimi nedir?", options: ["Ohm", "Henry", "Farad", "Watt"], correct: 2, category: 'technical' },
    { id: 18, text: "Bobinin birimi nedir?", options: ["Ohm", "Henry", "Farad", "Watt"], correct: 1, category: 'technical' },
    { id: 19, text: "SSB modülasyonu neyin bir türüdür?", options: ["Genlik Modülasyonu (AM)", "Frekans Modülasyonu (FM)", "Faz Modülasyonu (PM)", "Darbe Modülasyonu"], correct: 0, category: 'technical' },
    { id: 20, text: "Hangi iyonosfer tabakası gece kaybolur?", options: ["F2", "F1", "D", "E"], correct: 2, category: 'technical' },
    { id: 21, text: "Güneş lekeleri (Sunspots) neyi etkiler?", options: ["VHF yayılımını", "HF yayılımını", "UHF yayılımını", "Kablo kayıplarını"], correct: 1, category: 'technical' },
    { id: 22, text: "Dummy Load (Suni Yük) ne işe yarar?", options: ["Anten kazancını artırır", "Vericiyi anten olmadan test etmeyi sağlar", "Sesi güzelleştirir", "Paraziti önler"], correct: 1, category: 'technical' },

    // İŞLETME (Operating)
    { id: 23, text: "QSO ne anlama gelir?", options: ["Haberleşme Var / Görüşme", "Sinyal Gücü", "Karışma Var", "Konum Bildirimi"], correct: 0, category: 'operating' },
    { id: 24, text: "QTH ne anlama gelir?", options: ["Saat kaç?", "Mevkini bildir / Mevkim ...", "Frekansta kal", "Gücü azalt"], correct: 1, category: 'operating' },
    { id: 25, text: "QRZ ne anlama gelir?", options: ["Beni kim çağırıyor?", "Hazır mısın?", "Meşgul müsün?", "Sinyalim nasıl?"], correct: 0, category: 'operating' },
    { id: 26, text: "QSL ne anlama gelir?", options: ["Anlaşıldı / Onay kartı", "Tekrar et", "Yavaş konuş", "Güç artır"], correct: 0, category: 'operating' },
    { id: 27, text: "Genel çağrı (CQ) ne demektir?", options: ["Belirli bir istasyonu çağırmak", "Herhangi bir istasyonu çağırmak", "Acil durum çağrısı", "Test yayını"], correct: 1, category: 'operating' },
    { id: 28, text: "Fonetik alfabede 'C' harfi nasıl kodlanır?", options: ["Coco", "Charlie", "Canada", "Ceasar"], correct: 1, category: 'operating' },
    { id: 29, text: "Fonetik alfabede 'Y' harfi nasıl kodlanır?", options: ["Yankee", "Yellow", "Yoga", "Year"], correct: 0, category: 'operating' },
    { id: 30, text: "RST raporunda 'S' (Signal Strength) en fazla kaç olabilir?", options: ["5", "9", "10", "100"], correct: 1, category: 'operating' },
    { id: 31, text: "Mayday çağrısı ne zaman kullanılır?", options: ["Cihaz testi yaparken", "Hayati tehlike içeren acil durumlarda", "Arkadaş ararken", "Yarışmada puan toplarken"], correct: 1, category: 'operating' },
    { id: 32, text: "Break Break ne demektir?", options: ["Ara ver", "Görüşmeyi kes", "Araya girmek istiyorum (Acil)", "Cihazı kapat"], correct: 2, category: 'operating' },
    { id: 33, text: "73 kısaltması ne anlama gelir?", options: ["Selamlar / Saygılar", "Öpücükler", "Görüşürüz", "Nefretler"], correct: 0, category: 'operating' },
    { id: 34, text: "Simplex görüşme nedir?", options: ["Aynı frekansta alma ve gönderme", "Farklı frekanslarda alma ve gönderme", "Röle üzerinden görüşme", "Uydu üzerinden görüşme"], correct: 0, category: 'operating' },
    { id: 35, text: "UTC nedir?", options: ["Yerel saat", "Evrensel Koordinatlı Zaman", "Yaz saati", "Kış saati"], correct: 1, category: 'operating' },
];
