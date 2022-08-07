<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <div class="box">
            <complete-form :value="user" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '../../model/User'
import CompleteForm from '../../components/molecules/CompleteForm.vue'

export type DataType = {
  user: User
}
export default Vue.extend({
  components: { CompleteForm },
  data(): DataType {
    return {
      user: this.$store.state.user,
    }
  },
})
</script>
