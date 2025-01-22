import { Button } from "@/components/ui/button"
import {
    StepsCompletedContent,
    StepsContent,
    StepsItem,
    StepsList,
    StepsRoot
} from "@/components/ui/steps"
import { Group } from "@chakra-ui/react"
import { useState } from "react"
import { FileUploadDemo } from "./FileUploadDemo"

export const Stepper = () => {
    const [step, setStep] = useState(0)

    return (
        <StepsRoot step={step} onStepChange={(e) => setStep(e.step)} count={3} size="sm" maxWidth="lg">
            <StepsList>
                <StepsItem index={0} title="Import" />
                <StepsItem index={1} title="Update data" />
                <StepsItem index={2} title="Export" />
            </StepsList>

            <StepsContent index={0}>
                <FileUploadDemo />
            </StepsContent>
            <StepsContent index={1}>Step 2</StepsContent>
            <StepsContent index={2}>Step 3</StepsContent>
            <StepsCompletedContent>All steps are complete!</StepsCompletedContent>

            <Group>
                <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
                    Prev
                </Button>
                <Button variant="outline" size="sm" onClick={() => setStep(step + 1)}>
                    Next
                </Button>
            </Group>
        </StepsRoot >
    )
}