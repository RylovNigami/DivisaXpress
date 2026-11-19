<template>
  <div>
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

    <div style="padding-top: 20px;">
      <!-- TARJETA EURO -->
      <q-expansion-item @click="EURreturnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Euro (€): {{ EUROfficialBcv }} <q-icon :color="EURColorBcv" :name="EURSymbolBcv"/><br><div class="text-caption">{{ BcvFormatDate }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input
              class="col q-pb-md transparent-input"
              dark
              borderless
              v-model.trim="EURAmountBcv"
              dense="dense"
              hint="Inserte valor € (EUR)"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              inputmode="decimal"
              @focus="BcvAmountEUR = null"
            >
              <template v-slot:append>
                <div style="font-size:large; padding-right: 10px;"> € </div>
              </template>
              <template v-slot:prepend>
                {{ computedBsToEur }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(EURAmountBcv || computedBsToEur)"
                />
              </template>
            </q-input>

            <q-input
              class="col transparent-input"
              dark
              borderless
              v-model.trim="BcvAmountEUR"
              dense="dense"
              hint="Calculo (Bs.)"
              inputmode="decimal"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              @focus="EURAmountBcv = null"
            >
              <template v-slot:append>
                <div style="font-size:large; padding-right: 10px;"> Bs. </div>
              </template>
              <template v-slot:prepend>
                {{ computedEurToBs }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(BcvAmountEUR || computedEurToBs)"
                />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- TARJETA YUAN -->
      <q-expansion-item @click="CNYreturnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Yuan (¥): {{ CNYOfficialBcv }} <q-icon :color="CNYColorBcv" :name="CNYSymbolBcv"/><br><div class="text-caption">{{ BcvFormatDate }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input
              class="col q-pb-md transparent-input"
              dark
              borderless
              v-model.trim="CNYAmountBcv"
              dense="dense"
              hint="Inserte valor ¥ (CNY)"
              inputmode="decimal"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              @focus="BcvAmountCNY = null"
            >
              <template v-slot:append>
                <div style="font-size:large; padding-right: 10px;"> ¥ </div>
              </template>
              <template v-slot:prepend>
                {{ computedBsToCNY }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(CNYAmountBcv || computedBsToCNY)"
                />
              </template>
            </q-input>

            <q-input
              class="col transparent-input"
              dark
              borderless
              dense="dense"
              hint="Calculo (Bs.)"
              v-model.trim="BcvAmountCNY"
              inputmode="decimal"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              @focus="CNYAmountBcv = null"
            >
              <template v-slot:append>
                <div style="font-size:large; padding-right: 10px;"> Bs. </div>
              </template>
              <template v-slot:prepend>
                {{ computedCNYtoBs }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(BcvAmountCNY || computedCNYtoBs)"
                />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- TARJETA RUBLO -->
      <q-expansion-item @click="RUBreturnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Rublo (₽): {{ RUBOfficialBcv }} <q-icon :color="RUBColorBcv" :name="RUBSymbolBcv"/><br><div class="text-caption">{{ BcvFormatDate }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input
              class="col q-pb-md transparent-input"
              dark
              borderless
              v-model.trim="RUBAmountBcv"
              dense="dense"
              hint="Inserte valor ₽ (RUB)"
              inputmode="decimal"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              @focus="BcvAmountRUB = null"
            >
              <template v-slot:append>
                <div style="font-size:large; padding-right: 10px;"> ₽ </div>
              </template>
              <template v-slot:prepend>
                {{ computedBsToRUB }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(RUBAmountBcv || computedBsToRUB)"
                />
              </template>
            </q-input>

            <q-input
              class="col transparent-input"
              dark
              borderless
              dense="dense"
              hint="Calculo (Bs.)"
              v-model.trim="BcvAmountRUB"
              inputmode="decimal"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              @focus="RUBAmountBcv = null"
            >
              <template v-slot:append>
                <div style="font-size:large; padding-right: 10px;"> Bs. </div>
              </template>
              <template v-slot:prepend>
                {{ computedRUBtoBs }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(BcvAmountRUB || computedRUBtoBs)"
                />
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- TARJETA LIRA -->
      <q-expansion-item @click="TRYreturnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-sm">
            <q-avatar style="font-size: 75px;">
              <img src="/BcvDolarPNG.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h6 style="text-shadow: 1px 1px 4px black;">Lira (₺): {{ TRYOfficialBcv }} <q-icon :color="TRYColorBcv" :name="TRYSymbolBcv"/><br><div class="text-caption">{{ BcvFormatDate }}</div></h6>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input
              class="col q-pb-md transparent-input"
              dark
              borderless
              v-model.trim="TRYAmountBcv"
              dense="dense"
              hint="Inserte valor ₺ (TRY)"
              inputmode="decimal"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              @focus="BcvAmountTRY = null"
            >
              <template v-slot:append>
                <div style="font-size:large; padding-right: 10px;"> ₺ </div>
              </template>
              <template v-slot:prepend>
                {{ computedBsToTRY }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(TRYAmountBcv || computedBsToTRY)"
                />
              </template>
            </q-input>

            <q-input
              class="col transparent-input"
              dark
              borderless
              dense="dense"
              hint="Calculo (Bs.)"
              v-model.trim="BcvAmountTRY"
              inputmode="decimal"
              type="number"
              pattern="[0-9]*\.?[0-9]*"
              @focus="TRYAmountBcv = null"
            >
              <template v-slot:append>
                <div style="font-size:large; padding-right: 10px;"> Bs. </div>
              </template>
              <template v-slot:prepend>
                {{ computedTRYtoBs }}
              </template>
              <template v-slot:after>
                <q-btn
                  flat
                  color="white"
                  icon="mdi-content-copy"
                  class="copy-btn-square q-ml-sm"
                  @click.stop="copyValue(BcvAmountTRY || computedTRYtoBs)"
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

export default defineComponent({
  name: "AnotherCurrenciesComponent",
  setup() {
    const $q = useQuasar();

    const bcvHistory = ref([]);
    const parallelHistory = ref([]);
    const availableDates = ref([]);
    const selectedDate = ref(null);

    const consultHourBcv = ref('');
    const bcvVigenciaDate = ref('');
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
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(fecha);

        if (fechaTexto) {
          return `${fechaTexto}, ${horaTexto}`;
        }
        return new Intl.DateTimeFormat('es-VE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(fecha);
      }

      return fechaTexto;
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

    function updateValuesForDate(dateStr) {
      if (!dateStr || !bcvHistory.value.length) return;

      // Busca la tasa cuya Fecha_capturada coincida con la fecha elegida (o la anterior más cercana para fines de semana/feriados)
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
        bcvVigenciaDate.value = dateStr;

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

          // 1. Binance aporta la referencia del día en curso
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

          // 2. BCV aporta su Fecha_capturada (incluyendo el día siguiente si ya existe registro en BD)
          if (Array.isArray(bcvHistory.value)) {
            bcvHistory.value.forEach(item => {
              const bcvDate = getBcvDateStr(item);
              if (bcvDate) {
                datesSet.add(bcvDate);
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
      copyValue,
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
