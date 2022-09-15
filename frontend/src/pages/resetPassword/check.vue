<template>
  <section class="hero is-fullheight is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <check-account-form
            v-model="user"
            active-step-num="1"
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
import CheckAccountForm from '../../components/molecules/CheckAccountForm.vue'
import { User } from '../../model/User'
import { $axios } from '../../utils/api'

export type DataType = {
  user: User
}
export default Vue.extend({
  auth: false,
  components: { CheckAccountForm },
  data(): DataType {
    return {
      user: new User(0, '', ''),
    }
  },
  methods: {
    async goNext() {
      await $axios
        .$post('/api/checkUser', this.user)
        .then((userId: number) => {
          if (userId === 0) {
            this.$swal({
              title: '入力エラー',
              html: 'アカウントが存在しません。',
              icon: 'error',
            })
          } else {
            this.user.setId(userId)
            this.$store.commit('updateUser', this.user)
            this.$router.push('input')
          }
        })
        .catch((error) => {
          this.$nuxt.error(error)
        })
    },
  },
})
</script>
