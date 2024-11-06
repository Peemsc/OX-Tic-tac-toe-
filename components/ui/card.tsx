import { cn } from '@/lib/utility/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white shadow-sm p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}