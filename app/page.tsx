"use client"

import { useState, useEffect } from "react"
import CityMap from "./components/CityMap"
import TravelNavigator from "./components/TravelNavigator"
import MissionAlert from "./components/MissionAlert"
import TravelGuide from "./components/TravelGuide"
import ProgressTracker from "./components/ProgressTracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import OnboardingTutorial from "./components/OnboardingTutorial"
import { useToast } from "@/hooks/use-toast"
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"

interface Location {
  name: string
  description: string
  tooltip: string
  path?: string
}

const londonMap = {
  london: {
    westminster: {
      big_ben: {
        name: "Big Ben",
        description: "The iconic clock tower of London",
        tooltip: "Famous clock tower at the north end of the Houses of Parliament",
      },
      palace: {
        name: "Buckingham Palace",
        description: "The official residence of the British monarch",
        tooltip: "London residence and administrative headquarters of the monarch of the United Kingdom",
      },
      abbey: {
        name: "Westminster Abbey",
        description: "A historic, mainly Gothic abbey church in Westminster",
        tooltip: "Traditional place of coronation and burial site for English and British monarchs",
      },
      parliament: {
        name: "Houses of Parliament",
        description: "The meeting place of the House of Commons and the House of Lords",
        tooltip: "Also known as the Palace of Westminster, the center of UK politics",
      },
    },
    southbank: {
      london_eye: {
        name: "London Eye",
        description: "A giant Ferris wheel on the South Bank of the River Thames",
        tooltip: "Europe's tallest cantilevered observation wheel",
      },
      tate_modern: {
        name: "Tate Modern",
        description: "Britain's national museum of modern and contemporary art",
        tooltip: "Modern art gallery housed in the former Bankside Power Station",
      },
      the_globe: {
        name: "Shakespeare's Globe",
        description: "A reconstruction of the Globe Theatre, an Elizabethan playhouse",
        tooltip: "Reconstruction of the original Globe Theatre, associated with William Shakespeare",
      },
    },
    city: {
      cathedral: {
        name: "St. Paul's Cathedral",
        description: "An Anglican cathedral on Ludgate Hill",
        tooltip: "Anglican cathedral with a world-famous dome, designed by Sir Christopher Wren",
      },
      tower_of_london: {
        name: "Tower of London",
        description: "A historic castle and fortress on the north bank of the River Thames",
        tooltip: "Historic castle and fortress, home of the Crown Jewels",
      },
      theatres: {
        royal_national_theatre: {
          name: "Royal National Theatre",
          description: "One of the United Kingdom's three most prominent publicly funded performing arts venues",
          tooltip: "Commonly known as the National Theatre, located on the South Bank",
        },
        old_vic: {
          name: "The Old Vic",
          description: "A 1,000-seat, not-for-profit theatre, established in 1818",
          tooltip: "One of the most famous theatres in London's West End",
        },
        royal_opera_house: {
          name: "Royal Opera House",
          description: "A major performing arts venue in Covent Garden",
          tooltip: "Home to The Royal Opera and The Royal Ballet",
        },
      },
      universities: {
        lse: {
          name: "London School of Economics",
          description: "A public research university located in London",
          tooltip: "One of the foremost social science universities in the world",
        },
        kings: {
          name: "King's College London",
          description: "A public research university located in London",
          tooltip: "One of the oldest and most prestigious universities in England",
        },
      },
    },
    covent_garden: {
      market: {
        name: "Covent Garden Market",
        description: "A popular shopping and tourist site",
        tooltip: "Former fruit and vegetable market, now a popular shopping and tourist site",
      },
      neals_yard: {
        name: "Neal's Yard",
        description: "A small alley in Covent Garden with colorful buildings and cafes",
        tooltip: "Small alley with colorful buildings, home to alternative medicine and health food stores",
      },
    },
    greenwich: {
      royal_observatory: {
        name: "Royal Observatory",
        description: "Home of Greenwich Mean Time and the Prime Meridian",
        tooltip: "Historic scientific site and the location of the prime meridian",
      },
      cutty_sark: {
        name: "Cutty Sark",
        description: "A historic clipper ship now on display as a museum ship",
        tooltip: "The world's sole surviving tea clipper",
      },
    },
    hyde_park: {
      name: "Hyde Park",
      description: "One of the largest parks in central London",
      tooltip: "Famous for its Speakers' Corner and the Serpentine lake",
    },
    british_museum: {
      name: "British Museum",
      description: "A public museum dedicated to human history, art and culture",
      tooltip: "One of the oldest and largest museums in the world",
    },
    piccadilly_circus: {
      name: "Piccadilly Circus",
      description: "A road junction and public space in London's West End",
      tooltip: "Known for its video display and neon signs, as well as the Shaftesbury Memorial Fountain",
    },
  },
}

