<template>
  <!-- Pantalla de carga inicial (Splash Screen personalizada) -->
  <div v-if="initialLoading" class="fullscreen flex flex-center bg-black text-white" style="z-index: 9999;">
    <div class="text-center">
      <q-avatar size="80px" class="q-mb-md spinner-bounce">
        <img src="/MainLogo.png">
      </q-avatar>

      <div class="text-h6 text-weight-bold">DivisaXpress</div>
      <q-spinner-dots color="primary" size="40px" class="q-mt-sm" />
    </div>
  </div>

  <!-- Tu contenido existente -->
  <router-view class="safe-area-bottom" style="background: #0037FF; padding-bottom: env(safe-area-inset-bottom);" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Capacitor } from '@capacitor/core';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { StatusBar, Style } from '@capacitor/status-bar';

const initialLoading = ref(true);

onMounted(async () => {
  if (Capacitor.isNativePlatform()) {
    await EdgeToEdge.enable().catch(err => console.error('Error EdgeToEdge:', err));
    await StatusBar.setBackgroundColor({ color: '#010203' });
    await StatusBar.setStyle({ style: Style.Dark });
  }

  // Ocultar la pantalla de carga inicial una vez que los componentes y servicios estén listos
  setTimeout(() => {
    initialLoading.value = false;
  }, 600);
});
</script>

<style>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.spinner-bounce {
  animation: bounce 1.5s infinite ease-in-out;
}
</style>
