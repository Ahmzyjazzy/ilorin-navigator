import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Hotel, UtensilsCrossed, Landmark, Ticket } from 'lucide-react';

type PoiCardProps = {
  name: string;
  description: string;
  rating?: number;
  category?: string;
  imageUrl?: string;
  imageHint?: string;
  address?: string;
};

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Hotel': <Hotel className="w-4 h-4" />,
  'Restaurant': <UtensilsCrossed className="w-4 h-4" />,
  'Landmark': <Landmark className="w-4 h-4" />,
  'Attraction': <Ticket className="w-4 h-4" />,
};

export function PoiCard({ name, description, rating, category, imageUrl, imageHint, address }: PoiCardProps) {
  const icon = category ? categoryIcons[category] : null;

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out">
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={imageHint}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="font-headline text-xl">{name}</CardTitle>
          {rating && (
            <div className="flex items-center gap-1 text-sm font-bold text-primary shrink-0">
              <Star className="w-4 h-4 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        {category && (
            <Badge variant="secondary" className="w-fit">
              {icon}
              <span className="ml-2">{category}</span>
            </Badge>
          )}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <CardDescription className="flex-grow">{description}</CardDescription>
        {address && <CardDescription className="mt-4 text-xs italic">{address}</CardDescription>}
      </CardContent>
    </Card>
  );
}
