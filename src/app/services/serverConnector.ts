// this is mostly going to be a stub, but it will get some data out of a JSON file
// delete this in the actual deployment
import * as jsonData from '../testFiles/testData.json'

export class serverConnector {

  static serverGetter() {
    return jsonData
  }
}
