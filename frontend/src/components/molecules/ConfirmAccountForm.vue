<template>
  <div>
    <steps
      class="mt-3 mb-5"
      :active-step-num="activeStepNum"
      :step-sum="stepSum"
    />
    <h1 class="title has-text-black" v-text="title"></h1>
    <div class="field mb-4">
      <label class="label is-size-5">Name</label>
      <div class="control">
        <span class="is-size-5 text-break" v-text="value.getName()"></span>
      </div>
    </div>

    <div class="field mb-5">
      <label class="label is-size-5">Password</label>
      <div class="control">
        <span class="is-size-5 text-break" v-text="value.getPassword()"></span>
      </div>
    </div>

    <div class="field mb-3">
      <div class="control">
        <base-button text="次へ" @click="goNext" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '../../model/User'
import BaseButton from '../atoms/BaseButton.vue'
import Steps from './Steps.vue'

export default Vue.extend({
  components: {
    BaseButton,
    Steps,
  },
  props: {
    title: { type: String, default: '' },
    value: User,
    activeStepNum: String,
    stepSum: String,
  },
  methods: {
    goNext(): void {
      this.$emit('click')
    },
  },
})
</script>
