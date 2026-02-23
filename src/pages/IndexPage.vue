<template>
  <q-page class="font-color" style="background: #0037FF; padding-bottom: 80px;">
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
      <q-tab name="Dólar" label="Dólar" />
      <q-tab name="Otras" label="Otras Divisas"/>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="hero-image font-color">
      <q-tab-panel name="Dólar" class="q-pa-none">
        <IndexComponent/>
      </q-tab-panel>

      <q-tab-panel name="Otras" class="q-pa-none">
        <AnotherCurrenciesComponent/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AnotherCurrenciesComponent from 'components/AnotherCurrenciesComponent.vue';
import IndexComponent from 'components/IndexComponent.vue';


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
