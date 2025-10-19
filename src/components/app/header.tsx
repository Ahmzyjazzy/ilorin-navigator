import { Logo } from '@/components/app/logo';

export function Header() {
  return (
    <header className="py-6 px-4 md:px-6 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
      </div>
    </header>
  );
}
