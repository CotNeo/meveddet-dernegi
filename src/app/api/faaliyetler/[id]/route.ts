import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Activity } from '@/models/Activity';

const dataFilePath = path.join(process.cwd(), 'data', 'activities.json');
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

// Faaliyetleri oku
async function getActivities(): Promise<Activity[]> {
  await ensureDataFile();
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

// Faaliyetleri kaydet
async function saveActivities(activities: Activity[]) {
  await ensureDataFile();
  await fs.writeFile(dataFilePath, JSON.stringify(activities, null, 2));
}

// Görselleri kaydet
async function saveImages(files: File[]): Promise<string[]> {
  await ensureDataFile();
  const imagePaths: string[] = [];
  
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadsDir, filename);
    await fs.writeFile(filepath, buffer);
    imagePaths.push(`/uploads/${filename}`);
  }
  
  return imagePaths;
}

// Eski görselleri sil
async function deleteImages(imagePaths: string[]) {
  for (const imagePath of imagePaths) {
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

// GET: Tek bir faaliyeti getir
export async function GET(request: NextRequest) {
  try {
    const id = getIdFromUrl(request);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Geçersiz faaliyet ID.' },
        { status: 400 }
      );
    }

    const activities = await getActivities();
    const activity = activities.find(a => a.id === id);

    if (!activity) {
      return NextResponse.json(
        { error: 'Faaliyet bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error('Faaliyet getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Faaliyet getirilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

// PUT: Faaliyeti güncelle
export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromUrl(request);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Geçersiz faaliyet ID.' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const imageFiles = formData.getAll('images') as File[];
    const videos = formData.getAll('videos') as string[];

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur.' },
        { status: 400 }
      );
    }

    const activities = await getActivities();
    const index = activities.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Faaliyet bulunamadı.' },
        { status: 404 }
      );
    }

    // Eski görselleri sil
    await deleteImages(activities[index].images);

    // Yeni görselleri kaydet
    const imagePaths = await saveImages(imageFiles);

    const updatedActivity: Activity = {
      ...activities[index],
      title,
      description,
      date,
      images: imagePaths,
      videos,
      updatedAt: new Date().toISOString()
    };

    activities[index] = updatedActivity;
    await saveActivities(activities);

    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error('Faaliyet güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Faaliyet güncellenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

// DELETE: Faaliyeti sil
export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromUrl(request);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Geçersiz faaliyet ID.' },
        { status: 400 }
      );
    }

    const activities = await getActivities();
    const index = activities.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Faaliyet bulunamadı.' },
        { status: 404 }
      );
    }

    // Görselleri sil
    await deleteImages(activities[index].images);

    activities.splice(index, 1);
    await saveActivities(activities);

    return NextResponse.json({ message: 'Faaliyet başarıyla silindi.' });
  } catch (error) {
    console.error('Faaliyet silinirken hata:', error);
    return NextResponse.json(
      { error: 'Faaliyet silinirken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 