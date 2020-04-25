import { TestCaseRead } from '@/client/TestCaseRead'

export interface TestContainerRead {
  uuid_read: string;
  date: string;
  tests: TestCaseRead[];
}
