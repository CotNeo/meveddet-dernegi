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
  const activities = JSON.parse(data);
  
  // Eğer dosya boşsa, örnek veriler ekle
  if (activities.length === 0) {
    const sampleActivities: Activity[] = [
      {
        id: 1,
        title: "Nevruz-i Sultani",
        description: "Osmanlı İmparatorluğu'nda yılbaşı olarak kabul edilen ve Sultan III. Murad tarafından resmi bayram ilan edilen önemli bir gündür.",
        date: "2025-03-22",
        images: ["/images/nevruz-main.jpg"],
        videos: ["https://www.youtube.com/embed/videoseries?list=PLY3SufQLgEGMz_VkuNkzPhGJp9ZcIN6Ii"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Prof. Dr. Hüseyin Hatemi ile Söyleşi",
        description: "Prof. Dr. Hüseyin Hatemi ile gerçekleştirdiğimiz söyleşi serisi.",
        date: "2025-04-10",
        images: ["/images/hatemi-main.jpg"],
        videos: ["https://www.youtube.com/embed/videoseries?list=PLY3SufQLgEGPmraJgSvM4VDzeu_0JSVZS"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    await saveActivities(sampleActivities);
    return sampleActivities;
  }
  
  return activities;
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

// GET: Tüm faaliyetleri getir
export async function GET() {
  try {
    const activities = await getActivities();
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Faaliyetler getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Faaliyetler getirilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

// POST: Yeni faaliyet ekle
export async function POST(request: NextRequest) {
  try {
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
    const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;

    // Görselleri kaydet
    const imagePaths = await saveImages(imageFiles);

    const newActivity: Activity = {
      id: newId,
      title,
      description,
      date,
      images: imagePaths,
      videos,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    activities.push(newActivity);
    await saveActivities(activities);

    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    console.error('Faaliyet eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Faaliyet eklenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 