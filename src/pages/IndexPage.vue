<template>
  <q-page class="font-color rotated-safe-areas" style="background: #0037FF;">
    <!--q-tabs
      v-model="tab"
      dense
      class="text-grey q-pt-sm"
      active-color="info"
      indicator-color="info"
      align="justify"
      narrow-indicator
      style="background-color: black;"
    >
      <q-tab name="$ a Bs." label="$$$ a Bs." />
      <q-tab name="Otras" label="Otras Divisas"/>
      <q-tab name="Bs. en $" label="Bs. en Divisas" />
    </q-tabs-->
    <q-tab-panels v-model="tab" animated class="hero-image font-color">
      <q-tab-panel name="Calculator" class="q-pa-none">
        <IndexComponent/>
      </q-tab-panel>

      <!--q-tab-panel name="Otras" class="q-pa-none">
        <AnotherCurrenciesComponent/>
      </q-tab-panel-->
    </q-tab-panels>
    <div class="q-pb-md q-pt-xl safe-area-bottom" style="text-shadow: 1px 1px 1px black;">
      <div class="row flex-center">RylovTech ©</div>
      <div class="row flex-center">2025 · Venezuela</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
//import AnotherCurrenciesComponent from 'components/AnotherCurrenciesComponent.vue';
import IndexComponent from 'components/IndexComponent.vue';


export default defineComponent({
  name: 'IndexPage',
  components: {
    //AnotherCurrenciesComponent,
    IndexComponent,
  },

  setup() {
    return {
      //AnotherCurrenciesComponent,
      IndexComponent,
      tab: ref('Calculator'),
    }
  }
})
</script>
