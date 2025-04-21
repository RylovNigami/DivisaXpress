<template>
    <div class="q-pt-md q-pb-md row flex-center font-color">
      <q-btn outline rounded label="Actualizar" @click="showLoading()"/>
    </div>
    <div>
      <q-input
        class="col q-pb-xl q-px-md q-pt-md"
        outlined
        v-model.trim="amountBcv"
        dense="dense"
        hint="Inserte valor en Bs."
        inputmode="numeric"
        type="tel"
      >
        <template v-slot:append>
          <div style="font-size:large;"> Bs. </div >
        </template>
        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="returnValues()"/>
        </template>
      </q-input>
    </div>

    <div class="q-pt-md q-pb-md row font-color">

      <div class="row justify-center q-ml-md q-pb-xl">
          <q-avatar style="font-size: 30px;" class="q-ma-xs">
            <img src="/BcvDolarPNG.png">
          </q-avatar>
          <h6 class="row justify-center q-mt-none q-mb-none">Oficial ($):</h6>
          <q-input class="col q-pr-md q-pl-sm" outlined dense :hint="BcvHint" readonly>
            <template v-slot:append>
              <div style="font-size:large;"> $ </div >
            </template>
            <template v-slot:prepend>
              <div class="">{{ resultBcv }}</div>
              </template>
          </q-input>
          <br>
      </div>

      <div class="row justify-center q-ml-md q-pb-xl">
        <q-avatar style="font-size: 30px;" class="q-ma-xs">
          <img src="/monitorDolarPng.png">
        </q-avatar>
        <h6 class="row justify-center q-mt-none q-mb-none">Paralelo ($):</h6>
        <q-input class="col q-pr-md q-pl-sm" outlined dense :hint="ParallelHint" readonly>
          <template v-slot:append>
            <div style="font-size:large;"> $ </div >
          </template>
          <template v-slot:prepend>
            <div class="">{{ resultParallel }}</div>
            </template>
        </q-input>
      </div>

      <div class="row justify-center q-ml-md q-pb-xl">
        <q-avatar style="font-size: 30px;" class="q-ma-xs">
          <img src="/promedio.png">
        </q-avatar>
        <h6 class="row justify-center q-mt-none q-mb-none">Promedio ($):</h6>
        <q-input class="col q-pr-md q-pl-sm" outlined dense :hint=PromedioHint readonly>
          <template v-slot:append>
            <div style="font-size:large;"> $ </div >
          </template>
          <template v-slot:prepend>
            <div class="">{{ resultPromedio }}</div>
            </template>
        </q-input>
      </div>

      <div class="row justify-center q-ml-md q-pb-xl">
          <q-avatar style="font-size: 30px;" class="q-ma-xs">
            <img src="/BcvDolarPNG.png">
          </q-avatar>
          <h6 class="row justify-center q-mt-none q-mb-none">Oficial (€):</h6>
          <q-input class="col q-pr-md q-pl-sm" outlined dense :hint="BcvHintEuro" readonly>
            <template v-slot:append>
              <div style="font-size:large;"> € </div >
            </template>
            <template v-slot:prepend>
              <div class="">{{ resultEuroBcv }}</div>
              </template>
          </q-input>
          <br>
      </div>
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
const resultBcv = ref();
const resultParallel = ref();
const resultPromedio = ref();
const BcvHint = ref('');
const BcvHintEuro = ref('');
const OfficialEuroValue = ref();
const resultEuroBcv = ref();
const ParallelHint = ref('');
const PromedioHint = ref('');


function returnValues() {
  if (amountBcv.value.includes(",") === true)
  {
    amountBcv.value = amountBcv.value.replace(",",".")
  }
  resultBcv.value = (amountBcv.value / OfficialValue.value).toFixed(3);
  resultParallel.value = (amountBcv.value / ParallelValue.value).toFixed(3);
  resultPromedio.value = (amountBcv.value / promedioValue.value).toFixed(3);
  resultEuroBcv.value = (amountBcv.value / OfficialEuroValue.value).toFixed(3);
};

async function showCharge(){
  const $q = useQuasar();

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
    OfficialEuroValue.value = bcvData.value.monitors.eur.price.toFixed(2);

    //Data Paralelo
    consultHourParallel.value = parallelData.value.last_update;
    ParallelValue.value = parallelData.value.price.toFixed(2);

    BcvHint.value = 'Calculo a: '+ OfficialValue.value;
    ParallelHint.value = 'Calculo a: '+ ParallelValue.value;
    PromedioHint.value = 'Calculo a: '+ promedioValue.value;
    BcvHintEuro.value = 'Calculo a: ' + OfficialEuroValue.value;
}


export default defineComponent({
  name: 'ComparativeFinanceComponent, App',

  setup() {
    const $q = useQuasar();

    return {
      BcvHint,
      ParallelHint,
      PromedioHint,
      resultPromedio,
      promedioValue,
      showCharge,
      returnValues,
      OfficialValue,
      ParallelValue,
      amountBcv,
      resultBcv,
      resultParallel,
      consultHourParallel,
      consultHourBcv,
      BcvHintEuro,
      resultEuroBcv,
      OfficialEuroValue,
      async showLoading () {
        amountBcv.value = null;
        resultBcv.value = null;
        resultParallel.value = null;
        resultPromedio.value = null;
        resultEuroBcv.value = null;

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
    OfficialEuroValue.value = bcvData.value.monitors.eur.price.toFixed(2);

    //Data Paralelo
    consultHourParallel.value = parallelData.value.last_update;
    ParallelValue.value = parallelData.value.price.toFixed(2);

    BcvHint.value = 'Calculo a: '+ OfficialValue.value;
    ParallelHint.value = 'Calculo a: '+ ParallelValue.value;
    PromedioHint.value = 'Calculo a: '+ promedioValue.value;
    BcvHintEuro.value = 'calculo a: ' + OfficialEuroValue.value;
      }
    }
  },
  async beforeMount() {
    showCharge();
  },
})
</script>
