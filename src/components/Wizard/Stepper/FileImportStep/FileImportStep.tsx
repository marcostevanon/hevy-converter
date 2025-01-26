import { CloseButton } from '@/components/ui/close-button';
import { FileInput } from '@/components/ui/file-upload';
import { InputGroup } from '@/components/ui/input-group';
import type { ImportedData } from '@/types/importedData';
import {
  Alert,
  Button,
  FileUploadClearTrigger,
  FileUploadHiddenInput,
  FileUploadRootProvider,
  Flex,
  Text,
} from '@chakra-ui/react';
import { LuBicepsFlexed, LuFileUp } from 'react-icons/lu';
import { useFileImportStep } from './useFileImportStep';

interface FileImportStepProps {
  onUpload: (data: ImportedData[]) => void;
}

export const FileImportStep = ({ onUpload }: FileImportStepProps) => {
  const { fileUpload, isFileValid, submit, resetFileUpload } = useFileImportStep({ onUpload });

  return (
    <Flex direction="column" align="center" justify="center" gap="4">
      {!isFileValid && (
        <>
          <ImportError />
          <Button onClick={resetFileUpload}>Retry</Button>
        </>
      )}

      {isFileValid && (
        <>
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
              <FileInput maxWidth="400px" placeholder="Select .csv" />
            </InputGroup>
          </FileUploadRootProvider>

          {fileUpload.acceptedFiles.length > 0 && (
            <Button onClick={submit} disabled={!fileUpload.acceptedFiles.length}>
              <LuBicepsFlexed /> Import workouts!
            </Button>
          )}
        </>
      )}
    </Flex>
  );
};

const ImportError = () => {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Title>The imported file isn't a valid Fitbod file</Alert.Title>
    </Alert.Root>
  );
};
