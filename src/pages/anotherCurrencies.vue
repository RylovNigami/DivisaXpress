<template>
  <q-page class="hero-image font-color">
    <div class="q-pt-md q-pb-md row flex-center font-color">
      <q-btn outline rounded label="Actualizar" @click="showLoading()"/>
    </div>
    <div class="q-px-sm q-pb-xl">
      <q-expansion-item @click="EURreturnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar style="font-size: 80px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6>Euro (€): {{ EUROfficialBcv }} <q-icon :color=EURColorBcv :name="EURSymbolBcv"/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section >
            <q-input
            class="col q-pb-xl"
            outlined
            v-model.trim="EURAmountBcv"
            dense="dense"
            hint="Inserte valor € (EUR)"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:append>
                <div style="font-size:large;"> € </div >
              </template>
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="EURreturnBcvValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)" readonly>
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ EURResultBcv }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item @click="CNYreturnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar style="font-size: 80px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <h6>Yuan (¥): {{ CNYOfficialBcv }} <q-icon :color=CNYColorBcv :name='CNYSymbolBcv'/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input class="col q-pb-xl"
            outlined
            v-model.trim="CNYAmountBcv"
            dense="dense"
            hint="Inserte valor ¥ (CNY)"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:append>
                <div style="font-size:large;"> ¥ </div >
              </template>
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="CNYreturnBcvValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)" readonly>
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                {{ CNYResultBcv }}
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item @click="RUBreturnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar style="font-size: 80px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6>Rublo (₽): {{ RUBOfficialBcv }} <q-icon :color=RUBColorBcv :name='RUBSymbolBcv'/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input class="col q-pb-xl"
            outlined
            v-model.trim="RUBAmountBcv"
            dense="dense"
            hint="Inserte valor ₽ (RUB)"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:append>
                <div style="font-size:large;"> ₽ </div >
              </template>
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="RUBreturnBcvValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)" readonly>
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ RUBResultBcv }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item @click="TRYreturnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar style="font-size: 80px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6>Lira (₺): {{ TRYOfficialBcv }} <q-icon :color=TRYColorBcv :name='TRYSymbolBcv'/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input class="col q-pb-xl"
            outlined
            v-model.trim="TRYAmountBcv"
            dense="dense"
            hint="Inserte valor ₺ (TRY)"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:append>
                <div style="font-size:large;"> ₺ </div >
              </template>
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="TRYreturnBcvValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)" readonly>
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ TRYResultBcv }}
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
import { defineComponent, ref } from 'vue';
import { useQuasar } from "quasar";
import axios from 'axios';

const bcvData = [];
const consultHourBcv = ref('');
const EUROfficialBcv = ref();
const EURAmountBcv = ref();
const EURResultBcv = ref();
const EURColorBcv = ref();
const EURSymbolBcv = ref();
const CNYOfficialBcv = ref();
const CNYAmountBcv = ref();
const CNYResultBcv = ref();
const CNYColorBcv = ref();
const CNYSymbolBcv = ref();
const RUBOfficialBcv = ref();
const RUBAmountBcv = ref();
const RUBResultBcv = ref();
const RUBColorBcv = ref();
const RUBSymbolBcv = ref();
const TRYOfficialBcv = ref();
const TRYAmountBcv = ref();
const TRYResultBcv = ref();
const TRYColorBcv = ref();
const TRYSymbolBcv = ref();


function EURreturnBcvValue() {
  if (EURAmountBcv.value.includes(",") === true)
  {
    EURAmountBcv.value = EURAmountBcv.value.replace(",",".")
  }
  EURResultBcv.value = (EUROfficialBcv.value * EURAmountBcv.value).toFixed(2);
};

function CNYreturnBcvValue() {
  if (CNYAmountBcv.value.includes(",") === true)
  {
    CNYAmountBcv.value = CNYAmountBcv.value.replace(",",".")
  }
  CNYResultBcv.value = (CNYOfficialBcv.value * CNYAmountBcv.value).toFixed(2);
};

function RUBreturnBcvValue() {
  if (RUBAmountBcv.value.includes(",") === true)
  {
    RUBAmountBcv.value = RUBAmountBcv.value.replace(",",".")
  }
  RUBResultBcv.value = (RUBOfficialBcv.value * RUBAmountBcv.value).toFixed(2);
};

function TRYreturnBcvValue() {
  if (TRYAmountBcv.value.includes(",") === true)
  {
    TRYAmountBcv.value = TRYAmountBcv.value.replace(",",".")
  }
  TRYResultBcv.value = (TRYOfficialBcv.value * TRYAmountBcv.value).toFixed(2);
};


function EURreturnToZeroBcv() {
  EURAmountBcv.value = null;
  EURResultBcv.value = null;
};

function CNYreturnToZeroBcv() {
  CNYAmountBcv.value = null;
  CNYResultBcv.value = null;
};

function RUBreturnToZeroBcv() {
  RUBAmountBcv.value = null;
  RUBResultBcv.value = null;
};

function TRYreturnToZeroBcv() {
  TRYAmountBcv.value = null;
  TRYResultBcv.value = null;
};


