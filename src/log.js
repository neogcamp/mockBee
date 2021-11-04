/* eslint-disable no-console */
const chalk = require("chalk");

const Log = {
  chalk: chalk,
  verbose: (...args) => {
    return console.log(chalk.blueBright(...args));
  },
  info: (...args) => {
    return console.log(...args);
  },
  warn: (...args) => {
    return console.warn(chalk.yellow(...args));
  },
  error: (...args) => {
    return console.error(chalk.red(...args));
  },
  newLine: () => {
    return console.log();
  },
};

module.exports = Log;
