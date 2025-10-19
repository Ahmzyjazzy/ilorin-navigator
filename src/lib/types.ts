export type PointOfInterest = {
  id: string;
  name: string;
  description: string;
  rating: number;
  category: 'Landmark' | 'Hotel' | 'Restaurant' | 'Attraction';
  imageUrl: string;
  imageHint: string;
};
