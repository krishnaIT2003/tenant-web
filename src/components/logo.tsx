import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <Building2 className="h-6 w-6" />
      <span className="font-bold text-lg font-headline">Forward</span>
    </div>
  );
}
