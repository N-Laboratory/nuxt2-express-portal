<template>
  <div>
    <h1 class="title has-text-black" v-text="title"></h1>
    <div class="field mb-4">
      <label class="label is-size-5" v-text="msg"></label>
    </div>
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
      <div class="content article-body has-text-centered">
        <base-link class="has-text-link" path="/">TOPページへ戻る</base-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseLink from '../atoms/BaseLink.vue'
import { User } from './../../model/User'

export default Vue.extend({
  components: { BaseLink },
  props: {
    title: { type: String, default: '' },
    msg: { type: String, default: '' },
    value: User,
  },
})
</script>
