<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: black">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-avatar class="q-ml-sm">
          <img src="\MainLogo.png">
        </q-avatar>
        <q-toolbar-title>DivisaXpress</q-toolbar-title>

        <p class="q-pt-md">V.8.1</p>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      style="background-color: black"
      class="font-color"
    >
      <q-list>
        <q-item-label header> Referencias </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: '[Instagram] Banco Central de Venezuela',
    caption: 'Visita el instagram de BCV',
    icon: 'mdi-bank',
    link: 'https://www.instagram.com/bcv.org.ve/',
  },
  {
    title: '[Binance] Cotizacion del USDT',
    caption: 'Visita la cotizacion del USDT en Binance',
    icon: 'mdi-currency-usd',
    link: 'https://p2p.binance.com/trade/all-payments/USDT?fiat=VES',
  },
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
