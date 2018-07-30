import { homedir } from 'os';
import fs from 'fs';
import path from 'path';

/**
 * 配置文件
 * 1.优先读取当前工程目录下的 fe-vine.config.json 文件
 * 2.没有的话继续读取 ~/.fe-vine.config.json 文件
 * 3.仍然没有的话，提示错误
 */
let filePath = path.resolve(process.cwd(), 'fe-vine.config.json');
let json;
try {
  json = fs.readFileSync(filePath);
} catch (error) {
  console.log(`no local config found, use global config file:  homedir = ${homedir()}`);
  try {
    filePath = path.resolve(homedir(), '.fe-vine.config.json');
    json = fs.readFileSync(filePath);
  } catch (err) {
    throw new Error('No fe-vine.config.json found.');
  }
}

const config = JSON.parse(json);

const pkgPath = path.resolve(__dirname, '../package.json');
const pkgjson = fs.readFileSync(pkgPath);
const version = JSON.parse(pkgjson).version;

export {
  config,
  version,
}
