import { clsx } from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("max-w-site mx-auto px-5 sm:px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}