<template>
  <div>
    <section class="section">
      <div class="section-heading has-text-white">
        <h3 class="title is-2 has-text-white">About Me</h3>
        <h4 class="subtitle is-5 has-text-white">
          IT Engineer, junior developer
        </h4>
        <div class="container">
          <p>
            Web developer with more than 3 years of well rounded experience with
            knowledge of server-side Java techniques. Recently learning
            Front-end technologies such as Vue, Nuxt and Typescript. This
            website was created as part of a learn of Front-end technologies
            using Vue, Nuxt and Express.<br />
            I am excited about learning new skills through Front-end
            technologies.
          </p>
        </div>
      </div>

      <div class="content-info columns has-same-height is-gapless">
        <div class="column left-item">
          <div class="card">
            <div class="card-content">
              <h3 class="title is-4">Profile</h3>

              <div class="content">
                <table class="table-profile">
                  <tr>
                    <th colspan="1"></th>
                    <th colspan="2"></th>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>N-Laboratory</td>
                  </tr>
                  <tr>
                    <td>From:</td>
                    <td>Japan</td>
                  </tr>
                  <tr>
                    <td>Age:</td>
                    <td>Twenties</td>
                  </tr>
                </table>
              </div>
              <br />
              <div class="buttons has-addons is-centered">
                <a href="#" class="button is-link mr-2">Github</a>
                <a href="#" class="button is-link">Twitter</a>
              </div>
            </div>
          </div>
        </div>
        <div class="column right-item">
          <div class="card">
            <div class="card-content skills-content">
              <h3 class="title is-4">Skills</h3>
              <div class="content">
                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>JavaScript:</strong>
                        <br />
                        <progress
                          class="progress is-primary"
                          value="50"
                          max="100"
                        ></progress>
                      </p>
                    </div>
                  </div>
                </article>

                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>Vue:</strong>
                        <br />
                        <progress
                          class="progress is-primary"
                          value="40"
                          max="100"
                        ></progress>
                      </p>
                    </div>
                  </div>
                </article>

                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>jQuery:</strong>
                        <br />
                        <progress
                          class="progress is-primary"
                          value="90"
                          max="100"
                        ></progress>
                      </p>
                    </div>
                  </div>
                </article>

                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>Java</strong>
                        <br />
                        <progress
                          class="progress is-primary"
                          value="95"
                          max="100"
                        ></progress>
                      </p>
                    </div>
                  </div>
                </article>

                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>HTML5/CSS3</strong>
                        <br />
                        <progress
                          class="progress is-primary"
                          value="80"
                          max="100"
                        ></progress>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
<style>
@media screen and (min-width: 768px) {
  .column.left-item {
    margin-right: 0.5rem !important;
  }
  .column.right-item {
    margin-left: 0.5rem !important;
  }
}

@media screen and (max-width: 768px) {
  .column.right-item {
    margin-top: 1rem !important;
  }
}

.content-info {
  width: 80%;
  margin: 0 auto !important;
}
.has-same-height .card {
  height: 320px;
  overflow: hidden;
}

.card-content h3 {
  text-align: center;
}

.table-profile td,
th {
  border: none !important;
}

.table-profile td:first-of-type {
  font-weight: bold;
}

.skills-content .media {
  margin: 0 !important;
  padding: 4px !important;
  border: 0 !important;
}

.skills-content .progress {
  height: 4px !important;
}

.custom-tags {
  text-align: center !important;
  display: block;
}

.portfolio-container .card {
  margin-bottom: 2em;
}

.section-heading {
  text-align: center;
  margin-top: 1em;
  margin-bottom: 6em;
}
</style>
