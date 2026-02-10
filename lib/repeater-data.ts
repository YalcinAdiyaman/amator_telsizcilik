export interface Repeater {
    id: string;
    callsign: string;
    frequency: string;
    offset: string;
    tone: string;
    location: string;
    coordinates: [number, number];
    altitude: number; // Meters ASL (Above Sea Level) for coverage calc
    status: "ACTIVE" | "MAINTENANCE" | "OFFLINE";
    type: "VHF" | "UHF";
    power: number; // Watts
}

export const repeaterData: Repeater[] = [
    // --- MARMARA BÖLGESİ (TA1 & TA2) ---
    // İSTANBUL
    { id: "ym1ka-vhf", callsign: "YM1KA", frequency: "145.600", offset: "-0.600", tone: "88.5", location: "İstanbul / K.Çamlıca", coordinates: [41.0167, 29.0667], altitude: 268, status: "ACTIVE", type: "VHF", power: 25 },
    { id: "ym1ka-uhf", callsign: "YM1KA", frequency: "439.200", offset: "-7.600", tone: "88.5", location: "İstanbul / K.Çamlıca", coordinates: [41.0167, 29.0667], altitude: 268, status: "ACTIVE", type: "UHF", power: 20 },
    { id: "ym1ist", callsign: "YM1IST", frequency: "439.225", offset: "-7.600", tone: "88.5", location: "İstanbul / Şişli", coordinates: [41.0667, 28.9833], altitude: 150, status: "ACTIVE", type: "UHF", power: 15 },
    { id: "ta1bx-dmr", callsign: "TA1BX", frequency: "439.400", offset: "-7.600", tone: "DMR", location: "İstanbul / Hadımköy", coordinates: [41.2833, 28.6167], altitude: 180, status: "ACTIVE", type: "UHF", power: 40 },
    { id: "ym1sk", callsign: "YM1SK", frequency: "145.750", offset: "-0.600", tone: "88.5", location: "İstanbul / Silivri", coordinates: [41.0742, 28.2431], altitude: 120, status: "ACTIVE", type: "VHF", power: 20 },
    { id: "ym1b", callsign: "YM1B", frequency: "439.175", offset: "-7.600", tone: "88.5", location: "İstanbul / Beylikdüzü", coordinates: [41.0028, 28.6425], altitude: 140, status: "ACTIVE", type: "UHF", power: 15 },

    // KOCAELİ & SAKARYA
    { id: "ym2kc", callsign: "YM2KC", frequency: "145.675", offset: "-0.600", tone: "88.5", location: "Kocaeli / Kartepe", coordinates: [40.6667, 30.0833], altitude: 1600, status: "ACTIVE", type: "VHF", power: 45 },
    { id: "ym2sak", callsign: "YM2SAK", frequency: "145.725", offset: "-0.600", tone: "88.5", location: "Sakarya / Serdivan", coordinates: [40.7500, 30.3667], altitude: 350, status: "ACTIVE", type: "VHF", power: 25 },
    { id: "ym2koc", callsign: "YM2KOC", frequency: "439.300", offset: "-7.600", tone: "88.5", location: "Kocaeli / İzmit", coordinates: [40.7667, 29.9167], altitude: 200, status: "ACTIVE", type: "UHF", power: 20 },

    // BURSA & BALIKESİR & ÇANAKKALE
    { id: "ym3bur", callsign: "YM3BUR", frequency: "145.650", offset: "-0.600", tone: "88.5", location: "Bursa / Uludağ", coordinates: [40.1000, 29.2167], altitude: 2300, status: "ACTIVE", type: "VHF", power: 45 },
    { id: "ym3bal", callsign: "YM3BAL", frequency: "145.700", offset: "-0.600", tone: "88.5", location: "Balıkesir / Çataldağ", coordinates: [39.8667, 28.1667], altitude: 1000, status: "MAINTENANCE", type: "VHF", power: 30 },
    { id: "ym3can", callsign: "YM3CAN", frequency: "145.625", offset: "-0.600", tone: "88.5", location: "Çanakkale / Radar Tepe", coordinates: [40.1500, 26.4167], altitude: 450, status: "ACTIVE", type: "VHF", power: 25 },

    // TEKİRDAĞ & EDİRNE
    { id: "ym1tek", callsign: "YM1TEK", frequency: "145.775", offset: "-0.600", tone: "88.5", location: "Tekirdağ / Ganos", coordinates: [40.8167, 27.2667], altitude: 900, status: "ACTIVE", type: "VHF", power: 40 },
    { id: "ym1ed", callsign: "YM1ED", frequency: "145.600", offset: "-0.600", tone: "88.5", location: "Edirne / Merkez", coordinates: [41.6764, 26.5557], altitude: 110, status: "ACTIVE", type: "VHF", power: 20 },

    // --- İÇ ANADOLU BÖLGESİ (TA2 & TA5) ---
    // ANKARA
    { id: "ym2ka", callsign: "YM2KA", frequency: "145.600", offset: "-0.600", tone: "88.5", location: "Ankara / Hüseyingazi", coordinates: [39.9500, 32.9667], altitude: 1400, status: "ACTIVE", type: "VHF", power: 40 },
    { id: "ym2ank", callsign: "YM2ANK", frequency: "439.150", offset: "-7.600", tone: "88.5", location: "Ankara / Elmadağ", coordinates: [39.8167, 33.0167], altitude: 1800, status: "ACTIVE", type: "UHF", power: 50 },
    { id: "ta2k", callsign: "TA2K", frequency: "145.725", offset: "-0.600", tone: "88.5", location: "Ankara / Ahlatlıbel", coordinates: [39.8333, 32.7833], altitude: 1050, status: "ACTIVE", type: "VHF", power: 20 },
    { id: "ym2as", callsign: "YM2AS", frequency: "145.650", offset: "-0.600", tone: "88.5", location: "Ankara / Lodumlu", coordinates: [39.8833, 32.7500], altitude: 1000, status: "ACTIVE", type: "VHF", power: 25 },

    // KONYA & KAYSERİ & ESKİŞEHİR
    { id: "ym5kon", callsign: "YM5KON", frequency: "145.625", offset: "-0.600", tone: "88.5", location: "Konya / Loras", coordinates: [37.8500, 32.4000], altitude: 2050, status: "ACTIVE", type: "VHF", power: 45 },
    { id: "ym5kay", callsign: "YM5KAY", frequency: "145.700", offset: "-0.600", tone: "88.5", location: "Kayseri / Erciyes", coordinates: [38.5333, 35.4500], altitude: 2800, status: "ACTIVE", type: "VHF", power: 40 },
    { id: "ym2esk", callsign: "YM2ESK", frequency: "145.750", offset: "-0.600", tone: "88.5", location: "Eskişehir / Türkmenbaba", coordinates: [39.5333, 30.6333], altitude: 1750, status: "ACTIVE", type: "VHF", power: 40 },
    { id: "ym5nig", callsign: "YM5NIG", frequency: "145.600", offset: "-0.600", tone: "88.5", location: "Niğde / Ketençimen", coordinates: [38.0000, 34.6833], altitude: 2100, status: "ACTIVE", type: "VHF", power: 40 },

    // --- EGE BÖLGESİ (TA3 & TA4) ---
    // İZMİR
    { id: "ym3klc", callsign: "YM3KLC", frequency: "145.775", offset: "-0.600", tone: "88.5", location: "İzmir / Bozdağ", coordinates: [38.3333, 28.1000], altitude: 2159, status: "ACTIVE", type: "VHF", power: 50 },
    { id: "ym3izm", callsign: "YM3IZM", frequency: "145.600", offset: "-0.600", tone: "88.5", location: "İzmir / Yamanlar", coordinates: [38.5500, 27.1667], altitude: 900, status: "ACTIVE", type: "VHF", power: 30 },
    { id: "ym3tr", callsign: "YM3TR", frequency: "439.200", offset: "-7.600", tone: "88.5", location: "İzmir / Çatalkaya", coordinates: [38.3667, 26.9667], altitude: 850, status: "ACTIVE", type: "UHF", power: 25 },
    { id: "ym3ksk", callsign: "YM3KSK", frequency: "145.675", offset: "-0.600", tone: "88.5", location: "İzmir / Karşıyaka", coordinates: [38.4833, 27.1000], altitude: 400, status: "ACTIVE", type: "VHF", power: 15 },

    // AYDIN & MUĞLA & MANİSA
    { id: "ym4ayd", callsign: "YM4AYD", frequency: "145.725", offset: "-0.600", tone: "88.5", location: "Aydın / Paşa Yaylası", coordinates: [37.9167, 27.8500], altitude: 1200, status: "ACTIVE", type: "VHF", power: 35 },
    { id: "ym4mug", callsign: "YM4MUG", frequency: "145.650", offset: "-0.600", tone: "88.5", location: "Muğla / Yılanlı", coordinates: [37.2167, 28.4500], altitude: 1500, status: "ACTIVE", type: "VHF", power: 35 },
    { id: "ym4bod", callsign: "YM4BOD", frequency: "145.700", offset: "-0.600", tone: "88.5", location: "Muğla / Bodrum", coordinates: [37.0333, 27.4167], altitude: 450, status: "ACTIVE", type: "VHF", power: 25 },
    { id: "ym3man", callsign: "YM3MAN", frequency: "145.750", offset: "-0.600", tone: "88.5", location: "Manisa / Spil", coordinates: [38.5667, 27.4500], altitude: 1517, status: "ACTIVE", type: "VHF", power: 45 },

    // --- AKDENİZ BÖLGESİ (TA4 & TA5) ---
    // ANTALYA
    { id: "ym4ant", callsign: "YM4ANT", frequency: "145.675", offset: "-0.600", tone: "88.5", location: "Antalya / Tünektepe", coordinates: [36.8833, 30.5833], altitude: 618, status: "ACTIVE", type: "VHF", power: 25 },
    { id: "ym4olym", callsign: "YM4OLYM", frequency: "439.300", offset: "-7.600", tone: "88.5", location: "Antalya / Tahtalı", coordinates: [36.5333, 30.4500], altitude: 2365, status: "ACTIVE", type: "UHF", power: 50 },
    { id: "ym4ala", callsign: "YM4ALA", frequency: "145.725", offset: "-0.600", tone: "88.5", location: "Alanya / Akçalı", coordinates: [36.5500, 32.0833], altitude: 950, status: "ACTIVE", type: "VHF", power: 30 },

    // ADANA & MERSİN & HATAY
    { id: "ym5ada", callsign: "YM5ADA", frequency: "145.750", offset: "-0.600", tone: "88.5", location: "Adana / Aladağ", coordinates: [37.5500, 35.3833], altitude: 1800, status: "ACTIVE", type: "VHF", power: 35 },
    { id: "ym5mer", callsign: "YM5MER", frequency: "145.625", offset: "-0.600", tone: "88.5", location: "Mersin / Kocamaz", coordinates: [36.9000, 34.6000], altitude: 1100, status: "ACTIVE", type: "VHF", power: 30 },
    { id: "ym5hat", callsign: "YM5HAT", frequency: "145.700", offset: "-0.600", tone: "88.5", location: "Hatay / Amanos", coordinates: [36.6500, 36.2167], altitude: 1600, status: "OFFLINE", type: "VHF", power: 30 },

    // --- KARADENİZ BÖLGESİ (TA6 & TA7) ---
    // SAMSUN & TRABZON
    { id: "ym6sam", callsign: "YM6SAM", frequency: "145.625", offset: "-0.600", tone: "88.5", location: "Samsun / Kocadağ", coordinates: [41.2500, 36.3167], altitude: 1200, status: "ACTIVE", type: "VHF", power: 30 },
    { id: "ym7tra", callsign: "YM7TRA", frequency: "145.775", offset: "-0.600", tone: "88.5", location: "Trabzon / Boztepe", coordinates: [41.0000, 39.7333], altitude: 500, status: "MAINTENANCE", type: "VHF", power: 15 },
    { id: "ym7riz", callsign: "YM7RIZ", frequency: "145.650", offset: "-0.600", tone: "88.5", location: "Rize / Dağbaşı", coordinates: [41.0167, 40.5333], altitude: 800, status: "ACTIVE", type: "VHF", power: 20 },

    // ZONGULDAK & KASTAMONU
    { id: "ym2zon", callsign: "YM2ZON", frequency: "145.675", offset: "-0.600", tone: "88.5", location: "Zonguldak / Tepeören", coordinates: [41.4500, 31.8000], altitude: 650, status: "ACTIVE", type: "VHF", power: 25 },
    { id: "ym6kas", callsign: "YM6KAS", frequency: "145.725", offset: "-0.600", tone: "88.5", location: "Kastamonu / Ilgaz", coordinates: [41.1333, 33.7333], altitude: 2000, status: "ACTIVE", type: "VHF", power: 45 },

    // --- DOĞU & GÜNEYDOĞU ANADOLU (TA8 & TA9) ---
    // VAN & ERZURUM & MALATYA
    { id: "ym9van", callsign: "YM9VAN", frequency: "145.700", offset: "-0.600", tone: "88.5", location: "Van / Erek Dağı", coordinates: [38.4667, 43.4167], altitude: 2400, status: "ACTIVE", type: "VHF", power: 35 },
    { id: "ym9erz", callsign: "YM9ERZ", frequency: "145.750", offset: "-0.600", tone: "88.5", location: "Erzurum / Palandöken", coordinates: [39.8500, 41.2667], altitude: 3100, status: "ACTIVE", type: "VHF", power: 50 },
    { id: "ym8mal", callsign: "YM8MAL", frequency: "145.625", offset: "-0.600", tone: "88.5", location: "Malatya / Beydağı", coordinates: [38.3000, 38.3167], altitude: 1600, status: "ACTIVE", type: "VHF", power: 30 },

    // DİYARBAKIR & GAZİANTEP
    { id: "ym8diy", callsign: "YM8DIY", frequency: "145.650", offset: "-0.600", tone: "88.5", location: "Diyarbakır / Karacadağ", coordinates: [37.9167, 39.8333], altitude: 1950, status: "ACTIVE", type: "VHF", power: 40 },
    { id: "ym8gazi", callsign: "YM8GAZI", frequency: "145.725", offset: "-0.600", tone: "88.5", location: "Gaziantep / Dülükbaba", coordinates: [37.1667, 37.3333], altitude: 1100, status: "ACTIVE", type: "VHF", power: 30 },

    // --- KIBRIS (KKTC) ---
    { id: "ym1kktc", callsign: "1B1RA", frequency: "145.700", offset: "-0.600", tone: "88.5", location: "KKTC / Kantara", coordinates: [35.4000, 33.9167], altitude: 700, status: "ACTIVE", type: "VHF", power: 30 },
    { id: "ym1lev", callsign: "1B1RB", frequency: "145.600", offset: "-0.600", tone: "88.5", location: "KKTC / Lefkoşa", coordinates: [35.1833, 33.3667], altitude: 150, status: "ACTIVE", type: "VHF", power: 20 }
];
