<template>
  <div>
    <header-menu />
    <nuxt />
    <footer-menu />
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderMenu from '../components/molecules/HeaderMenu.vue'
import FooterMenu from '../components/molecules/FooterMenu.vue'

export default Vue.extend({
  components: {
    HeaderMenu,
    FooterMenu,
  },
})
</script>
