import exeq from 'exeq';
import chalk from 'chalk';
import { config } from './config';

const upload = (platform = 'android') => {
  const {
    groupId,
    artifactId,
    version,
    arrFilePath,
    nexusUrl,
    repositoryId,
    userName,
    password,
    feArchivePath,
  } = config;
  const MAVEN_COMMAND_URL = `mvn deploy:deploy-file -DgroupId=${groupId} -DartifactId=${artifactId} -Dversion=${version} -Dpackaging=aar -Dfile=${arrFilePath} -Durl=${nexusUrl} -DrepositoryId=${repositoryId} -DuserName=${userName} -Dpassword=${password}`;

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
  } else if (platform.toLowerCase() === 'ios') {
    const POD_UPLOAD_URL = `orientepodspecpush --tag=${version} --specRepo=OrienteSpecs --workspace=${feArchivePath} --noPackage --lint=" --allow-warnings --sources='ssh://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/ios-OrienteSpecs,https://github.com/CocoaPods/Specs.git'" --push=" --allow-warnings --sources='ssh://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/ios-OrienteSpecs,https://github.com/CocoaPods/Specs.git'"`;
    // iOS
    console.log(POD_UPLOAD_URL);

    exeq(POD_UPLOAD_URL)
      .then(() => {
        console.log(chalk.black.bgGreen('上传成功'));
        return Promise.resolve(true);
      })
      .catch(err => {
        console.log(chalk.black.bgGreen(`上传失败, error code is: ${JSON.stringify(err.code)}`));
        return Promise.reject(err);
      })
  }
}

export {
  upload,
}