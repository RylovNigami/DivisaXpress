<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: black" class="safe-area-top">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-avatar class="q-ml-sm">
          <img src="/MainLogo.png">
        </q-avatar>
        <q-toolbar-title>DivisaXpress</q-toolbar-title>
        <p class="q-pt-md">V11.0</p>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      style="background-color: black"
      class="font-color hero-image"
    >
      <q-list>
        <!-- Menú de Inicio -->
        <q-item-label header>Navegación principal</q-item-label>
        <q-item clickable to="/" v-ripple exact>
          <q-item-section avatar>
            <q-avatar color="grey-9" text-color="white" icon="mdi-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">Inicio</q-item-label>
            <q-item-label caption>Pantalla principal</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator dark class="q-my-xs" />

        <q-item-label header>Referencias</q-item-label>

        <!-- Elementos de referencias con logos estandarizados -->
        <q-item
          v-for="link in linksList"
          :key="link.title"
          tag="a"
          :href="link.link"
          target="_blank"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar class="logo-fix-avatar">
              <img :src="link.icon" class="logo-fix-img" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator dark class="q-my-xs" />

        <q-item-label header>Gráficos</q-item-label>
        <q-item clickable to="/chart" v-ripple exact>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="mdi-finance" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">Historial de Cotizaciones</q-item-label>
            <q-item-label caption>Gráficos e info de las divisas</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const linksList = [
  {
    title: '[Instagram] Banco Central de Venezuela',
    caption: 'Visita el instagram de BCV',
    icon: '/BcvDolarPNG.png',
    link: 'https://www.instagram.com/bcv.org.ve/',
  },
  {
    title: '[Binance] Cotización del USDT',
    caption: 'Visita la cotización del USDT en Binance',
    icon: '/binance.png',
    link: 'https://p2p.binance.com/trade/all-payments/USDT?fiat=VES',
  },
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.logo-fix-avatar {
  width: 40px;
  height: 40px;
  background: transparent !important;
}

.logo-fix-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
