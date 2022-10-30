<template>
  <section class="hero is-fullheight is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <div class="box">
            <back-section class="mb-5" @click="goBack" />
            <confirm-account-form
              v-model="user"
              title="パスワード確認"
              active-step-num="3"
              step-sum="4"
              @click="goNext"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ConfirmAccountForm from '../../components/molecules/ConfirmAccountForm.vue'
import BackSection from '../../components/molecules/BackSection.vue'
import { User } from '../../model/User'
import { $axios } from '../../utils/api'

export type DataType = {
  user: User
}
export default Vue.extend({
  auth: false,
  components: { ConfirmAccountForm, BackSection },
  data(): DataType {
    return {
      user: this.$store.state.user,
    }
  },
  methods: {
    async goNext() {
      await $axios
        .$post('/api/users', this.user)
        .then(() => {
          this.$router.push('complete')
        })
        .catch((error) => {
          this.$nuxt.error(error)
        })
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
