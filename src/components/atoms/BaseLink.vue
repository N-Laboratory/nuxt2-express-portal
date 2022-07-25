<template>
  <a @click="goPage(path)" v-text="text"></a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: { type: String, default: '' },
    path: { type: String, default: '' },
  },
  methods: {
    goPage(path: string): void {
      try {
        this.$router.push(path)
      } catch (error: any) {
        this.$nuxt.error(error)
      }
    },
  },
})
</script>
