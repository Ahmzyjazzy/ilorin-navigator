import type { PointOfInterest } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    return {
      imageUrl: "https://picsum.photos/seed/default/600/400",
      imageHint: "placeholder image"
    };
  }
  return {
    imageUrl: image.imageUrl,
    imageHint: image.imageHint,
  };
};

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: 'poi-1',
    name: 'Ilorin Central Mosque',
    description: 'A stunning architectural masterpiece and a significant religious center in Ilorin.',
    rating: 4.8,
    category: 'Landmark',
    ...getImage('ilorin-mosque')
  },
  {
    id: 'poi-2',
    name: 'Dada Pottery',
    description: 'One of the largest traditional pottery workshops in Nigeria, located in the Dada area of Ilorin.',
    rating: 4.5,
    category: 'Attraction',
    ...getImage('dada-pottery')
  },
  {
    id: 'poi-3',
    name: 'University of Ilorin Dam',
    description: 'A large reservoir on the Oyun River, offering scenic views and recreational opportunities.',
    rating: 4.6,
    category: 'Landmark',
    ...getImage('unilorin-dam')
  },
  {
    id: 'poi-4',
    name: 'Emir\'s Palace',
    description: 'The historical residence of the Emir of Ilorin, showcasing traditional architecture and culture.',
    rating: 4.4,
    category: 'Landmark',
    ...getImage('emir-palace')
  },
  {
    id: 'poi-5',
    name: 'Bukatee Restaurant',
    description: 'A popular spot for delicious local Nigerian cuisine in a casual setting.',
    rating: 4.2,
    category: 'Restaurant',
    ...getImage('restaurant-local')
  },
  {
    id: 'poi-6',
    name: 'E-Phoenix Hotel',
    description: 'A modern hotel offering comfortable accommodation and excellent services for travelers.',
    rating: 4.3,
    category: 'Hotel',
    ...getImage('hotel-modern')
  },
];
