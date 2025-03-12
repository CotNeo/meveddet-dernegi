import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import logger from '@/utils/logger';

// E-posta gönderimi için transporter oluştur
const createTransporter = () => {
  // E-posta ayarlarını kontrol et
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    logger.warn('E-posta ayarları eksik. EMAIL_USER ve EMAIL_PASS ortam değişkenleri tanımlanmalıdır.');
    return null;
  }

  logger.debug('E-posta transporter oluşturuluyor', { 
    user: process.env.EMAIL_USER,
    service: 'gmail'
  });

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: process.env.NODE_ENV === 'development', // Geliştirme ortamında debug modunu etkinleştir
  });
};

// İletişim mesajlarını kaydetme fonksiyonu
const saveContactMessage = async (message: any) => {
  const filePath = path.join(process.cwd(), 'data', 'contact-messages.json');
  
  try {
    logger.debug('Mesaj kaydediliyor', message);
    
    // Dosyayı oku
    let messages = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        messages = JSON.parse(fileData);
        logger.debug('Mevcut mesajlar okundu', { count: messages.length });
      } catch (readError) {
        logger.error('Dosya okuma veya parse hatası', readError);
        // Dosya bozuksa, yeni bir array ile devam et
        messages = [];
      }
    } else {
      logger.info(`Mesaj dosyası bulunamadı. Yeni dosya oluşturulacak: ${filePath}`);
    }
    
    // Yeni mesajı ekle
    const newMessage = {
      id: Date.now().toString(),
      ...message,
      date: new Date().toISOString(),
    };
    
    messages.push(newMessage);
    logger.debug('Yeni mesaj eklendi', { id: newMessage.id });
    
    // Dosyaya yaz
    try {
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
      logger.debug('Mesajlar dosyaya yazıldı', { count: messages.length });
    } catch (writeError) {
      logger.error('Dosya yazma hatası', writeError);
      throw new Error('Mesaj kaydedilemedi: Dosya yazma hatası');
    }
    
    return newMessage;
  } catch (error) {
    logger.error('Mesaj kaydedilirken hata oluştu', error);
    throw error;
  }
};

export async function POST(request: Request) {
  logger.info('POST /api/contact isteği alındı');
  
  try {
    // İstek gövdesini oku
    let body;
    try {
      body = await request.json();
      logger.debug('İstek gövdesi alındı', body);
    } catch (parseError) {
      logger.error('İstek gövdesi parse edilemedi', parseError);
      return NextResponse.json(
        { error: 'Geçersiz istek formatı.' },
        { status: 400 }
      );
    }
    
    const { name, email, subject, message } = body;

    // Form verilerini doğrula
    if (!name || !email || !subject || !message) {
      logger.warn('Eksik form alanları', { name, email, subject, message });
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur.' },
        { status: 400 }
      );
    }

    // E-posta formatını doğrula
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn('Geçersiz e-posta formatı', { email });
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    // Mesajı kaydet
    try {
      await saveContactMessage({ name, email, subject, message });
      logger.info('Mesaj başarıyla kaydedildi');
    } catch (saveError) {
      logger.error('Mesaj kaydedilemedi', saveError);
      return NextResponse.json(
        { error: 'Mesajınız kaydedilemedi. Lütfen daha sonra tekrar deneyin.' },
        { status: 500 }
      );
    }

    // E-posta gönderme işlemi
    try {
      logger.debug('E-posta gönderme hazırlığı yapılıyor');
      
      // Transporter oluştur
      const transporter = createTransporter();
      
      // E-posta ayarlarını kontrol et
      if (!transporter) {
        logger.warn('E-posta transporter oluşturulamadı. E-posta ayarlarını kontrol edin.');
        
        // E-posta gönderilmese bile mesaj kaydedildiği için başarılı sayılır
        return NextResponse.json(
          { message: 'Mesajınız başarıyla kaydedildi.' },
          { status: 200 }
        );
      }
      
      logger.debug('E-posta gönderiliyor', { 
        to: 'furkanaliakar@gmail.com',
        from: process.env.EMAIL_USER,
        subject: `İletişim Formu: ${subject}`
      });
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'furkanaliakar@gmail.com',
        replyTo: email,
        subject: `İletişim Formu: ${subject}`,
        text: `Ad Soyad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`,
        html: `
          <h3>İletişim Formu Mesajı</h3>
          <p><strong>Ad Soyad:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };
      
      const info = await transporter.sendMail(mailOptions);
      logger.info('E-posta başarıyla gönderildi', { messageId: info.messageId });
    } catch (emailError: any) {
      logger.error('E-posta gönderilirken hata oluştu', emailError);
      
      // Hata detaylarını logla
      if (emailError instanceof Error) {
        logger.error(`E-posta hatası: ${emailError.name}`, { 
          message: emailError.message,
          stack: emailError.stack
        });
      }
      
      // E-posta gönderilemese bile mesaj kaydedildiği için kısmen başarılı sayılır
      return NextResponse.json(
        { 
          message: 'Mesajınız kaydedildi ancak e-posta bildirimi gönderilemedi. Yöneticiler en kısa sürede sizinle iletişime geçecektir.',
          error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.' },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Form işlenirken beklenmeyen hata', error);
    return NextResponse.json(
      { error: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}

// İletişim mesajlarını getirme endpoint'i
export async function GET() {
  logger.info('GET /api/contact isteği alındı');
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'contact-messages.json');
    
    if (!fs.existsSync(filePath)) {
      logger.info('Mesaj dosyası bulunamadı. Boş liste döndürülüyor.');
      return NextResponse.json([], { status: 200 });
    }
    
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const messages = JSON.parse(fileData);
      logger.debug('Mesajlar başarıyla getirildi', { count: messages.length });
      
      return NextResponse.json(messages, { status: 200 });
    } catch (readError) {
      logger.error('Dosya okuma veya parse hatası', readError);
      return NextResponse.json(
        { error: 'Mesajlar getirilirken bir hata oluştu.' },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error('Mesajlar getirilirken beklenmeyen hata', error);
    return NextResponse.json(
      { error: 'Mesajlar getirilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 