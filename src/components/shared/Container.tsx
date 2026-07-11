import { clsx } from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("mx-auto w-[calc(100%-40px)] max-w-[1320px]", className)}>
      {children}
    </div>
  );
}