import path from 'path';
import exeq from 'exeq';
import chalk from 'chalk';
import { config } from './config';
import { existsSync } from 'fs';

const upload = (platform = 'android') => {
  const {
    version,
    android,
    ios,
  } = config;
  let {
    mode,
    arrFilePath,
    groupId,
    artifactId,
    nexusUrl,
    repositoryId,
    userName,
    password,
  } = android;
  artifactId = `${artifactId}-${mode}`;
  arrFilePath = path.resolve(process.cwd(), arrFilePath);
  let {
    h5ArchiveRemoteRepo,
    zipFileRelativePath,
  } = ios;
  const MAVEN_COMMAND = `mvn deploy:deploy-file -DgroupId=${groupId} -DartifactId=${artifactId} -Dversion=${version} -Dpackaging=aar -Dfile=${arrFilePath} -Durl=${nexusUrl} -DrepositoryId=${repositoryId} -DuserName=${userName} -Dpassword=${password}`;

  if (platform.toLowerCase() === 'android') {
    exeq(MAVEN_COMMAND)
      .then(() => {
        console.log(chalk.black.bgGreen('上传成功'));
        return Promise.resolve(true);
      })
      .catch(err => {
        console.log(chalk.black.bgGreen(`上传失败, error code is: ${JSON.stringify(err.code)}`));
        console.log(chalk.yellow('请确保升级了 oriente.config.json.version 字段'));
        return Promise.reject(err);
      })
  } else if (platform.toLowerCase() === 'ios') {
    // 1. clone h5-archive 项目到 /tmp 目录
    // 2. 拿到 h5-archive-root-path 和 h5-archive-asset-path
    const h5ArchiveName = h5ArchiveRemoteRepo.split('/').reverse()[0];
    const h5ArchiveRepoRoot = path.resolve(`/tmp/${h5ArchiveName}`);
    if (existsSync(h5ArchiveRepoRoot)) {
      console.log('已存在');
      const {
        cpZipCommand,
        podUploadCommand,
      } = makeParams(h5ArchiveRepoRoot, zipFileRelativePath, version);
      exeq([
        `cd ${h5ArchiveRepoRoot}`,
        'git checkout .',
        'git pull --rebase',
      ])
        .then(() => {
          iosUpload(version, cpZipCommand, h5ArchiveRepoRoot, podUploadCommand);
        })
    } else {
      console.log('不存在');
      exeq([
        `git clone ${h5ArchiveRemoteRepo} /tmp/${h5ArchiveName}`,
      ])
        .then(() => {
          const {
            cpZipCommand,
            podUploadCommand,
          } = makeParams(h5ArchiveRepoRoot, zipFileRelativePath, version);
          exeq([
            `cd ${h5ArchiveRepoRoot}`,
            'git checkout .',
            'git pull --rebase',
          ])
            .then(() => {
              iosUpload(version, cpZipCommand, h5ArchiveRepoRoot, podUploadCommand);
            })
        })
    }
  }
}

const makeParams = (h5ArchiveRepoRoot, zipFileRelativePath, version) => {
  const zipFileFullPath = path.resolve(process.cwd(), zipFileRelativePath);
  const jsonFileFullPath = zipFileFullPath.replace('.zip', '.json');
  const cpZipCommand = `cp ${zipFileFullPath} ${jsonFileFullPath} ${h5ArchiveRepoRoot}/OrienteZip/Assets`;
  const podUploadCommand = `orientepodspecpush --tag=${version} --workspace=${h5ArchiveRepoRoot}`;
  return {
    cpZipCommand,
    podUploadCommand,
  }
}

const iosUpload = (version, cpZipCommand, h5ArchiveRepoRoot, podUploadCommand) => {
  exeq(
    cpZipCommand,
    `cd ${h5ArchiveRepoRoot}`,
    `git add .`,
    `git commit -m 'add zip&json file version: ${version}'`,
    podUploadCommand,
  )
    .then(() => {
      console.log(chalk.black.bgGreen('上传成功'));
      return Promise.resolve(true);
    })
    .catch(err => {
      console.log(chalk.black.bgGreen(`上传失败, error code is: ${JSON.stringify(err.code)}`));
      return Promise.reject(err);
    })
}

export {
  upload,
}
