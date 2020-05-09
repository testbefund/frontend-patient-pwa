import { TestCaseClient } from '@/client/TestCaseClient'

export interface TestCaseRead {
  title: string;
  icd_code: string;
  infected: string;
  status: string;
}
