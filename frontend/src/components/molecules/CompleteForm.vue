<template>
  <div>
    <steps
      class="mt-3 mb-5"
      :active-step-num="activeStepNum"
      :step-sum="stepSum"
    />
    <h1 class="title has-text-black" v-text="title"></h1>
    <div class="field mb-4">
      <label class="label is-size-5" v-text="msg"></label>
    </div>
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
      <div class="content article-body has-text-centered">
        <base-link class="has-text-link" path="/login"
          >TOPページへ戻る</base-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import BaseLink from '../atoms/BaseLink.vue'
import { User } from './../../model/User'
import Steps from './Steps.vue'

export default Vue.extend({
  components: { BaseLink, Steps },
  props: {
    title: { type: String, default: '' },
    msg: { type: String, default: '' },
    value: Object as PropOptions<User>,
    activeStepNum: String,
    stepSum: String,
  },
})
</script>
