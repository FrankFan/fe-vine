import exeq from 'exeq';
import chalk from 'chalk';
import config from './config';

const upload = (platform = 'android') => {
  const {
    groupId,
    artifactId,
    version,
    filePath,
    nexusUrl,
    repositoryId,
    userName,
    password,
  } = config;
  const MAVEN_COMMAND_URL = `mvn deploy:deploy-file -DgroupId=${groupId} -DartifactId=${artifactId} -Dversion=${version} -Dpackaging=aar -Dfile=${filePath} -Durl=${nexusUrl} -DrepositoryId=${repositoryId} -DuserName=${userName} -Dpassword=${password}`;

  if (platform.toLowerCase() === 'android') {
    exeq(MAVEN_COMMAND_URL)
      .then(() => {
        console.log(chalk.black.bgGreen('上传成功'));
        return Promise.resolve(true);
      })
      .catch(err => {
        console.log(chalk.black.bgGreen(`上传失败, error code is: ${JSON.stringify(err.code)}`));
        console.log(chalk.yellow('请确保升级了 oriente.config.json.version 字段'));

        return Promise.reject(err);
      })
  } else {
    // iOS
  }
}

export {
  upload,
}