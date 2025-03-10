# Meveddet Derneği Web Sitesi

Bu proje, Meveddet Derneği için geliştirilmiş modern ve kullanıcı dostu bir web sitesidir. Next.js ve TailwindCSS kullanılarak oluşturulmuştur.

## 🚀 Özellikler

- 📱 Responsive tasarım
- 📢 Duyuru yönetim sistemi
- 📧 İletişim formu
- 🔐 Admin paneli
- 🎨 Modern ve kullanıcı dostu arayüz

## 🛠️ Teknolojiler

- [Next.js 14](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği
- [Nodemailer](https://nodemailer.com/) - E-posta gönderimi

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd meveddet-next
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Ortam değişkenlerini ayarlayın:
```bash
# .env.local dosyası oluşturun
cp .env.example .env.local

# Aşağıdaki değişkenleri ayarlayın:
# E-posta ayarları
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Admin girişi
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=your-password
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 📁 Proje Yapısı

```
meveddet-next/
├── src/
│   ├── app/                    # Sayfa bileşenleri
│   │   ├── admin/             # Admin paneli
│   │   ├── api/               # API endpoint'leri
│   │   ├── duyurular/         # Duyurular sayfası
│   │   ├── hakkimizda/        # Hakkımızda sayfası
│   │   └── iletisim/         # İletişim sayfası
│   ├── components/            # Yeniden kullanılabilir bileşenler
│   └── styles/               # Global stiller
├── public/                   # Statik dosyalar
└── data/                    # JSON veri dosyaları
```

## 🔧 API Endpoint'leri

### Duyurular API

- ```GET /api/duyurular``` - Tüm duyuruları listele
- ```POST /api/duyurular``` - Yeni duyuru ekle
- ```GET /api/duyurular/[id]``` - Belirli bir duyuruyu getir
- ```PUT /api/duyurular/[id]``` - Duyuru güncelle
- ```DELETE /api/duyurular/[id]``` - Duyuru sil

### İletişim API

- ```POST /api/contact``` - İletişim formu gönderimi

## 👥 Admin Paneli

Admin paneline erişim için:
1. ```/admin``` sayfasına gidin
2. Kullanıcı adı ve şifre ile giriş yapın
3. Duyuruları yönetin (ekle, düzenle, sil)

## 📧 E-posta Ayarları

İletişim formunun çalışması için Gmail hesabınızda şu adımları izleyin:
1. Google Hesap Ayarları > Güvenlik > 2 Adımlı Doğrulama'yı etkinleştirin
2. Uygulama Şifreleri > Diğer > Next.js Web uygulaması için şifre oluşturun
3. Oluşturulan şifreyi ```.env.local``` dosyasında ```EMAIL_PASS``` olarak kullanın

## 🔒 Güvenlik

- Admin paneli oturum yönetimi
- Form doğrulamaları
- API endpoint güvenliği
- Hata yönetimi ve loglama

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Meveddet Derneği - [info@meveddetdernegi.org](mailto:info@meveddetdernegi.org)

Proje Linki: [https://github.com/username/meveddet-next](https://github.com/username/meveddet-next)
