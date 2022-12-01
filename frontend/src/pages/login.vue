<template>
  <section class="container logi-page is-dark">
    <div class="columns is-multiline mt-0" data-testid="login-page">
      <div class="column is-8 is-offset-2 register">
        <div class="columns">
          <div class="column left">
            <h1 class="title has-text-black is-1">N-LAB</h1>
            <h2 class="subtitle has-text-black colored is-4">Learn IT-Tech.</h2>
            <p>This website is for Learn IT technology.</p>
            <p>This website is for Learn IT technology.</p>
            <p>This website is for Learn IT technology.</p>
            <p>This website is for Learn IT technology.</p>
          </div>
          <div class="column right has-text-centered">
            <h1 class="title has-text-black is-4">Sign In</h1>
            <login-form v-model="user" @click="login" />
            <div class="columns">
              <div class="column">
                <base-link
                  class="has-text-link"
                  path="/resetPassword/check"
                  data-testid="forgot-password"
                >
                  Forgot Password?
                </base-link>
              </div>
              <div class="column">
                <base-link
                  class="has-text-link"
                  path="/createAccount/input"
                  data-testid="create-account"
                >
                  Create an Account
                </base-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginForm from '../components/molecules/LoginForm.vue'
import BaseLink from '../components/atoms/BaseLink.vue'
import { User } from './../model/User'

export type DataType = {
  user: User
}
export default Vue.extend({
  components: {
    LoginForm,
    BaseLink,
  },
  layout: 'login',
  data(): DataType {
    return {
      user: {
        id: 0,
        name: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.user,
        })
      } catch (error: any) {
        this.$swal({
          title: 'ログインエラー',
          html: 'アカウントまたはパスワードが違います。',
          icon: 'error',
        })
      }
    },
  },
})
</script>

<style>
.container.logi-page {
  height: 100vh;
}
.field:not(:last-child) {
  margin-bottom: 1rem;
}

.register {
  margin-top: 10rem;
  background: white;
  border-radius: 10px;
}

.left,
.right {
  padding: 4.5rem;
}

.left {
  border-right: 5px solid var(--background);
}

.left .title {
  font-weight: 800;
  letter-spacing: -2px;
}

.left .colored {
  color: var(--brandColor);
  font-weight: 500;
  margin-top: 1rem !important;
  letter-spacing: -1px;
}

.left p {
  color: var(--textLight);
  font-size: 1.15rem;
}

.right .title {
  font-weight: 800;
  letter-spacing: -1px;
}

.right .description {
  margin-top: 1rem;
  margin-bottom: 1rem !important;
  color: var(--textLight);
  font-size: 1.15rem;
}

.right small {
  color: var(--textLight);
}

input {
  font-size: 1rem;
}

input:focus {
  border-color: var(--brandColor) !important;
  box-shadow: 0 0 0 1px var(--brandColor) !important;
}

.fab,
.fas {
  color: var(--textLight);
  margin-right: 1rem;
}
</style>
