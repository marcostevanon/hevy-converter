import { Button } from '@chakra-ui/react';

interface ResetButtonProps {
  reset: () => void;
}

export const ResetButton = ({ reset }: ResetButtonProps) => {
  return <Button onClick={reset}>Restart</Button>;
};
