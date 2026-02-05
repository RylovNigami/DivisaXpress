<template>
    <div class="q-pt-md row flex-center font-color">
      <q-btn outline rounded label="Actualizar" @click="showLoading()"/>
    </div>
    <div>
      <q-expansion-item @click="returnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Oficial ($): {{ OfficialValue }} <q-icon :color=colorBcv :name="symbolBcv"/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section >
            <q-input
              class="col q-pb-xl"
              outlined
              v-model.trim="USDamountBCV"
              dense="dense"
              hint="Inserte valor $ (USD)"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              @focus="BCVamountUSD = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> $ </div >
              </template>
              <template v-slot:prepend>
                  {{ computedBCVtoUSD }}
                </template>
            </q-input>
            <q-input
              class="col"
              outlined
              dense="dense"
              hint="Calculo (Bs.)"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              v-model.trim="BCVamountUSD"
              @focus="USDamountBCV = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ computedUSDtoBCV }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item @click="returnToZeroBcvEUR()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Oficial (€): {{ OfficialEURvalue }} <q-icon :color=colorBcv :name="symbolBcv"/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section >
            <q-input
              class="col q-pb-xl"
              outlined
              v-model.trim="EURamountBCV"
              dense="dense"
              hint="Inserte valor € (EUR)"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              @focus="BCVamountEUR = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> $ </div >
              </template>
              <template v-slot:prepend>
                  {{ computedBCVtoEUR }}
                </template>
            </q-input>
            <q-input
              class="col"
              outlined
              dense="dense"
              hint="Calculo (Bs.)"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              v-model.trim="BCVamountEUR"
              @focus="EURamountBCV = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ computedEURtoBCV }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item @click="returnToZeroParallel()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/USDT_Logo.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">USDT ($): {{ ParallelValue }} <q-icon :color=colorParallel :name='symbolParallel'/><br><div class="text-caption">{{ consultHourParallel }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input
              class="col q-pb-xl"
              outlined
              v-model.trim="USDamountParallel"
              dense="dense"
              hint="Inserte valor $ (USD)"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              @focus="ParallelamountUSD = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> $ </div >
              </template>
              <template v-slot:prepend>
                {{ computedParalleltoUSD }}
              </template>
            </q-input>
            <q-input
              class="col"
              outlined
              dense="dense"
              hint="Calculo (Bs.)"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              v-model.trim="ParallelamountUSD"
              @focus="USDamountParallel = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                {{ computedUSDtoParallel }}
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item @click="returnToZeroPromedio()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/promedio.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Promedio ($): {{ promedioValue }} <q-icon :color=colorPromedio :name='symbolPromedio'/><br><div class="text-caption">{{ consultHourParallel }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input class="col q-pb-xl"
            outlined
            v-model.trim="USDamountPromedio"
            dense="dense"
            hint="Inserte valor $ (USD)"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            inputmode="decimal"
            @focus="PromedioamountUSD = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> $ </div >
              </template>
              <template v-slot:prepend>
                  {{ computedPromediotoUSD }}
                </template>
            </q-input>
            <q-input
              class="col"
              outlined
              dense="dense"
              hint="Calculo (Bs.)"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              v-model.trim="PromedioamountUSD"
              @focus="USDamountPromedio = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ computedUSDtoPromedio }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useQuasar } from "quasar";
import axios from 'axios';

const parallelData = [];
const bcvData = [];
const consultHourBcv = ref('');
const consultHourParallel = ref('');
const OfficialValue = ref();
const ParallelValue = ref();
const promedioValue = ref();
const OfficialEURvalue = ref();
const USDamountBCV = ref();
const BCVamountUSD = ref();
const USDamountParallel = ref();
const ParallelamountUSD = ref();
const USDamountPromedio = ref();
const PromedioamountUSD = ref();
const EURamountBCV = ref();
const BCVamountEUR = ref();

const computedUSDtoBCV = computed (() => {
    if (USDamountBCV.value > 0){
      return (OfficialValue.value * USDamountBCV.value).toFixed(2);
    };
  return null;
});

const computedBCVtoUSD = computed (() => {
    if (BCVamountUSD.value > 0){
      return (BCVamountUSD.value / OfficialValue.value).toFixed(2);
    }
  return null;
});

const computedEURtoBCV = computed (() => {
    if (EURamountBCV.value > 0){
      return (OfficialEURvalue.value * EURamountBCV.value).toFixed(2);
    }
  return null;
});

const computedBCVtoEUR = computed (() => {
    if (BCVamountEUR.value > 0){
      return (BCVamountEUR.value / OfficialEURvalue.value).toFixed(2);
    }
  return null;
});

const computedUSDtoParallel = computed (() => {
    if (USDamountParallel.value > 0){
      return (ParallelValue.value * USDamountParallel.value).toFixed(2);
    }
  return null;
});

