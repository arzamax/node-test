import fs from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';

import DirWatcher from './dirwatcher';

const getJSONFileName = fileName => `${path.parse(fileName).name}.json`;

export default class Importer {

  constructor(path, target) {
    this._path = path;
    this._target = target;
    this._dirwatcher = new DirWatcher(path, 2000);
  }

  /**
   * @method convertCSVtoJSON
   * @param CSVFileName {string}
   * @description Gets CSV file name and writes *same name*.json file with converted data
   */

  convertCSVtoJSON = async CSVFileName => {
    const data = await csvtojson().fromFile(path.join(this._path, CSVFileName));
    const JSONFileName = getJSONFileName(CSVFileName);

    fs.writeFile(path.join(this._target, JSONFileName), JSON.stringify(data), (err) => {
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
    this._dirwatcher.on('dirwatcher:changed', this.convertCSVtoJSON);
    this._dirwatcher.on('dirwatcher:removed', this.removeJSONByFileName);
  }

  removeListeners() {
    this._dirwatcher.removeListener('dirwatcher:changed', this.convertCSVtoJSON);
    this._dirwatcher.removeListener('dirwatcher:removed', this.removeJSONByFileName);
  }

  start() {
    this.addListeners();
    this._dirwatcher.watch();
  }

  stop() {
    this.removeListeners();
    this._dirwatcher.stopWatch();
  }
}