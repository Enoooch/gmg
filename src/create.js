const fs = require('fs');
const shell = require("shelljs");
const log = require('./log');
const markdownTemplate = require('./template');

// shell config
shell.config.silent = true

/**
 * @description gatsby markdown file path
 * To do: check BLOG_PATH is exist
 */
const BLOG_PATH = "/content/blog"

const createFile = (answers) => {
  const { TITLE, NEED_FOLDER } = answers;
  let filePath = "";

  if (NEED_FOLDER) {
    const folderPath = `${process.cwd()}${BLOG_PATH}/${TITLE}`;
    filePath = `${folderPath}/index.md`;
    const { stderr } = shell.mkdir(folderPath);
    // shell.touch(filePath);
    if (stderr) {
      log.error(stderr);
      return "";
    }
  } else {
    const folderPath = `${process.cwd()}${BLOG_PATH}`;
    filePath = `${folderPath}/${TITLE}.md`;
  }

  try {
    fs.writeFileSync(filePath, markdownTemplate(answers));
  } catch (error) {
    log.error(error)
    return ""
  }

  return filePath;
};

module.exports = createFile;