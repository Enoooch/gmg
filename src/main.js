const chalk = require("chalk");
const figlet = require("figlet");
const log = require('./log');
const askQuestions = require('./questions');
const createFile = require('./create');

const init = () => {
  console.log(
    chalk.bold.italic.rgb(127, 0, 255)(
      figlet.textSync("Gatsby Markdown Generator", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
}

const run = async () => {
  init();
  const answers = await askQuestions();
  const filePath = createFile(answers);
  filePath && log.success(`File created at ${filePath}`);
};

module.exports = run;