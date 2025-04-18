<template>
  <q-page class="hero-image font-color">
    <div class="q-pt-md q-pb-md row flex-center font-color">
      <q-btn outline rounded label="Actualizar" @click="showLoading()"/>
    </div>
      <q-input
        class="col q-pb-xl q-px-md"
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

    <div class="q-pt-md q-pb-md row justify-center font-color">
        <div class="row justify-center q-ml-md">
          <q-avatar style="font-size: 30px;" class="q-ma-xs">
            <img src="/BcvDolarPNG.png">
          </q-avatar>
          <h6 class="row justify-center q-mt-none">Oficial: {{ OfficialValue }}</h6>
          <q-input class="col q-px-md" outlined dense="dense" readonly>
            <template v-slot:append>
              <div style="font-size:large;"> $ </div >
            </template>
            <template v-slot:prepend>
                {{ resultBcv }}
              </template>
          </q-input>
      </div>

        <div class="row justify-center q-ml-md">
          <q-avatar style="font-size: 30px;" class="q-ma-xs">
            <img src="/monitorDolarPng.png">
          </q-avatar>
          <h6 class="row justify-center q-mt-none">Paralelo: {{ ParallelValue }} </h6>
          <q-input class="col q-px-md" outlined dense="dense" readonly>
            <template v-slot:append>
              <div style="font-size:large;"> $ </div >
            </template>
            <template v-slot:prepend>
                {{ resultParallel }}
              </template>
          </q-input>
      </div>

        <div class="row justify-center q-ml-md">
          <q-avatar style="font-size: 30px;" class="q-ma-xs">
            <img src="/promedio.png">
          </q-avatar>
          <h6 class="row justify-center q-mt-none">promedio: {{ promedioValue }} </h6>
          <q-input class="col q-px-md" outlined dense="dense" readonly>
            <template v-slot:append>
              <div style="font-size:large;"> $ </div >
            </template>
            <template v-slot:prepend>
                {{ resultPromedio }}
              </template>
          </q-input>
        </div>

    </div>

    <div class="q-pb-md q-pt-xl">
      <div class="row flex-center">RylovTech ©</div>
      <div class="row flex-center">2025 · Venezuela</div>
    </div>
  </q-page>
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

function returnValues() {
  if (amountBcv.value.includes(",") === true)
  {
    amountBcv.value = amountBcv.value.replace(",",".")
  }
  resultBcv.value = (amountBcv.value / OfficialValue.value).toFixed(3);
  resultParallel.value = (amountBcv.value / ParallelValue.value).toFixed(3);
  resultPromedio.value = (amountBcv.value / promedioValue.value).toFixed(3);
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

    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      // and an instance of http.ClientRequest in node.js
      console.log(error.request.status);

      $q.loading.hide()

    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);

      $q.loading.hide()

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
      $q.dialog({
        dark: true,
        title: 'Error al consultar datos',
        message: '¿Actualizar?',
        ok: {
          push: true,
          color:'positive'
        },
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        showCharge();
      })

    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      // and an instance of http.ClientRequest in node.js
      console.log(error.request.status);

      $q.loading.hide()
      $q.dialog({
        dark: true,
        title: 'Error al consultar datos',
        message: '¿Actualizar?',
        ok: {
          push: true,
          color:'positive'
        },
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        showCharge();
      })


    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);

      $q.loading.hide()
      $q.dialog({
        dark: true,
        title: 'Error al consultar datos',
        message: '¿Actualizar?',
        ok: {
          push: true,
          color:'positive'
        },
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        showCharge();
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
  name: 'IndexPage',
  components: {
  },

  setup() {
    const $q = useQuasar();

    return {
      resultPromedio,
      amountPromedio,
      promedioValue,
      showCharge,
      returnValues,
      OfficialValue,
      ParallelValue,
      amountBcv,
      amountParallel,
      resultBcv,
      resultParallel,
      consultHourParallel,
      consultHourBcv,
      async showLoading () {
        amountBcv.value = null;
        resultBcv.value = null;
        resultParallel.value = null;
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


          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            // and an instance of http.ClientRequest in node.js
            console.log(error.request.status);

            $q.loading.hide()


          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);

            $q.loading.hide()

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
            $q.dialog({
              dark: true,
              title: 'Error al consultar datos',
              message: '¿Actualizar?',
              ok: {
                push: true,
                color:'positive'
              },
              persistent: true
            }).onOk(() => {
              // console.log('>>>> OK')
              showCharge();
            })

          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            // and an instance of http.ClientRequest in node.js
            console.log(error.request.status);

            $q.loading.hide()
            $q.dialog({
              dark: true,
              title: 'Error al consultar datos',
              message: '¿Actualizar?',
              ok: {
                push: true,
                color:'positive'
              },
              persistent: true
            }).onOk(() => {
              // console.log('>>>> OK')
              showCharge();
            })

          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);

            $q.loading.hide()
            $q.dialog({
              dark: true,
              title: 'Error al consultar datos',
              message: '¿Actualizar?',
              ok: {
                push: true,
                color:'positive'
              },
              persistent: true
            }).onOk(() => {
              // console.log('>>>> OK')
              showCharge();
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
