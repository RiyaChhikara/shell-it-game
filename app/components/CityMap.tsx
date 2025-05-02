import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, MapPin, Home } from "lucide-react"

interface Location {
  name: string
  description: string
  path?: string
}

interface CityMapProps {
  londonMap: any
  currentPath: string[]
  currentMission: Location | null
  visitedLocations: Set<string>
  expandedItems: string[]
  setExpandedItems: React.Dispatch<React.SetStateAction<string[]>>
}

export default function CityMap({
  londonMap,
  currentPath,
  currentMission,
  visitedLocations,
  expandedItems,
  setExpandedItems,
}: CityMapProps) {
  const homeDirectory = ["london", "city", "universities", "lse"]

  // Auto-expand folders leading to the mission
  useEffect(() => {
    if (currentMission?.path) {
      const pathParts = ["london", ...currentMission.path.split("/")]
      const foldersToExpand = pathParts.reduce((acc: string[], part, index) => {
        if (index === 0) return [part]
        return [...acc, `${acc[index - 1]}/${part}`]
      }, [])
      setExpandedItems((prev) => [...new Set([...prev, ...foldersToExpand])])
    }
  }, [currentMission, setExpandedItems])

  const toggleItem = (path: string) => {
    setExpandedItems((prev) => (prev.includes(path) ? prev.filter((item) => item !== path) : [...prev, path]))
  }

  const isExpanded = (path: string) => expandedItems.includes(path)
  const isCurrentWorkingDirectory = (itemPath: string[]): boolean => {
    return JSON.stringify(itemPath) === JSON.stringify(currentPath)
  }
  const isHome = (itemPath: string[]): boolean => {
    return JSON.stringify(itemPath) === JSON.stringify(homeDirectory)
  }

  const renderMap = (obj: any, path: string[] = [], depth = 0) => {
    return Object.entries(obj).map(([key, value]) => {
      const currentItemPath = [...path, key]
      const isTarget =
        currentMission &&
        (`${currentMission.path}` === currentItemPath.slice(1).join("/") ||
          `${currentItemPath.slice(1).join("/")}` === currentMission.path ||
          (currentMission.path.includes("financial_district") &&
            currentItemPath.slice(1).join("/").includes(currentMission.path)))
      const fullPath = currentItemPath.join("/")
      const isVisited = visitedLocations.has(currentItemPath.slice(1).join("/"))
      const isCurrentHome = JSON.stringify(currentItemPath) === JSON.stringify(homeDirectory)

      if (typeof value === "object" && value.name) {
        // It's a landmark
        return (
          <motion.div
            key={fullPath}
            className={`ml-6 p-2 rounded flex items-center relative ${
              isCurrentWorkingDirectory(currentItemPath) ? "bg-gray-200 dark:bg-gray-800" : ""
            } ${isTarget ? "bg-yellow-100 dark:bg-yellow-900 border border-yellow-500" : ""} ${
              isVisited ? "text-muted-foreground" : ""
            } ${isCurrentHome ? "font-semibold" : ""}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute left-[-8px] top-1/2 w-2 h-[2px] bg-border" />
            {isCurrentHome ? <Home className="w-4 h-4 mr-2 shrink-0" /> : <MapPin className="w-4 h-4 mr-2 shrink-0" />}
            <span className="truncate">{key.toLowerCase()}</span>
            {isVisited && <span className="ml-2 shrink-0">✅</span>}
          </motion.div>
        )
      } else {
        // It's an area
        const indentClass = depth > 0 ? "ml-6" : ""

        return (
          <div key={fullPath} className="relative">
            <motion.div
              className={`cursor-pointer p-2 rounded flex items-center ${depth > 0 ? "ml-6" : ""} ${
                isCurrentWorkingDirectory(currentItemPath) ? "bg-gray-200 dark:bg-gray-800" : ""
              }`}
              onClick={() => toggleItem(fullPath)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {depth > 0 && <div className="absolute left-[-8px] top-1/2 w-2 h-[2px] bg-border" />}
              {isExpanded(fullPath) ? (
                <ChevronDown className="w-4 h-4 mr-2 shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-2 shrink-0" />
              )}
              <span className="font-medium">{key.toLowerCase()}</span>
            </motion.div>
            <AnimatePresence>
              {isExpanded(fullPath) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative pl-4 border-l border-border ml-4"
                >
                  <div className="pt-1">{renderMap(value, currentItemPath, depth + 1)}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      }
    })
  }

  return <div className="font-mono text-sm relative space-y-1 overflow-x-auto">{renderMap(londonMap)}</div>
}

