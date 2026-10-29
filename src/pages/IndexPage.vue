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
          <q-tab name="Dólar" label="Dólar" />
          <q-tab name="Otras" label="Otras Divisas" />
        </q-tabs>
      </div>
    </q-page-sticky>

    <q-tab-panels v-model="tab" animated class="font-color hero-image bg-transparent">
      <q-tab-panel name="Dólar" class="q-pa-none">
        <IndexComponent />
      </q-tab-panel>

      <q-tab-panel name="Otras" class="q-pa-none">
        <AnotherCurrenciesComponent />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AnotherCurrenciesComponent from '../components/AnotherCurrenciesComponent.vue';
import IndexComponent from '../components/IndexComponent.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    AnotherCurrenciesComponent,
    IndexComponent,
  },

  setup() {
    return {
      AnotherCurrenciesComponent,
      IndexComponent,
      tab: ref('Dólar'),
    }
  }
})
</script>
<style scoped>
.sticky-tabs {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}
</style>
