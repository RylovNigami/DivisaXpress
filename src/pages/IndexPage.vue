<template>
  <q-page class="hero-image font-color">
    <div class="row q-mx-lg flex-center">
      <p>Fecha: {{ consultDateFixed }}</p>
      <br />
      <p>Hora: {{ consultHour }}</p>
    </div>
    <div class="q-pa-md" >

      <q-expansion-item @click="returnToZeroBcv()">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar style="font-size: 80px;">
              <img src="/BcvDolarPNG.png" >
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h5>Oficial: {{ OfficialValue }}</h5>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section >
            <q-input
            class="col q-pb-xl"
            outlined
            v-model.trim="amountBcv"
            dense="dense"
            hint="Inserte valor $"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="returnBcvValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo" readonly>
                <template v-slot:prepend>
                  {{ resultBcv }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item @click="returnToZeroParallel()">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar style="font-size: 80px;">
              <img src="/monitorDolarPng.png" >
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <h5>Paralelo: {{ ParallelValue }}</h5>
          </q-item-section>
        </template>

        <q-card class="transparent">
          <q-card-section>
            <q-input class="col q-pb-xl"
            outlined
            v-model.trim="amountParallel"
            dense="dense"
            hint="Inserte valor $"
            inputmode="numeric"
            type="tel"
            >
              <template v-slot:after>
                <q-btn round dense flat icon="send" @click="returnParallelValue()"/>
              </template>
            </q-input>
            <q-input class="col" outlined dense="dense" hint="Calculo" readonly>
                <template v-slot:prepend>
                  {{ resultParallel }}
                </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-expansion-item>
  </div>

    <div class="row flex-center">RylovTech ©</div>
    <div class="row flex-center">2025 · Venezuela</div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import { ref } from 'vue'

const consultDate = ref('');
const consultDateFixed = ref('')
const consultHour = ref('');
const OfficialValue = ref();
const ParallelValue = ref();
const amountBcv = ref();
const amountParallel = ref();
const resultBcv = ref();
const resultParallel = ref();

function returnBcvValue() {
  resultBcv.value = (OfficialValue.value * amountBcv.value).toFixed(2);
};

function returnParallelValue() {
  resultParallel.value = (ParallelValue.value * amountParallel.value).toFixed(2);
};

function returnToZeroBcv() {
  amountBcv.value = null;
  resultBcv.value = null;
};

function returnToZeroParallel() {
  amountParallel.value = null;
  resultParallel.value = null;
};

export default defineComponent({
  name: 'IndexPage',
  components: {},

  setup() {

    return {
      returnToZeroBcv,
      returnToZeroParallel,
      returnBcvValue,
      returnParallelValue,
      consultDate,
      consultDateFixed,
      consultHour,
      OfficialValue,
      ParallelValue,
      amountBcv,
      amountParallel,
      resultBcv,
      resultParallel
    }
  },
  beforeMount() {
    axios.get('https://ve.dolarapi.com/v1/dolares').then(function (response) {
      let fecha_raw = ref()
      fecha_raw.value = new Date(response.data[0].fechaActualizacion)
      consultDate.value = fecha_raw.value.toDateString()


      switch (consultDate.value.slice(0,3)) {
        case 'Sun':
          switch (consultDate.value.slice(4,7)) {
          case 'Jan':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Enero' + consultDate.value.slice(11)
          break;
          case 'Feb':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Febrero ' + consultDate.value.slice(11)
          break;
          case 'Mar':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Marzo ' + consultDate.value.slice(11)
          break;
          case 'Apr':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Abril ' + consultDate.value.slice(11)
          break;
          case 'May':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Mayo ' + consultDate.value.slice(11)
          break;
          case 'Jun':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Junio ' + consultDate.value.slice(11)
          break;
          case 'Jul':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Julio ' + consultDate.value.slice(11)
          break;
            case 'Aug':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Agosto ' + consultDate.value.slice(11)
          break;
          case 'Sep':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Septiembre ' + consultDate.value.slice(11)
          break;
          case 'Oct':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Octubre ' + consultDate.value.slice(11)
          break;
          case 'Nov':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Noviembre ' + consultDate.value.slice(11)
          break;
          case 'Dec':
            consultDateFixed.value= 'Domingo ' + consultDate.value.slice(8,10) + ', Diciembre ' + consultDate.value.slice(11)
          break;
          }
        break;
        case 'Mon':
          switch (consultDate.value.slice(4,7)) {
            case 'Jan':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Enero' + consultDate.value.slice(11)
          break;
          case 'Feb':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Febrero ' + consultDate.value.slice(11)
          break;
          case 'Mar':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Marzo ' + consultDate.value.slice(11)
          break;
          case 'Apr':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Abril ' + consultDate.value.slice(11)
          break;
          case 'May':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Mayo ' + consultDate.value.slice(11)
          break;
          case 'Jun':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Junio ' + consultDate.value.slice(11)
          break;
          case 'Jul':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Julio ' + consultDate.value.slice(11)
          break;
            case 'Aug':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Agosto ' + consultDate.value.slice(11)
          break;
          case 'Sep':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Septiembre ' + consultDate.value.slice(11)
          break;
          case 'Oct':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Octubre ' + consultDate.value.slice(11)
          break;
          case 'Nov':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Noviembre ' + consultDate.value.slice(11)
          break;
          case 'Dec':
            consultDateFixed.value= 'Lunes ' + consultDate.value.slice(8,10) + ', Diciembre ' + consultDate.value.slice(11)
          break;
          }
        break;
        case 'Tue':
          switch (consultDate.value.slice(4,7)) {
            case 'Jan':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Enero' + consultDate.value.slice(11)
          break;
          case 'Feb':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Febrero ' + consultDate.value.slice(11)
          break;
          case 'Mar':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Marzo ' + consultDate.value.slice(11)
          break;
          case 'Apr':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Abril ' + consultDate.value.slice(11)
          break;
          case 'May':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Mayo ' + consultDate.value.slice(11)
          break;
          case 'Jun':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Junio ' + consultDate.value.slice(11)
          break;
          case 'Jul':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Julio ' + consultDate.value.slice(11)
          break;
            case 'Aug':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Agosto ' + consultDate.value.slice(11)
          break;
          case 'Sep':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Septiembre ' + consultDate.value.slice(11)
          break;
          case 'Oct':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Octubre ' + consultDate.value.slice(11)
          break;
          case 'Nov':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Noviembre ' + consultDate.value.slice(11)
          break;
          case 'Dec':
            consultDateFixed.value= 'Martes ' + consultDate.value.slice(8,10) + ', Diciembre ' + consultDate.value.slice(11)
          break;
          }
        break;
        case 'Wed':
          switch (consultDate.value.slice(4,7)) {
            case 'Jan':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Enero' + consultDate.value.slice(11)
          break;
          case 'Feb':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Febrero ' + consultDate.value.slice(11)
          break;
          case 'Mar':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Marzo ' + consultDate.value.slice(11)
          break;
          case 'Apr':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Abril ' + consultDate.value.slice(11)
          break;
          case 'May':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Mayo ' + consultDate.value.slice(11)
          break;
          case 'Jun':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Junio ' + consultDate.value.slice(11)
          break;
          case 'Jul':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Julio ' + consultDate.value.slice(11)
          break;
            case 'Aug':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Agosto ' + consultDate.value.slice(11)
          break;
          case 'Sep':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Septiembre ' + consultDate.value.slice(11)
          break;
          case 'Oct':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Octubre ' + consultDate.value.slice(11)
          break;
          case 'Nov':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Noviembre ' + consultDate.value.slice(11)
          break;
          case 'Dec':
            consultDateFixed.value= 'Miércoles ' + consultDate.value.slice(8,10) + ', Diciembre ' + consultDate.value.slice(11)
          break;
          }
        break;
        case 'Thu':
          switch (consultDate.value.slice(4,7)) {
            case 'Jan':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Enero' + consultDate.value.slice(11)
          break;
          case 'Feb':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Febrero ' + consultDate.value.slice(11)
          break;
          case 'Mar':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Marzo ' + consultDate.value.slice(11)
          break;
          case 'Apr':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Abril ' + consultDate.value.slice(11)
          break;
          case 'May':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Mayo ' + consultDate.value.slice(11)
          break;
          case 'Jun':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Junio ' + consultDate.value.slice(11)
          break;
          case 'Jul':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Julio ' + consultDate.value.slice(11)
          break;
            case 'Aug':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Agosto ' + consultDate.value.slice(11)
          break;
          case 'Sep':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Septiembre ' + consultDate.value.slice(11)
          break;
          case 'Oct':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Octubre ' + consultDate.value.slice(11)
          break;
          case 'Nov':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Noviembre ' + consultDate.value.slice(11)
          break;
          case 'Dec':
            consultDateFixed.value= 'Jueves ' + consultDate.value.slice(8,10) + ', Diciembre ' + consultDate.value.slice(11)
          break;
          }
        break;
        case 'Fri':
          switch (consultDate.value.slice(4,7)) {
            case 'Jan':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Enero' + consultDate.value.slice(11)
          break;
          case 'Feb':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Febrero ' + consultDate.value.slice(11)
          break;
          case 'Mar':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Marzo ' + consultDate.value.slice(11)
          break;
          case 'Apr':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Abril ' + consultDate.value.slice(11)
          break;
          case 'May':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Mayo ' + consultDate.value.slice(11)
          break;
          case 'Jun':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Junio ' + consultDate.value.slice(11)
          break;
          case 'Jul':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Julio ' + consultDate.value.slice(11)
          break;
            case 'Aug':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Agosto ' + consultDate.value.slice(11)
          break;
          case 'Sep':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Septiembre ' + consultDate.value.slice(11)
          break;
          case 'Oct':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Octubre ' + consultDate.value.slice(11)
          break;
          case 'Nov':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Noviembre ' + consultDate.value.slice(11)
          break;
          case 'Dec':
            consultDateFixed.value= 'Viernes ' + consultDate.value.slice(8,10) + ', Diciembre ' + consultDate.value.slice(11)
          break;
          }
        break;
        case 'Sat':
          switch (consultDate.value.slice(4,7)) {
            case 'Jan':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Enero' + consultDate.value.slice(11)
          break;
          case 'Feb':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Febrero ' + consultDate.value.slice(11)
          break;
          case 'Mar':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Marzo ' + consultDate.value.slice(11)
          break;
          case 'Apr':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Abril ' + consultDate.value.slice(11)
          break;
          case 'May':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Mayo ' + consultDate.value.slice(11)
          break;
          case 'Jun':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Junio ' + consultDate.value.slice(11)
          break;
          case 'Jul':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Julio ' + consultDate.value.slice(11)
          break;
            case 'Aug':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Agosto ' + consultDate.value.slice(11)
          break;
          case 'Sep':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Septiembre ' + consultDate.value.slice(11)
          break;
          case 'Oct':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Octubre ' + consultDate.value.slice(11)
          break;
          case 'Nov':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Noviembre ' + consultDate.value.slice(11)
          break;
          case 'Dec':
            consultDateFixed.value= 'Sabado ' + consultDate.value.slice(8,10) + ', Diciembre ' + consultDate.value.slice(11)
          break;
          }
        break;
      }
      consultHour.value = fecha_raw.value.toTimeString()
      OfficialValue.value = response.data[0].promedio.toFixed(2)
      ParallelValue.value = response.data[1].promedio
    })
  },
})
</script>
