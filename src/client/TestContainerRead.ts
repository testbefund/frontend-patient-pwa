import { TestCaseRead } from '@/client/TestCaseRead'
import { TestCaseClient } from '@/client/TestCaseClient'

export interface TestContainerRead {
  uuid_read: string;
  date: string;
  tests: TestCaseRead[];
  client?: TestCaseClient;
}
