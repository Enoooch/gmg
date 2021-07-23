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
      type: "checkbox",
      name: "TAGS",
      message: "Choose artical tags:",
      choices: ["js", "css", "html", "nodejs"],
    }
  ];
  return inquirer.prompt(questions);
};

module.exports = askQuestions;