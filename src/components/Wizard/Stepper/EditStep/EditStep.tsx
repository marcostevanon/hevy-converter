import type { ImportedData } from '@/types/importedData';
import { Button, Table } from '@chakra-ui/react';

interface EditStepProps {
  importedData: ImportedData[];
  exportCsv: () => void;
  restart: () => void;
}

export const EditStep = ({ importedData, exportCsv, restart }: EditStepProps) => {
  return (
    <div>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Fitbod V1</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Occurrences</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {importedData
            .filter(
              (item, index, self) =>
                !item.strongV1.isExerciseValid() &&
                index ===
                  self.findIndex(
                    (t) =>
                      t.fitbodV1.exercise === item.fitbodV1.exercise &&
                      t.strongV1.exerciseName === item.strongV1.exerciseName
                  )
            )
            .map((item) => ({
              ...item,
              occurrences: importedData.filter(
                (t) =>
                  t.fitbodV1.exercise === item.fitbodV1.exercise &&
                  t.strongV1.exerciseName === item.strongV1.exerciseName
              ).length,
            }))
            .sort((a, b) => b.occurrences - a.occurrences)
            .map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.fitbodV1.exercise}</Table.Cell>
                <Table.Cell textAlign="end">{item.occurrences}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Fitbod V1</Table.ColumnHeader>
            <Table.ColumnHeader>Strong V1</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Occurrences</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {importedData
            .filter(
              (item, index, self) =>
                item.strongV1.isExerciseValid() &&
                index ===
                  self.findIndex(
                    (t) =>
                      t.fitbodV1.exercise === item.fitbodV1.exercise &&
                      t.strongV1.exerciseName === item.strongV1.exerciseName
                  )
            )
            .map((item) => ({
              ...item,
              occurrences: importedData.filter(
                (t) =>
                  t.fitbodV1.exercise === item.fitbodV1.exercise &&
                  t.strongV1.exerciseName === item.strongV1.exerciseName
              ).length,
            }))
            .sort((a, b) => b.occurrences - a.occurrences)
            .map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.fitbodV1.exercise}</Table.Cell>
                <Table.Cell>{item.strongV1.exerciseName}</Table.Cell>
                <Table.Cell textAlign="end">{item.occurrences}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>

      {/* importedData: {importedData.length} */}
      <br />
      <Button onClick={exportCsv}>Export</Button>
      <Button onClick={restart}>Restart</Button>
    </div>
  );
};
