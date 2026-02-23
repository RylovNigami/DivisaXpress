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
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              @focus="BcvAmountEUR = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> € </div >
              </template>
              <template v-slot:prepend>
                  {{ computedBsToEur }}
                </template>
            </q-input>
            <q-input
              class="col"
              outlined
              v-model.trim="BcvAmountEUR"
              dense="dense"
              hint="Calculo (Bs.)"
              inputmode="numeric"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              @focus="EURAmountBcv = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
                <template v-slot:prepend>
                  {{ computedEurToBs }}
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
            inputmode="decimal"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            @focus="BcvAmountCNY = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> ¥ </div >
              </template>
              <template v-slot:prepend>
                {{ computedBsToCNY }}
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)"
            v-model.trim="BcvAmountCNY"
            inputmode="decimal"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            @focus="CNYAmountBcv = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                {{ computedCNYtoBs }}
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
            inputmode="decimal"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            @focus="BcvAmountRUB = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> ₽ </div >
              </template>
              <template v-slot:prepend>
                {{ computedBsToRUB }}
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)"
            v-model.trim="BcvAmountRUB"
            inputmode="decimal"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            @focus="RUBAmountBcv = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ computedRUBtoBs }}
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
            inputmode="decimal"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            @focus="BcvAmountTRY = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> ₺ </div >
              </template>
              <template v-slot:prepend>
                {{ computedBsToTRY }}
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo (Bs.)"
            v-model.trim="BcvAmountTRY"
            inputmode="decimal"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            @focus="TRYAmountBcv = null"
            >
              <template v-slot:append>
                <div style="font-size:large;"> Bs. </div >
              </template>
              <template v-slot:prepend>
                  {{ computedTRYtoBs }}
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

const bcvData = [];
const consultHourBcv = ref('');
const EUROfficialBcv = ref();
const EURAmountBcv = ref();
const BcvAmountEUR = ref();
const EURColorBcv = ref();
const EURSymbolBcv = ref();
const CNYOfficialBcv = ref();
const CNYAmountBcv = ref();
const BcvAmountCNY = ref();
const CNYColorBcv = ref();
const CNYSymbolBcv = ref();
const RUBOfficialBcv = ref();
const RUBAmountBcv = ref();
const BcvAmountRUB = ref();
const RUBColorBcv = ref();
const RUBSymbolBcv = ref();
const TRYOfficialBcv = ref();
const TRYAmountBcv = ref();
const BcvAmountTRY = ref();
const TRYColorBcv = ref();
const TRYSymbolBcv = ref();

const computedEurToBs = computed (() => {
  //console.log(EURAmountBcv.value);
    if (EURAmountBcv.value > 0){
      return (EUROfficialBcv.value * EURAmountBcv.value).toFixed(2);
    }
  return null;
});

const computedBsToEur = computed (() => {
  if (BcvAmountEUR.value > 0){
    return (BcvAmountEUR.value / EUROfficialBcv.value).toFixed(2);
  }
  return null;
});

const computedCNYtoBs = computed (() => {
    if (CNYAmountBcv.value > 0){
      return (CNYOfficialBcv.value * CNYAmountBcv.value).toFixed(2);
    }
  return null;
});

const computedBsToCNY = computed (() => {
  if (BcvAmountCNY.value > 0){
    return (BcvAmountCNY.value / CNYOfficialBcv.value).toFixed(2);
  }
  return null;
});

const computedRUBtoBs = computed (() => {
    if (RUBAmountBcv.value > 0){
      return (RUBOfficialBcv.value * RUBAmountBcv.value).toFixed(2);
    }
  return null;
});

const computedBsToRUB = computed (() => {
  if (BcvAmountRUB.value > 0){
    return (BcvAmountRUB.value / RUBOfficialBcv.value).toFixed(2);
  }
  return null;
});

const computedTRYtoBs = computed (() => {
  //console.log(TRYAmountBcv.value);
    if (TRYAmountBcv.value > 0){
      return (TRYOfficialBcv.value * TRYAmountBcv.value).toFixed(2);
    }
  return null;
});

const computedBsToTRY = computed (() => {
  if (BcvAmountTRY.value > 0){
    return (BcvAmountTRY.value / TRYOfficialBcv.value).toFixed(2);
  }
  return null;
});


function EURreturnToZeroBcv() {
  EURAmountBcv.value = null;
  BcvAmountEUR.value = null;
};

function CNYreturnToZeroBcv() {
  CNYAmountBcv.value = null;
  BcvAmountCNY.value = null;
};

