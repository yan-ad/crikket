import { Button } from "@crikket/ui/components/ui/button"
import { MonitorUp } from "lucide-react"

interface CapturePermissionStepProps {
  onStartCapture: () => void
}

export function CapturePermissionStep({
  onStartCapture,
}: CapturePermissionStepProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-8 text-center">
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Choose what to record</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Firefox will ask you to choose a window or screen. Select the browser
          window where you want to reproduce the issue.
        </p>
      </div>
      <Button className="gap-2" onClick={onStartCapture} size="lg">
        <MonitorUp aria-hidden="true" className="h-5 w-5" />
        Choose window or screen
      </Button>
    </div>
  )
}
