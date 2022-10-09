<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <base-link class="navbar-item" path="/login">
        <font-awesome-icon class="fa-house" icon="fa-house" />
      </base-link>

      <a
        role="button"
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

    <div id="targetMenu" class="navbar-menu" :class="{ 'is-active': showMenu }">
      <div class="navbar-start">
        <base-link class="navbar-item" path="/contents/about">
          About
        </base-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" @click="toggleDropdown"> Test </a>

          <div class="navbar-dropdown" :class="{ 'is-hidden': hideDropdown }">
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
              <a class="button is-link" @click="$auth.logout()">
                <span>Sign out</span>
              </a>
            </template>
            <template v-else>
              <base-link class="button is-ghost" path="/login">
                <span class="icon is-small">
                  <i class="far fa-user"></i>
                </span>
                <span>Sign up</span>
              </base-link>
              <base-link class="button is-link" path="/login">
                <span>Sign in</span>
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
