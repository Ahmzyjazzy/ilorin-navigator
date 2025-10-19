import { MapPin } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 text-primary">
      <MapPin className="h-8 w-8" />
      <span className="text-xl font-bold tracking-tight text-foreground font-headline">
        Ilorin Navigator
      </span>
    </div>
  );
}
