import { TestContainerRead } from '@/client/TestContainerRead'

import axios from 'axios'

export class TestbefundClient {
  getContainerByReadId (readId: string): Promise<TestContainerRead> {
    const url = `${TESTBEFUND_API_URL}/v1/test/container/${readId}`
    return axios.get(url)
      .then(result => result.data)
      .catch(err => {
        console.error(err) // TODO notifications/errors for user
      })
  }
}
