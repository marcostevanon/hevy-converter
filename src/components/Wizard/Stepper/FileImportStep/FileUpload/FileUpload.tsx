import { fitbodV1ExerciseMappings } from '@/logic/maps/fitbodV1ExerciseMappings';
import { fitBodCsvHeadersV1, FitbodV1 } from '@/models/FitbodV1';
import { StrongV1 } from '@/models/StrongV1';
import type { ImportedData } from '@/types/importedData';
import {
  Button,
  FileUploadClearTrigger,
  FileUploadHiddenInput,
  FileUploadRootProvider,
  Flex,
  Text,
  useFileUpload,
} from '@chakra-ui/react';
import { useState } from 'react';
import { LuBicepsFlexed, LuFileUp } from 'react-icons/lu';
import { CloseButton } from '../../../../ui/close-button';
import { FileInput } from '../../../../ui/file-upload';
import { InputGroup } from '../../../../ui/input-group';

interface FileUploadProps {
  onUpload: (data: ImportedData[]) => void;
}

export const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [isFileValid, setFileValid] = useState<boolean>(true);
  const [importedData, setImportedData] = useState<ImportedData[]>([]);

  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 15 * 1024 * 1024,
    accept: 'text/csv',
    onFileAccept: (details) => {
      // create a function to extract this logic
      const file = details.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const csv = reader.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');

        const expectedHeaders = fitBodCsvHeadersV1.split(',');

        const isValid = expectedHeaders.every((header, index) => header === headers[index].trim());

        setFileValid(isValid);
        if (!isValid) {
          setImportedData([]);
          return;
        }

        const imported = lines
          .slice(1)
          // remove empty lines
          .map((line) => line.split(','))
          .filter((row) => row[0] !== '')
          .map((row) => {
            const fitbodV1 = new FitbodV1();
            fitbodV1.date = row[0].trim();
            fitbodV1.exercise = row[1].trim();
            fitbodV1.reps = row[2].trim();
            fitbodV1.weight = row[3].trim();
            fitbodV1.duration = row[4].trim();
            fitbodV1.distance = row[5].trim();
            fitbodV1.incline = row[6].trim();
            fitbodV1.resistance = row[7].trim();
            fitbodV1.isWarmup = row[8].trim();
            fitbodV1.note = row[9].trim();
            fitbodV1.multiplier = row[10].trim();

            const strongV1 = new StrongV1();
            strongV1.importAsFitbodV1(fitbodV1, fitbodV1ExerciseMappings);

            return {
              id: crypto.randomUUID(),
              fitbodV1,
              strongV1,
            };

            // TODO test this and add few tests with edge cases (date, conversion)
          });

        setImportedData(imported);
      };
      reader.readAsText(file);
    },
  });

  const convert = () => {
    onUpload(importedData);
    fileUpload.clearFiles();
  };

  return (
    <Flex direction="column" align="center" justify="center" pt="5" gap="4">
      <Text>Select a FitBod .csv workout file</Text>

      <FileUploadRootProvider width="fit" value={fileUpload}>
        <FileUploadHiddenInput />
        <InputGroup
          startElement={<LuFileUp size="18" />}
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
          <FileInput minWidth="fit" maxWidth="400px" placeholder="Select .csv" />
        </InputGroup>
      </FileUploadRootProvider>

      {fileUpload.acceptedFiles.length > 0 && isFileValid && (
        <Button width="fit" onClick={convert} disabled={!fileUpload.acceptedFiles.length}>
          <LuBicepsFlexed /> Import workouts!
        </Button>
      )}

      {fileUpload.acceptedFiles.length > 0 && !isFileValid && (
        <Text fontSize="md" fontWeight="medium" textAlign="center" color="red.500">
          The imported file isn't a valid Fitbod file ({fileUpload.rejectedFiles.length})
        </Text>
      )}
    </Flex>
  );
};
