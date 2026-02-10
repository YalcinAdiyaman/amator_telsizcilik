# UI/UX İyileştirmeleri ve Mobil Uyum Düzeltmeleri

> **Durum:** Beklemede (Pending)
> **Öncelik:** Yüksek
> **Oluşturulma Tarihi:** 11.02.2026

## 📱 Mobil Görünüm Hataları (Mobile Responsiveness)
- [ ] **Navbar:** Mobil menü açıldığında arka plan bulanıklığı (blur) veya z-index sorunu olabilir. Menü elemanları tam oturmuyor olabilir.
- [ ] **ModulesSection:** Kartlar mobilde çok büyük veya taşma yapıyor olabilir. Kenar boşlukları (padding) gözden geçirilmeli.
- [ ] **Footer:** Alt kısımdaki linkler ve metinler mobilde üst üste biniyor mu? Grid yapısı mobilde tek kolona düşerken hizalama sorunları.
- [ ] **Genel:** Sayfa sağa sola kayıyor mu? (Overflow-x sorunu).

## 🎨 Tasarım Glitchleri (Design Glitches)
- [ ] **Link Hover Efektleri:** Bazı linklerde hover (üzerine gelme) efekti takılıyor veya renkler uyumsuz.
- [ ] **Butonlar:** Tıklanabilir alanlar yeterince büyük mü?
- [ ] **Animasyonlar:** Sayfa geçişlerinde veya scroll sırasında titreme (flickering) var mı?

## 🚀 Sonraki Adımlar
1.  Mobil cihazlarda (Chrome DevTools Mobile Mode) detaylı test yapılması.
2.  `tailwind-patterns` skill'i kullanılarak responsive sınıfların (`md:`, `lg:`) optimize edilmesi.
3.  UI/UX Audit scriptinin çalıştırılması.

---
**Notlar:**
Proje şu anda GitHub Pages üzerinde yayında ve temel navigasyon çalışıyor. Bu liste bir sonraki geliştirme oturumunun başlangıç noktasıdır.
