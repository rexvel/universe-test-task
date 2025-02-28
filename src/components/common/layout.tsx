import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => (
  <div className={cn('mx-auto items-center my-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
    <header className="py-4 flex justify-end">
      <ThemeToggle />
    </header>
    {children}
  </div>
);
