<template>
  <div>
    <!-- Contenedor pegajoso para los filtros anclado debajo de las pestañas -->
    <q-page-sticky position="top" expand :offset="[0, 35]" style="z-index: 9;">
      <div class="full-width q-px-md q-py-sm" style="background-color: #030000;">
        <div class="row q-col-gutter-md">
          <!-- Selector de Monedas -->
          <div class="col-12 col-md-8">
            <q-select
              v-model="selectedCurrencies"
              :options="currencyOptions"
              label="Seleccionar monedas a graficar"
              multiple
              dense
              dark
              outlined
              emit-value
              map-options
              options-dense
            >
              <template v-slot:selected-item="scope">
                <q-chip
                  dense
                  removable
                  @remove="scope.removeAtIndex(scope.index)"
                  color="orange"
                  text-color="white"
                  class="q-ma-xs"
                >
                  {{ scope.opt.label }}
                </q-chip>
              </template>
            </q-select>
          </div>

          <!-- Selector de Rango de Tiempo -->
          <div class="col-12 col-md-4">
            <q-select
              v-model="selectedRange"
              :options="rangeOptions"
              label="Rango de tiempo"
              dense
              dark
              outlined
              emit-value
              map-options
              options-dense
            />
          </div>
        </div>
      </div>
    </q-page-sticky>

    <!-- Contenedor del Gráfico con margen superior para no quedar oculto -->
    <div style="padding-top: 110px;" class="q-pa-md"> <!-- Ajusta el 140px si los selectores ocupan más espacio vertical -->
      <q-card flat class="transparent">
        <q-card-section>
          <div style="height: 350px; position: relative;">
            <LineChart v-if="loaded" :data="chartData" :options="chartOptions" class="chart-shadow" />
            <div v-else class="flex flex-center" style="height: 100%;">
              <q-spinner color="primary" size="3em" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line as LineChart } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default defineComponent({
  name: 'BCVChartComponent',
  components: { LineChart },
  setup() {
    const $q = useQuasar();
    const loaded = ref(false);
    const rawData = ref([]);

    const currencyOptions = [
      { label: 'Dólar ($ - USD)', value: 'usd', color: '#21BA45' },
      { label: 'Euro (€ - EUR)', value: 'eur', color: '#31CCEC' },
      { label: 'Yuan (¥ - CNY)', value: 'cny', color: '#F2C037' },
      { label: 'Rublo (₽ - RUB)', value: 'rub', color: '#C10000' },
      { label: 'Lira (₺ - TRY)', value: 'try', color: '#9C27B0' }
    ];

    const selectedCurrencies = ref(['usd', 'eur']);

    const rangeOptions = [
      { label: '1 Semana', value: 7 },
      { label: '1 Mes', value: 30 },
      { label: '3 Meses', value: 90 },
      { label: '1 año', value: 365 }
    ];

    const selectedRange = ref(30);

    const chartData = ref({
      labels: [],
      datasets: []
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 4,          // Tamaño visual normal del punto en el gráfico
          hitRadius: 30,      // Área táctil invisible (30px alrededor del punto para los dedos)
          hoverRadius: 7      // Tamaño visual del punto al momento de ser tocado
        }
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff',
            maxTicksLimit: 12,
            font: { weight: 'bold', size: 11 }
          },
          grid: { color: 'rgba(255, 255, 255, 0.15)' }
        },
        y: {
          ticks: {
            color: '#ffffff',
            font: { weight: 'bold', size: 12 }
          },
          grid: { color: 'rgba(255, 255, 255, 0.15)' }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#ffffff',
            font: { size: 12, weight: 'bold' }
          }
        }
      }
    });

    function formatLocalDate(utcDateStr) {
      if (!utcDateStr) return '';
      const date = new Date(utcDateStr);
      date.setDate(date.getDate() + 1);
      return new Intl.DateTimeFormat('es-VE', {
        day: '2-digit',
        month: '2-digit'
      }).format(date);
    }

    function updateChartDatasets() {
      if (!rawData.value.length) return;

      let filteredData = [...rawData.value];
      if (selectedRange.value > 0) {
        if (selectedRange.value === 7) {
          filteredData = filteredData.slice(-7);
        } else {
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - selectedRange.value);
          filteredData = filteredData.filter(item => new Date(item.fecha_consulta) >= cutoffDate);
        }
      }

      const labels = filteredData.map(item => formatLocalDate(item.fecha_consulta));

      const datasets = selectedCurrencies.value.map(currKey => {
        const opt = currencyOptions.find(o => o.value === currKey);
        const dataValues = filteredData.map(item => item[currKey] || 0);

        return {
          label: opt ? opt.label : currKey,
          data: dataValues,
          borderColor: opt ? opt.color : '#ffffff',
          backgroundColor: opt ? opt.color : '#ffffff',
          borderWidth: 3,
          tension: 0.2,
          fill: false
        };
      });

      chartData.value = {
        labels,
        datasets
      };
    }

    async function loadBcvChartData() {
      try {
        const resBcv = await axios.get(
          import.meta.env.VITE_SUPABASE_URL + '/rest/v1/rpc/obtener_tasas_bcv',
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              Authorization: 'Bearer ' + import.meta.env.VITE_SUPABASE_KEY
            }
          }
        );

        if (resBcv.status === 200) {
          const data = Array.isArray(resBcv.data) ? resBcv.data : (resBcv.data?.data || []);
          rawData.value = data.sort((a, b) => new Date(a.fecha_consulta) - new Date(b.fecha_consulta));

          updateChartDatasets();
          loaded.value = true;
        }
      } catch (error) {
        console.error('Error al cargar datos para el gráfico BCV:', error);
        $q.notify({
          message: 'No se pudo cargar el historial gráfico del BCV',
          color: 'negative'
        });
      }
    }

    watch([selectedCurrencies, selectedRange], () => {
      updateChartDatasets();
    });

    onMounted(() => {
      loadBcvChartData();
    });

    return {
      loaded,
      chartData,
      chartOptions,
      currencyOptions,
      selectedCurrencies,
      rangeOptions,
      selectedRange
    };
  }
});
</script>

<style scoped>
.shadow-text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

/* Sombra proyectada directamente sobre todo el lienzo del gráfico (números, fechas y leyendas) */
.chart-shadow {
  filter: drop-shadow(3px 2px 4px rgba(0, 0, 0, 0.85));
}
</style>
