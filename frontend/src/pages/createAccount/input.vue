<template>
  <section class="hero is-fullheight is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <register-account-form
            v-model="user"
            active-step-num="1"
            step-sum="3"
            @click="goNext"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import RegisterAccountForm from '../../components/molecules/RegisterAccountForm.vue'
import { User } from '../../model/User'
import { $axios } from '../../utils/api'

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
  created() {
    const storeUser: User = this.$store.state.user
    if (storeUser && storeUser.name && storeUser.password) {
      this.user = storeUser
    }
  },
  methods: {
    async goNext() {
      await $axios
        .$post('/api/existUser', this.user)
        .then((existUser: boolean) => {
          if (existUser) {
            this.$swal({
              title: '入力エラー',
              html: 'Nameが使用されています。',
              icon: 'error',
            })
          } else {
            this.$store.commit('updateUser', this.user)

            try {
              this.$router.push('confirm')
            } catch (error: any) {
              this.$nuxt.error(error)
            }
          }
        })
        .catch((error) => {
          this.$nuxt.error(error)
        })
    },
  },
})
</script>
