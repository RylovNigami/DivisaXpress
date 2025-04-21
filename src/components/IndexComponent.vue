<template>
    <div class="q-pt-md row flex-center font-color">
      <q-btn outline rounded label="Actualizar" @click="showLoading()"/>
    </div>
    <div>
      <q-expansion-item @click="returnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6>Oficial ($): {{ OfficialValue }} <q-icon :color=colorBcv :name="symbolBcv"/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section >
            <q-input
            class="col q-pb-xl"
            outlined
            v-model.trim="amountBcv"
            dense="dense"
            hint="Inserte valor $ (USD)"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:append>
                <div style="font-size:large;"> $ </div >
              </template>
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="returnBcvValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)" readonly>
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ resultBcv }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item @click="returnToZeroParallel()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="monitorDolarPng.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <h6>Paralelo ($): {{ ParallelValue }} <q-icon :color=colorParallel :name='symbolParallel'/><br><div class="text-caption">{{ consultHourParallel }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input class="col q-pb-xl"
            outlined
            v-model.trim="amountParallel"
            dense="dense"
            hint="Inserte valor $ (USD)"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:append>
                <div style="font-size:large;"> $ </div >
              </template>
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="returnParallelValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)" readonly>
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                {{ resultParallel }}
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item @click="returnToZeroPromedio()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="promedio.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6>Promedio ($): {{ promedioValue }} <br><div class="text-caption">{{ consultHourParallel }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input class="col q-pb-xl"
            outlined
            v-model.trim="amountPromedio"
            dense="dense"
            hint="Inserte valor $ (USD)"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:append>
                <div style="font-size:large;"> $ </div >
              </template>
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="returnPromedioValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)" readonly>
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ resultPromedio }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from "quasar";
import axios from 'axios';

const parallelData = [];
const bcvData = [];
const consultHourBcv = ref('');
const consultHourParallel = ref('');
const OfficialValue = ref();
const ParallelValue = ref();
const promedioValue = ref();
const amountBcv = ref();
const amountParallel = ref();
const amountPromedio = ref();
const resultBcv = ref();
const resultParallel = ref();
const resultPromedio = ref();
const colorBcv = ref('');
const colorParallel = ref('');
const symbolBcv = ref('');
const symbolParallel = ref('');

function returnBcvValue() {
  if (amountBcv.value.includes(",") === true)
  {
    amountBcv.value = amountBcv.value.replace(",",".")
  }
  resultBcv.value = (OfficialValue.value * amountBcv.value).toFixed(2);
};

function returnParallelValue() {
  if (amountParallel.value.includes(",") === true)
  {
    amountParallel.value = amountParallel.value.replace(",",".")
  }
  resultParallel.value = (ParallelValue.value * amountParallel.value).toFixed(2);
};

function returnPromedioValue() {
  if (amountPromedio.value.includes(",") === true)
  {
    amountPromedio.value = amountPromedio.value.replace(",",".")
  }
  resultPromedio.value = (promedioValue.value * amountPromedio.value).toFixed(2);
};

function returnToZeroBcv() {
  amountBcv.value = null;
  resultBcv.value = null;
};

function returnToZeroParallel() {
  amountParallel.value = null;
  resultParallel.value = null;
};

function returnToZeroPromedio() {
  amountPromedio.value = null;
  resultPromedio.value = null;
};

async function showCharge(){
  const $q = useQuasar()

  $q.loading.show()

  await axios.get('https://pydolarve.org/api/v1/dollar?page=bcv')
  .then(function (response) {
    if(response.status == 200){
      bcvData.value=response.data
      console.log("Status de consulta bcv",response.status);
    }
  })
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      $q.loading.hide()
      $q.notify({
        message: 'No se puso contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      // and an instance of http.ClientRequest in node.js
      console.log(error.request.status);

      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión',
        color: 'negative',
        position: 'center',
      })
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);

      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido',
        color: 'negative',
        position: 'center',
      })
    }
  });

  await axios.get('https://pydolarve.org/api/v1/dollar?monitor=enparalelovzla')
  .then(function (response) {
    if(response.status==200){
        parallelData.value = response.data;
        console.log("Status de consulta paralelo",response.status)
        $q.loading.hide()
      }
  })
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      $q.loading.hide()
      $q.notify({
        message: 'No se puso contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      // and an instance of http.ClientRequest in node.js
      console.log(error.request.status);

      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión',
        color: 'negative',
        position: 'center',
      })
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);

      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido',
        color: 'negative',
        position: 'center',
      })
    }
  });

    promedioValue.value = ((bcvData.value.monitors.usd.price + parallelData.value.price)/2).toFixed(2);
    console.log(promedioValue.value)

    //Data BCV
    consultHourBcv.value = bcvData.value.monitors.usd.last_update;
    OfficialValue.value = bcvData.value.monitors.usd.price.toFixed(2);
    colorBcv.value = bcvData.value.monitors.usd.color;
    switch (colorBcv.value) {
      case 'green':
        symbolBcv.value = 'mdi-arrow-up'
      break;
      case 'red':
        symbolBcv.value = 'mdi-arrow-down'
      break;
      case 'neutral':
        symbolBcv.value = 'mdi-minus'
      break;
    };

    //Data Paralelo
    consultHourParallel.value = parallelData.value.last_update;
    ParallelValue.value = parallelData.value.price.toFixed(2);
    colorParallel.value = parallelData.value.color;
    switch (colorParallel.value) {
      case 'green':
        symbolParallel.value = 'mdi-arrow-up'
      break;
      case 'red':
        symbolParallel.value = 'mdi-arrow-down'
      break;
      case 'neutral':
        symbolParallel.value = 'mdi-minus'
      break;
    };
}


