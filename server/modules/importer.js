import fs from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';

import DirWatcher from './dirwatcher';

const getJSONFileName = fileName => `${path.parse(fileName).name}.json`;

export default class Importer extends DirWatcher {

  constructor(path, target, delay) {
    super(path, delay);
    this._target = target;
  }

  /**
   * @method convertCSVtoJSON
   * @param CSVFileName {string}
   * @description Gets CSV file name and writes *same name*.json file with converted data
   */

  convertCSVtoJSON = async CSVFileName => {
    const data = await csvtojson().fromFile(path.join(this.path, CSVFileName));
    const JSONFileName = getJSONFileName(CSVFileName);

    fs.writeFile(path.join(this._target, JSONFileName), JSON.stringify(data), err => {
      if (err) {
        console.log(`error: ${err.message}`);
      }
    })
  };

  /**
   * @method removeJSONByFileName
   * @param CSVFileName {string}
   * @description Gets CSV file name and removes *same name*.json file
   */

  removeJSONByFileName = CSVFileName => {
    const JSONFileName = getJSONFileName(CSVFileName);

    fs.unlink(path.join(this._target, JSONFileName), (err) => {
      if (err) {
        console.log(`error: ${err.message}`);
      }
    })
  };

  addListeners() {
    this.on('dirwatcher:changed', this.convertCSVtoJSON);
    this.on('dirwatcher:removed', this.removeJSONByFileName);
  }

  removeListeners() {
    this.removeListener('dirwatcher:changed', this.convertCSVtoJSON);
    this.removeListener('dirwatcher:removed', this.removeJSONByFileName);
  }

  start() {
    this.addListeners();
    this.watch();
  }

  stop() {
    this.removeListeners();
    this.stopWatch();
  }
}