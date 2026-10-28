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
      behavior="menu"
      @update:model-value="onDateChange"
    >
      <template v-slot:prepend >
        <q-icon name="event" />
      </template>
    </q-select>
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
          <h6 style="text-shadow: 1px 1px 4px black;">Oficial ($): {{ OfficialValue }} <q-icon :color=colorBcv :name="symbolBcv"/><br><div class="text-caption">{{ BcvFormatDate }}</div></h6>
        </q-item-section>
      </template>

      <q-card class="transparent">
        <q-card-section >
          <q-input
            class="col q-pb-md transparent-input"

            dark
            v-model.trim="USDamountBCV"
            dense="dense"
            hint="Inserte valor $ (USD)"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            inputmode="decimal"
            @focus="BCVamountUSD = null"
          >
            <template v-slot:append>
              <div style="font-size:large; padding-right: 10px;"> $ </div>
            </template>
            <template v-slot:prepend >
                {{ computedBCVtoUSD }}
              </template>
          </q-input>
          <q-input
            class="col transparent-input"

            dark
            dense="dense"
            hint="Calculo (Bs.)"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            inputmode="decimal"
            v-model.trim="BCVamountUSD"
            @focus="USDamountBCV = null"
          >
            <template v-slot:append>
              <div style="font-size:large; padding-right: 10px;"> Bs. </div>
            </template>
            <template v-slot:prepend >
                {{ computedUSDtoBCV }}
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
          <h6 style="text-shadow: 1px 1px 4px black;">USDT ($): {{ ParallelValue }} <q-icon :color=colorParallel :name='symbolParallel'/><br><div class="text-caption">{{ ParallelFormatDate }}</div></h6>
        </q-item-section>
      </template>

      <q-card class="transparent">
        <q-card-section>
          <q-input
            class="col q-pb-md transparent-input"

            dark
            v-model.trim="USDamountParallel"
            dense="dense"
            hint="Inserte valor $ (USD)"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            inputmode="decimal"
            @focus="ParallelamountUSD = null"
          >
            <template v-slot:append>
              <div style="font-size:large; padding-right: 10px;"> $ </div>
            </template>
            <template v-slot:prepend >
              {{ computedParalleltoUSD }}
            </template>
          </q-input>
          <q-input
            class="col transparent-input"

            dark
            dense="dense"
            hint="Calculo (Bs.)"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            inputmode="decimal"
            v-model.trim="ParallelamountUSD"
            @focus="USDamountParallel = null"
          >
            <template v-slot:append>
              <div style="font-size:large; padding-right: 10px;"> Bs. </div>
            </template>
            <template v-slot:prepend >
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
          <h6 style="text-shadow: 1px 1px 4px black;" class="text-no-wrap">Promedio ($): {{ promedioValue }} <q-icon :color=colorPromedio :name='symbolPromedio'/><br><div class="text-caption">{{ ParallelFormatDate }}</div></h6>
        </q-item-section>
      </template>

      <q-card class="transparent">
        <q-card-section>
          <q-input class="col q-pb-md transparent-input"

          dark
          v-model.trim="USDamountPromedio"
          dense="dense"
          hint="Inserte valor $ (USD)"
          type="number"
          pattern="[0-9]*\.?[0-9]*"
          inputmode="decimal"
          @focus="PromedioamountUSD = null"
          >
            <template v-slot:append>
              <div style="font-size:large; padding-right: 10px;"> $ </div>
            </template>
            <template v-slot:prepend >
                {{ computedPromediotoUSD }}
              </template>
          </q-input>
          <q-input
            class="col transparent-input"

            dark
            dense="dense"
            hint="Calculo (Bs.)"
            type="number"
            pattern="[0-9]*\.?[0-9]*"
            inputmode="decimal"
            v-model.trim="PromedioamountUSD"
            @focus="USDamountPromedio = null"
          >
            <template v-slot:append>
              <div style="font-size:large; padding-right: 10px;"> Bs. </div>
            </template>
            <template v-slot:prepend >
                {{ computedUSDtoPromedio }}
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
import langEs from 'quasar/lang/es'

