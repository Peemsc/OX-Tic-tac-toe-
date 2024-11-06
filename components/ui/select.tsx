import { cn } from "@/lib/utility/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <select
        className={cn(
          "block w-full rounded-md border border-gray-600",
          "bg-gray-800 text-gray-200",
          "px-3 py-2",
          "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
          "hover:border-gray-500",
          "[&>option]:bg-gray-800 [&>option]:text-gray-200",
          className
        )}
        {...props}
      >
        {options.map(option => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-gray-800 text-gray-200 hover:bg-gray-700"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}