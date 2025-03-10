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
}

// Duyuruları oku
async function getAnnouncements(): Promise<Announcement[]> {
  await ensureDataFile();
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

// Duyuruları kaydet
async function saveAnnouncements(announcements: Announcement[]) {
  await ensureDataFile();
  await fs.writeFile(dataFilePath, JSON.stringify(announcements, null, 2));
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Geçersiz duyuru ID.' },
        { status: 400 }
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

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Geçersiz duyuru ID.' },
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