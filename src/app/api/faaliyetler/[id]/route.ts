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

// Görseli sil
async function deleteImage(imagePath: string) {
  try {
    if (!imagePath || !imagePath.startsWith('/uploads/')) {
      return;
    }

    const filename = imagePath.replace('/uploads/', '');
    const filepath = path.join(uploadsDir, filename);
    await fs.unlink(filepath);
  } catch (error) {
    console.error('Görsel silinirken hata:', error);
  }
}

// Tek bir faaliyet getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const activities = await getActivities();
    const activity = activities.find(a => a.id === parseInt(resolvedParams.id));

    if (!activity) {
      return NextResponse.json(
        { error: 'Faaliyet bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error('Faaliyet getirilirken hata:', error);
    return NextResponse.json(
      { error: 'Faaliyet getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Faaliyet güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;
    const imageFile = formData.get('image') as File | null;
    const isActive = formData.get('isActive') === 'true';

    if (!title || !description || !date || !location) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur' },
        { status: 400 }
      );
    }

    const activities = await getActivities();
    const index = activities.findIndex(a => a.id === parseInt(resolvedParams.id));

    if (index === -1) {
      return NextResponse.json(
        { error: 'Faaliyet bulunamadı' },
        { status: 404 }
      );
    }

    let imagePath = activities[index].image;
    if (imageFile) {
      // Eski görseli sil
      await deleteImage(activities[index].image);
      // Yeni görseli kaydet
      imagePath = await saveImage(imageFile);
    }

    activities[index] = {
      ...activities[index],
      title,
      description,
      date,
      location,
      image: imagePath,
      updatedAt: new Date().toISOString(),
      isActive
    };

    const saved = await saveActivities(activities);

    if (!saved) {
      return NextResponse.json(
        { error: 'Faaliyet güncellenemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json(activities[index]);
  } catch (error) {
    console.error('Faaliyet güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Faaliyet güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Faaliyet sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const activities = await getActivities();
    const index = activities.findIndex(a => a.id === parseInt(resolvedParams.id));

    if (index === -1) {
      return NextResponse.json(
        { error: 'Faaliyet bulunamadı' },
        { status: 404 }
      );
    }

    // Görseli sil
    await deleteImage(activities[index].image);

    // Faaliyeti sil
    activities.splice(index, 1);
    const saved = await saveActivities(activities);

    if (!saved) {
      return NextResponse.json(
        { error: 'Faaliyet silinemedi' },
        { status: 500 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Faaliyet silinirken hata:', error);
    return NextResponse.json(
      { error: 'Faaliyet silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 