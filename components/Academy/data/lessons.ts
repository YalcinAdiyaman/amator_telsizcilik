
export interface Section {
    title: string;
    content: string;
}

export interface Lesson {
    title: string;
    objective: string;
    sections: Section[];
}

export const LESSONS: Record<string, Lesson> = {
    regulations: {
        title: "Mevzuat ve Yasal Çerçeve",
        objective: "Ulusal ve uluslararası telsizcilik kanunları, lisans yönetmelikleri ve frekans kullanım esasları.",
        sections: [
            {
                title: "5809 Sayılı Kanun ve Telsiz İşletme",
                content: "Amatör telsizcilik, kişisel gelişim ve doğal afetlerde haberleşme amacı güden, maddi çıkar gözetmeyen bir faaliyettir. 5809 sayılı Elektronik Haberleşme Kanunu uyarınca, amatör telsizciler Kıyı Emniyeti Genel Müdürlüğü (KEGM) tarafından düzenlenen sınavla belge almak zorundadır.\n\nBelgesiz telsiz kullanımı (almaçlar hariç) yasal suç kapsamında değerlendirilir ve cihaz müsadere edilebilir."
            },
            {
                title: "Belge Sınıfları (A, B, C)",
                content: "Türkiye'de üç temel amatör telsizcilik belge sınıfı bulunur:\n\n• **A Sınıfı**: En yüksek yetkiye sahiptir. Tüm HF, VHF ve UHF amatör bantlarında, yasal azami güç limitlerinde (örn. HF'de 100-400W) çalışabilir. Sınav puanı 75+ olmalıdır.\n• **B Sınıfı**: Orta seviyedir. VHF/UHF tam erişim hakkı ve sınırlı HF kullanım hakkı sağlar. Sınav puanı 60-74 arasındadır.\n• **C Sınıfı**: Giriş seviyesidir. Genellikle VHF/UHF bandında düşük güçle (5-10W) çalışmaya izin verilir. Sınav puanı 60+ (daha basit sınav)."
            },
            {
                title: "Çağrı İşareti Yapısı (TA, TB, YM)",
                content: "Bir çağrı işareti (Callsign) üç bölümden oluşur:\n1. **Önek (Prefix)**: Ülkeyi ve belge sınıfını belirtir. TA (A Sınıfı), TB (B Sınıfı), YM (Cemiyet). 2026 itibariyle TC (Özel Gün) vb. de kullanılabilir.\n2. **Bölge No**: İstasyonun bulunduğu coğrafi bölge (0-9). Örn: İstanbul ve Trakya 1, Ankara 2, İzmir 3.\n3. **Sonek (Suffix)**: Kişiye özel harf grubu. Örn: 'TA1' + 'ABC'."
            },
            {
                title: "CEPT ve Uluslararası Dolaşım",
                content: "Türkiye, CEPT (Avrupa Posta ve Telekomünikasyon İdareleri Konferansı) üyesidir. A Sınıfı belgesi 'CEPT T/R 61-01' standardına, B Sınıfı ise 'CEPT Novice (05-06)' standardına denktir. Bu sayede belgeniz ile CEPT üyesi ülkelerde (Avrupa, ABD vb.) 3 aya kadar misafir operatör olarak telsiz kullanabilirsiniz."
            }
        ]
    },
    technical: {
        title: "Teknik ve Elektronik Bilgisi",
        objective: "Temel elektrik kanunları, radyo frekans tekniği, anten teorisi ve cihaz kullanımı.",
        sections: [
            {
                title: "Temel Elektrik: Ohm Kanunu",
                content: "Telsizciliğin alfabesidir. Voltaj (V), Akım (I) ve Direnç (R) arasındaki ilişkiyi tanımlar.\n\n• **Formül**: V = I x R (Voltaj = Akım x Direnç)\n• **Güç Formülü**: P = V x I (Watt = Volt x Amper)\n\nÖrnek: 12V akü ile çalışan ve 2 Amper çeken bir telsiz 24 Watt güç harcar."
            },
            {
                title: "Frekans, Periyot ve Dalga Boyu",
                content: "Radyo dalgaları ışık hızında (c ≈ 300.000 km/sn) yayılır.\n\n• **Frekans (f)**: Saniyedeki titreşim sayısı (Hertz).\n• **Dalga Boyu (λ)**: Bir dalganın kat ettiği mesafe.\n• **Formül**: λ (metre) = 300 / f (MHz).\n\nPratik Örnek: 145 MHz (VHF) için dalga boyu 300/145 ≈ 2 metredir. '2 Metre Bandı' ismi buradan gelir."
            },
            {
                title: "Modülasyon Türleri (AM, FM, SSB, CW)",
                content: "Bilginin radyo dalgası üzerine bindirilme şeklidir.\n\n• **FM (Frekans Modülasyonu)**: Ses kalitesi yüksektir, yerel (VHF/UHF) görüşmede standarttır.\n• **SSB (Single Side Band)**: Enerji verimliliği sağlar, uzun mesafe (HF/DX) görüşmelerinde kullanılır. LSB (Alt Bant) 40m/80m'de, USB (Üst Bant) 20m ve üzeri bantlarda kullanılır.\n• **CW (Continuous Wave)**: Mors kodudur. En dar bant genişliğini kullanır ve en zayıf sinyallerle bile haberleşme sağlar."
            },
            {
                title: "Antenler ve SWR",
                content: "Anten, elektrik sinyalini radyo dalgasına çeviren elemandır.\n\n• **Dipol**: En temel anten. Yarım dalga boyundadır (1/2 λ).\n• **Yagi**: Yönlü anten. Kazanç (Gain) sağlayarak sinyali bir yöne odaklar.\n• **SWR (Duran Dalga Oranı)**: Anten ile cihaz arasındaki uyumdur. İdeal SWR 1:1'dir. 1.5:1 kabul edilebilir, 2:1 ve üzeri cihaza zarar verebilir ve verimsizdir."
            }
        ]
    },
    operating: {
        title: "İşletme ve Haberleşme Kuralları",
        objective: "Haberleşme etiği, fonetik alfabe, Q kodları ve acil durum prosedürleri.",
        sections: [
            {
                title: "Fonetik Alfabe (Milli ve NATO)",
                content: "Zayıf sinyallerde harflerin karışmasını önlemek için kullanılır.\n\n• **A**: Adana / Alpha\n• **B**: Bolu / Bravo\n• **C**: Ceyhan / Charlie\n• **Ç**: Çanakkale\n• **I**: Isparta / India\n• **S**: Sinop / Sierra\n• **T**: Tokat / Tango\n\nÇağrı işareti kodlanırken mutlaka fonetik alfabe kullanılmalıdır."
            },
            {
                title: "Q Kodları (Uluslararası Kısaltmalar)",
                content: "Mors haberleşmesinden miras kalan, tüm dillerde ortak anlaşılan kodlardır:\n\n• **QTH**: Konumum / Adresim\n• **QRZ**: Beni kim çağırıyor?\n• **QSO**: Telsiz görüşmesi yapmak\n• **QSL**: Anlaşıldı / Onay kartı\n• **QSY**: Frekans değiştirmek\n• **QRT**: İstasyonu kapatmak / Yayını kesmek\n• **QRQ/QRS**: Hızlı/Yavaş göndermek (Mors)"
            },
            {
                title: "RST Raporlama Sistemi",
                content: "Karşı istasyona sinyal kalitesini bildirmektir.\n\n• **R (Readability)**: Okunabilirlik (1-5). 5 = Mükemmel.\n• **S (Signal)**: Sinyal Gücü (1-9). S-Metre üzerinden okunur.\n• **T (Tone)**: Ton kalitesi (1-9). Sadece CW'de kullanılır.\n\nÖrnek Ses: 'Sinyalin 5-9 (Beş Dokuz) geliyor.'\nÖrnek Mors: '599'"
            },
            {
                title: "Acil Durum Çağrıları",
                content: "Afet ve acil durumlarda öncelik sırası:\n\n1. **MAYDAY**: Hayati tehlike (Gemi/Uçak batıyor/düşüyor).\n2. **PAN PAN**: Acil durum ama hayati tehlike hemen yok (Motor arızası).\n3. **SECURITE**: Meteorolojik uyarı veya seyir güvenliği.\n\nAmatör telsizciler afet durumunda resmi makamlarla koordineli çalışır ve 'Acil Durum' kanallarını (örn. 3.777 MHz, yerel röleler) dinlemede kalır."
            }
        ]
    }
};
