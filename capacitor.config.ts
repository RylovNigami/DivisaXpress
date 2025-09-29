import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'DivisaXpress',
  webDir: 'dist/spa',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  ios: {
    scheme: 'App',
    contentInset: 'always'
  }
};

export default config;
