import { convertToStrongRaw, type StrongRaw } from '@/logic/maps/strongMapping';
import type { ImportedData } from '@/types/importedData';
import { Button, Table } from '@chakra-ui/react';
import { LuDownload } from 'react-icons/lu';

interface ExportStepProps {
  importedData: ImportedData[];
  restart: () => void;
}

export const ExportStep = ({ importedData, restart }: ExportStepProps) => {
  const tempFixedImportedDate = importedData
    .filter((item) => !!item.strongV1.exerciseName)
    .sort((a, b) => new Date(a.strongV1.date!).getTime() - new Date(b.strongV1.date!).getTime());

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
      <Button onClick={restart}>Restart</Button>
      <Button variant="outline" onClick={downloadCSVFromJSON}>
        <LuDownload /> Download Strong File
      </Button>

      {!!tempFixedImportedDate.length && (
        <Table.Root size="sm" striped variant="outline" showColumnBorder>
          <Table.Header>
            <Table.Row>
              {Object.keys(tempFixedImportedDate[0].strongV1).map((key) => (
                <Table.ColumnHeader key={key}>{key.split('_')[1]}</Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tempFixedImportedDate.map((data, index) => (
              <Table.Row key={index}>
                <Table.Cell>{data.strongV1.date?.toISOString().split('T')[0]}</Table.Cell>
                <Table.Cell>{data.strongV1.workoutName}</Table.Cell>
                <Table.Cell>{data.strongV1.duration}</Table.Cell>
                <Table.Cell>{data.strongV1.exerciseName}</Table.Cell>
                <Table.Cell>{data.strongV1.setOrder}</Table.Cell>
                <Table.Cell>{data.strongV1.weight}</Table.Cell>
                <Table.Cell>{data.strongV1.reps}</Table.Cell>
                <Table.Cell>{data.strongV1.distance}</Table.Cell>
                <Table.Cell>{data.strongV1.seconds}</Table.Cell>
                <Table.Cell>{data.strongV1.notes}</Table.Cell>
                <Table.Cell>{data.strongV1.workoutNotes}</Table.Cell>
                <Table.Cell>{data.strongV1.RPE}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};
