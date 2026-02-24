<template>
  <router-view class="safe-area-bottom" style="background: #0037FF; padding-bottom: env(safe-area-inset-bottom);"></router-view>/>
</template>

<script setup>
import { onMounted } from 'vue';
import { Capacitor } from '@capacitor/core';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { StatusBar, Style } from '@capacitor/status-bar';

onMounted( async () => {
  if (Capacitor.isNativePlatform()) {
    await EdgeToEdge.enable().catch(err => console.error('Error EdgeToEdge:', err));

    await StatusBar.setBackgroundColor({ color: '#010203' });

    await StatusBar.setStyle({ style: Style.Dark });
  }
});
</script>
