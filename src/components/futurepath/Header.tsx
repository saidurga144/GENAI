import { Target } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10 no-print">
      <div className="container mx-auto px-4 h-16 flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Target className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">FuturePath Navigator</h1>
      </div>
    </header>
  );
}
