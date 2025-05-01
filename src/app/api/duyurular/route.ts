import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Announcement } from '@/models/Announcement';

const dataFilePath = path.join(process.cwd(), 'data', 'announcements.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Data klasörünü ve dosyayı oluştur
async function ensureDataFile() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, '[]');
  }

  // Uploads klasörünü oluştur
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
}

// Duyuruları oku
async function getAnnouncements(): Promise<Announcement[]> {
  await ensureDataFile();
  const data = await fs.readFile(dataFilePath, 'utf-8');
  const announcements = JSON.parse(data);

  // Eğer duyurular boşsa, örnek faaliyetleri ekle
  if (announcements.length === 0) {
    const sampleAnnouncements = [
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
        updatedAt: new Date().toISOString()
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
        updatedAt: new Date().toISOString()
      }
    ];

    await saveAnnouncements(sampleAnnouncements);
    return sampleAnnouncements;
  }

  return announcements;
}

// Duyuruları kaydet
async function saveAnnouncements(announcements: Announcement[]) {
  await ensureDataFile();
  await fs.writeFile(dataFilePath, JSON.stringify(announcements, null, 2));
}

// Görseli kaydet
async function saveImage(file: File): Promise<string> {
  await ensureDataFile();
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadsDir, filename);
  await fs.writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

// Tüm duyuruları getir
export async function GET() {
  try {
    const announcements = await getAnnouncements();
    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Duyurular getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Duyurular getirilirken bir hata oluştu' },
      { status: 500 }
    );
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
      updatedAt: new Date().toISOString()
    };

    announcements.push(newAnnouncement);
    await saveAnnouncements(announcements);

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error('Duyuru eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Duyuru eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 