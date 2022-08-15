<template>
  <section class="hero is-fullheight is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <reset-password-form v-model="user" @click="goNext" />
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
  components: { ResetPasswordForm },
  data(): DataType {
    return {
      user: this.$store.state.user,
    }
  },
  methods: {
    goNext() {
      this.$store.commit('updateUser', this.user)

      try {
        this.$router.push('confirm')
      } catch (error: any) {
        this.$nuxt.error(error)
      }
    },
  },
})
</script>
