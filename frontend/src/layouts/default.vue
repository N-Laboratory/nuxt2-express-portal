<template>
  <div class="sf-site-all">
    <header-menu data-testid="default-header" />
    <nuxt class="sf-site-content" data-testid="default-content" />
    <footer-menu data-testid="default-footer" />
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
