<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div v-if="show" class="container">
        <div class="column is-half is-offset-3">
          <div class="card">
            <div class="card-content">
              <h3 class="title is-4 mt-6 has-text-centered">Profile</h3>
              <div class="content mb-6">
                <table class="table-profile" aria-describedby="profile">
                  <tr>
                    <th colspan="1"></th>
                    <th colspan="2"></th>
                  </tr>
                  <tr>
                    <td class="has-text-weight-bold">Name:</td>
                    <td data-testid="my-page-name" v-text="user.name"></td>
                  </tr>
                  <tr>
                    <td class="has-text-weight-bold">Password:</td>
                    <td>※hide password for security</td>
                  </tr>
                </table>
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
import { User } from '../../model/User'
export type DataType = {
  user: User
  show: boolean
}
export default Vue.extend({
  data(): DataType {
    return {
      user: this.$auth.user as User,
      show: false,
    }
  },
  mounted() {
    this.show = true
  },
})
</script>
<style>
.has-same-height .card {
  height: 320px;
  overflow: hidden;
}

.table-profile td,
th {
  border: none !important;
}
</style>
