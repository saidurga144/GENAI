import { Target, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header({ showResourcesLink = true }: { showResourcesLink?: boolean }) {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10 no-print">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Target className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">FuturePath Navigator</h1>
        </Link>
        <div className="flex items-center gap-2">
            {showResourcesLink && (
              <Button asChild variant="ghost">
                  <Link href="/resources">
                      <BookOpen />
                      Resources
                  </Link>
              </Button>
            )}
        </div>
      </div>
    </header>
  );
}
