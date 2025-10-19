'use client';

import { useActionState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getDirections } from '@/app/actions';
import { Navigation, Clock, Route, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { OptimizeNavigationRouteOutput } from '@/ai/flows/optimize-navigation-route';
import { SubmitButton } from './submit-button';
import { ResultsLoader } from './results-loader';

const initialState = {
  message: '',
  errors: null,
  data: null,
  formData: {
    currentLocation: '',
    destination: '',
  },
};

function NavigationResults({ data }: { data: OptimizeNavigationRouteOutput | null }) {
  if (!data) return null;

  return (
    <CardContent>
      <div className="mt-6 border-t pt-6 space-y-4 animate-in fade-in-50 duration-500">
        <h3 className="font-headline text-lg flex items-center gap-2"><CheckCircle className="text-green-500" /> Optimized Route Found</h3>
        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Navigation className="text-primary" /> Your Route</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data.optimizedRoute}</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Clock className="text-primary" /> Estimated Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-lg">{data.estimatedTime}</p>
            </CardContent>
          </Card>
          {data.suggestedAlternatives && data.suggestedAlternatives.length > 0 && (
            <Card className="bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Route className="text-primary" /> Alternative Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {data.suggestedAlternatives.map((alt, index) => (
                    <li key={index}>{alt}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CardContent>
  );
}

export function NavigationTab() {
  const [state, formAction] = useActionState(getDirections, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== "Success") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      })
    }
    if (state.errors) {
      const error_values = Object.values(state.errors).flat().join('\n');
      if (error_values) {
        toast({
          title: "Validation Error",
          description: error_values,
          variant: "destructive"
        })
      }
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Intelligent Route Navigation</CardTitle>
        <CardDescription>
          Enter your start and end points to get the most efficient route, optimized by AI.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currentLocation">Your Location</Label>
              <Input
                id="currentLocation"
                name="currentLocation"
                placeholder="e.g., University of Ilorin"
                required
                defaultValue={state.formData?.currentLocation || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Your Destination</Label>
              <Input
                id="destination"
                name="destination"
                placeholder="e.g., Ilorin Central Mosque"
                required
                defaultValue={state.formData?.destination || ''}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton>
            <Navigation className="mr-2" />
            Get Directions
          </SubmitButton>
        </CardFooter>
        <ResultsLoader loadingMessage="Finding the best route...">
          <NavigationResults data={state.data} />
        </ResultsLoader>
      </form>
    </Card>
  );
}
