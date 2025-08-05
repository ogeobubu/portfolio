import { LucideIcon } from 'lucide-react';

export type Project = {
  title: string;
  description: string;
  image?: string;
  video?: string;
  link: string;
  tags?: string[];
};

export type SocialLink = {
  name: string;
  icon: LucideIcon;
  href: string;
};