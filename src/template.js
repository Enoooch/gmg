const markdownTemplate = ({ TITLE, DESCRIPTION, TAGS }) => `---
title: "${TITLE}"
date: "${new Date().toISOString()}"
description: "${DESCRIPTION}"
tags: ${JSON.stringify(TAGS)}
---
`;

module.exports = markdownTemplate;