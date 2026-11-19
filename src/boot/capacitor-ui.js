import { boot } from 'quasar/wrappers';
import { Capacitor } from '@capacitor/core';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { StatusBar, Style } from '@capacitor/status-bar';

export default boot(async () => {
  if (Capacitor.isNativePlatform()) {
    await EdgeToEdge.enable().catch(err => console.error('Error EdgeToEdge:', err));
    await StatusBar.setBackgroundColor({ color: '#010203' }).catch(err => console.error('Error StatusBar color:', err));
    await StatusBar.setStyle({ style: Style.Dark }).catch(err => console.error('Error StatusBar style:', err));
  }
});
