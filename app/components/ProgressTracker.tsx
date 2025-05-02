import { Coins } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ProgressTrackerProps {
  visitedCount: number
  totalCount: number
  score: number
}

export default function ProgressTracker({ visitedCount, totalCount, score }: ProgressTrackerProps) {
  const percentage = (visitedCount / totalCount) * 100

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <h2 className="text-base font-medium">Landmarks Visited</h2>
          <span className="text-sm text-muted-foreground font-mono">
            {visitedCount}/{totalCount}
          </span>
        </div>
        <Progress value={percentage} className="h-2 bg-gray-200">
          <div className="h-full bg-black" style={{ width: `${percentage}%` }} />
        </Progress>
      </div>

      <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">Coins Collected</span>
        </div>
        <span className="text-sm font-mono">{score}</span>
      </div>
    </div>
  )
}

