<template>
  <div class="back-area">
    <font-awesome-icon class="chevron-left" icon="fa-chevron-left" />
    <span class="is-size-5 back-btn" data-testid="bs-back" @click="goBack"
      >戻る</span
    >
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    goBack(): void {
      this.$emit('click')
    },
  },
})
</script>

<style>
.chevron-left,
.back-btn:hover {
  cursor: pointer;
  font-weight: bold;
}
.chevron-left {
  font-size: 22px;
}
</style>
