import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => (
  <div className={cn('mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
);
