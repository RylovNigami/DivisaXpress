/** @type {import('@capacitor/cli').CapacitorConfig} */
const config = {
  appId: 'app.rylovtech.divisaxpress',
  appName: 'DivisaXpress',
  webDir: 'dist/capacitor',
  server: {
    androidScheme: 'https'
  },
  "bundledWebRuntime": false,
  "backgroundColor": "#000000",
  "plugins": {
    "StatusBar": {
      "overlaysWebView": false,
      "backgroundColor": "#000000",
      "style": "DARK"
    },
    "SplashScreen": {
      "backgroundColor": "#000000",
      "launchShowDuration": 2000,
      "launchAutoHide": true
    }
  }
};

export default config;
