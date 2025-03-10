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