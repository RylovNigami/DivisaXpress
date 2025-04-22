<template>
    <div class="q-pt-md row flex-center font-color">
      <q-btn outline rounded label="Actualizar" @click="showLoading()"/>
    </div>
    <div class="">
      <q-expansion-item @click="EURreturnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Euro (€): {{ EUROfficialBcv }} <q-icon :color=EURColorBcv :name="EURSymbolBcv"/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
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
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Yuan (¥): {{ CNYOfficialBcv }} <q-icon :color=CNYColorBcv :name='CNYSymbolBcv'/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
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
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Rublo (₽): {{ RUBOfficialBcv }} <q-icon :color=RUBColorBcv :name='RUBSymbolBcv'/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
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
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Lira (₺): {{ TRYOfficialBcv }} <q-icon :color=TRYColorBcv :name='TRYSymbolBcv'/><br><div class="text-caption">{{ consultHourBcv }}</div></h6>
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
  name: "AnotherCurrenciesComponent, App",
  setup() {
    const $q = useQuasar()

    return {
      showCharge,
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
      EURreturnBcvValue() {
        if (EURAmountBcv.value.includes(",") === true)
        {
          EURAmountBcv.value = EURAmountBcv.value.replace(",",".")
        };

        if(EUROfficialBcv.value == undefined || EUROfficialBcv.value == null){
          $q.notify({
              message: 'Error al calcular, por favor, presione "Actualizar"',
              color: 'negative',
              position: 'center',
            })
        } else{
          EURResultBcv.value = (EUROfficialBcv.value * EURAmountBcv.value).toFixed(2);
        };
      },
      CNYreturnBcvValue() {
        if (CNYAmountBcv.value.includes(",") === true)
        {
          CNYAmountBcv.value = CNYAmountBcv.value.replace(",",".")
        };

        if(CNYOfficialBcv.value == undefined || CNYOfficialBcv.value == null){
          $q.notify({
              message: 'Error al calcular, por favor, presione "Actualizar"',
              color: 'negative',
              position: 'center',
            })
        } else{
          CNYResultBcv.value = (CNYOfficialBcv.value * CNYAmountBcv.value).toFixed(2);
        };
      },
      RUBreturnBcvValue() {
        if (RUBAmountBcv.value.includes(",") === true)
        {
          RUBAmountBcv.value = RUBAmountBcv.value.replace(",",".")
        };

        if(RUBOfficialBcv.value == undefined || RUBOfficialBcv.value == null){
          $q.notify({
              message: 'Error al calcular, por favor, presione "Actualizar"',
              color: 'negative',
              position: 'center',
            })
        } else{
          RUBResultBcv.value = (RUBOfficialBcv.value * RUBAmountBcv.value).toFixed(2);
        };
      },
      TRYreturnBcvValue() {
        if (TRYAmountBcv.value.includes(",") === true)
        {
          TRYAmountBcv.value = TRYAmountBcv.value.replace(",",".")
        };

        if(TRYOfficialBcv.value == undefined || TRYOfficialBcv.value == null){
          $q.notify({
              message: 'Error al calcular, por favor, presione "Actualizar"',
              color: 'negative',
              position: 'center',
            })
        } else{
          TRYResultBcv.value = (TRYOfficialBcv.value * TRYAmountBcv.value).toFixed(2);
        };
      },
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
