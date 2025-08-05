import { FileText, Github, Linkedin, Twitter } from 'lucide-react';
import { SocialLink } from '../types';

export const socialLinks: SocialLink[] = [
  { 
    name: "RESUME", 
    icon: FileText, 
    href: "https://www.canva.com/design/DAGvHY8u3KA/5FiqKEtpeOLIxJZ9AOn2xQ/edit?utm_content=DAGvHY8u3KA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" 
  },
  { 
    name: "GITHUB", 
    icon: Github, 
    href: "https://github.com/ogeobubu" 
  },
  { 
    name: "LINKEDIN", 
    icon: Linkedin, 
    href: "https://linkedin.com/in/oge-obubu" 
  },
  { 
    name: "Twitter", 
    icon: Twitter, 
    href: "https://x.com/ogeobubu" 
  }
];