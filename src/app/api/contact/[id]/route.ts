import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import logger from '@/utils/logger';

// İletişim mesajını silme endpoint'i
export async function DELETE(request: NextRequest) {
  // URL'den ID'yi al
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const id = pathParts[pathParts.length - 1];
  
  logger.info(`DELETE /api/contact/${id} isteği alındı`);
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'contact-messages.json');
    
    if (!fs.existsSync(filePath)) {
      logger.warn(`Mesaj dosyası bulunamadı: ${filePath}`);
      return NextResponse.json(
        { error: 'Mesaj bulunamadı.' },
        { status: 404 }
      );
    }
    
    // Dosyayı oku
    let messages;
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      messages = JSON.parse(fileData);
      logger.debug('Mevcut mesajlar okundu', { count: messages.length });
    } catch (readError) {
      logger.error('Dosya okuma veya parse hatası', readError);
      return NextResponse.json(
        { error: 'Mesajlar okunamadı. Dosya bozuk olabilir.' },
        { status: 500 }
      );
    }
    
    // Mesajı bul ve sil
    const messageIndex = messages.findIndex((message: any) => message.id === id);
    
    if (messageIndex === -1) {
      logger.warn(`Mesaj bulunamadı. ID: ${id}`);
      return NextResponse.json(
        { error: 'Mesaj bulunamadı.' },
        { status: 404 }
      );
    }
    
    // Silinen mesajı logla
    const deletedMessage = messages[messageIndex];
    logger.debug('Silinecek mesaj bulundu', { id, subject: deletedMessage.subject });
    
    messages.splice(messageIndex, 1);
    logger.info(`Mesaj silindi. ID: ${id}`, { remainingCount: messages.length });
    
    // Dosyaya yaz
    try {
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
      logger.debug('Güncellenmiş mesajlar dosyaya yazıldı');
    } catch (writeError) {
      logger.error('Dosya yazma hatası', writeError);
      return NextResponse.json(
        { error: 'Mesaj silinemedi: Dosya yazma hatası.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Mesaj başarıyla silindi.',
        deletedMessageId: id
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error(`Mesaj silinirken beklenmeyen hata`, error);
    return NextResponse.json(
      { error: 'Mesaj silinirken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 