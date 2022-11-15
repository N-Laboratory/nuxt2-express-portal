<template>
  <section class="hero is-fullheight is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="column is-half is-offset-3">
          <div class="card article">
            <div class="card-content">
              <div class="media">
                <div class="media-content has-text-centered">
                  <p
                    v-if="error.statusCode === 404"
                    data-testid="error-title"
                    class="is-size-3 article-title"
                  >
                    お探しのページが見つかりません
                  </p>
                  <p
                    v-else
                    data-testid="error-title"
                    class="is-size-3 article-title"
                  >
                    エラーが発生しました
                  </p>
                </div>
              </div>
              <div class="content article-body has-text-centered">
                <p>TOPページより再度操作をお願いします。</p>
                <base-link
                  data-testid="error-go-top"
                  class="has-text-link"
                  path="/login"
                  >TOPページへ戻る</base-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import BaseLink from '../components/atoms/BaseLink.vue'

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
