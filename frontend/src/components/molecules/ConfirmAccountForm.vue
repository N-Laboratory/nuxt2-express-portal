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
        <span class="is-size-5 text-break" v-text="value.name"></span>
      </div>
    </div>

    <div class="field mb-5">
      <label class="label is-size-5">Password</label>
      <div class="control">
        <span class="is-size-5 text-break" v-text="value.password"></span>
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
import Vue, { PropOptions } from 'vue'
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
    value: Object as PropOptions<User>,
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