async function showCharge(){
  const $q = useQuasar()

    $q.loading.show()

    await axios.get('https://pydolarve.org/api/v1/dollar?page=bcv')
    .then(function (response) {
      if(response.status == 200){
        bcvData.value=response.data
        $q.loading.hide()
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

  //Data BCV
  consultHourBcv.value = bcvData.value.monitors.usd.last_update;

  //Data Euro
  EUROfficialBcv.value = bcvData.value.monitors.eur.price.toFixed(2);
  EURColorBcv.value = bcvData.value.monitors.eur.color;
  switch (EURColorBcv.value) {
    case 'green':
      EURSymbolBcv.value = 'mdi-arrow-up'
    break;
    case 'red':
      EURSymbolBcv.value = 'mdi-arrow-down'
    break;
    case 'neutral':
      EURSymbolBcv.value = 'mdi-minus'
    break;
  };

  //Data Yuan Chino
  CNYOfficialBcv.value = bcvData.value.monitors.cny.price.toFixed(2);
  CNYColorBcv.value = bcvData.value.monitors.cny.color;
  switch (CNYColorBcv.value) {
    case 'green':
      CNYSymbolBcv.value = 'mdi-arrow-up'
    break;
    case 'red':
      CNYSymbolBcv.value = 'mdi-arrow-down'
    break;
    case 'neutral':
      CNYSymbolBcv.value = 'mdi-minus'
    break;
  };

  //Data Lira Turca
  TRYOfficialBcv.value = bcvData.value.monitors.try.price.toFixed(2);
  TRYColorBcv.value = bcvData.value.monitors.try.color;
  switch (TRYColorBcv.value) {
    case 'green':
      TRYSymbolBcv.value = 'mdi-arrow-up'
    break;
    case 'red':
      TRYSymbolBcv.value = 'mdi-arrow-down'
    break;
    case 'neutral':
      TRYSymbolBcv.value = 'mdi-minus'
    break;
  };

  //Data Rublo Ruso
  RUBOfficialBcv.value = bcvData.value.monitors.rub.price.toFixed(2);
  RUBColorBcv.value = bcvData.value.monitors.rub.color;
  switch (RUBColorBcv.value) {
    case 'green':
      RUBSymbolBcv.value = 'mdi-arrow-up'
    break;
    case 'red':
      RUBSymbolBcv.value = 'mdi-arrow-down'
    break;
    case 'neutral':
      RUBSymbolBcv.value = 'mdi-minus'
    break;
  };
}


export default defineComponent({
  name: "anotherCurrencies, App",
  setup() {
    const $q = useQuasar()

    return {
      showCharge,
      EURreturnBcvValue,
      CNYreturnBcvValue,
      RUBreturnBcvValue,
      TRYreturnBcvValue,
      EURreturnToZeroBcv,
      CNYreturnToZeroBcv,
      RUBreturnToZeroBcv,
      TRYreturnToZeroBcv,
      consultHourBcv,
      EUROfficialBcv,
      EURAmountBcv,
      EURResultBcv,
      EURColorBcv,
      EURSymbolBcv,
      CNYOfficialBcv,
      CNYAmountBcv,
      CNYResultBcv,
      CNYColorBcv,
      CNYSymbolBcv,
      RUBOfficialBcv,
      RUBAmountBcv,
      RUBResultBcv,
      RUBColorBcv,
      RUBSymbolBcv,
      TRYOfficialBcv,
      TRYAmountBcv,
      TRYResultBcv,
      TRYColorBcv,
      TRYSymbolBcv,
      async showLoading () {

        EURAmountBcv.value = null;
        EURResultBcv.value = null;

        CNYAmountBcv.value = null;
        CNYResultBcv.value = null;

        RUBAmountBcv.value = null;
        RUBResultBcv.value = null;

        TRYAmountBcv.value = null;
        TRYResultBcv.value = null;

        $q.loading.show()

        await axios.get('https://pydolarve.org/api/v1/dollar?page=bcv')
        .then(function (response) {
          if(response.status == 200){
            bcvData.value=response.data
            $q.loading.hide()
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

        //Data BCV
        consultHourBcv.value = bcvData.value.monitors.usd.last_update;

        //Data Euro
        EUROfficialBcv.value = bcvData.value.monitors.eur.price.toFixed(2);
        EURColorBcv.value = bcvData.value.monitors.eur.color;
        switch (EURColorBcv.value) {
          case 'green':
            EURSymbolBcv.value = 'mdi-arrow-up'
          break;
          case 'red':
            EURSymbolBcv.value = 'mdi-arrow-down'
          break;
          case 'neutral':
            EURSymbolBcv.value = 'mdi-minus'
          break;
        };

        //Data Yuan Chino
        CNYOfficialBcv.value = bcvData.value.monitors.cny.price.toFixed(2);
        CNYColorBcv.value = bcvData.value.monitors.cny.color;
        switch (CNYColorBcv.value) {
          case 'green':
            CNYSymbolBcv.value = 'mdi-arrow-up'
          break;
          case 'red':
            CNYSymbolBcv.value = 'mdi-arrow-down'
          break;
          case 'neutral':
            CNYSymbolBcv.value = 'mdi-minus'
          break;
        };

        //Data Lira Turca
        TRYOfficialBcv.value = bcvData.value.monitors.try.price.toFixed(2);
        TRYColorBcv.value = bcvData.value.monitors.try.color;
        switch (TRYColorBcv.value) {
          case 'green':
            TRYSymbolBcv.value = 'mdi-arrow-up'
          break;
          case 'red':
            TRYSymbolBcv.value = 'mdi-arrow-down'
          break;
          case 'neutral':
            TRYSymbolBcv.value = 'mdi-minus'
          break;
        };

        //Data Rublo Ruso
        RUBOfficialBcv.value = bcvData.value.monitors.rub.price.toFixed(2);
        RUBColorBcv.value = bcvData.value.monitors.rub.color;
        switch (RUBColorBcv.value) {
          case 'green':
            RUBSymbolBcv.value = 'mdi-arrow-up'
          break;
          case 'red':
            RUBSymbolBcv.value = 'mdi-arrow-down'
          break;
          case 'neutral':
            RUBSymbolBcv.value = 'mdi-minus'
          break;
        };
      }
    }
  },
  async beforeMount() {
  showCharge();
  },
});
</script>
