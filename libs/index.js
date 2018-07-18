import exeq from 'exeq';
import chalk from 'chalk';
import { config } from './config';

const upload = (platform = 'android') => {
  const {
    mode,
    groupId,
    version,
    arrFilePath,
    zipFilePath,
    nexusUrl,
    repositoryId,
    userName,
    password,
    feArchiveRootPath,
    feArchiveZipPath,
  } = config;
  let {
    artifactId,
  } = config;
  artifactId = `${artifactId}-${mode}`;
  const MAVEN_COMMAND = `mvn deploy:deploy-file -DgroupId=${groupId} -DartifactId=${artifactId} -Dversion=${version} -Dpackaging=aar -Dfile=${arrFilePath} -Durl=${nexusUrl} -DrepositoryId=${repositoryId} -DuserName=${userName} -Dpassword=${password}`;
  console.log(MAVEN_COMMAND);
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
    const zipFileName = zipFilePath.split('/').reverse()[0];
    const zipName = zipFileName.split('.')[0];
    const zipExtension = zipFileName.split('.')[1];
    const CP_ZIP_COMMAND = `cp ${zipFilePath} ${feArchiveZipPath}`;
    const RENAME_ZIP_COMMAND = `mv ${feArchiveZipPath}/${zipFileName} ${feArchiveZipPath}/${zipName}-${version}.${zipExtension}`;
    const POD_UPLOAD_COMMAND = `orientepodspecpush --tag=${version} --specRepo=OrienteSpecs --workspace=${feArchiveRootPath} --noPackage --lint=" --allow-warnings --sources='ssh://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/ios-OrienteSpecs,https://github.com/CocoaPods/Specs.git'" --push=" --allow-warnings --sources='ssh://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/ios-OrienteSpecs,https://github.com/CocoaPods/Specs.git'"`;

    exeq(
      CP_ZIP_COMMAND,
      RENAME_ZIP_COMMAND,
      `cd ${feArchiveRootPath}`,
      `git add .`,
      `git commit -m 'add zip file'`,
      POD_UPLOAD_COMMAND,
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
}

export {
  upload,
}