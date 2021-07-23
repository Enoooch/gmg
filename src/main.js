const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require('fs');
const log = require('./log');
const markdownTemplate = require('./template');
const askQuestions = require('./questions');

// shell config
shell.config.silent = true

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

/**
 * @description gatsby markdown file path
 */
const BLOG_PATH = "content/blog/"

const createFile = (answers) => {
  const folderPath = `${process.cwd()}/${BLOG_PATH}${answers.TITLE}`;
  const filePath = `${folderPath}/index.md`;
  const { stderr } = shell.mkdir(folderPath);
  // shell.touch(filePath);
  if (stderr) {
    log.error(stderr);
    return "";
  }
  fs.writeFileSync(filePath, markdownTemplate(answers));
  return filePath;
};

const run = async () => {
  init();
  const answers = await askQuestions();
  const filePath = createFile(answers);
  filePath && log.success(`File created at ${filePath}`);
};

module.exports = run;