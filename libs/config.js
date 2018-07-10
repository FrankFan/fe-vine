const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../oriente.config.json');
const json = fs.readFileSync(filePath);
const config = JSON.parse(json);

const pkgPath = path.resolve(__dirname, '../package.json');
const pkgjson = fs.readFileSync(pkgPath);
const version = JSON.parse(pkgjson).version;

export {
  config,
  version,
}
