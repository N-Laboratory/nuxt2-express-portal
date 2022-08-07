<template>
  <div class="back-area">
    <div class="arrow" @click="goBack"></div>
    <span class="is-size-5 back-btn" @click="goBack">戻る</span>
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
.back-area .arrow:hover,
.back-area .back-btn:hover {
  cursor: pointer;
  font-weight: bold;
}

.back-area .arrow {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid;
  border-color: transparent transparent #565656 #565656;
  transform: rotate(45deg);
}
</style>
