#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require('fs');

// shell config
shell.config.silent = true

const init = () => {
  console.log(
    chalk.bold.italic.rgb(127, 0, 255)(
      figlet.textSync("Gatsby Markdown Generator", {
        // font: "Slant",
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
  content = markdownTemplate(answers)
  fs.writeFileSync(filePath, content);
  return filePath;
};

const success = (filepath) => {
  console.log(chalk.white.green.bold(`File created at ${filepath}`));
};

const error = (errorMsg) => {
  console.log(chalk.white.red.bold(errorMsg));
};

const run = async () => {
  init();
  const answers = await askQuestions();
  const filePath = createFile(answers);
  filePath && success(filePath);
};

run();