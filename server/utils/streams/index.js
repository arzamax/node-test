import commander from 'commander';
import * as commands from './lib';

class CommandsWorker {

  static init() {
    const { action, file, path } = commander
      .option('-a, --action [action]', 'Select action')
      .option('-f --file [file]', 'Select file')
      .option('-p --path [path]', 'Select path')
      .parse(process.argv);

    if (action) {
      const command = commands[action];

      if (action === 'reverse' || action === 'transform') {
        command();
      }
      if (action === 'outputFile' || action === 'convertFromFile' || action === 'convertToFile') {
        command(file);
      }
    } else {
      console.log('Please select correct action');
      process.exit();
    }
  }
}

CommandsWorker.init();
