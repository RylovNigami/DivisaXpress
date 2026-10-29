<template>
  <q-page class="font-color safe-area-bottom hero-image" style="padding-top: 48px; padding-bottom: env(safe-area-inset-bottom);">

    <!-- q-tabs fijo en el tope usando el componente oficial de Quasar -->
    <q-page-sticky position="top" expand style="z-index: 10;">
      <!-- Contenedor sellador: Se desliza 2px bajo el header para tapar huecos -->
      <div class="full-width" style="background-color: black; margin-top: -2px; padding-top: 2px;">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="info"
          indicator-color="info"
          align="justify"
          narrow-indicator
        >
          <q-tab name="BCV" label="BCV" />
          <q-tab name="USDT" label="USDT" />
        </q-tabs>
      </div>
    </q-page-sticky>

    <q-tab-panels v-model="tab" animated class="font-color hero-image bg-transparent">
      <q-tab-panel name="BCV" class="q-pa-none">
        <BCVChartComponent />
      </q-tab-panel>

      <q-tab-panel name="USDT" class="q-pa-none">
        <USDTChartComponent />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BCVChartComponent from '@/components/BCVChartComponent.vue';
import USDTChartComponent from '@/components/USDTChartComponent.vue';

export default defineComponent({
  name: 'ChartsPage',
  components: {
    BCVChartComponent,
    USDTChartComponent,
  },

  setup() {
    return {
      BCVChartComponent,
      USDTChartComponent,
      tab: ref('BCV'),
    }
  }
})
</script>
