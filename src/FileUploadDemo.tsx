import { Button, FileUploadClearTrigger, FileUploadHiddenInput, FileUploadRootProvider, useFileUpload } from "@chakra-ui/react"
import { useState } from "react"
import { LuDownload, LuFileUp, LuRepeat2 } from "react-icons/lu"
import { CloseButton } from "./components/ui/close-button"
import { FileInput } from "./components/ui/file-upload"
import { InputGroup } from "./components/ui/input-group"
import { convertFitbodToStrong } from "./logic/converters/convertFitbodToStrong"
import { FitbodRaw, createFitbodObject } from "./logic/maps/fitbodMapping"
import { StrongRaw, convertToStrongRaw } from "./logic/maps/strongMapping"

export const FileUploadDemo = () => {
    const fileUpload = useFileUpload({
        maxFiles: 1,
        maxFileSize: 15 * 1024 * 1024,
        accept: "text/csv",
    })

    const [outputData, setOutputData] = useState<StrongRaw[] | null>(null)

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
                    return convertToStrongRaw(strong)
                } catch (err) {
                    console.error((err as any).message)
                }
            }).filter(item => item !== undefined)
            console.log(strongData)
            setOutputData(strongData)
        }
        reader.readAsText(file)
    }

    function jsonToCSV(strongData: StrongRaw[]) {
        const keys = Object.keys(strongData[0]);
        const csvRows = [keys.join(",")];

        strongData.forEach((strongObj: any) => {
            const values = keys.map(key => strongObj[key]);
            csvRows.push(values.join(","));
        });

        return csvRows.join("\n");
    }

    function downloadCSVFromJSON() {
        const csvContent = jsonToCSV(outputData as StrongRaw[]);

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "output.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
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
                disabled={!fileUpload.acceptedFiles.length || !!outputData}
                onClick={convert}>
                Convert Fitbob to Strong <LuRepeat2 />
            </Button>

            <br />

            <Button variant="outline" disabled={!outputData} onClick={downloadCSVFromJSON}>
                <LuDownload /> Download Strong File
            </Button>
        </>
    )
}
