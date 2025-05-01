export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  image?: string;
  imageFile?: File;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
} 