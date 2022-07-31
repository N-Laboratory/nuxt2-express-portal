<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <register-accountForm @click="goNext" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import RegisterAccountForm from '../../components/molecule/RegisterAccountForm.vue'
import { User } from '../../model/User'

export default Vue.extend({
  components: { RegisterAccountForm },
  methods: {
    goNext(user: User): void {
      this.$store.commit('updateUser', user)
      try {
        this.$router.push('confirm')
      } catch (error: any) {
        this.$nuxt.error(error)
      }
    },
  },
})
</script>
