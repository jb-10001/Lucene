const { kebabCase } = require("lodash");
const { headers, comment } = require("..");
const path = require("path");
module.exports = function(name) {
  // 首字母大写化
  name = name.slice(0, 1).toUpperCase() + name.slice(1);
  return [
    ...headers(),
    `.${kebabCase(name)} {`,
    `  &-main {`,
    ``,
    `  }`,
    `}`,
    ``
  ].join("\n");
};
