import fs from 'fs';
import path from 'path';
import EventEmitter from 'events';
import getTime from 'date-fns/get_time';

export default class DirWatcher extends EventEmitter {

  constructor(path, delay) {
    super();
    this._path = path;
    this._delay = delay || 2000;
    this._list = new Map();
    this._timer = null;
  }

  /**
   * @method checkHasFileModified
   * @param fileName {string}
   * @description If file has modified emits 'dirwatcher:changed' event
   */

  checkHasFileModified = fileName => {
    fs.stat(path.join(this._path, fileName), (err, data) => {

      if (err) {
        console.log(`error: ${err.message}`);

      } else {
        const modified = getTime(data.mtime);
        const lastModified = this._list.get(fileName);
        const hasModified = lastModified !== modified;

        if (hasModified) {
          this._list.set(fileName, modified);
          this.emit('dirwatcher:changed', fileName);
        }
      }
    });
  };

  /**
   * @method checkHasFileRemovedOrRenamed
   * @param fileNames {array}
   * @description If there is no file name on file names array removes it from list and emits 'dirwatcher:removed' event
   */

  checkHasFileRemovedOrRenamed = fileNames => {
    for (const key of this._list.keys()) {

      if (!fileNames.includes(key)) {
        this.emit('dirwatcher:removed', key);
        this._list.delete(key);
      }
    }
  };

  /**
   * @method processDirectory
   * @description Gets all .csv file names from directory and checks it with checkHasFileRemovedOrRenamed and
   * checkHasFileModified methods
   */

  processDirectory = () => {
    fs.readdir(this._path, (err, fileNames) => {

      if (err) {
        console.log(`error: ${err.message}`);

      } else {
        const CSVFileNames = fileNames.filter(fileName => path.parse(fileName).ext === '.csv');

        this.checkHasFileRemovedOrRenamed(CSVFileNames);
        CSVFileNames.forEach(this.checkHasFileModified);
      }
    })
  };

  watch() {
    this._timer = setInterval(this.processDirectory, this._delay);
  }

  stopWatch() {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }
}