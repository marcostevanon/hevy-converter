import type { StrongRaw } from '@/logic/maps/strongMapping';
import { Button } from '@chakra-ui/react';

interface EditPageProps {
  importedData: StrongRaw[];
  exportCsv: () => void;
  restart: () => void;
}

export const EditPage = ({ importedData, exportCsv, restart }: EditPageProps) => {
  return (
    <>
      importedData: {importedData.length}
      <br />
      <Button onClick={exportCsv}>Export</Button>
      <Button onClick={restart}>Restart</Button>
    </>
  );
};
