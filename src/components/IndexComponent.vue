<template>
  <div>
    <!-- 1. Selector pegajoso anclado debajo de las pestañas -->
    <q-page-sticky position="top" expand :offset="[0, 35]" style="z-index: 9;">
      <div class="full-width row q-pl-lg q-pr-md q-py-sm flex-center font-color" style="background-color: #030000;">
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
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </div>
    </q-page-sticky>

    <!-- 2. Contenedor de las tarjetas con padding-top para que no queden ocultas bajo el selector -->
    <div style="padding-top: 20px;">

      <!-- TARJETA OFICIAL BCV -->
      <q-expansion-item @click="returnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black; line-height: 1.3;">
              Oficial ($): {{ OfficialValue }}

              <div class="row items-center" style="line-height: 1; margin-top: -2px; margin-bottom: 2px;">
                <q-icon :color="colorBcv" :name="symbolBcv" size="xs" />
                <span :class="`text-${colorBcv}`" class="text-caption text-weight-bold q-ml-xs">{{ percentBcv }}</span>
              </div>

              <div class="text-caption" style="line-height: 1.2;">{{ BcvFormatDate }}</div>
            </h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
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
              <template v-slot:prepend>
                {{ computedBCVtoUSD }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(USDamountBCV || computedBCVtoUSD)"
                />
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
              <template v-slot:prepend>
                {{ computedUSDtoBCV }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(BCVamountUSD || computedUSDtoBCV)"
                />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- TARJETA PARALELO USDT -->
      <q-expansion-item @click="returnToZeroParallel()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/USDT_Logo.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black; line-height: 1.3;">
              USDT ($): {{ ParallelValue }}

              <div class="row items-center" style="line-height: 1; margin-top: -2px; margin-bottom: 2px;">
                <q-icon :color="colorParallel" :name="symbolParallel" size="xs" />
                <span :class="`text-${colorParallel}`" class="text-caption text-weight-bold q-ml-xs">{{ percentParallel }}</span>
              </div>

              <div class="text-caption" style="line-height: 1.2;">{{ ParallelFormatDate }}</div>
            </h6>
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
              <template v-slot:prepend>
                {{ computedParalleltoUSD }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(USDamountParallel || computedParalleltoUSD)"
                />
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
              <template v-slot:prepend>
                {{ computedUSDtoParallel }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(ParallelamountUSD || computedUSDtoParallel)"
                />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- TARJETA PROMEDIO -->
      <q-expansion-item @click="returnToZeroPromedio()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/promedio.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black; line-height: 1.3;" class="text-no-wrap">
              Promedio ($): {{ promedioValue }}

              <div class="row items-center" style="line-height: 1; margin-top: -2px; margin-bottom: 2px;">
                <q-icon :color="colorPromedio" :name="symbolPromedio" size="xs" />
                <span :class="`text-${colorPromedio}`" class="text-caption text-weight-bold q-ml-xs">{{ percentPromedio }}</span>
              </div>

              <div class="text-caption" style="line-height: 1.2;">{{ ParallelFormatDate }}</div>
            </h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input
              class="col q-pb-md transparent-input"
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
              <template v-slot:prepend>
                {{ computedPromediotoUSD }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(USDamountPromedio || computedPromediotoUSD)"
                />
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
              <template v-slot:prepend>
                {{ computedUSDtoPromedio }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(PromedioamountUSD || computedUSDtoPromedio)"
                />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>

    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, onMounted } from 'vue';
import { useQuasar, copyToClipboard } from "quasar";
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
    const bcvVigenciaDate = ref('');
    const consultHourParallel = ref('');
    const OfficialValue = ref();
    const ParallelValue = ref();
    const promedioValue = ref();

    const colorBcv = ref('grey-5');
    const symbolBcv = ref('mdi-equal');
    const percentBcv = ref('0.00%');

    const colorParallel = ref('grey-5');
    const symbolParallel = ref('mdi-equal');
    const percentParallel = ref('0.00%');

    const colorPromedio = ref('grey-5');
    const symbolPromedio = ref('mdi-equal');
    const percentPromedio = ref('0.00%');

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

    // Muestra la fecha de vigencia real (Fecha_capturada) + la hora de consulta
    const BcvFormatDate = computed(() => {
      if (!consultHourBcv.value && !bcvVigenciaDate.value) return 'Fecha no disponible';

      let fechaTexto = '';
      if (bcvVigenciaDate.value && bcvVigenciaDate.value.includes('-')) {
        const [year, month, day] = bcvVigenciaDate.value.split('-');
        fechaTexto = `${day}/${month}/${year}`;
      }

      if (consultHourBcv.value) {
        const fecha = new Date(consultHourBcv.value);
        const horaTexto = new Intl.DateTimeFormat('es-VE', {
          hour: '2-digit', minute: '2-digit', hour12: true
        }).format(fecha);

        if (fechaTexto) {
          return `${fechaTexto}, ${horaTexto}`;
        }
        return new Intl.DateTimeFormat('es-VE', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true
        }).format(fecha);
      }

      return fechaTexto;
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

    function copyValue(val) {
      if (!val) {
        $q.notify({
          message: 'No hay ningún monto para copiar',
          position: 'center',
          timeout: 1200,
          textColor: 'black',
          icon: 'mdi-alert-circle-outline',
          iconColor: 'black',
          style: 'background-color: #F3BA2F !important; color: #000000 !important; font-weight: 600; border-radius: 8px;'
        });
        return;
      }

      copyToClipboard(String(val))
        .then(() => {
          $q.notify({
            message: `Monto copiado: ${val}`,
            position: 'center',
            timeout: 1200,
            textColor: 'black',
            icon: 'mdi-check-circle',
            iconColor: 'black',
            style: 'background-color: #F3BA2F !important; color: #000000 !important; font-weight: 600; border-radius: 8px;'
          });
        })
        .catch(() => {
          $q.notify({
            message: 'Error al copiar al portapapeles',
            color: 'negative',
            position: 'center',
            timeout: 1200
          });
        });
    }

    // Calcula el semáforo (Rojo si sube, Verde si baja, Gris si queda igual) y el porcentaje
    function calcularVariacion(actual, anterior) {
      const valActual = parseFloat(actual);
      const valAnterior = parseFloat(anterior);
      console.log('calcularVariacion:', valActual, valAnterior);

      if (isNaN(valActual) || isNaN(valAnterior) || valAnterior === 0) {
        return { color: 'grey-5', symbol: 'mdi-equal', percent: '0.00%' };
      }

      const diff = valActual - valAnterior;
      const pct = ((diff / valAnterior) * 100).toFixed(2);

      if (diff > 0.0001) {
        return { color: 'red', symbol: 'mdi-arrow-up-bold', percent: `+${pct}%` };
      } else if (diff < -0.0001) {
        return { color: 'green', symbol: 'mdi-arrow-down-bold', percent: `${pct}%` };
      }
      return { color: 'grey-5', symbol: 'mdi-equal', percent: '0.00%' };
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

    // Prioriza Fecha_capturada (fecha valor oficial BCV); si es NULL (registros viejos), usa fecha_consulta
    function getBcvDateStr(item) {
      if (!item) return '';
      if (item.Fecha_capturada && /^\d{4}-\d{2}-\d{2}/.test(item.Fecha_capturada)) {
        return item.Fecha_capturada.slice(0, 10);
      }
      return getVenezuelaDateStr(item.fecha_consulta);
    }

    // Actualiza los valores de pantalla según la fecha elegida en el selector
    function updateValuesForDate(dateStr) {
      if (!dateStr) return;

      // 1. Binance: Busca la tasa registrada exactamente en esa fecha (o la anterior más reciente)
      let binanceRecord = parallelHistory.value.find(item => {
        return getVenezuelaDateStr(item.fecha_consulta) === dateStr;
      });

      if (!binanceRecord) {
        binanceRecord = parallelHistory.value.find(item => {
          return getVenezuelaDateStr(item.fecha_consulta) <= dateStr;
        });
      }

      let prevBinanceRecord = null;
      if (binanceRecord) {
        const binanceDate = getVenezuelaDateStr(binanceRecord.fecha_consulta);
        prevBinanceRecord = parallelHistory.value.find(item => {
          return getVenezuelaDateStr(item.fecha_consulta) < binanceDate;
        });

        consultHourParallel.value = binanceRecord.fecha_consulta;
        ParallelValue.value = binanceRecord.usdt_ves.toFixed(2);

        const varParallel = calcularVariacion(binanceRecord.usdt_ves, prevBinanceRecord?.usdt_ves);
        colorParallel.value = varParallel.color;
        symbolParallel.value = varParallel.symbol;
        percentParallel.value = varParallel.percent;
      }

      // 2. BCV: Busca la tasa cuya Fecha_capturada coincida con la fecha elegida (o la anterior más cercana)
      let bcvRecord = bcvHistory.value.find(item => {
        return getBcvDateStr(item) === dateStr;
      });

      if (!bcvRecord) {
        bcvRecord = bcvHistory.value.find(item => {
          return getBcvDateStr(item) <= dateStr;
        });
      }

      let prevBcvRecord = null;
      if (bcvRecord) {
        const bcvDate = getBcvDateStr(bcvRecord);
        // Si la tasa es heredada (fin de semana/feriado), se compara consigo misma para dar 0.00% (=)
        if (bcvDate !== dateStr) {
          prevBcvRecord = bcvRecord;
        } else {
          prevBcvRecord = bcvHistory.value.find(item => getBcvDateStr(item) < bcvDate);
        }

        consultHourBcv.value = bcvRecord.fecha_consulta;
        bcvVigenciaDate.value = dateStr;
        OfficialValue.value = bcvRecord.usd.toFixed(2);

        const varBcv = calcularVariacion(bcvRecord.usd, prevBcvRecord?.usd);
        colorBcv.value = varBcv.color;
        symbolBcv.value = varBcv.symbol;
        percentBcv.value = varBcv.percent;
      }

      // 3. Promedio
      if (OfficialValue.value && ParallelValue.value) {
        const promActual = (parseFloat(OfficialValue.value) + parseFloat(ParallelValue.value)) / 2;
        promedioValue.value = promActual.toFixed(2);

        const promAnterior = (prevBcvRecord && prevBinanceRecord)
          ? (parseFloat(prevBcvRecord.usd) + parseFloat(prevBinanceRecord.usdt_ves)) / 2
          : null;

        const varProm = calcularVariacion(promActual, promAnterior);
        colorPromedio.value = varProm.color;
        symbolPromedio.value = varProm.symbol;
        percentPromedio.value = varProm.percent;
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
          const binanceDates = [];

          // 1. Binance aporta sus fechas reales de captura
          if (Array.isArray(parallelHistory.value)) {
            parallelHistory.value.forEach(item => {
              if (item && item.fecha_consulta) {
                const localDate = getVenezuelaDateStr(item.fecha_consulta);
                if (localDate) {
                  datesSet.add(localDate);
                  binanceDates.push(localDate);
                }
              }
            });
          }

          // 2. BCV aporta su Fecha_capturada (si ya existe el día siguiente, aparecerá en el selector)
          if (Array.isArray(bcvHistory.value)) {
            bcvHistory.value.forEach(item => {
              const bcvDate = getBcvDateStr(item);
              if (bcvDate) {
                datesSet.add(bcvDate);
              }
            });
          }

          // Ordenamos todas las fechas disponibles de mayor a menor
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
            const todayVenezuela = getVenezuelaDateStr(new Date().toISOString());
            const sortedBinanceDates = binanceDates.sort().reverse();
            const currentDayBinance = sortedBinanceDates.length > 0 ? sortedBinanceDates[0] : null;

            // Prioridad al iniciar: 1) Hoy en Venezuela si existe registro, 2) Último día de Binance, 3) Primera fecha disponible
            if (sortedDates.includes(todayVenezuela)) {
              selectedDate.value = todayVenezuela;
            } else if (currentDayBinance && sortedDates.includes(currentDayBinance)) {
              selectedDate.value = currentDayBinance;
            } else {
              selectedDate.value = availableDates.value[0].value;
            }

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
      colorBcv,
      symbolBcv,
      percentBcv,
      colorParallel,
      symbolParallel,
      percentParallel,
      colorPromedio,
      symbolPromedio,
      percentPromedio,
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
      copyValue,
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
