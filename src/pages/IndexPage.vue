<template>
  <q-page class="hero-image font-color">
    <div class="q-pt-md row flex-center font-color">
      <q-btn outline rounded label="Actualizar" @click="showLoading()"/>
    </div>
    <div class="q-px-sm q-pb-xl">
      <q-expansion-item @click="returnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar style="font-size: 80px;">
              <img src="/BcvDolarPNG.png" >
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6>Oficial: {{ OfficialValue }} <q-icon :color=colorBcv :name="symbolBcv"/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section >
            <q-input
            class="col q-pb-xl"
            outlined
            v-model.trim="amountBcv"
            dense="dense"
            hint="Inserte valor $"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="returnBcvValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo" readonly>
                <template v-slot:prepend>
                  {{ resultBcv }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item @click="returnToZeroParallel()">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar style="font-size: 80px;">
              <img src="/monitorDolarPng.png" >
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6>Paralelo: {{ ParallelValue }} <q-icon :color=colorParallel :name='symbolParallel'/><br><div class="text-caption">{{ consultHourParallel }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input class="col q-pb-xl"
            outlined
            v-model.trim="amountParallel"
            dense="dense"
            hint="Inserte valor $"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="returnParallelValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo" readonly>
                <template v-slot:prepend>
                  {{ resultParallel }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
    <div class="q-pb-md q-pt-xl">
      <div class="row flex-center">RylovTech ©</div>
      <div class="row flex-center">2025 · Venezuela</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";
import axios from 'axios';
import { ref/*, watch */} from 'vue';

/*watch(amountBcv, async (newAmount, oldAmount) => {
  if (newAmount.includes(',')) {

    answer.value = 'Thinking...'
  }
})
;*/

const parallelData = [];
const bcvData = [];
const consultDate = ref('');
const consultHourBcv = ref('');
const consultHourParallel = ref('');
const OfficialValue = ref();
const ParallelValue = ref();
const amountBcv = ref();
const amountParallel = ref();
const resultBcv = ref();
const resultParallel = ref();
const colorBcv = ref('');
const colorParallel = ref('');
const changeBcv = ref();
const percentBcv = ref();
const changeParallel = ref();
const percentParallel = ref();
const symbolBcv = ref('');
const symbolParallel = ref('');

function returnBcvValue() {
  resultBcv.value = (OfficialValue.value * amountBcv.value).toFixed(2);
};

function returnParallelValue() {
  resultParallel.value = (ParallelValue.value * amountParallel.value).toFixed(2);
};

function returnToZeroBcv() {
  amountBcv.value = null;
  resultBcv.value = null;
};

function returnToZeroParallel() {
  amountParallel.value = null;
  resultParallel.value = null;
};

async function showCharge(){
  const $q = useQuasar()
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })

    $q.loading.show()

    await axios.get('https://pydolarve.org/api/v1/dollar?page=bcv').then(function (response) {
      bcvData.value=response.data
    })
    await axios.get('https://pydolarve.org/api/v1/dollar?monitor=enparalelovzla').then(function (response) {
      parallelData.value = response.data;
    })

    consultDate.value = bcvData.value.datetime.date;
    //Data BCV
      consultHourBcv.value = bcvData.value.monitors.usd.last_update;
      OfficialValue.value = bcvData.value.monitors.usd.price.toFixed(2);
      percentBcv.value = bcvData.value.monitors.usd.percent;
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
      percentParallel.value = parallelData.value.percent;
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

    // hiding in 3s
    timer = setTimeout(() => {
      $q.loading.hide()
      timer = void 0
    }, 1000)
}


export default defineComponent({
  name: 'IndexPage',
  components: {
  },

  setup() {

    const $q = useQuasar()
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })

    return {
      async showLoading () {
        $q.loading.show()

        await axios.get('https://pydolarve.org/api/v1/dollar?page=bcv').then(function (response) {
      bcvData.value=response.data
    })
    await axios.get('https://pydolarve.org/api/v1/dollar?monitor=enparalelovzla').then(function (response) {
      parallelData.value = response.data;
    })

    consultDate.value = bcvData.value.datetime.date;
    //Data BCV
      consultHourBcv.value = bcvData.value.monitors.usd.last_update;
      OfficialValue.value = bcvData.value.monitors.usd.price.toFixed(2);
      percentBcv.value = bcvData.value.monitors.usd.percent;
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
      percentParallel.value = parallelData.value.percent;
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

        // hiding in 2s
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 1000)
      },
      showCharge,
      returnToZeroBcv,
      returnToZeroParallel,
      returnBcvValue,
      returnParallelValue,
      consultDate,
      OfficialValue,
      ParallelValue,
      amountBcv,
      amountParallel,
      resultBcv,
      resultParallel,
      colorParallel,
      changeBcv,
      percentBcv,
      changeParallel,
      percentParallel,
      colorBcv,
      symbolParallel,
      symbolBcv,
      consultHourParallel,
      consultHourBcv
    }
  },
  async beforeMount() {
    showCharge();
  },
})
</script>
