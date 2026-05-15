export type Category = 'Residential' | 'Interior' | 'Exterior' | 'Kitchen' | 'Commercial';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  image: string;
  location: string;
  description: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'The Golden Penthouse',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687920-4833d9c75f76?auto=format&fit=crop&w=800&q=80',
    location: 'New York, USA',
    description: 'A minimalist yet opulent penthouse with floor-to-ceiling windows and bespoke gold accents.',
  },
  {
    id: '2',
    title: 'Modernist Villa',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    location: 'Malibu, USA',
    description: 'Sleek architectural lines blending seamlessly with the coastal landscape.',
  },
  {
    id: '3',
    title: 'The Gourmet Kitchen',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-07639a747f75?auto=format&fit=crop&w=800&q=80',
    location: 'London, UK',
    description: 'A high-performance chef\'s kitchen combining marble surfaces with smart automation.',
  },
  {
    id: '4',
    title: 'Executive Suite',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-375260702979?auto=format&fit=crop&w=800&q=80',
    location: 'Singapore',
    description: 'Corporate elegance meeting modern productivity in the heart of the financial district.',
  },
  {
    id: '5',
    title: 'Serene Bedroom',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1616594084638-30cf7aba077a?auto=format&fit=crop&w=800&q=80',
    location: 'Paris, France',
    description: 'A soft, ethereal sanctuary using velvet textures and warm neutral tones.',
  },
  {
    id: '6',
    title: 'Urban Courtyard',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1584622612524-0527678a7597?auto=format&fit=crop&w=800&q=80',
    location: 'Tokyo, Japan',
    description: 'Integrating Zen principles into a compact urban exterior space.',
  },
  {
    id: '7',
    title: 'Royal Living Room',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1618221195710-2f77122a3b34?auto=format&fit=crop&w=800&q=80',
    location: 'Mumbai, India',
    description: 'Blending traditional Indian opulence with contemporary European luxury.',
  },
  {
    id: '8',
    title: 'The Chef\'s Atelier',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-07639a747f75?auto=format&fit=crop&w=800&q=80',
    location: 'Milan, Italy',
    description: 'An Italian-inspired culinary space focusing on ergonomics and high-end materials.',
  },
];
