<template>
  <div class="q-pa-md">
    <!-- Controles de Filtro: Rango de Tiempo -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12">
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

    <!-- Contenedor del Gráfico con tarjeta transparente -->
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
  name: 'USDTChartComponent',
  components: { LineChart },
  setup() {
    const $q = useQuasar();
    const loaded = ref(false);
    const rawData = ref([]);

    const rangeOptions = [
      { label: '1 Semana', value: 7 },
      { label: '1 Mes', value: 30 },
      { label: '3 Meses', value: 90 },
      { label: 'Todo el historial', value: 0 }
    ];

    const selectedRange = ref(30);

    const chartData = ref({
      labels: [],
      datasets: []
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
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

    // Formatear fecha local de Venezuela para el eje X
    function formatLocalDate(utcDateStr) {
      if (!utcDateStr) return '';
      const date = new Date(utcDateStr);
      const options = {
        timeZone: 'America/Caracas',
        day: '2-digit',
        month: '2-digit'
      };
      return new Intl.DateTimeFormat('es-VE', options).format(date);
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
      const dataValues = filteredData.map(item => item.usdt_ves || 0);

      chartData.value = {
        labels,
        datasets: [
          {
            label: 'USDT (Binance P2P)',
            data: dataValues,
            borderColor: '#F0B90B', // Amarillo emblemático Binance / USDT
            backgroundColor: '#F0B90B',
            borderWidth: 3,
            tension: 0.2,
            fill: false
          }
        ]
      };
    }

    async function loadBinanceChartData() {
      try {
        const resBinance = await axios.get(
          import.meta.env.VITE_SUPABASE_URL + '/rest/v1/rpc/obtener_ultimas_tasas_por_dia_binance',
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              Authorization: 'Bearer ' + import.meta.env.VITE_SUPABASE_KEY
            }
          }
        );

        if (resBinance.status === 200) {
          const data = Array.isArray(resBinance.data) ? resBinance.data : (resBinance.data?.data || []);
          // Ordenar cronológicamente (ascendente)
          rawData.value = data.sort((a, b) => new Date(a.fecha_consulta) - new Date(b.fecha_consulta));

          updateChartDatasets();
          loaded.value = true;
        }
      } catch (error) {
        console.error('Error al cargar datos para el gráfico Binance:', error);
        $q.notify({
          message: 'No se pudo cargar el historial gráfico de Binance',
          color: 'negative'
        });
      }
    }

    watch(selectedRange, () => {
      updateChartDatasets();
    });

    onMounted(() => {
      loadBinanceChartData();
    });

    return {
      loaded,
      chartData,
      chartOptions,
      rangeOptions,
      selectedRange
    };
  }
});
</script>

<style scoped>
.chart-shadow {
  filter: drop-shadow(2px 3px 4px rgba(0, 0, 0, 0.85));
}
</style>
