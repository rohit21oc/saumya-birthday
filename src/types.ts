export interface PolaroidPhoto {
  id: string;
  src: string;
  caption: string;
  date: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  iconType: 'heart' | 'sparkle' | 'star' | 'rose';
}

export interface SparkleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  opacity: number;
  rotation: number;
}
