'use server';

import { optimizeNavigationRoute, OptimizeNavigationRouteInput, OptimizeNavigationRouteOutput } from "@/ai/flows/optimize-navigation-route";
import { recommendPointsOfInterest, RecommendPointsOfInterestInput, RecommendPointsOfInterestOutput } from "@/ai/flows/recommend-points-of-interest";
import { z } from "zod";

const navigationSchema = z.object({
  currentLocation: z.string().min(3, "Please enter a valid starting location."),
  destination: z.string().min(3, "Please enter a valid destination."),
});

type NavigationState = {
  message: string;
  errors: {
    currentLocation?: string[] | undefined;
    destination?: string[] | undefined;
  } | null;
  data: OptimizeNavigationRouteOutput | null;
}

export async function getDirections(prevState: NavigationState, formData: FormData): Promise<NavigationState> {
  const validatedFields = navigationSchema.safeParse({
    currentLocation: formData.get('currentLocation'),
    destination: formData.get('destination'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }
  
  try {
    const input: OptimizeNavigationRouteInput = {
      currentLocation: validatedFields.data.currentLocation,
      destination: validatedFields.data.destination,
      userPreferences: 'fastest route, avoid tolls',
    };
    const result = await optimizeNavigationRoute(input);
    return { message: "Success", data: result, errors: null };
  } catch (error) {
    return { message: "AI generation failed. Please try again.", data: null, errors: null };
  }
}

const recommendationSchema = z.object({
  location: z.string().min(3, "Please enter a valid location."),
});

type RecommendationState = {
  message: string;
  errors: {
    location?: string[] | undefined;
  } | null;
  data: RecommendPointsOfInterestOutput | null;
}

export async function getRecommendations(prevState: RecommendationState, formData: FormData): Promise<RecommendationState> {
    const validatedFields = recommendationSchema.safeParse({
        location: formData.get('location'),
    });

    if (!validatedFields.success) {
        return {
          message: "Validation failed.",
          errors: validatedFields.error.flatten().fieldErrors,
          data: null,
        };
    }

    try {
        const input: RecommendPointsOfInterestInput = {
            location: validatedFields.data.location,
        };
        const result = await recommendPointsOfInterest(input);
        return { message: "Success", data: result, errors: null };
    } catch (error) {
        return { message: "AI generation failed. Please try again.", data: null, errors: null };
    }
}