const computedParalleltoUSD = computed (() => {
    if (ParallelamountUSD.value > 0){
      return (ParallelamountUSD.value / ParallelValue.value).toFixed(2);
    }
  return null;
});

const computedUSDtoPromedio = computed (() => {
    if (USDamountPromedio.value > 0){
      return (promedioValue.value * USDamountPromedio.value).toFixed(2);
    }
  return null;
});

const computedPromediotoUSD = computed (() => {
    if (PromedioamountUSD.value > 0){
      return (PromedioamountUSD.value / promedioValue.value).toFixed(2);
    }
  return null;
});
//const colorBcv = ref('');
//const colorParallel = ref('');
//const symbolBcv = ref('');
//const symbolParallel = ref('');
//const colorPromedio = ref('');
//const symbolPromedio = ref('');

function returnToZeroBcv() {
  USDamountBCV.value = null;
  BCVamountUSD.value = null;
};

function returnToZeroParallel() {
  USDamountParallel.value = null;
  ParallelamountUSD.value = null;
};

function returnToZeroPromedio() {
  USDamountPromedio.value = null;
  PromedioamountUSD.value = null;
};

function returnToZeroBcvEUR() {
  EURamountBCV.value = null;
  BCVamountEUR.value = null;
};

async function showCharge(){
  const $q = useQuasar()

  $q.loading.show()

  await axios.get('https://ve.dolarapi.com/v1/dolares')
  .then(function (response) {
    if(response.status == 200){
      //bcvData.value = response.data[0];
      parallelData.value = response.data[1];
    }
  }).catch(function (error) {
    if (error.response) {
      $q.loading.hide()
      $q.notify({
        message: 'No se pudo contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    } else {
      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    }
  });

  await axios.get('https://api.dolarvzla.com/public/exchange-rate', {
    headers: {
      'x-dolarvzla-key': process.env.DOLAR_API_KEY
    }
  })
  .then(function (response) {
    if(response.status == 200){
      bcvData.value = response.data.current
      $q.loading.hide()
    }
  })
  .catch(function (error) {
    if (error.response) {
      $q.loading.hide()
      $q.notify({
        message: 'No se pudo contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    } else {
      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    }
  });

  /*await axios.get('https://pydolarve.org/api/v1/dollar?page=bcv')
  .then(function (response) {
    if(response.status == 200){
      bcvData.value=response.data
    }
  })
  .catch(function (error) {
    if (error.response) {
      $q.loading.hide()
      $q.notify({
        message: 'No se pudo contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    } else {
      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    }
  });

  await axios.get('https://pydolarve.org/api/v1/dollar?monitor=enparalelovzla')
  .then(function (response) {
    if(response.status==200){
        parallelData.value = response.data;
        $q.loading.hide()
      }
  })
  .catch(function (error) {
    if (error.response) {
      $q.loading.hide()
      $q.notify({
        message: 'No se pudo contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    } else {
      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    }
  });*/

  promedioValue.value = ((bcvData.value.usd + parallelData.value.promedio)/2).toFixed(2);
  /*if (bcvData.value.monitors.usd.color == 'green' && parallelData.value.color == 'green')
      {
        colorPromedio.value = 'green';
        symbolPromedio.value = 'mdi-arrow-up';
      } else if (bcvData.value.monitors.usd.color == 'red' && parallelData.value.color == 'red'){
        colorPromedio.value = 'red';
        symbolPromedio.value = 'mdi-arrow-down'
      };*/

    //Data BCV
    consultHourBcv.value = parallelData.value.fechaActualizacion;
    OfficialValue.value = bcvData.value.usd.toFixed(2);
    OfficialEURvalue.value = bcvData.value.eur.toFixed(2);
    //colorBcv.value = bcvData.value.monitors.usd.color;
    /*switch (colorBcv.value) {
      case 'green':
        symbolBcv.value = 'mdi-arrow-up'
      break;
      case 'red':
        symbolBcv.value = 'mdi-arrow-down'
      break;
      case 'neutral':
        symbolBcv.value = 'mdi-minus'
      break;
    };*/

    //Data Paralelo
    consultHourParallel.value = parallelData.value.fechaActualizacion;
    ParallelValue.value = parallelData.value.promedio.toFixed(2);
    //colorParallel.value = parallelData.value.color;
    /*switch (colorParallel.value) {
      case 'green':
        symbolParallel.value = 'mdi-arrow-up'
      break;
      case 'red':
        symbolParallel.value = 'mdi-arrow-down'
      break;
      case 'neutral':
        symbolParallel.value = 'mdi-minus'
      break;
    };*/
}


export default defineComponent({
  name: 'IndexComponent, App',
  setup() {
    const $q = useQuasar();

    return {
      tab: ref('$ a Bs.'),
      USDamountPromedio,
      USDamountBCV,
      USDamountParallel,
      PromedioamountUSD,
      BCVamountUSD,
      ParallelamountUSD,
      EURamountBCV,
      BCVamountEUR,
      promedioValue,
      showCharge,
      returnToZeroBcv,
      returnToZeroParallel,
      returnToZeroPromedio,
      returnToZeroBcvEUR,
      OfficialValue,
      ParallelValue,
      OfficialEURvalue,
      computedBCVtoUSD,
      computedUSDtoBCV,
      computedUSDtoParallel,
      computedParalleltoUSD,
      computedPromediotoUSD,
      computedUSDtoPromedio,
      computedEURtoBCV,
      computedBCVtoEUR,
      //colorParallel,
      //colorBcv,
      //symbolParallel,
      //symbolBcv,
      consultHourParallel,
      consultHourBcv,
      //colorPromedio,
      //symbolPromedio,
      async showLoading () {
        USDamountBCV.value = null;
        BCVamountUSD.value = null;

        USDamountParallel.value = null;
        ParallelamountUSD.value = null;

        USDamountPromedio.value = null;
        PromedioamountUSD.value = null;

        EURamountBCV.value = null;
        BCVamountEUR.value = null;
        $q.loading.show()

          await axios.get('https://ve.dolarapi.com/v1/dolares')
  .then(function (response) {
    if(response.status == 200){
      //bcvData.value = response.data[0];
      parallelData.value = response.data[1];
    }
  }).catch(function (error) {
    if (error.response) {
      $q.loading.hide()
      $q.notify({
        message: 'No se pudo contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    } else {
      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    }
  });

  await axios.get('https://api.dolarvzla.com/public/exchange-rate', {
    headers: {
      'x-dolarvzla-key': process.env.DOLAR_API_KEY
    }
  })
  .then(function (response) {
    if(response.status == 200){
      bcvData.value = response.data.current
      $q.loading.hide()
    }
  })
  .catch(function (error) {
    if (error.response) {
      $q.loading.hide()
      $q.notify({
        message: 'No se pudo contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    } else {
      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    }
  });

  /*await axios.get('https://pydolarve.org/api/v1/dollar?page=bcv')
  .then(function (response) {
    if(response.status == 200){
      bcvData.value=response.data
    }
  })
  .catch(function (error) {
    if (error.response) {
      $q.loading.hide()
      $q.notify({
        message: 'No se pudo contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    } else {
      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    }
  });

  await axios.get('https://pydolarve.org/api/v1/dollar?monitor=enparalelovzla')
  .then(function (response) {
    if(response.status==200){
        parallelData.value = response.data;
        $q.loading.hide()
      }
  })
  .catch(function (error) {
    if (error.response) {
      $q.loading.hide()
      $q.notify({
        message: 'No se pudo contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    } else {
      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido, por favor, presione "Actualizar"',
        color: 'negative',
        position: 'center',
      })
    }
  });*/

  promedioValue.value = ((bcvData.value.usd + parallelData.value.promedio)/2).toFixed(2);
  /*if (bcvData.value.monitors.usd.color == 'green' && parallelData.value.color == 'green')
      {
        colorPromedio.value = 'green';
        symbolPromedio.value = 'mdi-arrow-up';
      } else if (bcvData.value.monitors.usd.color == 'red' && parallelData.value.color == 'red'){
        colorPromedio.value = 'red';
        symbolPromedio.value = 'mdi-arrow-down'
      };*/

    //Data BCV
    consultHourBcv.value = parallelData.value.fechaActualizacion;
    OfficialValue.value = bcvData.value.usd.toFixed(2);
    OfficialEURvalue.value = bcvData.value.eur.toFixed(2);
    //colorBcv.value = bcvData.value.monitors.usd.color;
    /*switch (colorBcv.value) {
      case 'green':
        symbolBcv.value = 'mdi-arrow-up'
      break;
      case 'red':
        symbolBcv.value = 'mdi-arrow-down'
      break;
      case 'neutral':
        symbolBcv.value = 'mdi-minus'
      break;
    };*/

    //Data Paralelo
    consultHourParallel.value = parallelData.value.fechaActualizacion;
    ParallelValue.value = parallelData.value.promedio.toFixed(2);
    //colorParallel.value = parallelData.value.color;
    /*switch (colorParallel.value) {
      case 'green':
        symbolParallel.value = 'mdi-arrow-up'
      break;
      case 'red':
        symbolParallel.value = 'mdi-arrow-down'
      break;
      case 'neutral':
        symbolParallel.value = 'mdi-minus'
      break;
    };*/
      }
    }
  },
  async beforeMount() {
    showCharge();
  },
})
</script>
