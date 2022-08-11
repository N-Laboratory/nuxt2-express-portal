<template>
  <section class="hero is-fullheight is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <register-account-form v-model="user" @click="goNext" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import RegisterAccountForm from '../../components/molecules/RegisterAccountForm.vue'
import { User } from '../../model/User'

export type DataType = {
  user: User
}
export default Vue.extend({
  components: { RegisterAccountForm },
  data(): DataType {
    return {
      user: new User(0, '', ''),
    }
  },
  methods: {
    goNext(): void {
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
