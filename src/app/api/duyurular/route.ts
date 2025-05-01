import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Announcement } from '@/models/Announcement';

// Production ortamında tmp klasörünü kullan
const dataDir = process.env.NODE_ENV === 'production' 
  ? path.join('/tmp', 'meveddet-data')
  : path.join(process.cwd(), 'data');

const dataFilePath = path.join(dataDir, 'announcements.json');
const uploadsDir = process.env.NODE_ENV === 'production'
  ? path.join('/tmp', 'meveddet-uploads')
  : path.join(process.cwd(), 'public', 'uploads');

// Data klasörünü ve dosyayı oluştur
async function ensureDataFile() {
  try {
    // Data dizinini oluştur
    await fs.access(dataDir).catch(async () => {
      await fs.mkdir(dataDir, { recursive: true });
      console.log('Data dizini oluşturuldu:', dataDir);
    });

    // Announcements dosyasını oluştur
    await fs.access(dataFilePath).catch(async () => {
      await fs.writeFile(dataFilePath, '[]');
      console.log('Announcements dosyası oluşturuldu:', dataFilePath);
    });

    // Uploads dizinini oluştur
    await fs.access(uploadsDir).catch(async () => {
      await fs.mkdir(uploadsDir, { recursive: true });
      console.log('Uploads dizini oluşturuldu:', uploadsDir);
    });

    return true;
  } catch (error) {
    console.error('Data dizini oluşturulurken hata:', error);
    return false;
  }
}

// Duyuruları oku
async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const isDataReady = await ensureDataFile();
    if (!isDataReady) {
      console.log('Örnek duyurular kullanılıyor...');
      return getSampleAnnouncements();
    }

    const data = await fs.readFile(dataFilePath, 'utf-8');
    let announcements: Announcement[] = [];
    
    try {
      announcements = JSON.parse(data);
    } catch (error) {
      console.error('JSON parse hatası:', error);
      return getSampleAnnouncements();
    }

    if (!Array.isArray(announcements) || announcements.length === 0) {
      return getSampleAnnouncements();
    }

    return announcements;
  } catch (error) {
    console.error('Duyurular okunurken hata:', error);
    return getSampleAnnouncements();
  }
}

// Örnek duyuruları getir
function getSampleAnnouncements(): Announcement[] {
  return [
    {
      id: 1,
      title: "Nevruz-i Sultani",
      content: `
        <h3>NEVRUZ-İ SULTÂNÎ PROGRAMI</h3>
        <p>Nevruz-i Sultânî, Osmanlı İmparatorluğu'nda yılbaşı olarak kabul edilen ve Sultan III. Murad tarafından resmi bayram ilan edilen önemli bir gündür.</p>
        <h4>Program İçeriği:</h4>
        <ul>
          <li>Açılış konuşması: Can Ulusoy</li>
          <li>Osmanlı Tekkelerinde Nevruz: Kahraman Özkök</li>
          <li>Mevlid-i Ali: İsa Nesim</li>
          <li>İlahi ve Nefesler: Bursa Mevlevîhanesi Mûsikî Topluluğu</li>
          <li>Nevruz Sütü İkramı</li>
        </ul>
        <h4>Etkinlik Detayları:</h4>
        <ul>
          <li>Tarih: 22 Mart Cumartesi</li>
          <li>Saat: 15:30</li>
          <li>Yer: Bursa Mevlevîhanesi ve Müzesi</li>
        </ul>
      `,
      date: "2025-03-22",
      image: "/images/nevruz-main.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    },
    {
      id: 2,
      title: "Prof. Dr. Hüseyin Hatemi ile Söyleşi",
      content: `
        <p>Prof. Dr. Hüseyin Hatemi ile gerçekleştirdiğimiz söyleşi serisini sizlerle buluşturuyoruz.</p>
        <p>Bu değerli söyleşi serisinde, Prof. Dr. Hüseyin Hatemi ile önemli konular üzerine derinlemesine sohbetler gerçekleştireceğiz.</p>
        <h4>Etkinlik Detayları:</h4>
        <ul>
          <li>Tarih: 10 Nisan 2025</li>
          <li>Yer: Meveddet Derneği Konferans Salonu</li>
        </ul>
        <p>Tüm üyelerimiz ve ilgilenenler davetlidir.</p>
      `,
      date: "2025-04-10",
      image: "/images/hatemi-main.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    }
  ];
}

// Duyuruları kaydet
async function saveAnnouncements(announcements: Announcement[]) {
  try {
    const isDataReady = await ensureDataFile();
    if (!isDataReady) {
      console.error('Data dizini oluşturulamadı');
      return false;
    }
    
    await fs.writeFile(dataFilePath, JSON.stringify(announcements, null, 2));
    return true;
  } catch (error) {
    console.error('Duyurular kaydedilirken hata:', error);
    return false;
  }
}

// Görseli kaydet
async function saveImage(file: File): Promise<string> {
  try {
    const isDataReady = await ensureDataFile();
    if (!isDataReady) {
      throw new Error('Uploads dizini oluşturulamadı');
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadsDir, filename);
    await fs.writeFile(filepath, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Görsel kaydedilirken hata:', error);
    throw error;
  }
}

// Tüm duyuruları getir
export async function GET() {
  try {
    const announcements = await getAnnouncements();
    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Duyurular getirilirken hata:', error);
    // Hata durumunda örnek duyuruları döndür
    return NextResponse.json(getSampleAnnouncements());
  }
}

// Yeni duyuru ekle
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const date = formData.get('date') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !content || !date) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur' },
        { status: 400 }
      );
    }

    const announcements = await getAnnouncements();
    const newId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;

    let imagePath = '';
    if (imageFile) {
      imagePath = await saveImage(imageFile);
    }

    const newAnnouncement: Announcement = {
      id: newId,
      title,
      content,
      date,
      image: imagePath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };

    announcements.push(newAnnouncement);
    const saved = await saveAnnouncements(announcements);

    if (!saved) {
      return NextResponse.json(
        { error: 'Duyuru kaydedilemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error('Duyuru eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Duyuru eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 