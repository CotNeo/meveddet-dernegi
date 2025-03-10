import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// E-posta gönderimi için transporter oluştur
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Form verilerini doğrula
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur.' },
        { status: 400 }
      );
    }

    // E-posta formatını doğrula
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    // E-posta gönderme işlemi
    await transporter.sendMail({
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
    });

    return NextResponse.json(
      { message: 'Mesajınız başarıyla gönderildi.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Form gönderme hatası:', error);
    return NextResponse.json(
      { error: 'Mesajınız gönderilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 