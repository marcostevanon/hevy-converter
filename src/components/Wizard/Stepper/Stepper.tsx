import { StepsCompletedContent, StepsContent, StepsItem, StepsList } from '@/components/ui/steps';
import type { ImportedData } from '@/types/importedData';
import { StepsRootProvider, useSteps } from '@chakra-ui/react';
import { type Dispatch, type SetStateAction } from 'react';
import { EditStep } from './EditStep/EditStep';
import { ExportStep } from './ExportStep/ExportStep';
import { FileUpload } from './FileImportStep/FileUpload/FileUpload';

interface StepperProps {
  importedData: ImportedData[];
  setImportedData: Dispatch<SetStateAction<ImportedData[]>>;
}

export const Stepper = ({ importedData, setImportedData }: StepperProps) => {
  const steps = useSteps({
    linear: true,
    defaultStep: 0,
    count: 3,
  });

  const onUpload = (data: ImportedData[]) => {
    setImportedData(data);
    steps.goToNextStep();
  };

  const exportCsv = () => {
    steps.goToNextStep();
  };

  const restart = () => {
    steps.resetStep();
    setImportedData([]);
  };

  return (
    <StepsRootProvider value={steps} size="sm" maxWidth="lg">
      <StepsList>
        <StepsItem index={0} title="Import" />
        <StepsItem index={1} title="Edit data" />
        <StepsItem index={2} title="Export" />
      </StepsList>

      <StepsContent index={0}>
        {/* // TODO refactor these components */}
        {/* <FileImportStep onUpload={onUpload} /> */}
        <FileUpload onUpload={onUpload} />
      </StepsContent>
      <StepsContent index={1}>
        <EditStep importedData={importedData} exportCsv={exportCsv} restart={restart} />
      </StepsContent>
      <StepsContent index={2}>
        <ExportStep importedData={importedData} restart={restart} />
      </StepsContent>
      <StepsCompletedContent>All steps are complete!</StepsCompletedContent>
    </StepsRootProvider>
  );
};
