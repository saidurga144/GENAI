import { Target } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10 no-print">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <Target className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground tracking-tight">FuturePath Navigator</h1>
      </div>
    </header>
  );
}
