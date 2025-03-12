import { NextRequest, NextResponse } from 'next/server';
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
        title: 'Güncel Duyurular',
        date: ' Mart 2025',
        summary: 'Açılış.',
        content: 'Açılış.'
      },
      
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

// URL'den ID parametresini alma yardımcı fonksiyonu
function getIdFromUrl(request: NextRequest): number {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const idStr = pathParts[pathParts.length - 1];
  return parseInt(idStr);
}

export async function GET(request: NextRequest) {
  try {
    const id = getIdFromUrl(request);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Geçersiz duyuru ID.' },
        { status: 400 }
      );
    }

    const announcements = await getAnnouncements();
    const announcement = announcements.find(a => a.id === id);

    if (!announcement) {
      return NextResponse.json(
        { error: 'Duyuru bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json(announcement);
  } catch (error) {
    console.error('Duyuru getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Duyuru getirilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromUrl(request);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Geçersiz duyuru ID.' },
        { status: 400 }
      );
    }

    // Vercel ortamında güncelleme işlemini engelle
    if (isVercel) {
      return NextResponse.json(
        { error: 'Demo ortamında duyuru güncellenemez.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, content, summary } = body;

    if (!title || !content || !summary) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur.' },
        { status: 400 }
      );
    }

    const announcements = await getAnnouncements();
    const index = announcements.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Duyuru bulunamadı.' },
        { status: 404 }
      );
    }

    const updatedAnnouncement: Announcement = {
      ...announcements[index],
      title,
      content,
      summary,
      date: new Date().toLocaleDateString('tr-TR'),
    };

    announcements[index] = updatedAnnouncement;
    await saveAnnouncements(announcements);

    return NextResponse.json(updatedAnnouncement);
  } catch (error) {
    console.error('Duyuru güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Duyuru güncellenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromUrl(request);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Geçersiz duyuru ID.' },
        { status: 400 }
      );
    }

    // Vercel ortamında silme işlemini engelle
    if (isVercel) {
      return NextResponse.json(
        { error: 'Demo ortamında duyuru silinemez.' },
        { status: 403 }
      );
    }

    const announcements = await getAnnouncements();
    const index = announcements.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Duyuru bulunamadı.' },
        { status: 404 }
      );
    }

    announcements.splice(index, 1);
    await saveAnnouncements(announcements);

    return NextResponse.json({ message: 'Duyuru başarıyla silindi.' });
  } catch (error) {
    console.error('Duyuru silinirken hata:', error);
    return NextResponse.json(
      { error: 'Duyuru silinirken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 