import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

interface OnboardingTutorialProps {
  onComplete: () => void
}

export default function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "Welcome!",
      description: "",
      content: (
        <div className="space-y-4">
          <p>In this game, we use a file system analogy to navigate through London:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Root directory (/)</strong>: This is London itself, similar to the root of your computer's file
              system.
            </li>
            <li>
              <strong>Home directory (~)</strong>: Your home in the game is the London School of Economics (LSE),
              similar to your home folder on a computer.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Basic Navigation Commands",
      description: "",
      content: (
        <div className="space-y-4">
          <p>To move between locations, we use the "cd" command, which stands for "change directory".</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">cd ..</code> - Move up one level
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">cd /</code> - Go to the root (London)
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">cd ~</code> - Return home (LSE)
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "London's Structure",
      description: "Let's look at an example on how we can navigate in the game.",
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Folders</strong> (like westminster, southbank) represent areas you can move into.
            </li>
            <li>
              <strong>Files</strong> (like big_ben, london_eye) represent specific landmarks you can visit.
            </li>
          </ul>
          <pre className="bg-muted p-4 rounded-md text-sm">
            {`london/
├── westminster/
│   ├── big_ben 
│   ├── palace
│   └── abbey
├── southbank/
│   ├── london_eye
│   └── tate_modern
└── city/
    └── universities/`}
          </pre>
        </div>
      ),
    },
    {
      title: "Absolute Paths",
      description: "An absolute path starts from the root (London) and gives the full location.",
      content: (
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <p className="font-bold">Example: Go to Big Ben from LSE</p>
            <pre className="mt-2 text-sm">cd /london/westminster/big_ben</pre>
          </div>
          <pre className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
            {`london/
├── westminster/
│   ├── big_ben <-- You end here
│   ├── palace
│   └── abbey
├── southbank/
│   ├── london_eye
│   └── tate_modern
└── city/
    └── universities/
        └── lse <-- You start here`}
          </pre>
        </div>
      ),
    },
    {
      title: "Relative Paths",
      description: "A relative path is based on your current location and uses '..' to move up directories.",
      content: (
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <p className="font-bold">Example: Go to Big Ben from LSE</p>
            <pre className="mt-2 text-sm">cd ../../../westminster/big_ben</pre>
          </div>
          <p className="font-bold">Let's break it down step by step:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <code>cd ..</code> (from lse to universities)
            </li>
            <li>
              <code>cd ../..</code> (from universities to city)
            </li>
            <li>
              <code>cd ../../..</code> (from city to london)
            </li>
            <li>
              <code>cd ../../../westminster</code> (from london to westminster)
            </li>
            <li>
              <code>cd ../../../westminster/big_ben</code> (from westminster to big_ben)
            </li>
          </ol>
          <pre className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap mt-4">
            {`london/
├── westminster/
│   ├── big_ben <-- You end here
│   ├── palace
│   └── abbey
├── southbank/
│   ├── london_eye
│   └── tate_modern
└── city/
    └── universities/
        └── lse <-- You start here`}
          </pre>
        </div>
      ),
    },
    {
      title: "You're ready to explore!",
      description: "Key Points to Remember",
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li>The root (/) is London, your starting point for absolute paths</li>
            <li>Your home (~) is the London School of Economics (LSE)</li>
            <li>Use absolute paths (/london/..) to go directly to a location from anywhere</li>
            <li>Use relative paths (../../) to navigate based on your current position</li>
            <li>The Travel Navigator will show your current location and home</li>
            <li>Follow the Travel Objective to collect coins and explore London!</li>
          </ul>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[step].title}</CardTitle>
        <CardDescription>{steps[step].description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">{steps[step].content}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          Previous
        </Button>
        <Button onClick={handleNext}>{step === steps.length - 1 ? "Start Adventure" : "Next"}</Button>
      </CardFooter>
    </Card>
  )
}

