import { Progress } from "@/components/ui/progress"

interface ProgressIndicatorProps {
  visitedCount: number
  totalCount: number
}

export default function ProgressIndicator({ visitedCount, totalCount }: ProgressIndicatorProps) {
  const percentage = (visitedCount / totalCount) * 100

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Landmarks Visited</span>
        <span className="text-sm font-medium">{visitedCount}/{totalCount}</span>
      </div>
      <Progress value={percentage} className="w-full" />
    </div>
  )
}

