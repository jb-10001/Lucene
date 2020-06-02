const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
// module.exports = function() {
const base = process.env.INIT_CWD;
const name = process.argv[2];
if (!/^([a-zA-Z][a-z0-9]*){2,}$/.test(name)) {
  console.log(chalk.red(`${name}: Incorrect name convention...`));
  process.exit();
}
if (fs.existsSync(path.join(base, name))) {
  console.log(chalk.red(`${path.join(base, name)} exists...`));
  process.exit();
} else {
  // fs.mkdirSync(path.join(base, name));
}

const file = path.join(base, name + ".jsx");
if (fs.existsSync(file)) {
  console.log(chalk.red(`${file} existed...`));
  process.exit();
}
fs.createWriteStream(file).write(
  require(`./index.jsx.js`)(name)
);
console.log(chalk.green('Created: ' + file));
// };
