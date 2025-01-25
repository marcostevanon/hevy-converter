import type { FitbodV1 } from '@/models/FitbodV1';
import type { StrongV1 } from '@/models/StrongV1';

export interface ImportedData {
  id: string;
  fitbodV1: FitbodV1;
  strongV1: StrongV1;
}
