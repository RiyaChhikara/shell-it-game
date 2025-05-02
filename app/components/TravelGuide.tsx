import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TravelGuide() {
  const [showGuide, setShowGuide] = useState(false)
  const [showExamples, setShowExamples] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-3">
        <Button
          variant="ghost"
          onClick={() => setShowGuide(!showGuide)}
          className="w-full flex items-center justify-between text-xl p-0 h-auto hover:bg-transparent group"
        >
          <div className="flex items-center gap-2">
            <CardTitle>Travel Guide</CardTitle>
            <HelpCircle className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
          {showGuide ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {!showGuide && <p className="text-sm text-muted-foreground mt-1">Click here to learn how to play the game</p>}
      </CardHeader>

      {showGuide && (
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              The 'cd' command helps you navigate through folders and locations:
            </div>

            <div className="space-y-2 font-mono text-sm">
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                'cd ..' - Move up one level
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                'cd ../..' - Move up two levels
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                'cd ../../..' - Move up three levels
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                'cd /' - Go to root (London)
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                'cd ~' - Return home (LSE)
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                'cd .' - Stay in current folder
              </p>
            </div>

            <div className="rounded-lg border">
              <Button
                variant="ghost"
                onClick={() => setShowExamples(!showExamples)}
                className="w-full text-left text-base"
              >
                {showExamples ? "Hide" : "Show"} Examples
              </Button>

              {showExamples && (
                <div className="p-4 space-y-4 bg-muted/50 border-t">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Absolute path: Go to Tower of London from anywhere
                    </div>
                    <pre className="bg-background p-2 rounded-md text-sm">cd /london/city/tower_of_london</pre>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Relative path: Move from Big Ben to Buckingham Palace
                    </div>
                    <pre className="bg-background p-2 rounded-md text-sm">cd ../palace</pre>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Relative path: Move from London Eye to St. Paul's Cathedral
                    </div>
                    <pre className="bg-background p-2 rounded-md text-sm">cd ../../city/cathedral</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

