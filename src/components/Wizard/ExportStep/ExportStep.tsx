import type { StrongRaw } from '@/logic/maps/strongMapping';
import { Button } from '@chakra-ui/react';

interface ExportStepProps {
  importedData: StrongRaw[];
  restart: () => void;
}

export const ExportStep = ({ importedData, restart }: ExportStepProps) => {
  return (
    <>
      importedData: {importedData.length}
      <br />
      -ExportStep Component-
      <br />
      <Button onClick={restart}>Restart</Button>
    </>
  );
};
