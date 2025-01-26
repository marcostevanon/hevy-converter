import type { ImportedData } from '@/types/importedData';
import { Flex, Heading, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { Stepper } from './Stepper/Stepper';

export const Wizard = () => {
  const [importedData, setImportedData] = useState<ImportedData[]>([]);

  return (
    <>
      <Flex gap="2" align="center" justify="center" py="2" px="4" pb="4">
        <Image src="/favicon/android-chrome-192x192.png" height="6" />
        <Heading>Hevy Converter</Heading>
      </Flex>

      <Flex align="center" justify="center" p="4">
        <Stepper importedData={importedData} setImportedData={setImportedData} />
      </Flex>
    </>
  );
};
