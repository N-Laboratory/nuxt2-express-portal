<template>
  <div class="field mb-4">
    <label class="label is-size-5" v-text="title"></label>
    <div class="control">
      <validation-provider v-slot="{ errors }" :name="name" :rules="rules">
        <base-input
          v-model="value"
          :type="name"
          :name="name"
          :placeholder="name"
        />
        <span class="has-text-danger has-text-weight-bold">{{
          errors[0]
        }}</span>
      </validation-provider>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from '../atoms/BaseInput.vue'

export type DataType = {
  value: string
}
export default Vue.extend({
  components: {
    BaseInput,
  },
  props: {
    title: { type: String, default: '' },
    rules: { type: String, default: '' },
    type: { type: String, default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
  },
  data() {
    return {
      value: '',
    }
  },
  watch: {
    value(newValue: string): void {
      this.$emit('input', newValue)
    },
  },
})
</script>
