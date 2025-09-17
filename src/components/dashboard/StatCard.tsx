
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { LucideIcon, ArrowRightCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
};

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <Card className={cn("text-white p-4 flex flex-col justify-between", color)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-4xl font-bold">{value}</h3>
          <p className="mt-1">{title}</p>
        </div>
        <Icon className="w-12 h-12 opacity-70" />
      </div>
      <Link href="#" className="mt-4 text-sm flex items-center gap-2 bg-black/10 p-1 rounded-sm justify-center hover:bg-black/20 transition-colors">
        More info <ArrowRightCircle className="w-4 h-4" />
      </Link>
    </Card>
  );
}
