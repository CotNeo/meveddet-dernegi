# Meveddet Derneği Web Sitesi

Bu proje, Meveddet Derneği için Next.js, TypeScript ve Tailwind CSS kullanılarak geliştirilmiş bir web sitesidir.

## Özellikler

- Duyuru yönetimi
- İletişim formu
- Admin paneli
- Responsive tasarım
- SEO optimizasyonu

## Gereksinimler

- Node.js 18.0.0 veya üzeri
- npm veya yarn

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullanici-adi/meveddet-dernegi.git
cd meveddet-dernegi
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Ortam değişkenlerini ayarlayın:
   - `.env.local` dosyasını oluşturun (geliştirme ortamı için)
   - `.env.production` dosyasını oluşturun (üretim ortamı için)

Örnek `.env.local` dosyası:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
NEXT_PUBLIC_ADMIN_USERNAME=admin
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
LOG_LEVEL=debug
```

Örnek `.env.production` dosyası:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
NEXT_PUBLIC_ADMIN_USERNAME=secure-username
NEXT_PUBLIC_ADMIN_PASSWORD=secure-password
LOG_LEVEL=error
```

## Geliştirme

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
# veya
yarn dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

## Derleme ve Dağıtım

Uygulamayı üretim için derlemek için:

```bash
npm run build
# veya
yarn build
```

Derlenen uygulamayı çalıştırmak için:

```bash
npm run start
# veya
yarn start
```

### Statik Dağıtım (Opsiyonel)

Eğer statik bir site olarak dağıtmak istiyorsanız, `next.config.js` dosyasında `output: 'export'` seçeneğini etkinleştirin ve aşağıdaki komutu çalıştırın:

```bash
npm run build
# veya
yarn build
```

Bu işlem `out` klasöründe statik dosyaları oluşturacaktır. Bu klasörü herhangi bir statik site barındırma hizmetine (Netlify, Vercel, GitHub Pages vb.) yükleyebilirsiniz.

## Admin Paneli

Admin paneline erişmek için:

1. [http://localhost:3000/admin](http://localhost:3000/admin) adresine gidin
2. `.env` dosyasında belirttiğiniz kullanıcı adı ve şifreyi kullanarak giriş yapın

Admin panelinde şunları yapabilirsiniz:
- Duyuruları yönetme (ekleme, düzenleme, silme)
- İletişim formundan gelen mesajları görüntüleme ve silme

## Proje Yapısı

```
meveddet-dernegi/
├── public/            # Statik dosyalar
├── src/
│   ├── app/           # App Router sayfaları ve API rotaları
│   ├── components/    # React bileşenleri
│   ├── styles/        # CSS dosyaları
│   ├── types/         # TypeScript tip tanımlamaları
│   └── utils/         # Yardımcı fonksiyonlar
├── .env.local         # Geliştirme ortamı değişkenleri
├── .env.production    # Üretim ortamı değişkenleri
├── next.config.js     # Next.js yapılandırması
└── tailwind.config.js # Tailwind CSS yapılandırması
```

## Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.

## İletişim

Sorularınız veya geri bildirimleriniz için [email@example.com](mailto:furkanaliakar@gmail.com) adresine e-posta gönderebilirsiniz.
