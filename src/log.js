const chalk = require("chalk");

const output = function (color, msg) {
  console.log(chalk[color].bold(msg));
};

const log = {
  info: (msg) => output('cyan', msg),
  success: (msg) => output('green', msg),
  warning: (msg) => output('yellow', msg),
  error: (msg) => output('red', msg),
};

module.exports = log;