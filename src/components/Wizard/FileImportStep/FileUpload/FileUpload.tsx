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
import { convertFitbodToStrong } from '../../../../logic/converters/convertFitbodToStrong';
import { FitbodRaw, createFitbodObject } from '../../../../logic/maps/fitbodMapping';
import { StrongRaw, convertToStrongRaw } from '../../../../logic/maps/strongMapping';
import { CloseButton } from '../../../ui/close-button';
import { FileInput } from '../../../ui/file-upload';
import { InputGroup } from '../../../ui/input-group';

interface FileUploadProps {
  onUpload: (data: StrongRaw[]) => void;
}

export const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [isFileValid, setFileValid] = useState<boolean>(true);
  const [importedDataTemp, setImportedDataTemp] = useState<StrongRaw[]>([]);

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

        const expectedHeaders = [
          'Date',
          'Exercise',
          'Reps',
          'Weight(kg)',
          'Duration(s)',
          'Distance(m)',
          'Incline',
          'Resistance',
          'isWarmup',
          'Note',
          'multiplier',
        ];

        const isValid = expectedHeaders.every((header, index) => header === headers[index].trim());

        setFileValid(isValid);
        if (!isValid) {
          setImportedDataTemp([]);
          return;
        }

        const data = lines.slice(1).map((line) => {
          const values = line.split(',');
          return values;
        });
        const strongData = data
          // remove empty lines
          .filter((row) => row[0] !== '')
          .map((row) => {
            const fitbodRaw = new FitbodRaw();
            fitbodRaw.Date = row[0].trim();
            fitbodRaw.Exercise = row[1].trim();
            fitbodRaw.Reps = row[2].trim();
            fitbodRaw['Weight(kg)'] = row[3].trim();
            fitbodRaw['Duration(s)'] = row[4].trim();
            fitbodRaw['Distance(m)'] = row[5].trim();
            fitbodRaw.Incline = row[6].trim();
            fitbodRaw.Resistance = row[7].trim();
            fitbodRaw.isWarmup = row[8].trim();
            fitbodRaw.Note = row[9].trim();
            fitbodRaw.multiplier = row[10].trim();
            const fitbod = createFitbodObject(fitbodRaw);
            try {
              const strong = convertFitbodToStrong(fitbod);
              // return an object that contains results, skipped and errored items ()
              return convertToStrongRaw(strong);
            } catch (err) {
              console.error((err as any).message);
            }
          })
          .filter((item) => item !== undefined);

        setImportedDataTemp(strongData);
      };
      reader.readAsText(file);
    },
  });

  const convert = () => {
    onUpload(importedDataTemp);
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
          <LuBicepsFlexed /> Import {importedDataTemp.length} workouts!
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
