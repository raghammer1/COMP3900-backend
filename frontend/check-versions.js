// check-versions.js
const semver = require('semver');
const { engines } = require('./package.json');
const execSync = require('child_process').execSync;

const nodeVersion = process.version;
const npmVersion = execSync('npm --version').toString().trim();

if (!semver.satisfies(nodeVersion, engines.node)) {
  console.error(
    `Invalid Node.js version. Expected ${engines.node}, but found ${nodeVersion}.`
  );
  process.exit(1);
}

if (!semver.satisfies(npmVersion, engines.npm)) {
  console.error(
    `Invalid npm version. Expected ${engines.npm}, but found ${npmVersion}.`
  );
  process.exit(1);
}
