# Meveddet Derneği Web Sitesi

Bu proje, Meveddet Derneği için Next.js, TypeScript ve Tailwind CSS kullanılarak geliştirilmiş modern ve responsive bir web sitesidir.

## Özellikler

- Modern ve kullanıcı dostu arayüz
- Responsive tasarım (mobil, tablet ve masaüstü uyumlu)
- Animasyonlu bileşenler ve geçişler
- SEO optimizasyonu
- Hızlı sayfa yükleme
- Duyuru sistemi
- İletişim formu
- Etkinlik takvimi
- Görsel galeri

## Teknolojiler

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion (animasyonlar için)
- React Hook Form (form yönetimi)

## Gereksinimler

- Node.js 18.0.0 veya üzeri
- npm veya yarn

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/your-username/meveddet-dernegi.git
cd meveddet-dernegi
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

## Canlıya Alma

1. Production build alın:
```bash
npm run build
# veya
yarn build
```

2. Build'i test edin:
```bash
npm run start
# veya
yarn start
```

3. Vercel'e deploy edin:
```bash
vercel
```

## Proje Yapısı

```
meveddet-dernegi/
├── public/
│   ├── images/        # Görsel dosyaları
│   └── fonts/         # Font dosyaları
├── src/
│   ├── app/          
│   │   ├── page.tsx              # Ana sayfa
│   │   ├── hakkimizda/          # Hakkımızda sayfası
│   │   ├── faaliyetler/         # Faaliyetler sayfası
│   │   ├── duyurular/           # Duyurular sayfası
│   │   └── iletisim/            # İletişim sayfası
│   ├── components/   
│   │   ├── animations/          # Animasyon bileşenleri
│   │   ├── layout/              # Layout bileşenleri
│   │   └── ui/                  # UI bileşenleri
│   ├── models/                  # Veri modelleri
│   └── services/               # API servisleri
├── tailwind.config.js          # Tailwind yapılandırması
└── next.config.js             # Next.js yapılandırması
```

## Sayfalar

- **Ana Sayfa**: Dernek hakkında genel bilgiler ve güncel duyurular
- **Hakkımızda**: Derneğin tarihçesi ve misyonu
- **Faaliyetler**: Dernek faaliyetleri ve etkinlik takvimi
- **Duyurular**: Güncel duyurular ve haberler
- **İletişim**: İletişim formu ve konum bilgileri

## Özelleştirme

1. Renk şeması `tailwind.config.js` dosyasından özelleştirilebilir
2. Font ailesi `next.config.js` ve ilgili CSS dosyalarından değiştirilebilir
3. Animasyonlar `components/animations` klasöründen yönetilebilir

## Performans Optimizasyonları

- Görsel optimizasyonu için Next.js Image komponenti kullanıldı
- Sayfa yüklemelerinde progresif geliştirme
- Code splitting ve lazy loading
- Önbelleğe alma stratejileri

## İletişim

Proje ile ilgili sorularınız için:
- Email: furkanaliakar@gmail.com

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
