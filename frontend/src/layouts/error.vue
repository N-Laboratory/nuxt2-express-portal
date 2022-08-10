<template>
  <div class="ErrorPage">
    <div class="ErrorPage__content">
      <div class="ErrorPage__inner">
        <section class="hero is-fullheight is-dark">
          <div class="hero-body">
            <div class="column is-8 is-offset-2">
              <div class="card article">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content has-text-centered">
                      <p
                        v-if="error.statusCode === 404"
                        class="is-size-3 article-title"
                      >
                        お探しのページが見つかりません
                      </p>
                      <p v-else class="is-size-3 article-title">
                        エラーが発生しました
                      </p>
                    </div>
                  </div>
                  <div class="content article-body has-text-centered">
                    <p>TOPページより再度操作をお願いします。</p>
                    <base-link class="has-text-link" path="/"
                      >TOPページへ戻る</base-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
