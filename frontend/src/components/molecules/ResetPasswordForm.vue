<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <div class="box">
      <steps
        class="mt-3 mb-5"
        :active-step-num="activeStepNum"
        :step-sum="stepSum"
      />
      <h1 class="title has-text-black">パスワード登録</h1>
      <div class="field mb-4">
        <label class="label is-size-5">Name</label>
        <div class="control">
          <span
            data-testid="rpf-name"
            class="is-size-5 text-break"
            v-text="value.name"
          ></span>
        </div>
      </div>

      <input-item
        title="New Password"
        rules="required|alphaNum|max:64"
        type="password"
        name="password"
        :value="value.password"
        placeholder="password"
        @input="sendPassword"
      />

      <div class="field mb-3">
        <div class="control">
          <base-button
            data-testid="rpf-next"
            text="次へ"
            :disabled="invalid"
            @click="goNext"
          />
        </div>
      </div>
    </div>
  </validation-observer>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ValidationObserver } from 'vee-validate'
import BaseButton from '../atoms/BaseButton.vue'
import InputItem from '../molecules/InputItem.vue'
import { User } from './../../model/User'
import Steps from './Steps.vue'

export default Vue.extend({
  components: { BaseButton, InputItem, Steps },
  props: {
    value: Object as PropOptions<User>,
    activeStepNum: String,
    stepSum: String,
  },
  methods: {
    sendPassword(password: string): void {
      this.$emit('input', password)
    },
    goNext(): void {
      ;(this.$refs.observer as InstanceType<typeof ValidationObserver>).reset()
      this.$emit('click')
    },
  },
})
</script>
