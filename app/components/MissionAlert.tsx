import { MapPin } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Location {
  name: string
  description: string
  path: string
}

interface MissionAlertProps {
  currentMission: Location | null
}

export default function MissionAlert({ currentMission }: MissionAlertProps) {
  if (!currentMission) return null

  return (
    <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
      <MapPin className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
      <AlertTitle className="text-lg font-semibold mb-2">Your next destination:</AlertTitle>
      <AlertDescription className="text-base">Go to {currentMission.name} to collect 10 coins!</AlertDescription>
    </Alert>
  )
}

