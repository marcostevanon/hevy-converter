import { Flex, Heading, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { StrongRaw } from '../../logic/maps/strongMapping';
import { Stepper } from './Stepper/Stepper';

export const Wizard = () => {
  const [importedData, setImportedData] = useState<StrongRaw[]>([]);
  console.log(importedData);

  return (
    <>
      <Flex gap="2" align="center" justify="center" py="2" px="4" pb="4">
        <Image src="/favicon/android-chrome-192x192.png" height="6" />
        <Heading>Hevy Converter</Heading>
      </Flex>

      <Flex align="center" justify="center" px="4">
        <Stepper importedData={importedData} setImportedData={setImportedData} />
      </Flex>
    </>
  );
};
