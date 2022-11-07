<template>
  <section class="hero is-fullheight is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <reset-password-form
            v-model="computedUser"
            active-step-num="2"
            step-sum="4"
            @click="goNext"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '../../model/User'
import ResetPasswordForm from '../../components/molecules/ResetPasswordForm.vue'
export type DataType = {
  user: User
}
export default Vue.extend({
  auth: false,
  components: { ResetPasswordForm },
  computed: {
    computedUser: {
      get() {
        return this.$store.state.user
      },
      set(password: string) {
        this.$store.commit('updatePassword', password)
      },
    },
  },
  methods: {
    goNext() {
      try {
        this.$router.push('confirm')
      } catch (error: any) {
        this.$nuxt.error(error)
      }
    },
  },
})
</script>
