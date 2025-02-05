import 'dotenv/config'

export default () => {

  return {
    expo: {
      name: "Parko",
      slug: "parko-app",
      version: "1.1.12",
      orientation: "portrait",
      icon: "./assets/icon_parko.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash_screen.png",
        resizeMode: "contain",
        backgroundColor: "#509C76"
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.rafaelgsm.parkoapp",
        config: {
          googleMapsApiKey: "AIzaSyC53Ez6WTCSavpYro9G15-vYCXmjNU1Bwk"
        },
        infoPlist: {
          NSLocationWhenInUseUsageDescription: "Precisamos da sua localização para mostrar estacionamentos próximos.",
          NSLocationAlwaysAndWhenInUseUsageDescription: "Precisamos da sua localização para navegação em tempo real."
        }
      },
      android: {
        versionCode: 15,
        adaptiveIcon: {
          foregroundImage: "./assets/icon_parko.png",
          backgroundColor: "#ffffff"
        },
        package: "com.rafaelgsm.parkoapp",
        config: {
          googleMaps: {
            apiKey: "AIzaSyDFiuUJ3GJ5Isw4xAuTQ5r-gLFeOoDwPjI"
          }
        },
        permissions: [
          "ACCESS_COARSE_LOCATION",
          "ACCESS_FINE_LOCATION"
        ]
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      plugins: ["expo-font"],
      extra: {
        eas: {
          projectId: process.env.EAS_PROJECT_ID
        },
        URL_API: process.env.URL_API,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        PUBLIC_KEY: process.env.PUBLIC_KEY,
        ACCESS_TOKEN: process.env.ACCESS_TOKEN
      },
      newArchEnabled: true
    }
  }
}
