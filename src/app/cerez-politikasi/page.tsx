import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası | Meveddet Derneği',
  description: 'Meveddet Derneği web sitesi çerez politikası ve kullanım şartları hakkında bilgi alın.',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Çerez Politikası</h1>
          
          <div className="prose prose-purple max-w-none">
            <p className="text-gray-600 mb-4">
              Bu Çerez Politikası, Meveddet Derneği web sitesinin çerez kullanımını açıklamaktadır.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Çerez Nedir?</h2>
            <p className="text-gray-600 mb-4">
              Çerezler, web sitesi tarafından tarayıcınıza gönderilen küçük metin dosyalarıdır. 
              Bu dosyalar, web sitesini ziyaret ettiğinizde cihazınızda saklanır ve web sitesinin 
              sizi tanımasına ve tercihlerinizi hatırlamasına yardımcı olur.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Hangi Çerezleri Kullanıyoruz?</h2>
            <ul className="list-disc pl-5 text-gray-600 mb-4">
              <li className="mb-2">
                <strong>Gerekli Çerezler:</strong> Web sitesinin temel işlevlerini sağlamak için kullanılır.
              </li>
              <li className="mb-2">
                <strong>Performans Çerezleri:</strong> Web sitesinin performansını analiz etmek ve iyileştirmek için kullanılır.
              </li>
              <li className="mb-2">
                <strong>İşlevsellik Çerezleri:</strong> Kullanıcı tercihlerini hatırlamak ve kişiselleştirilmiş deneyim sunmak için kullanılır.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
            <p className="text-gray-600 mb-4">
              Tarayıcınızın ayarlarından çerezleri kontrol edebilir ve silebilirsiniz. Ancak, 
              bazı çerezleri devre dışı bırakmanız web sitesinin bazı özelliklerinin düzgün 
              çalışmamasına neden olabilir.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Çerez Tercihlerinizi Yönetme</h2>
            <p className="text-gray-600 mb-4">
              Web sitemizde çerez kullanımına ilişkin tercihlerinizi yönetmek için sayfanın 
              altında bulunan çerez banner'ını kullanabilirsiniz.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Değişiklikler</h2>
            <p className="text-gray-600 mb-4">
              Bu Çerez Politikası zaman zaman güncellenebilir. Değişiklikler yapıldığında, 
              bu sayfada güncel versiyonu yayınlayacağız.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">İletişim</h2>
            <p className="text-gray-600">
              Çerez politikamız hakkında sorularınız varsa, lütfen bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 