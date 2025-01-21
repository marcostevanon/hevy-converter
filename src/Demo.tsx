import { FileInput } from "@/components/ui/file-upload"
import { Button, FileUploadClearTrigger, FileUploadHiddenInput, FileUploadRootProvider, Tabs, useFileUpload } from "@chakra-ui/react"
import { useState } from "react"
import { LuDownload, LuFileUp, LuRepeat2 } from "react-icons/lu"
import { CloseButton } from "./components/ui/close-button"
import { InputGroup } from "./components/ui/input-group"
import { createFitbodObject, FitbodRaw } from "./logic/maps/fitbodMapping"
import { convertFitbodToStrong } from "./logic/converters/convertFitbodToStrong"

export const Demo = () => {
  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 15 * 1024 * 1024,
    accept: "text/csv",
  })

  const [convertedFile, setConvertedFile] = useState<string | null>(null)

  const convert = () => {
    const file = fileUpload.acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = () => {
      const csv = reader.result as string
      const lines = csv.split("\n")
      const data = lines.slice(1).map((line) => {
        const values = line.split(",")
        return values
      })

      const strongData = data.map(row => {

        const fitbodRaw = new FitbodRaw()
        fitbodRaw.Date = row[0].trim()
        fitbodRaw.Exercise = row[1].trim()
        fitbodRaw.Reps = row[2].trim()
        fitbodRaw['Weight(kg)'] = row[3].trim()
        fitbodRaw['Duration(s)'] = row[4].trim()
        fitbodRaw['Distance(m)'] = row[5].trim()
        fitbodRaw.Incline = row[6].trim()
        fitbodRaw.Resistance = row[7].trim()
        fitbodRaw.isWarmup = row[8].trim()
        fitbodRaw.Note = row[9].trim()
        fitbodRaw.multiplier = row[10].trim()
        const fitbod = createFitbodObject(fitbodRaw)
        try {
          const strong = convertFitbodToStrong(fitbod)
          return strong
        } catch (err) {
          console.error((err as any).message)
        }
      })
      console.log(strongData)
      setConvertedFile("a")
    }
    reader.readAsText(file)
  }

  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List>
        <Tabs.Trigger value="members">
          Fitbod
        </Tabs.Trigger>
        <Tabs.Trigger value="projects">
          Hevy
        </Tabs.Trigger>
        <Tabs.Trigger value="tasks">
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="members">

        <FileUploadRootProvider gap="1" maxWidth="300px" value={fileUpload}>
          <FileUploadHiddenInput />
          <InputGroup
            startElement={<LuFileUp />}
            endElement={
              <FileUploadClearTrigger asChild>
                <CloseButton
                  me="-1"
                  size="xs"
                  variant="plain"
                  focusVisibleRing="inside"
                  focusRingWidth="2px"
                  pointerEvents="auto"
                  color="fg.subtle"
                />
              </FileUploadClearTrigger>
            }
          >
            <FileInput placeholder="Select .csv file" />
          </InputGroup>
        </FileUploadRootProvider>


        <Button
          variant="solid"
          disabled={!fileUpload.acceptedFiles.length || !!convertedFile}
          onClick={convert}>
          Convert Fitbob to Strong <LuRepeat2 />
        </Button>

        <br />

        <Button variant="outline" disabled={!convertedFile}>
          <LuDownload /> Download Strong File
        </Button>


      </Tabs.Content>
      <Tabs.Content value="projects">Hevy</Tabs.Content>
      <Tabs.Content value="tasks">Settings</Tabs.Content>
    </Tabs.Root >
  )
}
