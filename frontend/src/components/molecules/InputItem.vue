<template>
  <div class="field mb-4">
    <label class="label is-size-5" v-text="title"></label>
    <div class="control">
      <validation-provider v-slot="{ errors }" ref="provider" :name="name" :rules="rules">
        <base-input
          :type="type"
          :name="name"
          :value="value"
          :placeholder="placeholder"
          @input="sendValue"
        />
        <span class="validation-error has-text-danger has-text-weight-bold">{{
          errors[0]
        }}</span>
      </validation-provider>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from '../atoms/BaseInput.vue'

export default Vue.extend({
  components: {
    BaseInput,
  },
  props: {
    title: { type: String, default: '' },
    rules: { type: String, default: 'alphaNum' },
    type: { type: String, default: 'text' },
    name: { type: String, default: '' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
  },
  methods: {
    sendValue(newValue: string): void {
      this.$emit('input', newValue)
    },
  },
})
</script>
