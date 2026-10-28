<template>
  <q-page class="font-color safe-area-bottom" style="background: #0037FF; padding-bottom: env(safe-area-inset-bottom);">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="info"
      indicator-color="info"
      align="justify"
      narrow-indicator
      style="background-color: black;"
    >
      <q-tab name="BCV" label="BCV" />
      <q-tab name="USDT" label="USDT"/>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="font-color hero-image">
      <q-tab-panel name="BCV" class="q-pa-none">
        <BCVChartComponent/>
      </q-tab-panel>

      <q-tab-panel name="USDT" class="q-pa-none">
        <USDTChartComponent/>
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
