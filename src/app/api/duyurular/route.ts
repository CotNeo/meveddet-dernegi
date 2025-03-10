import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Duyuru için arayüz
interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  summary: string;
}

// Duyuruların saklanacağı dosya yolu
const dataFilePath = path.join(process.cwd(), 'data', 'announcements.json');

// Vercel ortamında çalışıp çalışmadığımızı kontrol et
const isVercel = process.env.VERCEL === '1';

// Data klasörünü ve dosyayı oluştur
async function ensureDataFile() {
  // Vercel ortamında bu işlemi atla
  if (isVercel) return;
  
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
}

// Duyuruları oku
async function getAnnouncements(): Promise<Announcement[]> {
  await ensureDataFile();
  
  // Vercel ortamında varsayılan duyuruları döndür
  if (isVercel) {
    return [
      {
        id: 1,
        title: 'Yardım Kampanyası Başladı',
        date: '15 Mart 2023',
        summary: 'İhtiyaç sahiplerine yardım etmek için yeni kampanyamız başladı. Detaylı bilgi için tıklayın.',
        content: 'İhtiyaç sahiplerine yardım etmek için yeni kampanyamız başladı. Bu kampanya kapsamında toplanan yardımlar, ihtiyaç sahiplerine ulaştırılacaktır. Katkıda bulunmak için derneğimize ulaşabilirsiniz.'
      },
      {
        id: 2,
        title: 'Gönüllü Toplantısı',
        date: '20 Mart 2023',
        summary: 'Derneğimizin gönüllüleri ile yapılacak toplantı hakkında bilgilendirme.',
        content: 'Derneğimizin gönüllüleri ile yapılacak toplantı 20 Mart 2023 tarihinde dernek merkezimizde gerçekleştirilecektir. Tüm gönüllülerimizin katılımını bekliyoruz.'
      },
      {
        id: 3,
        title: 'Eğitim Desteği Projesi',
        date: '25 Mart 2023',
        summary: 'Öğrencilere eğitim desteği sağlamak için başlattığımız yeni projemiz hakkında bilgi.',
        content: 'Öğrencilere eğitim desteği sağlamak için başlattığımız yeni projemiz kapsamında, ihtiyaç sahibi öğrencilere kitap, kırtasiye ve teknolojik ekipman desteği sağlanacaktır. Detaylı bilgi için derneğimize ulaşabilirsiniz.'
      }
    ];
  }
  
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

// Duyuruları kaydet
async function saveAnnouncements(announcements: Announcement[]) {
  // Vercel ortamında bu işlemi atla
  if (isVercel) return;
  
  await ensureDataFile();
  await fs.writeFile(dataFilePath, JSON.stringify(announcements, null, 2));
}

// GET: Tüm duyuruları getir
export async function GET() {
  try {
    const announcements = await getAnnouncements();
    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Duyurular yüklenirken hata:', error);
    return NextResponse.json(
      { error: 'Duyurular yüklenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

// POST: Yeni duyuru ekle
export async function POST(request: Request) {
  try {
    // Vercel ortamında ekleme işlemini engelle
    if (isVercel) {
      return NextResponse.json(
        { error: 'Demo ortamında duyuru eklenemez.' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { title, content, summary } = body;

    // Gerekli alanları kontrol et
    if (!title || !content || !summary) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur.' },
        { status: 400 }
      );
    }

    const announcements = await getAnnouncements();
    
    // Yeni duyuru için ID oluştur
    const newId = announcements.length > 0 
      ? Math.max(...announcements.map(a => a.id)) + 1 
      : 1;

    const newAnnouncement: Announcement = {
      id: newId,
      title,
      content,
      summary,
      date: new Date().toLocaleDateString('tr-TR'),
    };

    announcements.push(newAnnouncement);
    await saveAnnouncements(announcements);

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error('Duyuru eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Duyuru eklenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 