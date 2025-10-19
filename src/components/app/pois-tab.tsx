import { pointsOfInterest } from '@/lib/data';
import { PoiCard } from '@/components/app/poi-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function PoisTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Explore Ilorin</CardTitle>
        <CardDescription>
          Discover curated points of interest, from historical landmarks to local eateries.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pointsOfInterest.map((poi) => (
            <PoiCard
              key={poi.id}
              name={poi.name}
              description={poi.description}
              rating={poi.rating}
              category={poi.category}
              imageUrl={poi.imageUrl}
              imageHint={poi.imageHint}
            />
          ))}
        </div>
        <Card className="mt-8 bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Download className="w-5 h-5" />
              Offline Map Access
            </CardTitle>
            <CardDescription>
              No internet? No problem. Download a map of Ilorin for access anytime, anywhere.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled>
              <Download className="mr-2" />
              Download Map (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
