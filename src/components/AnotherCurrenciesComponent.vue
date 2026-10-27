<template>
    <div class="q-pt-md row q-pl-lg q-pr-md flex-center font-color">
      <q-select
        dense
        dark
        borderless
        v-model="selectedDate"
        :options="availableDates"
        label="Fecha de la tasa"
        class="col-12 col-md-6"
        emit-value
        map-options
        @update:model-value="onDateChange"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
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
            <h6 style="text-shadow: 1px 1px 4px black;">Euro (€): {{ EUROfficialBcv }} <q-icon :color=EURColorBcv :name="EURSymbolBcv"/><br><div class="text-caption">{{ BcvFormatDate }}</div></h6>
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
            <h6 style="text-shadow: 1px 1px 4px black;">Yuan (¥): {{ CNYOfficialBcv }} <q-icon :color=CNYColorBcv :name='CNYSymbolBcv'/><br><div class="text-caption">{{ BcvFormatDate }}</div></h6>
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
            <h6 style="text-shadow: 1px 1px 4px black;">Rublo (₽): {{ RUBOfficialBcv }} <q-icon :color=RUBColorBcv :name='RUBSymbolBcv'/><br><div class="text-caption">{{ BcvFormatDate }}</div></h6>
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
            <h6 style="text-shadow: 1px 1px 4px black;">Lira (₺): {{ TRYOfficialBcv }} <q-icon :color=TRYColorBcv :name='TRYSymbolBcv'/><br><div class="text-caption">{{ BcvFormatDate }}</div></h6>
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
import { computed, defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from "quasar";
import axios from 'axios';

export default defineComponent({
  name: "AnotherCurrenciesComponent",
  setup() {
    const $q = useQuasar();

    const bcvHistory = ref([]);
    const availableDates = ref([]);
    const selectedDate = ref(null);

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

    const BcvFormatDate = computed(() => {
      if (!consultHourBcv.value) return 'Fecha no disponible';
      const fecha = new Date(consultHourBcv.value);
      return new Intl.DateTimeFormat('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(fecha);
    });

    const computedEurToBs = computed(() => {
      if (EURAmountBcv.value > 0) {
        return (EUROfficialBcv.value * EURAmountBcv.value).toFixed(2);
      }
      return null;
    });

    const computedBsToEur = computed(() => {
      if (BcvAmountEUR.value > 0) {
        return (BcvAmountEUR.value / EUROfficialBcv.value).toFixed(2);
      }
      return null;
    });

    const computedCNYtoBs = computed(() => {
      if (CNYAmountBcv.value > 0) {
        return (CNYOfficialBcv.value * CNYAmountBcv.value).toFixed(2);
      }
      return null;
    });

    const computedBsToCNY = computed(() => {
      if (BcvAmountCNY.value > 0) {
        return (BcvAmountCNY.value / CNYOfficialBcv.value).toFixed(2);
      }
      return null;
    });

    const computedRUBtoBs = computed(() => {
      if (RUBAmountBcv.value > 0) {
        return (RUBOfficialBcv.value * RUBAmountBcv.value).toFixed(2);
      }
      return null;
    });

    const computedBsToRUB = computed(() => {
      if (BcvAmountRUB.value > 0) {
        return (BcvAmountRUB.value / RUBOfficialBcv.value).toFixed(2);
      }
      return null;
    });

    const computedTRYtoBs = computed(() => {
      if (TRYAmountBcv.value > 0) {
        return (TRYOfficialBcv.value * TRYAmountBcv.value).toFixed(2);
      }
      return null;
    });

    const computedBsToTRY = computed(() => {
      if (BcvAmountTRY.value > 0) {
        return (BcvAmountTRY.value / TRYOfficialBcv.value).toFixed(2);
      }
      return null;
    });

    function EURreturnToZeroBcv() {
      EURAmountBcv.value = null;
      BcvAmountEUR.value = null;
    }

    function CNYreturnToZeroBcv() {
      CNYAmountBcv.value = null;
      BcvAmountCNY.value = null;
    }

    function RUBreturnToZeroBcv() {
      RUBAmountBcv.value = null;
      BcvAmountRUB.value = null;
    }

    function TRYreturnToZeroBcv() {
      TRYAmountBcv.value = null;
      BcvAmountTRY.value = null;
    }

    function updateValuesForDate(dateStr) {
      if (!dateStr || !bcvHistory.value.length) return;

      let bcvRecord = bcvHistory.value.find(item => item && item.fecha_consulta && item.fecha_consulta.startsWith(dateStr));

      if (!bcvRecord) {
        bcvRecord = bcvHistory.value.find(item => item && item.fecha_consulta && item.fecha_consulta <= dateStr);
      }

      if (bcvRecord) {
        consultHourBcv.value = bcvRecord.fecha_consulta;

        if (bcvRecord.eur) EUROfficialBcv.value = bcvRecord.eur.toFixed(2);
        if (bcvRecord.cny) CNYOfficialBcv.value = bcvRecord.cny.toFixed(2);
        if (bcvRecord.try) TRYOfficialBcv.value = bcvRecord.try.toFixed(2);
        if (bcvRecord.rub) RUBOfficialBcv.value = bcvRecord.rub.toFixed(2);
      }
    }

    async function loadHistory() {
      $q.loading.show();
      try {
        const resBcv = await axios.get(import.meta.env.VITE_SUPABASE_URL + '/rest/v1/rpc/obtener_tasas_bcv', {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_KEY,
            'Authorization': 'Bearer ' + import.meta.env.VITE_SUPABASE_KEY
          }
        });

        if (resBcv.status === 200) {
          bcvHistory.value = Array.isArray(resBcv.data) ? resBcv.data : (resBcv.data?.data || []);

          const datesSet = new Set();
          if (Array.isArray(bcvHistory.value)) {
            bcvHistory.value.forEach(item => {
              if (item && item.fecha_consulta) {
                datesSet.add(item.fecha_consulta.split('T')[0]);
              }
            });
          }

          const sortedDates = Array.from(datesSet).sort().reverse();
          availableDates.value = sortedDates.map(dateStr => {
            const [year, month, day] = dateStr.split('-');
            const shortYear = year.slice(-2);
            return {
              label: `${day}/${month}/${shortYear}`,
              value: dateStr
            };
          });

          if (availableDates.value.length > 0) {
            selectedDate.value = availableDates.value[0].value;
            updateValuesForDate(selectedDate.value);
          }
        }
      } catch (error) {
        console.error('Error al cargar historial de otras divisas:', error);
        $q.notify({
          message: 'No se pudo contactar con el servidor',
          color: 'negative',
          position: 'center',
        });
      } finally {
        $q.loading.hide();
      }
    }

    onMounted(() => {
      loadHistory();
    });

    return {
      computedEurToBs,
      computedBsToEur,
      computedCNYtoBs,
      computedBsToCNY,
      computedRUBtoBs,
      computedBsToRUB,
      computedTRYtoBs,
      computedBsToTRY,
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
      BcvFormatDate,
      availableDates,
      selectedDate,
      onDateChange(val) {
        EURreturnToZeroBcv();
        CNYreturnToZeroBcv();
        RUBreturnToZeroBcv();
        TRYreturnToZeroBcv();
        updateValuesForDate(val);
      }
    };
  }
});
</script>
