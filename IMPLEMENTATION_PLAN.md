# Warframe İlhamlı Radyo Portalı - Uygulama Planı

> **Proje**: TA Radyo Portalı - Amatör Telsizcilik Merkezi  
> **İlham**: Warframe "The Old Peace" tasarımı  
> **Oluşturulma**: 2026-02-08  
> **Son Güncelleme**: 2026-02-08T15:25

---

## 📋 Genel Bakış

Yüksek kaliteli, sinematik, parallax efektli bir portal inşa ediyoruz. Üç ana modül:
- **ATLAS**: İnteraktif dünya haritası (röle istasyonları, uydular)
- **ATÖLYE**: Mühendislik ve anten hesaplayıcıları
- **AKADEMİ**: İnteraktif eğitim ve simülasyonlar

---

## 🎨 Tasarım Özellikleri

| Öge | Açıklama |
|-----|----------|
| **Renk Paleti** | Derin uzay mavisi + elektrik mavisi (#00D4FF) + amber (#FFB800) |
| **Tipografi** | Kalın, futuristik, büyük harfli başlıklar, geniş letter-spacing |
| **Animasyonlar** | Scroll-driven reveal, parallax, HUD parıltıları, fade efektleri |
| **Mod** | Yalnızca koyu tema (dark mode) |

---

## ✅ Tamamlanan Adımlar

### Faz 1: Proje Kurulumu

- [x] **Adım 1.1**: Next.js projesi oluşturuldu (TypeScript + Tailwind + App Router)
- [x] **Adım 1.2**: Antigravity Kit (AI agent şablonları) yüklendi
- [x] **Adım 1.3**: next-intl çoklu dil desteği kuruldu (TR/EN)
- [x] **Adım 1.4**: Warframe temalı CSS değişkenleri oluşturuldu

### Faz 2: Temel UI Bileşenleri

- [x] **Adım 2.1**: Sinematik Hero & Floating Navbar oluşturuldu
  - Navbar: Scroll'da backdrop-blur, TR/EN dil değiştirici, HUD logo
  - Hero: Parallax katmanlar, yıldız alanı, scan lines, glow efektler
  - ModulesSection: ATLAS, ATÖLYE, AKADEMİ kartları
  - Footer: HUD stilli, grid pattern arka plan

---

## 🔄 Devam Eden Adımlar

### Faz 2: Temel UI Bileşenleri (Devam)

- [x] **Adım 2.1**: Sinematik Hero & Floating Navbar oluşturuldu
### Faz 2: Temel UI Bileşenleri (Devam)

- [x] **Adım 2.1**: Sinematik Hero & Floating Navbar oluşturuldu
- [x] **Adım 2.2**: High-End HUD Modül Tasarımı (**Tamamlandı**)
  - Framer Motion ile scroll-triggered reveal
  - Glassmorphism ve glowing border stilleri
  - Köşe braketleri ve scan-line efektleri
- [x] **Adım 2.3**: Footer Geliştirmeleri (**Tamamlandı**)
  - Radar grid arka planı
  - Glitch effektli callsign
  - "Sinyal Ağına Katıl" CTA
- [ ] **Adım 2.4**: Loading ekranı ve sayfa geçiş efekti (Opsiyonel/Sonraya Bırakıldı)

### Faz 3: Ana Modüller (**Başlandı**)

- [x] **Adım 3.1**: ATLAS modülü - İnteraktif harita entegrasyonu (**Tamamlandı & Onaylandı**)
  - Leaflet kurulumu
  - Dark Matter harita katmanı
  - Repeater verisi entegrasyonu
  - UI çakışmaları giderildi (Compass Top-Right, Legend Bottom-Right)
- [x] **Adım 3.2**: ATÖLYE modülü - Hesaplayıcı arayüzleri (**Tamamlandı**)
  - Dipol Anten Hesaplayıcısı (HUD Style)
  - SWR Hesaplayıcı (Return Loss Map)
- [x] **Adım 3.3**: AKADEMİ modülü - Eğitim sayfaları (**Stabil**)
  - Mevzuat, Teknik ve İşletme Modül kartları
  - Günün Sorusu (Quiz Widget) UI

### Faz 4: Gelişmiş Özellikler (**Tamamlandı**)

- [x] **Adım 4.1**: Kullanıcı Girişi ve İlerleme Takibi (**Tamamlandı**)
  - localStorage ile XP ve Modül takibi
  - Modül kilidi açma mekanizması
- [x] **Adım 4.2**: Sınav Simülatörü motoru (**Tamamlandı**)
  - Timer ve Puanlama mantığı
  - Sonuç ekranı ve XP ödülü

### Faz 5: Deployment & Global Veri (**Tamamlandı**)

- [x] **Adım 5.1**: Veritabanı Bağlantısı (**Tamamlandı**)
  - PostgreSQL bağlantısı (Supabase/Neon)
  - Prisma Schema tasarımı (User, Progress)
  - Prisma Adapter (PG) kurulumu
- [x] **Adım 5.2**: SEO ve Meta Etiketler (**Tamamlandı**)
- [x] **Adım 5.3**: Global UI Polish (**Tamamlandı**) (Ambient Overlay, Scanlines)

### Faz 6: Advanced UI & Cinematic Upgrade (**Tamamlandı**)

- [x] **Adım 6.1**: Hero Animasyonu (**RetroGrid**) (Tamamlandı)
  - 21st.dev stili parallax grid arka planı.
- [x] **Adım 6.2**: Modül Kartları (**BorderBeam**) (Tamamlandı)
  - Neon ışınlı çerçeve animasyonları.
- [x] **Adım 6.3**: Shadcn UI Entegrasyonu (**Tamamlandı**)
  - `lib/utils` ve temel yapılandırma.

- [ ] **Adım 4.1**: Scroll-driven animasyonlar (framer-motion)
- [ ] **Adım 4.2**: SEO optimizasyonu
- [ ] **Adım 4.3**: Performance optimizasyonu
- [ ] **Adım 4.4**: PWA desteği

### Phase 6: Functional Extensions (Fonksiyonel Genişletmeler)
- [ ] **ISS Satellite Tracking**: Basic orbit line and real-time position.
- [ ] **Real-time QTH Locator**: Mouse hover Maidenhead grid calculation.
- [ ] **Enhanced Map Layers**: Terminator line (Day/Night) and Dark Matter refinement.

---

## 📁 Dosya Yapısı

```
amator_telsizcilik/
├── app/
│   ├── [locale]/           # Dile göre dinamik rota
│   │   ├── layout.tsx      # Locale layout + NextIntlClientProvider
│   │   └── page.tsx        # Ana sayfa
│   ├── globals.css         # Warframe temalı stiller (600+ satır)
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Root redirect
├── components/
│   ├── Navbar.tsx          # Floating nav + dil değiştirici
│   ├── Hero.tsx            # Parallax hero bölümü
│   ├── ModulesSection.tsx  # ATLAS/ATÖLYE/AKADEMİ kartları
│   ├── Footer.tsx          # HUD stilli footer
│   └── index.ts            # Barrel exports
├── i18n/
│   ├── request.ts          # next-intl sunucu yapılandırması
│   └── routing.ts          # Dil rotaları (TR varsayılan)
├── messages/
│   ├── tr.json             # Türkçe çeviriler
│   └── en.json             # İngilizce çeviriler
├── middleware.ts           # Dil yönlendirme middleware
├── next.config.ts          # Next.js + next-intl yapılandırması
└── IMPLEMENTATION_PLAN.md  # Bu dosya
```

---

## 🎯 Sonraki Adım

**Phase 6.1**: ISS Satellite Tracking & QTH Logic
- `AtlasClient` haritasına ISS yörüngesi eklenecek.
- Mouse hareketine duyarlı QTH Locator hesaplayıcısı eklenecek.

