'use client';

import { useFormState } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getRecommendations } from '@/app/actions';
import { Lightbulb } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PoiCard } from './poi-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { RecommendPointsOfInterestOutput } from '@/ai/flows/recommend-points-of-interest';
import { SubmitButton } from './submit-button';
import { ResultsLoader } from './results-loader';


const initialState = {
  message: '',
  errors: null,
  data: null,
};

function RecommendationResults({ data }: { data: RecommendPointsOfInterestOutput | null }) {
    
    if (data && data.length > 0) {
        return (
             <CardContent>
                <div className="mt-6 border-t pt-6 animate-in fade-in-50 duration-500">
                    <h3 className="font-headline text-lg mb-4">Here are your recommendations:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((poi, index) => (
                            <PoiCard
                                key={index}
                                name={poi.name}
                                description={poi.description}
                                rating={poi.rating}
                                address={poi.address}
                                imageUrl={`https://picsum.photos/seed/${poi.name.replace(/\s/g, '')}/600/400`}
                                imageHint={poi.name.split(' ').slice(0,2).join(' ')}
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        )
    }

    if (data && data.length === 0) {
        return (
            <CardContent>
                <div className="mt-6 border-t pt-6 text-center text-muted-foreground animate-in fade-in-50 duration-500">
                    <p>No recommendations found for that location. Try being more specific.</p>
                </div>
            </CardContent>
        )
    }

    return null;
}

function LoadingSkeletons() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <Skeleton className="h-48 w-full" />
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6 mt-2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export function RecommendationsTab() {
  const [state, formAction] = useFormState(getRecommendations, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== "Success") {
        toast({
            title: "Error",
            description: state.message,
            variant: "destructive",
        })
    }
     if (state.errors?.location) {
        toast({
          title: "Validation Error",
          description: state.errors.location[0],
          variant: "destructive"
        })
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI-Powered Recommendations</CardTitle>
        <CardDescription>
          Tell us where you are, and our AI will suggest nearby points of interest just for you.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Your Current Location or Area</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., Tanke, Ilorin"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton>
             <Lightbulb className="mr-2" />
             Get Recommendations
          </SubmitButton>
        </CardFooter>

        <ResultsLoader loadingContent={<LoadingSkeletons />}>
            <RecommendationResults data={state.data} />
        </ResultsLoader>
      </form>
    </Card>
  );
}
