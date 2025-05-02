import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TravelNavigatorProps {
  onMove: (input: string) => void
  currentPath: string[]
  errorMessage: string | null
  homeDirectory: string[]
  isOneShotNavigation: boolean
}

export default function TravelNavigator({
  onMove,
  currentPath,
  errorMessage,
  homeDirectory,
  isOneShotNavigation,
}: TravelNavigatorProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onMove(input)
    setInput("")
  }

  const PathDisplay = ({ label, path, isHome = false }: { label: string; path: string[]; isHome?: boolean }) => {
    const fullPath = path.join("/")

    return (
      <div className="flex items-center gap-2 text-sm md:text-base">
        {isHome && <span className="text-lg">🏠</span>}
        {!isHome && <span className="text-lg">📍</span>}
        <span className="font-medium whitespace-nowrap">{label}</span>
        <span className="text-muted-foreground">{fullPath}</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <PathDisplay label="Home:" path={homeDirectory} isHome={true} />
        <PathDisplay label="Current Location:" path={currentPath} />
      </div>
      {isOneShotNavigation && (
        <div className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-2">
          🚀 One-shot navigation active: Use full paths (e.g., cd ../../City/British_Museum)
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter cd command (e.g., cd .. or cd /london/westminster)"
          className="w-full font-mono text-base"
        />
        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
          Travel 🚆
        </Button>
      </form>
      {errorMessage && <p className="text-destructive mt-2 text-sm">{errorMessage}</p>}
    </div>
  )
}

