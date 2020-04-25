import { TestContainerRead } from '@/client/TestContainerRead'

import axios from 'axios'

export class TestbefundClient {
  getContainerByReadId (readId: string): Promise<TestContainerRead> {
    // TODO somehow make this configurable
    const url = `https://api.testbefund.nt-dev.eu/v1/test/container/${readId}`
    return axios.get(url)
      .then(result => result.data)
      .catch(err => {
        console.error(err) // TODO notifications/errors for user
      })
  }
}
