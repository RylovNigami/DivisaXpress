<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: black" class="safe-area-top">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-avatar class="q-ml-sm q-pa-sm">
          <img src="\MainLogo.png">
        </q-avatar>
        <q-toolbar-title>DivisaXpress</q-toolbar-title>

        <p class="q-pt-md"><V class="10.0"></V></p>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      style="background-color: black"
      class="font-color hero-image"
    >
      <q-list>
        <!--q-item clickable to="/chart">
          <q-item-section
            avatar
          >
            <q-avatar style="font-size: 60px;">
              <img src=public/house.png style="zoom: 50%"/>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item-->
        <q-item-label header> Referencias </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        <!--q-item-label header> Graficos </q-item-label>
        <q-item clickable to="/chart">
          <q-item-section
            avatar
          >
            <q-avatar style="font-size: 60px;">
              <img src=public/img37.png />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Historial de Cotizaciones</q-item-label>
            <q-item-label caption>Graficos e info de las divisas </q-item-label>
          </q-item-section>
        </q-item-->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from '../components/EssentialLink.vue'

const linksList = [
  {
    title: '[Instagram] Banco Central de Venezuela',
    caption: 'Visita el instagram de BCV',
    icon: '/BcvDolarPNG.png',
    link: 'https://www.instagram.com/bcv.org.ve/',
  },
  {
    title: '[Binance] Cotizacion del USDT',
    caption: 'Visita la cotizacion del USDT en Binance',
    icon: '/binance.png',
    link: 'https://p2p.binance.com/trade/all-payments/USDT?fiat=VES',
  },
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
