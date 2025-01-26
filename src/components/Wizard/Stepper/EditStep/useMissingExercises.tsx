import type { ImportedData } from '@/types/importedData';
import { useEffect, useState } from 'react';

interface UseMissingExercisesProps {
  importedData: ImportedData[];
}

interface UseMissingExercisesReturn {
  visualizedExercises: (ImportedData & { occurrences: number; isAdded: boolean })[];
  addedExercises: Record<string, string>[];
  addExercise: (fitbodExercise: string, strongExercise: string) => void;
}

export const useMissingExercises = ({
  importedData,
}: UseMissingExercisesProps): UseMissingExercisesReturn => {
  const [addedExercises, setAddedExercises] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    sessionStorage.setItem('addedExercises', JSON.stringify(addedExercises));
  }, [addedExercises]);

  useEffect(() => {
    const storedExercises = sessionStorage.getItem('addedExercises');
    if (storedExercises) {
      setAddedExercises(JSON.parse(storedExercises));
    }
  }, []);

  const addExercise = (fitbodExercise: string, strongExercise: string) => {
    setAddedExercises((prev) => {
      const newExercise = { fitbodExercise, strongExercise };
      // remove duplicated in case of modifying the same exercise
      const updatedExercises = prev.filter((item) => item.fitbodExercise !== fitbodExercise);
      return [...updatedExercises, newExercise];
    });
  };

  const visualizedExercises = importedData
    .filter((imported) => !imported.strongV1.isExerciseValid())
    .reduce(
      (acc, imported) => {
        const existing = acc.find(
          (item) =>
            item.fitbodV1.exercise === imported.fitbodV1.exercise &&
            item.strongV1.exerciseName === imported.strongV1.exerciseName
        );
        if (existing) {
          existing.occurrences += 1;
        } else {
          acc.push({ ...imported, occurrences: 1 });
        }
        return acc;
      },
      [] as (ImportedData & { occurrences: number })[]
    )
    .map((item) => {
      const addedExercise = addedExercises.find(
        (added) => added.fitbodExercise === item.fitbodV1.exercise
      );
      return { ...item, isAdded: !!addedExercise };
    })
    .sort((a, b) => b.occurrences - a.occurrences);

  return { visualizedExercises, addedExercises, addExercise };
};
