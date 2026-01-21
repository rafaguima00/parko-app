const { withAppBuildGradle, withProjectBuildGradle } = require('@expo/config-plugins')

module.exports = function withAndroidTargetSdkVersion(config) {
  config = withAppBuildGradle(config, config => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = config.modResults.contents.replace(
        /targetSdkVersion\s+\d+/,
        'targetSdkVersion 35'
      )
      config.modResults.contents = config.modResults.contents.replace(
        /compileSdkVersion\s+\d+/,
        'compileSdkVersion 35'
      )
    }
    return config
  })

  config = withProjectBuildGradle(config, config => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = config.modResults.contents.replace(
        /compileSdkVersion\s+=\s+\d+/,
        'compileSdkVersion = 35'
      )
    }
    return config
  })

  return config
}
