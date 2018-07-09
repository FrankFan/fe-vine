import exeq from 'exeq';
import config from '../config';

const upload = () => {
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
  const platform = 'android';

  if (platform.toLowerCase() === 'android') {
    exeq(MAVEN_COMMAND_URL)
      .then(() => {
        console.log('上传成功');
        return Promise.resolve(true);
      })
      .catch(err => {
        console.log(`上传失败 ${err}`);
        return Promise.reject(err);
      })
  } else {
    // iOS
  }
}

export {
  upload,
}