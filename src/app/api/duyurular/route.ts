import { NextResponse } from 'next/server';
import { Announcement } from '@/models/Announcement';

// Örnek duyuru verileri
const announcements: Announcement[] = [
  {
    id: 1,
    title: 'NEVRUZ-İ SULTÂNÎ PROGRAMI',
    content: `
      <p class="mb-4">Nevruz-i Sultânî, Osmanlı İmparatorluğu'nda yılbaşı olarak kabul edilen ve Sultan III. Murad tarafından resmi bayram ilan edilen önemli bir gündür. Bu gün, baharın başlangıcını ve yeni yılın gelişini kutlamak için çeşitli etkinliklerle kutlanır.</p>
      
      <h3 class="text-xl font-semibold mb-2">Program İçeriği:</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>Açılış konuşması: Can Ulusoy</li>
        <li>Osmanlı Tekkelerinde Nevruz: Kahraman Özkök</li>
        <li>Mevlid-i Ali: İsa Nesim</li>
        <li>İlahi ve Nefesler: Bursa Mevlevîhanesi Mûsikî Topluluğu</li>
        <li>Nevruz Sütü İkramı</li>
      </ul>

      <h3 class="text-xl font-semibold mb-2">Etkinlik Detayları:</h3>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>Tarih:</strong> 22 Mart Cumartesi</li>
        <li><strong>Saat:</strong> 15:30</li>
        <li><strong>Yer:</strong> Bursa Mevlevîhanesi ve Müzesi</li>
      </ul>

      <p class="italic">Tüm dostlarımızı bekleriz.</p>
    `,
    summary: 'Nevruz-i Sultânî Programı: 22 Mart Cumartesi saat 15:30\'da Bursa Mevlevîhanesi ve Müzesi\'nde gerçekleşecek. Program kapsamında konuşmalar, mevlid, ilahi ve nefesler ile Nevruz Sütü ikramı yer alacak.',
    date: '22 Mart 2025',
    image: '/images/nevruz-sultani.jpg',
    isActive: true,
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  }
];

// Tüm duyuruları getir
export async function GET() {
  return NextResponse.json(announcements);
}

// Yeni duyuru ekle
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newAnnouncement: Announcement = {
      id: announcements.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    announcements.push(newAnnouncement);
    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Duyuru eklenirken bir hata oluştu' }, { status: 500 });
  }
} 