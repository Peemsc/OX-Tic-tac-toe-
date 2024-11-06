import { Player } from '@/lib/utility/types'
import { cn } from '@/lib/utility/utils'

interface SquareProps {
    value: 'X' | 'O' | null
    onClick: () => void
    isWinning: boolean
    disabled: boolean
  }
  
  export function Square({ value, onClick, isWinning, disabled }: SquareProps) {
    return (
      <button
        className={`w-24 h-24 border border-gray-600 text-4xl font-bold flex items-center justify-center transition-colors
          ${isWinning ? 'bg-green-200' : 'bg-gray-800'}
          ${disabled ? 'cursor-not-allowed' : 'hover:bg-gray-700'}
          ${value === 'X' ? 'text-blue-400' : value === 'O' ? 'text-red-400' : ''}`}
        onClick={onClick}
        disabled={disabled}
      >
        {value}
      </button>
    )
  }