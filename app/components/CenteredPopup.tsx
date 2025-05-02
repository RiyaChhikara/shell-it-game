import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CenteredPopupProps {
  title: string
  content: string
  onClose: () => void
}

export default function CenteredPopup({ title, content, onClose }: CenteredPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{content}</p>
          <Button onClick={onClose} className="w-full">
            Got it!
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