function RUBreturnToZeroBcv() {
  RUBAmountBcv.value = null;
  BcvAmountRUB.value = null;
};

function TRYreturnToZeroBcv() {
  TRYAmountBcv.value = null;
  BcvAmountTRY.value = null;
};

async function showCharge(){
  const $q = useQuasar()

    $q.loading.show()

    await axios.get(process.env.SUPABASE_URL + '/rest/v1/rpc/obtener_ultima_tasa', {
    headers: {
      'apikey': process.env.SUPABASE_KEY,
      'Authorization': 'Bearer ' + process.env.SUPABASE_KEY
    }
  })
  .then(function (response) {
    if(response.status == 200){
      bcvData.value = response.data[0];
      $q.loading.hide();
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

  //Data BCV
  consultHourBcv.value = bcvData.value.fecha_consulta;

  //Data Euro
  EUROfficialBcv.value = bcvData.value.eur.toFixed(2);
  /*EURColorBcv.value = bcvData.value.monitors.eur.color;
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
  };*/

  //Data Yuan Chino
  CNYOfficialBcv.value = bcvData.value.cny.toFixed(2);
  /*CNYColorBcv.value = bcvData.value.monitors.cny.color;
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
  };*/

  //Data Lira Turca
  TRYOfficialBcv.value = bcvData.value.try.toFixed(2);
  /*TRYColorBcv.value = bcvData.value.monitors.try.color;
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
  };*/

  //Data Rublo Ruso
  RUBOfficialBcv.value = bcvData.value.rub.toFixed(2);
  /*RUBColorBcv.value = bcvData.value.monitors.rub.color;
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
  };*/
}


export default defineComponent({
  name: "AnotherCurrenciesComponent, App",
  setup() {
    const $q = useQuasar();
    return {
      computedEurToBs,
      computedBsToEur,
      computedCNYtoBs,
      computedBsToCNY,
      computedRUBtoBs,
      computedBsToRUB,
      computedTRYtoBs,
      computedBsToTRY,
      showCharge,
      EURreturnToZeroBcv,
      CNYreturnToZeroBcv,
      RUBreturnToZeroBcv,
      TRYreturnToZeroBcv,
      consultHourBcv,
      EUROfficialBcv,
      EURAmountBcv,
      BcvAmountEUR,
      EURColorBcv,
      EURSymbolBcv,
      CNYOfficialBcv,
      CNYAmountBcv,
      BcvAmountCNY,
      CNYColorBcv,
      CNYSymbolBcv,
      RUBOfficialBcv,
      RUBAmountBcv,
      BcvAmountRUB,
      RUBColorBcv,
      RUBSymbolBcv,
      TRYOfficialBcv,
      TRYAmountBcv,
      BcvAmountTRY,
      TRYColorBcv,
      TRYSymbolBcv,
      async showLoading () {
      EURAmountBcv.value = null;
      BcvAmountEUR.value = null;

      CNYAmountBcv.value = null;
      BcvAmountCNY.value = null;

      RUBAmountBcv.value = null;
      BcvAmountRUB.value = null;

      TRYAmountBcv.value = null;
      BcvAmountTRY.value = null;

        $q.loading.show()

        await axios.get(process.env.SUPABASE_URL + '/rest/v1/rpc/obtener_ultima_tasa', {
          headers: {
            'apikey': process.env.SUPABASE_KEY,
            'Authorization': 'Bearer ' + process.env.SUPABASE_KEY
          }
        })
        .then(function (response) {
          if(response.status == 200){
            bcvData.value = response.data[0];
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
        //Data BCV
        consultHourBcv.value = bcvData.value.fecha_consulta;

        //Data Euro
        EUROfficialBcv.value = bcvData.value.eur.toFixed(2);
        /*EURColorBcv.value = bcvData.value.monitors.eur.color;
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
        };*/

        //Data Yuan Chino
        CNYOfficialBcv.value = bcvData.value.cny.toFixed(2);
        /*CNYColorBcv.value = bcvData.value.monitors.cny.color;
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
        };*/

        //Data Lira Turca
        TRYOfficialBcv.value = bcvData.value.try.toFixed(2);
        /*TRYColorBcv.value = bcvData.value.monitors.try.color;
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
        };*/

        //Data Rublo Ruso
        RUBOfficialBcv.value = bcvData.value.rub.toFixed(2);
        /*RUBColorBcv.value = bcvData.value.monitors.rub.color;
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
        };*/
      }
    }
  },
  async beforeMount() {
  showCharge();
  },
});
</script>
