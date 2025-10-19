import { Header } from "@/components/app/header";
import { NavigationTab } from "@/components/app/navigation-tab";
import { PoisTab } from "@/components/app/pois-tab";
import { RecommendationsTab } from "@/components/app/recommendations-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, Lightbulb, Map } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <Header />
      <main className="container mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-12">
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Welcome to Ilorin
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Your personal guide to discovering the sights, sounds, and tastes of the city.
          </p>
        </div>

        <Tabs defaultValue="navigate" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border">
            <TabsTrigger value="navigate">
              <Compass className="mr-2 h-4 w-4" />
              Navigate
            </TabsTrigger>
            <TabsTrigger value="recommend">
              <Lightbulb className="mr-2 h-4 w-4" />
              AI Recommendations
            </TabsTrigger>
            <TabsTrigger value="explore">
              <Map className="mr-2 h-4 w-4" />
              Explore POIs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="navigate" className="mt-6">
            <NavigationTab />
          </TabsContent>
          <TabsContent value="recommend" className="mt-6">
            <RecommendationsTab />
          </TabsContent>
          <TabsContent value="explore" className="mt-6">
            <PoisTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
