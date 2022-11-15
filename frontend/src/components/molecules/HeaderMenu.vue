<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <base-link class="navbar-item" path="/login">
        <font-awesome-icon
          data-testid="home-icon"
          class="fa-house"
          icon="fa-house"
        />
      </base-link>

      <a
        role="button"
        data-testid="navbar-burger"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="targetMenu"
        :class="{ 'is-active': showMenu }"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="targetMenu"
      data-testid="navbar-menu"
      class="navbar-menu"
      :class="{ 'is-active': showMenu }"
    >
      <div class="navbar-start">
        <base-link
          data-testid="about-menu"
          class="navbar-item"
          path="/contents/about"
        >
          About
        </base-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a
            data-testid="navbar-link"
            class="navbar-link"
            @click="toggleDropdown"
          >
            Test
          </a>

          <div
            data-testid="navbar-dropdown"
            class="navbar-dropdown"
            :class="{ 'is-hidden': hideDropdown }"
          >
            <a class="navbar-item"> テスト1 </a>
            <a class="navbar-item"> テスト1 </a>
            <a class="navbar-item"> テスト1</a>
            <a class="navbar-item"> テスト1 </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> その他 </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="$auth.loggedIn === true">
              <a
                data-testid="sign-out"
                class="button is-link"
                @click="$auth.logout()"
              >
                <span data-testid="sign-out-text">Sign out</span>
              </a>
            </template>
            <template v-else>
              <base-link
                data-testid="sign-up"
                class="button is-ghost"
                path="/login"
              >
                <span data-testid="sign-up-text">Sign up</span>
              </base-link>
              <base-link
                data-testid="sign-in"
                class="button is-link"
                path="/login"
              >
                <span data-testid="sign-in-text">Sign in</span>
              </base-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseLink from '../atoms/BaseLink.vue'

export type DataType = {
  showMenu: boolean
  hideDropdown: boolean
}
export default Vue.extend({
  components: {
    BaseLink,
  },
  data(): DataType {
    return {
      showMenu: false,
      hideDropdown: true,
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    toggleDropdown() {
      this.hideDropdown = !this.hideDropdown
    },
  },
})
</script>

<style>
.fa-house {
  font-size: 22px;
}
</style>
