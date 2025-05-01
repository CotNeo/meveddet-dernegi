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
  return JSON.parse(data);
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

// Eski görseli sil
async function deleteImage(imagePath: string) {
  if (imagePath) {
    const filepath = path.join(process.cwd(), 'public', imagePath);
    try {
      await fs.unlink(filepath);
    } catch (error) {
      console.error('Görsel silinirken hata:', error);
    }
  }
}

// URL'den ID parametresini alma yardımcı fonksiyonu
function getIdFromUrl(request: NextRequest): number {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const idStr = pathParts[pathParts.length - 1];
  return parseInt(idStr);
}

// Tek bir duyuruyu getir
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

// Duyuruyu güncelle
export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromUrl(request);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Geçersiz duyuru ID.' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const date = formData.get('date') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !content || !date) {
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

    let imagePath = announcements[index].image;
    if (imageFile) {
      // Eski görseli sil
      await deleteImage(announcements[index].image || '');
      // Yeni görseli kaydet
      imagePath = await saveImage(imageFile);
    }

    const updatedAnnouncement: Announcement = {
      ...announcements[index],
      title,
      content,
      date,
      image: imagePath,
      updatedAt: new Date().toISOString()
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

// Duyuruyu sil
export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromUrl(request);

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

    // Görseli sil
    await deleteImage(announcements[index].image || '');

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