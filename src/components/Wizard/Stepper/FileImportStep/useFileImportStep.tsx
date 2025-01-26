import { fitbodV1ExerciseMappings } from '@/logic/maps/fitbodV1ExerciseMappings';
import { fitBodCsvHeadersV1, FitbodV1 } from '@/models/FitbodV1';
import { StrongV1 } from '@/models/StrongV1';
import type { ImportedData } from '@/types/importedData';
import { useFileUpload } from '@chakra-ui/react';
import { useState } from 'react';

interface UseFileImportStepProps {
  onUpload: (data: ImportedData[]) => void;
}

export const useFileImportStep = ({ onUpload }: UseFileImportStepProps) => {
  const [isFileValid, setFileValid] = useState<boolean>(true);
  const [csvLines, setCsvLines] = useState<string[]>([]);

  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 15 * 1024 * 1024,
    accept: 'text/csv',
    onFileAccept: (details) => {
      const file = details.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const csv = reader.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        const expectedHeaders = fitBodCsvHeadersV1.split(',');
        const isValid = expectedHeaders.every((header, index) => header === headers[index].trim());
        setFileValid(isValid);
        if (isValid) setCsvLines(lines);
      };
      reader.readAsText(file);
    },
  });

  const submit = () => {
    const imported = csvLines
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

        return { id: crypto.randomUUID(), fitbodV1, strongV1 };

        // TODO test this and add few tests with edge cases (date, conversion)
      });
    onUpload(imported);
    fileUpload.clearFiles();
  };

  const resetFileUpload = () => {
    setFileValid(true);
    fileUpload.clearFiles();
  };

  return {
    submit,
    resetFileUpload,
    isFileValid,
    fileUpload,
  };
};
