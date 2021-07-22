#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const shell = require("shelljs");
const fs = require('fs');

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

const markdownTemplate = ({ TITLE, DESCRIPTION, TAGS }) => `---
title: "${TITLE}"
date: "${new Date().toISOString()}"
description: "${DESCRIPTION}"
tags: ${JSON.stringify(TAGS)}
---
`;

const createFile = (answers) => {
  const folderPath = `${process.cwd()}/${answers.TITLE}`;
  const filePath = `${folderPath}/index.md`;
  const { stderr } = shell.mkdir(folderPath);
  // shell.touch(filePath);
  if (stderr) {
    error(stderr);
    return "";
  }
  fs.writeFileSync(filePath, markdownTemplate(answers));
  return filePath;
};

const success = (successMsg) => {
  console.log(chalk.green.bold(successMsg));
};

const error = (errorMsg) => {
  console.log(chalk.red.bold(errorMsg));
};

const run = async () => {
  init();
  const answers = await askQuestions();
  const filePath = createFile(answers);
  filePath && success(`File created at ${filePath}`);
};

run();