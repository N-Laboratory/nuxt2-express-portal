<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <div class="box">
            <back-section class="mb-5" @click="goBack" />
            <confirm-account-form :user="user" @click="goNext" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ConfirmAccountForm from '../../components/molecule/ConfirmAccountForm.vue'
import BackSection from '../../components/molecule/BackSection.vue'
import { User } from '../../model/User'
export type DataType = {
  user: User
}
export default Vue.extend({
  components: { ConfirmAccountForm, BackSection },
  data(): DataType {
    return {
      // 全画面で保存した入力情報を取得
      user: this.$store.state.user,
    }
  },
  methods: {
    goNext() {
      console.log('next')
    },
    goBack() {
      try {
        this.$router.go(-1)
      } catch (error: any) {
        this.$nuxt.error(error)
      }
    },
  },
})
</script>
