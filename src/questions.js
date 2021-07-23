const inquirer = require("inquirer");

const askQuestions = () => {
  const questions = [
    {
      name: "TITLE",
      type: "input",
      message: "What is the title of the artical?"
    },
    {
      name: "DESCRIPTION",
      type: "input",
      message: "What is the description of the artical?"
    },
    {
      name: "TAGS",
      type: "checkbox",
      message: "Choose artical tags:",
      choices: ["js", "css", "html", "nodejs"],
    },
    {
      name: "NEED_FOLDER",
      type: "confirm",
      message: "Create a folder with index.md inside?",
    }
  ];

  return inquirer.prompt(questions);
};

module.exports = askQuestions;