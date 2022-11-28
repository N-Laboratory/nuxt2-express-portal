<template>
  <section class="hero is-fullheight is-dark">
    <div class="hero-body" data-testid="rp-complete">
      <div class="container">
        <div class="column is-half is-offset-3">
          <div class="box">
            <complete-form
              :value="user"
              title="パスワード変更完了"
              msg="以下のユーザのパスワードを更新しました"
              active-step-num="4"
              step-sum="4"
            />
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
  auth: false,
  components: { CompleteForm },
  data(): DataType {
    return {
      user: this.$store.state.user,
    }
  },
})
</script>
