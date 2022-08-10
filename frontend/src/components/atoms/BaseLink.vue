<template>
  <a @click="goNext"><slot></slot></a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    path: { type: String, default: '' },
  },
  methods: {
    goNext(): void {
      try {
        this.$router.push(this.path)
      } catch (error: any) {
        this.$nuxt.error(error)
      }
    },
  },
})
</script>
