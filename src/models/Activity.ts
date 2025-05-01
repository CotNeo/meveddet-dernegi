export interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  images: string[];
  videos: string[];
  createdAt?: string;
  updatedAt?: string;
} 