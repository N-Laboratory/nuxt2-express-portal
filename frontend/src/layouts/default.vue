<template>
  <div class="sf-site-all">
    <header-menu />
    <nuxt class="sf-site-content" />
    <footer-menu />
  </div>
</template>

<script lang="ts">
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
<style>
.sf-site-all {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.sf-site-content {
  flex: 1;
}
</style>
