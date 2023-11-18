import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'chase.game',
  appName: 'chase-game',
  webDir: 'src',
  server: {
    androidScheme: 'https'
  }
};

export default config;
