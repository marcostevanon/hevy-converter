import { convertToStrongRaw, type StrongRaw } from '@/logic/maps/strongMapping';
import type { ImportedData } from '@/types/importedData';
import { Button } from '@chakra-ui/react';
import { LuDownload } from 'react-icons/lu';

interface ExportStepProps {
  importedData: ImportedData[];
  restart: () => void;
}

export const ExportStep = ({ importedData, restart }: ExportStepProps) => {
  function jsonToCSV(strongData: StrongRaw[]) {
    const keys = Object.keys(strongData[0]);
    const csvRows = [keys.join(',')];

    strongData.forEach((strongObj: any) => {
      const values = keys.map((key) => strongObj[key]);
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  }

  function downloadCSVFromJSON() {
    const csvContent = jsonToCSV(importedData.map((val) => convertToStrongRaw(val.strongV1)));

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'output.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      importedData: {importedData.length}
      <br />
      <Button onClick={restart}>Restart</Button>
      <Button variant="outline" onClick={downloadCSVFromJSON}>
        <LuDownload /> Download Strong File
      </Button>
    </>
  );
};
