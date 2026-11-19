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
          <template v-slot:prepend >
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
              <template v-slot:prepend >
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
              <template v-slot:prepend >
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
            <h6 style="text-shadow: 1px 1px 4px black;" class="text-no-wrap">Promedio ($): {{ promedioValue }} <q-icon :color=colorPromedio :name='symbolPromedio'/><br><div class="text-caption">{{ ParallelFormatDate }}</div></h6>
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
              <template v-slot:prepend >
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
              <template v-slot:prepend >
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

      // 1. Binance: Busca la tasa registrada exactamente en esa fecha (o la anterior más reciente si se consulta el día siguiente)
      let binanceRecord = parallelHistory.value.find(item => {
        return getVenezuelaDateStr(item.fecha_consulta) === dateStr;
      });

      if (!binanceRecord) {
        binanceRecord = parallelHistory.value.find(item => {
          return getVenezuelaDateStr(item.fecha_consulta) <= dateStr;
        });
      }

      if (binanceRecord) {
        consultHourParallel.value = binanceRecord.fecha_consulta;
        ParallelValue.value = binanceRecord.usdt_ves.toFixed(2);
      }

      // 2. BCV: Busca la tasa cuya Fecha_capturada coincida con la fecha elegida (o la anterior más cercana en fines de semana/feriados)
      let bcvRecord = bcvHistory.value.find(item => {
        return getBcvDateStr(item) === dateStr;
      });

      if (!bcvRecord) {
        bcvRecord = bcvHistory.value.find(item => {
          return getBcvDateStr(item) <= dateStr;
        });
      }

      if (bcvRecord) {
        consultHourBcv.value = bcvRecord.fecha_consulta;
        bcvVigenciaDate.value = dateStr; // Garantiza que la fecha mostrada coincida con el día consultado
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
