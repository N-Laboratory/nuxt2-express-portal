<template>
  <div class="ErrorPage">
    <div class="ErrorPage__content">
      <div class="ErrorPage__inner">
        <template v-if="error.statusCode === 404">
          <span>ERROR</span>
          <h2>ページが見つかりません。</h2>
          <p>URLに間違いがないかご確認ください。</p>
          <base-link path="/" text="TOP" />
        </template>
        <template v-else>
          <span>ERROR</span>
          <h2>エラーが発生しました。</h2>
          <p>TOPページより再度操作をお願いします。</p>
          <base-link path="/" text="TOP" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLink from '../components/atoms/BaseLink.vue'
import 'bulma/css/bulma.css'

export default {
  components: { BaseLink },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
