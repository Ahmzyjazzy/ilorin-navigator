'use server';

/**
 * @fileOverview A navigation route optimization AI agent.
 *
 * - optimizeNavigationRoute - A function that optimizes a navigation route based on traffic and roadblocks.
 * - OptimizeNavigationRouteInput - The input type for the optimizeNavigationRoute function.
 * - OptimizeNavigationRouteOutput - The return type for the optimizeNavigationRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeNavigationRouteInputSchema = z.object({
  currentLocation: z
    .string()
    .describe('The current location of the user in Ilorin.'),
  destination: z.string().describe('The desired destination in Ilorin.'),
  trafficData: z.string().optional().describe('Real-time traffic data.'),
  roadblocks: z.string().optional().describe('Information about any roadblocks.'),
  userPreferences: z
    .string()
    .optional()
    .describe('The user preferences for the route.'),
});
export type OptimizeNavigationRouteInput = z.infer<
  typeof OptimizeNavigationRouteInputSchema
>;

const OptimizeNavigationRouteOutputSchema = z.object({
  optimizedRoute: z.string().describe('The optimized navigation route.'),
  estimatedTime: z.string().describe('The estimated time to destination.'),
  suggestedAlternatives: z
    .array(z.string())
    .describe('The list of suggested alternatives routes.'),
});
export type OptimizeNavigationRouteOutput = z.infer<
  typeof OptimizeNavigationRouteOutputSchema
>;

export async function optimizeNavigationRoute(
  input: OptimizeNavigationRouteInput
): Promise<OptimizeNavigationRouteOutput> {
  return optimizeNavigationRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeNavigationRoutePrompt',
  input: {schema: OptimizeNavigationRouteInputSchema},
  output: {schema: OptimizeNavigationRouteOutputSchema},
  prompt: `You are an expert navigation assistant for Ilorin.

You will take the current location and destination, along with traffic data, roadblocks and user preferences to determine the optimal route.

Current Location: {{{currentLocation}}}
Destination: {{{destination}}}
Traffic Data: {{{trafficData}}}
Roadblocks: {{{roadblocks}}}
User Preferences: {{{userPreferences}}}

Optimize the navigation route and provide an estimated time of arrival. Consider possible alternative routes.
`,
});

const optimizeNavigationRouteFlow = ai.defineFlow(
  {
    name: 'optimizeNavigationRouteFlow',
    inputSchema: OptimizeNavigationRouteInputSchema,
    outputSchema: OptimizeNavigationRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
