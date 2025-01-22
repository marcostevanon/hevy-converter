import { FileUploadDemo } from "@/FileUploadDemo";
import { Button, Flex, Group, Heading, Image, StepsCompletedContent, StepsContent, StepsItem, StepsList, StepsRoot } from "@chakra-ui/react";
import { useState } from "react";
import { StrongRaw } from "../../logic/maps/strongMapping";
import { FileImportStep } from "./FileImportStep/FileImportStep";
import { Stepper } from "@/Stepper";

export const Wizard = () => {
  const [importedData, setImportedData] = useState<StrongRaw[]>([]);
  console.log(importedData);

  const [step, setStep] = useState(0)
  return (
    <>
      <Flex gap="2" align="center" justify="center" py="2" px="4" pb="8">
        <Image src="/favicon/android-chrome-192x192.png" height="6" />
        <Heading>Hevy Converter</Heading>
      </Flex>

      <Flex align="center" justify="center" px="4">
        <StepsRoot step={step} onStepChange={(e) => setStep(e.step)} count={3} size="sm" maxWidth="lg">
          <StepsList>
            <StepsItem index={0} title="Import" />
            <StepsItem index={1} title="Update data" />
            <StepsItem index={2} title="Export" />
          </StepsList>

          <StepsContent index={0}>
            <FileUploadDemo />
            <FileImportStep onImport={setImportedData} />
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
      </Flex>

      <Stepper />


    </>
  )


}