export default defineComponent({
  name: 'IndexComponent',
  setup() {
    const $q = useQuasar();
    $q.lang.set(langEs);

    const parallelHistory = ref([]);
    const bcvHistory = ref([]);
    const availableDates = ref([]);
    const selectedDate = ref(null);

    const consultHourBcv = ref('');
    const consultHourParallel = ref('');
    const OfficialValue = ref();
    const ParallelValue = ref();
    const promedioValue = ref();

    const USDamountBCV = ref();
    const BCVamountUSD = ref();
    const USDamountParallel = ref();
    const ParallelamountUSD = ref();
    const USDamountPromedio = ref();
    const PromedioamountUSD = ref();

    const ParallelFormatDate = computed(() => {
      if (!consultHourParallel.value) return 'Fecha no disponible';
      const fecha = new Date(consultHourParallel.value);
      return new Intl.DateTimeFormat('es-VE', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      }).format(fecha);
    });

    const BcvFormatDate = computed(() => {
      if (!consultHourBcv.value) return 'Fecha no disponible';
      const fecha = new Date(consultHourBcv.value);
      // Muestra la fecha visualmente +1 día para reflejar la vigencia BCV
      fecha.setDate(fecha.getDate() + 1);
      return new Intl.DateTimeFormat('es-VE', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      }).format(fecha);
    });

    const computedUSDtoBCV = computed(() => {
      if (USDamountBCV.value > 0) {
        return (OfficialValue.value * USDamountBCV.value).toFixed(2);
      }
      return null;
    });

    const computedBCVtoUSD = computed(() => {
      if (BCVamountUSD.value > 0) {
        return (BCVamountUSD.value / OfficialValue.value).toFixed(2);
      }
      return null;
    });

    const computedUSDtoParallel = computed(() => {
      if (USDamountParallel.value > 0) {
        return (ParallelValue.value * USDamountParallel.value).toFixed(2);
      }
      return null;
    });

    const computedParalleltoUSD = computed(() => {
      if (ParallelamountUSD.value > 0) {
        return (ParallelamountUSD.value / ParallelValue.value).toFixed(2);
      }
      return null;
    });

    const computedUSDtoPromedio = computed(() => {
      if (USDamountPromedio.value > 0) {
        return (promedioValue.value * USDamountPromedio.value).toFixed(2);
      }
      return null;
    });

    const computedPromediotoUSD = computed(() => {
      if (PromedioamountUSD.value > 0) {
        return (PromedioamountUSD.value / promedioValue.value).toFixed(2);
      }
      return null;
    });

    function returnToZeroBcv() {
      USDamountBCV.value = null;
      BCVamountUSD.value = null;
    }

    function returnToZeroParallel() {
      USDamountParallel.value = null;
      ParallelamountUSD.value = null;
    }

    function returnToZeroPromedio() {
      USDamountPromedio.value = null;
      PromedioamountUSD.value = null;
    }

    // Obtiene la fecha YYYY-MM-DD real en la zona horaria de Venezuela
    function getVenezuelaDateStr(utcDateStr) {
      if (!utcDateStr) return '';
      const date = new Date(utcDateStr);
      const options = {
        timeZone: 'America/Caracas',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      };
      const formatter = new Intl.DateTimeFormat('en-CA', options);
      return formatter.format(date);
    }

    // Calcula la fecha en la que la tasa del BCV ENTRÓ EN VIGENCIA (+1 día respecto a su registro)
    function getBcvEffectiveDate(utcDateStr) {
      const localDateStr = getVenezuelaDateStr(utcDateStr);
      if (!localDateStr) return '';
      const [year, month, day] = localDateStr.split('-').map(Number);

      // Creamos la fecha local y le sumamos 1 día (Vigencia BCV)
      const date = new Date(year, month - 1, day);
      date.setDate(date.getDate() + 1);

      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }

    // Actualiza los valores de pantalla según la fecha elegida en el selector
    function updateValuesForDate(dateStr) {
      if (!dateStr) return;

      // 1. Binance: Busca la tasa registrada exactamente EN esa fecha de calendario real
      const binanceRecord = parallelHistory.value.find(item => {
        return getVenezuelaDateStr(item.fecha_consulta) === dateStr;
      });

      if (binanceRecord) {
        consultHourParallel.value = binanceRecord.fecha_consulta;
        ParallelValue.value = binanceRecord.usdt_ves.toFixed(2);
      }

      // 2. BCV: Busca la tasa que TIENE VIGENCIA para esa fecha exacta (o la anterior más cercana)
      let bcvRecord = bcvHistory.value.find(item => {
        return getBcvEffectiveDate(item.fecha_consulta) === dateStr;
      });

      if (!bcvRecord) {
        // Regla para fines de semana o feriados: tomar la tasa efectiva más cercana hacia atrás
        bcvRecord = bcvHistory.value.find(item => {
          return getBcvEffectiveDate(item.fecha_consulta) <= dateStr;
        });
      }

      if (bcvRecord) {
        consultHourBcv.value = bcvRecord.fecha_consulta;
        OfficialValue.value = bcvRecord.usd.toFixed(2);
      }

      // 3. Promedio
      if (OfficialValue.value && ParallelValue.value) {
        promedioValue.value = ((parseFloat(OfficialValue.value) + parseFloat(ParallelValue.value)) / 2).toFixed(2);
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

        const resBinance = await axios.get(import.meta.env.VITE_SUPABASE_URL + '/rest/v1/rpc/obtener_ultimas_tasas_por_dia_binance', {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_KEY,
            'Authorization': 'Bearer ' + import.meta.env.VITE_SUPABASE_KEY
          }
        });

        if (resBcv.status === 200 && resBinance.status === 200) {
          bcvHistory.value = Array.isArray(resBcv.data) ? resBcv.data : (resBcv.data?.data || []);
          parallelHistory.value = Array.isArray(resBinance.data) ? resBinance.data : (resBinance.data?.data || []);

          const datesSet = new Set();

          // Binance aporta sus fechas reales de captura
          if (Array.isArray(parallelHistory.value)) {
            parallelHistory.value.forEach(item => {
              if (item && item.fecha_consulta) {
                const localDate = getVenezuelaDateStr(item.fecha_consulta);
                datesSet.add(localDate);
              }
            });
          }

          // BCV aporta sus fechas efectivas de vigencia
          if (Array.isArray(bcvHistory.value)) {
            bcvHistory.value.forEach(item => {
              if (item && item.fecha_consulta) {
                const effectiveDate = getBcvEffectiveDate(item.fecha_consulta);
                datesSet.add(effectiveDate);
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
        console.error('Error al cargar historial:', error);
        $q.notify({
          message: 'No se pudo conectar con el servidor para cargar el historial',
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
      tab: ref('$ a Bs.'),
      USDamountPromedio,
      USDamountBCV,
      USDamountParallel,
      PromedioamountUSD,
      BCVamountUSD,
      ParallelamountUSD,
      promedioValue,
      OfficialValue,
      ParallelValue,
      computedBCVtoUSD,
      computedUSDtoBCV,
      computedUSDtoParallel,
      computedParalleltoUSD,
      computedPromediotoUSD,
      computedUSDtoPromedio,
      BcvFormatDate,
      ParallelFormatDate,
      consultHourParallel,
      consultHourBcv,
      availableDates,
      selectedDate,
      onDateChange(val) {
        returnToZeroBcv();
        returnToZeroParallel();
        returnToZeroPromedio();
        updateValuesForDate(val);
      }
    };
  }
});
</script>