export default function LondonTravellerGame() {
  const [currentPath, setCurrentPath] = useState<string[]>(["london"])
  const [score, setScore] = useState(0)
  const [currentMission, setCurrentMission] = useState<Location | null>(null)
  const [visitedLocations, setVisitedLocations] = useState<Set<string>>(new Set())
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showGameComplete, setShowGameComplete] = useState(false)
  const [homeDirectory] = useState<string[]>(["london", "city", "universities", "lse"])
  const [showTutorial, setShowTutorial] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>(["london"])
  const [isOneShotNavigation, setIsOneShotNavigation] = useState(false)
  const [showNewRulePopup, setShowNewRulePopup] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    generateNewMission(new Set())
  }, [])

  useEffect(() => {
    if (visitedLocations.size === 5) {
      setIsOneShotNavigation(true)
      toast({
        title: "🚀 New Rule!",
        description:
          "Since you've visited 5 landmarks, you must now navigate in one shot from your current location to your destination. Example: Instead of step-by-step commands (cd .., cd City, cd British_Museum), type cd ../../City/British_Museum",
        duration: 10000,
      })
    }
  }, [visitedLocations, toast])

  const resetGame = () => {
    setVisitedLocations(new Set())
    setScore(0)
    setShowGameComplete(false)
    setCurrentPath(["london"])
    setIsOneShotNavigation(false)
    generateNewMission()
  }

  const generateNewMission = (updatedVisitedLocations?: Set<string>) => {
    const normalizedVisitedLocations = new Set(
      Array.from(updatedVisitedLocations || visitedLocations).map((path) => {
        return path.toLowerCase().replace(/\/+/g, "/").replace(/\/$/, "")
      }),
    )

    const allLocations: Array<{ area: string; landmark: string; details: any }> = []
    const traverseMap = (obj: any, path: string[] = []) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === "object" && value.name) {
          const fullPath = [...path, key].join("/").toLowerCase()
          allLocations.push({
            area: path.join("/") || "london",
            landmark: key,
            details: { ...value, path: fullPath },
          })
        } else if (typeof value === "object") {
          traverseMap(value, [...path, key])
        }
      })
    }
    traverseMap(londonMap.london)

    const unvisitedLocations = allLocations.filter((loc) => {
      const locationPath = loc.details.path
      return !normalizedVisitedLocations.has(locationPath)
    })

    if (unvisitedLocations.length === 0) {
      setCurrentMission(null)
      setShowGameComplete(true)
      if (!showGameComplete) {
        const restart = window.confirm(
          "🎉 Congratulations! You've visited all locations in London! Would you like to play again?",
        )
        if (restart) {
          resetGame()
        }
      }
      return
    }

    const randomIndex = Math.floor(Math.random() * unvisitedLocations.length)
    const { details } = unvisitedLocations[randomIndex]
    setCurrentMission(details)
  }

  const handleMove = (input: string): void => {
    const parts = input.split(" ")

    if (parts[0].toLowerCase() === "cd") {
      // Check for the exact "cd /" command
      if (parts[1] === "/") {
        if (currentPath.length === 1 && currentPath[0] === "london") {
          setErrorMessage("You are already at the root directory.")
          return
        }
        setCurrentPath(["london"])
        setErrorMessage(null)
        checkLocation(["london"])
        return
      }

      // Remove any trailing slashes and multiple consecutive slashes
      const path = parts.slice(1).join(" ").replace(/\/+/g, "/").replace(/\/$/, "")

      if (path === ".") {
        setErrorMessage(null)
        return
      }

      let newPath: string[]

      if (path === "..") {
        if (currentPath.length === 1) {
          setErrorMessage("You are already at the root directory.")
          return
        }
        newPath = currentPath.slice(0, -1)
      } else if (path === "/london") {
        newPath = ["london"]
      } else if (path === "~") {
        newPath = [...homeDirectory]
      } else if (path.startsWith("/")) {
        newPath = ["london", ...path.split("/").filter((p) => p !== "" && p !== "london")]
      } else if (path.startsWith("..")) {
        const upDirs = (path.match(/\.\./g) || []).length
        newPath = [
          ...currentPath.slice(0, Math.max(1, currentPath.length - upDirs)),
          ...path.split("/").filter((p) => p !== ".."),
        ]
      } else if (path.startsWith("./")) {
        newPath = [
          ...currentPath,
          ...path
            .slice(2)
            .split("/")
            .filter((p) => p !== ""),
        ]
      } else {
        newPath = [...currentPath, ...path.split("/").filter((p) => p !== "")]
      }

      if (isValidPath(newPath)) {
        if (isOneShotNavigation && !isValidOneShotNavigation(newPath)) {
          setErrorMessage("Oops! You arrived at the wrong location. Let's try that again.")
          return
        }

        setCurrentPath(newPath)
        setErrorMessage(null)
        checkLocation(newPath)

        // Expand the path in the CityMap
        const expandedPath = newPath.reduce((acc: string[], part, index) => {
          if (index === 0) return [part]
          return [...acc, `${acc[index - 1]}/${part}`]
        }, [])
        setExpandedItems((prev) => [...new Set([...prev, ...expandedPath])])
      } else {
        setErrorMessage("Directory not found. London's file system is case-sensitive.")
      }
    } else {
      setErrorMessage('Please use the "cd" command to navigate.')
    }
  }

  const isValidPath = (path: string[]): boolean => {
    if (path.length === 0 || (path.length === 1 && path[0] === "london")) return true // Root directory is always valid
    let current: any = londonMap
    for (const segment of path) {
      if (current[segment]) {
        current = current[segment]
      } else {
        return false
      }
    }
    return true
  }

  const isValidOneShotNavigation = (newPath: string[]): boolean => {
    if (!currentMission) return false
    const targetPath = ["london", ...currentMission.path.split("/")]
    return JSON.stringify(newPath) === JSON.stringify(targetPath)
  }

  const checkLocation = (path: string[]) => {
    if (!currentMission) return

    // Normalize paths by removing any trailing slashes and converting to lowercase
    const currentLocationPath = path.slice(1).join("/").toLowerCase()
    const targetLocationPath = currentMission.path.toLowerCase()

    // Check if we've reached the target location
    const isMatch =
      currentLocationPath === targetLocationPath ||
      `${currentLocationPath}/` === targetLocationPath ||
      currentLocationPath === `${targetLocationPath}/`

    if (isMatch) {
      if (!visitedLocations.has(currentLocationPath)) {
        const newVisitedLocations = new Set(Array.from(visitedLocations).map((path) => path.toLowerCase()))
        newVisitedLocations.add(currentLocationPath)

        setScore((prevScore) => prevScore + 10)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)

        // Get the location details for the alert message
        let locationDetails = { name: "", description: "" }
        const findLocation = (obj: any, targetPath: string[]): any => {
          for (const [key, value] of Object.entries(obj)) {
            if (typeof value === "object") {
              if (value.name && targetPath.length === 1 && key === targetPath[0]) {
                return value
              } else if (!value.name) {
                const result = findLocation(value, targetPath.slice(1))
                if (result) return result
              }
            }
          }
          return null
        }

        const targetPathArray = targetLocationPath.split("/")
        const details = findLocation(londonMap.london, targetPathArray)
        if (details) {
          locationDetails = details
        }

        alert(`Hooray! You've arrived at ${locationDetails.name}! +10 coins. ${locationDetails.description}`)

        if (newVisitedLocations.size === getTotalLandmarks()) {
          setShowGameComplete(true)
          setVisitedLocations(newVisitedLocations)
          setCurrentMission(null)
          const restart = window.confirm(
            "🎉 Congratulations! You've visited all locations in London! Would you like to play again?",
          )
          if (restart) {
            resetGame()
          }
        } else {
          setVisitedLocations(newVisitedLocations)
          setCurrentMission(null)
          generateNewMission(newVisitedLocations)
        }
      }
    }
  }

  const getTotalLandmarks = (): number => {
    let count = 0
    const countLandmarks = (obj: any) => {
      Object.values(obj).forEach((value) => {
        if (typeof value === "object" && value.name) {
          count++
        } else if (typeof value === "object") {
          countLandmarks(value)
        }
      })
    }
    countLandmarks(londonMap.london)
    return count
  }

  const totalLandmarks = getTotalLandmarks()

  const findClosestValidPath = (path: string[]): string | null => {
    const allPaths = getAllValidPaths(londonMap)
    const inputPath = path.join("/")

    let closestPath = null
    let minDistance = Number.POSITIVE_INFINITY

    for (const validPath of allPaths) {
      const distance = levenshteinDistance(inputPath, validPath)
      if (distance < minDistance && distance <= 3) {
        // Allow up to 3 character differences
        minDistance = distance
        closestPath = validPath
      }
    }

    return closestPath
  }

  const getAllValidPaths = (obj: any, currentPath: string[] = []): string[] => {
    let paths: string[] = []

    for (const [key, value] of Object.entries(obj)) {
      const newPath = [...currentPath, key]
      if (typeof value === "object") {
        if (value.name) {
          paths.push(newPath.join("/"))
        } else {
          paths = paths.concat(getAllValidPaths(value, newPath))
        }
      }
    }

    return paths
  }

  const levenshteinDistance = (a: string, b: string): number => {
    const matrix = Array(b.length + 1)
      .fill(null)
      .map(() => Array(a.length + 1).fill(null))

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + substitutionCost)
      }
    }

    return matrix[b.length][a.length]
  }

  const getCurrentDirectory = (path: string[]): any => {
    let current: any = londonMap
    for (const segment of path) {
      if (current[segment]) {
        current = current[segment]
      } else {
        return {}
      }
    }
    return current
  }

  return (
    <ToastProvider>
      <div className="container mx-auto p-4 bg-background text-foreground min-h-screen">
        <h1 className="text-3xl font-bold mb-2 text-center text-black">Shell-it: The London Episode 👾</h1>
        <p className="text-center mb-6 text-muted-foreground">
          Navigate through London using terminal commands (cd) to discover and collect coins at famous landmarks!
        </p>

        {showTutorial ? (
          <OnboardingTutorial onComplete={() => setShowTutorial(false)} />
        ) : (
          <div className="grid gap-6">
            <TravelGuide />

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">City Map</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CityMap
                    londonMap={londonMap}
                    currentPath={currentPath}
                    currentMission={currentMission}
                    visitedLocations={visitedLocations}
                    expandedItems={expandedItems}
                    setExpandedItems={setExpandedItems}
                  />
                </CardContent>
              </Card>

              <div className="space-y-6">
                {!showGameComplete && (
                  <Card className="border-2 border-yellow-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Travel Objective</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <MissionAlert currentMission={currentMission} />
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Travel Navigator</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <TravelNavigator
                      onMove={handleMove}
                      currentPath={currentPath}
                      errorMessage={errorMessage}
                      homeDirectory={homeDirectory}
                      isOneShotNavigation={isOneShotNavigation}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ProgressTracker visitedCount={visitedLocations.size} totalCount={totalLandmarks} score={score} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        <Toaster />
      </div>
    </ToastProvider>
  )
}

