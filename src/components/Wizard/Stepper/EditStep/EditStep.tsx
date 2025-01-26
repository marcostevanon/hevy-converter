import { Status } from '@/components/ui/status';
import type { ImportedData } from '@/types/importedData';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Alert,
  Button,
  Editable,
  Flex,
  Icon,
  IconButton,
  Separator,
  Table,
  Text,
} from '@chakra-ui/react';
import { LuCheck, LuOctagonAlert, LuPencilLine, LuX } from 'react-icons/lu';
import { useMissingExercises } from './useMissingExercises';

interface MissingExercisesProps {
  importedData: ImportedData[];
}

const MissingExercises = ({ importedData }: MissingExercisesProps) => {
  const { visualizedExercises, addedExercises, addExercise } = useMissingExercises({
    importedData,
  });

  return (
    <Flex direction="column" gap="2">
      <Alert.Root status="warning">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Beta version</Alert.Title>
          <Alert.Description>
            Not all Fitbod and Hevy exercises match.
            <br /> The following exercises are not in our list.
            <br /> Please find their names in the Hevy app and complete.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Alert.Root status="info">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>
            You can skip this step, and we'll ignore these exercises.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Separator />

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Fitbod Exercise (Occurrences)</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {visualizedExercises.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Text>
                  <Status value={item.isAdded ? 'success' : 'error'} pr="2" />
                  <Text as="span" fontWeight="bold">
                    {item.fitbodV1.exercise}
                  </Text>{' '}
                  ({item.occurrences})
                </Text>
                <Editable.Root
                  defaultValue="Click to add"
                  value={
                    addedExercises.find((added) => added.fitbodExercise === item.fitbodV1.exercise)
                      ?.strongExercise || undefined
                  }
                  // TODO fix exercise! (!)
                  onValueCommit={(e) => addExercise(item.fitbodV1.exercise!, e.value)}
                >
                  <Editable.Preview />
                  <Editable.Input />
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton variant="outline" size="xs">
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Table.Cell>
              <Table.Cell textAlign="end">
                {!item.isAdded && (
                  <IconButton
                    variant="ghost"
                    size="xs"
                    onClick={() => console.log('Ignore clicked')}
                  >
                    <LuX />
                  </IconButton>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
  // add or exclude from import
};

interface EditStepProps {
  importedData: ImportedData[];
  exportCsv: () => void;
  restart: () => void;
}

export const EditStep = ({ importedData, exportCsv, restart }: EditStepProps) => {
  return (
    <>
      <AccordionRoot collapsible defaultValue={['a']}>
        <AccordionItem value="a">
          <AccordionItemTrigger>
            <Icon fontSize="lg">
              <span>
                <LuOctagonAlert />
              </span>
            </Icon>
            Missing Exercises
          </AccordionItemTrigger>
          <AccordionItemContent>
            <MissingExercises importedData={importedData} />
          </AccordionItemContent>
        </AccordionItem>

        {/* <AccordionItem value="b">
          <AccordionItemTrigger>
            <Icon fontSize="lg">
              <span>
                <LuOctagonAlert />
              </span>
            </Icon>
            Missing Exercises
          </AccordionItemTrigger>
          <AccordionItemContent>
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
          </AccordionItemContent>
        </AccordionItem> */}
      </AccordionRoot>

      <Button onClick={exportCsv}>Export</Button>
      <Button onClick={restart}>Restart</Button>
    </>
  );
};
