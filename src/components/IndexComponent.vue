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
              <img src="/monitorDolarPng.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Paralelo ($): {{ ParallelValue }} <q-icon :color=colorParallel :name='symbolParallel'/><br><div class="text-caption">{{ consultHourParallel }}</div></h6>
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
const colorPromedio = ref('');
const symbolPromedio = ref('');

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
    }
  })
  .catch(function (error) {
    if (error.response) {
      $q.loading.hide()
      $q.notify({
        message: 'No se puso contactar con el servidor',
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
        message: 'No se puso contactar con el servidor',
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

  promedioValue.value = ((bcvData.value.monitors.usd.price + parallelData.value.price)/2).toFixed(2);
  if (bcvData.value.monitors.usd.color == 'green' && parallelData.value.color == 'green')
      {
        colorPromedio.value = 'green';
        symbolPromedio.value = 'mdi-arrow-up';
      } else if (bcvData.value.monitors.usd.color == 'red' && parallelData.value.color == 'red'){
        colorPromedio.value = 'red';
        symbolPromedio.value = 'mdi-arrow-down'
      };

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
      colorPromedio,
      symbolPromedio,
      returnBcvValue() {
        if (amountBcv.value.includes(",") === true)
        {
          amountBcv.value = amountBcv.value.replace(",",".")
        };

        if(OfficialValue.value == undefined || OfficialValue.value == null){
          $q.notify({
              message: 'Error al calcular, por favor, presione "Actualizar"',
              color: 'negative',
              position: 'center',
            })
        } else{
          resultBcv.value = (OfficialValue.value * amountBcv.value).toFixed(2);
        };
      },
      returnParallelValue() {
        if (amountParallel.value.includes(",") === true)
        {
          amountParallel.value = amountParallel.value.replace(",",".")
        };

        if(ParallelValue.value == undefined || ParallelValue.value == null){
          $q.notify({
              message: 'Error al calcular, por favor, presione "Actualizar"',
              color: 'negative',
              position: 'center',
            })
        } else{
          resultParallel.value = (ParallelValue.value * amountParallel.value).toFixed(2);
        };
      },
      returnPromedioValue() {
        if (amountPromedio.value.includes(",") === true)
        {
          amountPromedio.value = amountPromedio.value.replace(",",".")
        };

        if(promedioValue.value == undefined || promedioValue.value == null){
          $q.notify({
              message: 'Error al calcular, por favor, presione "Actualizar"',
              color: 'negative',
              position: 'center',
            })
        } else{
          resultPromedio.value = (promedioValue.value * amountPromedio.value).toFixed(2);
        };
      },
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
          }
        })
        .catch(function (error) {
        if (error.response) {
          $q.loading.hide()
          $q.notify({
            message: 'No se puso contactar con el servidor',
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
            message: 'No se puso contactar con el servidor',
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

      promedioValue.value = ((bcvData.value.monitors.usd.price + parallelData.value.price)/2).toFixed(2);
      if (bcvData.value.monitors.usd.color == 'green' && parallelData.value.color == 'green')
      {
        colorPromedio.value = 'green';
        symbolPromedio.value = 'mdi-arrow-up';
      } else if (bcvData.value.monitors.usd.color == 'red' && parallelData.value.color == 'red'){
        colorPromedio.value = 'red';
        symbolPromedio.value = 'mdi-arrow-down'
      };

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
