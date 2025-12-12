<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href=props.link
  >
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-avatar style="font-size: 60px;">
        <img :src=props.icon />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  link: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  }
})
</script>
