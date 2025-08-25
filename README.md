# Maciz - Çizimler Hikaye Oluyor 🎨

Çocukların çizimlerini yapay zeka ile hikayelere dönüştüren eğitici mobil web uygulaması.

## 🌟 Özellikler

### 🎨 Çizim Araçları
- **Kalem, Fırça, Silgi**: Farklı kalınlıklarda çizim araçları
- **Dolgu Aracı**: Alanları tek tıkla boyama
- **Şekil Aracı**: Otomatik yıldız, kalp, daire, kare, üçgen çizimi
- **7 Renk Paleti**: Çocuk dostu renk seçenekleri
- **Touch Desteği**: Mobil cihazlarda parmakla çizim

### 📚 AI Destekli Hikaye Üretimi
- **Çizim Analizi**: Renk, karmaşıklık ve şekil tespiti
- **4 Farklı Tema**: Hayvanlar, Doğa, Sayılar, Duygular
- **Dinamik Hikayeler**: Her çizim için özel hikaye
- **Typewriter Efekti**: Hikayenin animasyonlu gösterimi

### 🔊 Sesli Anlatım
- **Türkçe TTS**: Web Speech API ile sesli okuma
- **Ayarlanabilir Hız**: Yavaş-hızlı ses seçenekleri
- **Oynatma Kontrolleri**: Durdur, devam et, tekrar oynat

### 👨‍👩‍👧 Ebeveyn Paneli
- **Matematik Kilidi**: 7+8=15 güvenlik sorusu
- **Tema Yönetimi**: Hikaye temalarını seçme
- **Güvenlik Ayarları**: İçerik filtreleme, sessiz saatler
- **İlerleme Raporu**: Çizim sayısı, süre, istatistikler

### 📖 Hikaye Kitaplığı
- **Otomatik Kaydetme**: Tüm hikayeler LocalStorage'da
- **Thumbnail Görünümü**: Çizimlerin küçük önizlemeleri
- **Arama ve Filtreleme**: Tarih ve tema bazında
- **Tekrar Oynatma**: Kaydedilen hikayeleri dinleme

### 💎 Premium Sistem
- **Günlük Limit**: Ücretsiz kullanıcılar için 1 hikaye/gün
- **Premium Deneme**: 7 gün ücretsiz deneme
- **Sınırsız Hikaye**: Premium kullanıcılar için

## 🚀 Teknolojiler

- **React 18** - Modern UI framework
- **TypeScript** - Type safety
- **Vite** - Hızlı build tool
- **Canvas API** - Çizim işlemleri
- **Web Speech API** - Sesli okuma
- **LocalStorage** - Veri saklama
- **Tailwind CSS** - Styling
- **Lucide React** - İkonlar

## 📱 Desteklenen Cihazlar

- **Mobil**: iOS Safari, Android Chrome
- **Tablet**: iPad, Android tabletler
- **Desktop**: Chrome, Firefox, Safari, Edge

## 🛠️ Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/[kullanici-adi]/maciz-app.git

# Dizine gidin
cd maciz-app

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Production build
npm run build
```

## 📂 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── DrawingScreen.tsx
│   ├── StoryScreen.tsx
│   ├── LibraryScreen.tsx
│   ├── ParentScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── BottomNav.tsx
│   └── Modals.tsx
├── hooks/              # Custom React hooks
│   ├── useCanvas.ts
│   ├── useSpeech.ts
│   └── useLocalStorage.ts
├── utils/              # Yardımcı fonksiyonlar
│   ├── drawingAnalyzer.ts
│   └── storyGenerator.ts
├── types/              # TypeScript tipleri
│   └── index.ts
├── App.tsx             # Ana uygulama
├── main.tsx           # Giriş noktası
└── index.css          # Global stiller
```

## 🎯 Kullanım

### İlk Kullanım
1. **Yaş Seçimi**: 4-5, 6-7, Ebeveyn, 8+ seçeneklerinden birini seçin
2. **Ana Sayfa**: Son çizimler ve günlük görevleri görün
3. **Çizim Başlat**: "+" butonu veya görev butonuna tıklayın

### Çizim Yapma
1. **Araç Seç**: Kalem, fırça, silgi, dolgu veya şekil
2. **Renk Seç**: 7 renk paletinden istediğinizi seçin
3. **Çiz**: Touch veya mouse ile çizim yapın
4. **Hikaye Oluştur**: Butona basarak hikayeyi oluşturun

### Hikaye Dinleme
1. **Analiz**: 2 saniye loading süreci
2. **Hikaye Gösterimi**: Typewriter efekti ile metin
3. **Sesli Anlatım**: Otomatik başlayan TTS
4. **Etkileşim**: Soru-cevap bölümü
5. **Kaydet**: Otomatik kitaplığa ekleme

## 🔐 Güvenlik

- **Ebeveyn Kilidi**: Matematik sorusu ile korumalı panel
- **İçerik Filtreleme**: Uygunsuz içerik kontrolü
- **Yaş Uygunluğu**: 4-7 yaş arası çocuklar için optimize
- **Veri Güvenliği**: Tüm veriler yerel olarak saklanır

## 📊 Özellik Durumu

### ✅ Tamamlanan Özellikler
- [x] Gerçek çizim yapma
- [x] Renk ve araç seçimi
- [x] Sesli hikaye anlatımı (TTS)
- [x] Çizim analizi ve dinamik hikaye
- [x] LocalStorage ile veri saklama
- [x] Hikaye kitaplığı
- [x] Ebeveyn kilidi
- [x] Günlük limit kontrolü
- [x] Premium modal
- [x] Ayarlar kaydetme
- [x] Touch/Mobile desteği

### 🔄 Gelecek Özellikler
- [ ] Çoklu dil desteği
- [ ] Sosyal paylaşım
- [ ] Çevrimdışı mod
- [ ] Ses kaydetme
- [ ] Animasyonlu hikayeler

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Ekip

- **Geliştirici**: [Adınız]
- **Tasarım**: [Tasarımcı Adı]
- **AI Uzmanı**: [AI Uzmanı Adı]

## 📞 İletişim

- **Email**: info@maciz.com
- **Website**: https://maciz.com
- **Demo**: https://maciz-izimler-hikaye-rief.bolt.host

## 🙏 Teşekkürler

- React ekibine modern framework için
- Vite ekibine hızlı build tool için
- Tüm açık kaynak katkıcılarına

---

**Maciz** - Çocukların hayal gücünü teknoloji ile buluşturan eğitici uygulama 🌟
