const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'oriente.config.json');
const json = fs.readFileSync(filePath);
const config = JSON.parse(json);

module.exports = config;
