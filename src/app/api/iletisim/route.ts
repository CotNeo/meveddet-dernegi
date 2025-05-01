import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { ContactMessage } from '@/models/ContactMessage';

// Production ortamında tmp klasörünü kullan
const dataDir = process.env.NODE_ENV === 'production' 
  ? path.join('/tmp', 'meveddet-data')
  : path.join(process.cwd(), 'data');

const dataFilePath = path.join(dataDir, 'contact-messages.json');

// Data klasörünü ve dosyayı oluştur
async function ensureDataFile() {
  try {
    // Data dizinini oluştur
    await fs.access(dataDir).catch(async () => {
      await fs.mkdir(dataDir, { recursive: true });
      console.log('Data dizini oluşturuldu:', dataDir);
    });

    // Contact messages dosyasını oluştur
    await fs.access(dataFilePath).catch(async () => {
      await fs.writeFile(dataFilePath, '[]');
      console.log('Contact messages dosyası oluşturuldu:', dataFilePath);
    });

    return true;
  } catch (error) {
    console.error('Data dizini oluşturulurken hata:', error);
    return false;
  }
}

// İletişim mesajlarını oku
async function getMessages(): Promise<ContactMessage[]> {
  try {
    const isDataReady = await ensureDataFile();
    if (!isDataReady) {
      console.log('Boş mesaj listesi döndürülüyor...');
      return [];
    }

    const data = await fs.readFile(dataFilePath, 'utf-8');
    let messages: ContactMessage[] = [];
    
    try {
      messages = JSON.parse(data);
    } catch (error) {
      console.error('JSON parse hatası:', error);
      return [];
    }

    if (!Array.isArray(messages)) {
      return [];
    }

    return messages;
  } catch (error) {
    console.error('Mesajlar okunurken hata:', error);
    return [];
  }
}

// Mesajları kaydet
async function saveMessages(messages: ContactMessage[]) {
  try {
    const isDataReady = await ensureDataFile();
    if (!isDataReady) {
      console.error('Data dizini oluşturulamadı');
      return false;
    }
    
    await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2));
    return true;
  } catch (error) {
    console.error('Mesajlar kaydedilirken hata:', error);
    return false;
  }
}

// Tüm mesajları getir
export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Mesajlar getirilirken hata:', error);
    return NextResponse.json([]);
  }
}

// Yeni mesaj ekle
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur' },
        { status: 400 }
      );
    }

    const messages = await getMessages();
    const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;

    const newMessage: ContactMessage = {
      id: newId,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      isRead: false
    };

    messages.push(newMessage);
    const saved = await saveMessages(messages);

    if (!saved) {
      return NextResponse.json(
        { error: 'Mesaj kaydedilemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Mesaj eklenirken hata:', error);
    return NextResponse.json(
      { error: 'Mesaj eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Mesaj güncelle (okundu olarak işaretle)
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Mesaj ID\'si gerekli' },
        { status: 400 }
      );
    }

    const messages = await getMessages();
    const messageIndex = messages.findIndex(m => m.id === id);

    if (messageIndex === -1) {
      return NextResponse.json(
        { error: 'Mesaj bulunamadı' },
        { status: 404 }
      );
    }

    messages[messageIndex].isRead = true;
    const saved = await saveMessages(messages);

    if (!saved) {
      return NextResponse.json(
        { error: 'Mesaj güncellenemedi' },
        { status: 500 }
      );
    }

    return NextResponse.json(messages[messageIndex]);
  } catch (error) {
    console.error('Mesaj güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Mesaj güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 