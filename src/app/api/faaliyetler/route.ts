import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Activity } from '@/models/Activity';

// Production ortamında tmp klasörünü kullan
const dataDir = process.env.NODE_ENV === 'production' 
  ? path.join('/tmp', 'meveddet-data')
  : path.join(process.cwd(), 'data');

const dataFilePath = path.join(dataDir, 'activities.json');
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

    // Activities dosyasını oluştur
    await fs.access(dataFilePath).catch(async () => {
      await fs.writeFile(dataFilePath, '[]');
      console.log('Activities dosyası oluşturuldu:', dataFilePath);
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

// Faaliyetleri oku
async function getActivities(): Promise<Activity[]> {
  try {
    const isDataReady = await ensureDataFile();
    if (!isDataReady) {
      console.log('Örnek faaliyetler kullanılıyor...');
      return getSampleActivities();
    }

    const data = await fs.readFile(dataFilePath, 'utf-8');
    let activities: Activity[] = [];
    
    try {
      activities = JSON.parse(data);
    } catch (error) {
      console.error('JSON parse hatası:', error);
      return getSampleActivities();
    }

    if (!Array.isArray(activities) || activities.length === 0) {
      return getSampleActivities();
    }

    return activities;
  } catch (error) {
    console.error('Faaliyetler okunurken hata:', error);
    return getSampleActivities();
  }
}

// Örnek faaliyetleri getir
function getSampleActivities(): Activity[] {
  return [
    {
      id: 1,
      title: "Nevruz-i Sultani",
      description: "Nevruz-i Sultânî, Osmanlı İmparatorluğu'nda yılbaşı olarak kabul edilen ve Sultan III. Murad tarafından resmi bayram ilan edilen önemli bir gündür.",
      date: "2025-03-22",
      image: "/images/nevruz-main.jpg",
      location: "Bursa Mevlevîhanesi ve Müzesi",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    },
    {
      id: 2,
      title: "Prof. Dr. Hüseyin Hatemi ile Söyleşi",
      description: "Prof. Dr. Hüseyin Hatemi ile gerçekleştirdiğimiz söyleşi serisini sizlerle buluşturuyoruz.",
      date: "2025-04-10",
      image: "/images/hatemi-main.jpg",
      location: "Meveddet Derneği Konferans Salonu",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    }
  ];
}

// Faaliyetleri kaydet
async function saveActivities(activities: Activity[]) {
  try {
    const isDataReady = await ensureDataFile();
    if (!isDataReady) {
      console.error('Data dizini oluşturulamadı');
      return false;
    }
    
    await fs.writeFile(dataFilePath, JSON.stringify(activities, null, 2));
    return true;
  } catch (error) {
    console.error('Faaliyetler kaydedilirken hata:', error);
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

// Tüm faaliyetleri getir
export async function GET() {
  try {
    const activities = await getActivities();
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Faaliyetler getirilirken hata:', error);
    return NextResponse.json(getSampleActivities());
  }
}

// Yeni faaliyet ekle
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !description || !date || !location) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur' },
        { status: 400 }
      );
    }

    const activities = await getActivities();
    const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;

    let imagePath = '';
    if (imageFile) {
      imagePath = await saveImage(imageFile);
    }

    const newActivity: Activity = {
      id: newId,
      title,
      description,
      date,
      location,
      image: imagePath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };

    activities.push(newActivity);
    const saved = await saveActivities(activities);

    if (!saved) {
      return NextResponse.json(
        { error: 'Faaliyet kaydedilemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    console.error('Faaliyet eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Faaliyet eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 