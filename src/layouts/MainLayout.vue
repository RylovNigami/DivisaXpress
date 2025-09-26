<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background-color: black; padding-top: env(safe-area-inset-top);">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-avatar class="q-ml-sm">
          <img src="\MainLogo.png">
        </q-avatar>
        <q-toolbar-title>DivisaXpress</q-toolbar-title>

        <p class="q-pt-md">V.8.0</p>
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
    title: '[Instagram] Monitor Dolar',
    caption: 'Visita el instagram de Monitor Dolar',
    icon: 'mdi-currency-usd',
    link: 'https://www.instagram.com/monitordollarvzlar/',
  },
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
