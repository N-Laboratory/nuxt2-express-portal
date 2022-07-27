<template>
  <section class="container">
    <div class="columns is-multiline">
      <div class="column is-8 is-offset-2 register">
        <div class="columns">
          <div class="column left">
            <h1 class="title is-1">N-LAB</h1>
            <h2 class="subtitle colored is-4">Learn IT-Tech.</h2>
            <p>This website is for Learn IT technology.</p>
            <p>This website is for Learn IT technology.</p>
            <p>This website is for Learn IT technology.</p>
            <p>This website is for Learn IT technology.</p>
          </div>
          <div class="column right has-text-centered">
            <h1 class="title is-4">Sign Up</h1>
            <login-form @click="login" />
            <div class="columns">
              <div class="column">
                <base-link path="/resetPassword/input" text="Forgot Password?" />
              </div>
              <div class="column">
                <base-link
                  path="/createAccount/input"
                  text="Create an Account"
                />
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
import 'bulma/css/bulma.css'
import LoginForm from '../components/molecule/LoginForm.vue'
import BaseLink from '../components/atoms/BaseLink.vue'
import { User } from './../model/User'

export default Vue.extend({
  components: {
    LoginForm,
    BaseLink,
  },
  methods: {
    login(user: User): void {
      try {
        console.log('Name:' + user.getName())
        console.log('Password:' + user.getPassword())
        console.log('do login')
        this.$router.push('/')
      } catch (error: any) {
        this.$nuxt.error(error)
      }
    },
  },
})
</script>

<style>
:root {
  --brandColor: hsl(166, 67%, 51%);
  --background: rgb(247, 247, 247);
  --textDark: hsla(0, 0%, 0%, 0.66);
  --textLight: hsla(0, 0%, 0%, 0.33);
}

body {
  background: var(--background);
  height: 100vh;
  color: var(--textDark);
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