export default defineComponent({
  name: 'IndexComponent, App',
  setup() {
    const $q = useQuasar();

    return {
      tab: ref('$ a Bs.'),
      resultPromedio,
      amountPromedio,
      promedioValue,
      showCharge,
      returnToZeroBcv,
      returnToZeroParallel,
      returnToZeroPromedio,
      returnBcvValue,
      returnParallelValue,
      returnPromedioValue,
      OfficialValue,
      ParallelValue,
      amountBcv,
      amountParallel,
      resultBcv,
      resultParallel,
      colorParallel,
      colorBcv,
      symbolParallel,
      symbolBcv,
      consultHourParallel,
      consultHourBcv,
      async showLoading () {
        amountBcv.value = null;
        resultBcv.value = null;

        amountParallel.value = null;
        resultParallel.value = null;

        amountPromedio.value = null;
        resultPromedio.value = null;
        $q.loading.show()

        await axios.get('https://pydolarve.org/api/v1/dollar?page=bcv')
        .then(function (response) {
          if(response.status == 200){
            bcvData.value=response.data;
            console.log("Status de consulta bcv",response.status);
          }
        })
        .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      $q.loading.hide()
      $q.notify({
        message: 'No se puso contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      // and an instance of http.ClientRequest in node.js
      console.log(error.request.status);

      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión',
        color: 'negative',
        position: 'center',
      })
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);

      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido',
        color: 'negative',
        position: 'center',
      })
    }
  });
        await axios.get('https://pydolarve.org/api/v1/dollar?monitor=enparalelovzla')
        .then(function (response) {
          if(response.status==200){
            parallelData.value = response.data;
            console.log("Status de consulta paralelo",response.status)
            $q.loading.hide()
          }
        })
        .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      $q.loading.hide()
      $q.notify({
        message: 'No se puso contactar con el servidor',
        color: 'negative',
        position: 'center',
      })

    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      // and an instance of http.ClientRequest in node.js
      console.log(error.request.status);

      $q.loading.hide()
      $q.notify({
        message: 'Error de conexión',
        color: 'negative',
        position: 'center',
      })
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);

      $q.loading.hide()
      $q.notify({
        message: 'Error desconocido',
        color: 'negative',
        position: 'center',
      })
    }
  });

        promedioValue.value = ((bcvData.value.monitors.usd.price + parallelData.value.price)/2).toFixed(2);
        console.log(promedioValue.value)

        //Data BCV
        consultHourBcv.value = bcvData.value.monitors.usd.last_update;
        OfficialValue.value = bcvData.value.monitors.usd.price.toFixed(2);
        colorBcv.value = bcvData.value.monitors.usd.color;
        switch (colorBcv.value) {
          case 'green':
            symbolBcv.value = 'mdi-arrow-up'
          break;
          case 'red':
            symbolBcv.value = 'mdi-arrow-down'
          break;
          case 'neutral':
            symbolBcv.value = 'mdi-minus'
          break;
        };

        //Data Paralelo
        consultHourParallel.value = parallelData.value.last_update;
        ParallelValue.value = parallelData.value.price.toFixed(2);
        colorParallel.value = parallelData.value.color;
        switch (colorParallel.value) {
          case 'green':
            symbolParallel.value = 'mdi-arrow-up'
          break;
          case 'red':
            symbolParallel.value = 'mdi-arrow-down'
          break;
          case 'neutral':
            symbolParallel.value = 'mdi-minus'
          break;
        };
      }
    }
  },
  async beforeMount() {
    showCharge();
  },
})
</script>
