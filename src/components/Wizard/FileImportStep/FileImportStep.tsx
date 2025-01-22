import { StrongRaw } from "@/logic/maps/strongMapping";
import { useFileImportStep } from "./useFileImportStep";

interface FileImportStepProps {
    onImport: (data: StrongRaw[]) => void;
}

export const FileImportStep = ({ onImport }: FileImportStepProps) => {
    const [data, data1] = useFileImportStep()

    return <>-FileImportStep Component-</>
}