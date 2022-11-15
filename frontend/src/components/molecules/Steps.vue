<template>
  <div v-if="show" class="progressbar">
    <template v-if="enableThirdStep">
      <div class="item" data-testid="step-one" :class="{ active: activeFirst }">
        STEP1<br />入力
      </div>
      <div
        class="item"
        data-testid="step-two"
        :class="{ active: activeSecond }"
      >
        STEP2<br />確認
      </div>
      <div
        class="item"
        data-testid="step-three"
        :class="{ active: activeThird }"
      >
        STEP3<br />完了
      </div>
    </template>
    <template v-if="enableFourthStep">
      <div
        class="item item-fourth"
        data-testid="step-one"
        :class="{ active: activeFirst }"
      >
        STEP1<br />認証
      </div>
      <div
        class="item item-fourth"
        data-testid="step-two"
        :class="{ active: activeSecond }"
      >
        STEP2<br />登録
      </div>
      <div
        class="item item-fourth"
        data-testid="step-three"
        :class="{ active: activeThird }"
      >
        STEP3<br />確認
      </div>
      <div
        class="item item-fourth"
        data-testid="step-four"
        :class="{ active: activeFourth }"
      >
        STEP4<br />完了
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export type DataType = {
  activeFirst: boolean
  activeSecond: boolean
  activeThird: boolean
  activeFourth: boolean
  enableThirdStep: boolean
  enableFourthStep: boolean
  show: boolean
}

export default Vue.extend({
  props: {
    activeStepNum: String,
    stepSum: String,
  },
  data(): DataType {
    return {
      activeFirst: false,
      activeSecond: false,
      activeThird: false,
      activeFourth: false,
      enableThirdStep: false,
      enableFourthStep: false,
      show: false,
    }
  },
  mounted() {
    switch (this.activeStepNum) {
      case '1':
        this.activeFirst = true
        break
      case '2':
        this.activeSecond = true
        break
      case '3':
        this.activeThird = true
        break
      case '4':
        this.activeFourth = true
        break
      default:
        this.activeFirst = true
        break
    }

    switch (this.stepSum) {
      case '3':
        this.enableThirdStep = true
        break
      case '4':
        this.enableFourthStep = true
        break
      default:
        this.enableThirdStep = true
        break
    }
    this.show = true
  },
})
</script>
<style>
[v-cloak] {
  display: none;
}
.progressbar {
  display: flex;
  flex-wrap: wrap;
}
.progressbar .item {
  position: relative;
  width: 33%;
  text-align: center;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  line-height: 1.5;
  background: #f5f5f5;
  color: #999999;
}
.item-fourth {
  width: 25% !important;
  padding-left: 15px !important;
}
.progressbar .item:not(:last-child)::before,
.progressbar .item:not(:last-child)::after {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 100%;
  content: '';
  border: 27px solid transparent;
  border-left: 20px solid #f5f5f5;
  margin: auto;
}
.progressbar .item:not(:last-child)::before {
  margin-left: 1px;
  border-left-color: #fff;
}

@media screen and (max-width: 767px) {
  .progressbar .item {
    font-size: 11px;
    line-height: 1.4;
    padding: 10px 0;
  }
  .progressbar .item:not(:last-child)::before,
  .progressbar .item:not(:last-child)::after {
    border-width: 25px;
    border-left-width: 12px;
  }
}
.progressbar .item.active {
  z-index: 1;
  background: #0070bd;
  color: #fff;
}
.progressbar .item.active:not(:last-child)::after {
  border-left-color: #0070bd;
}
.progressbar .item.active:not(:last-child)::before {
  border-left: none;
}
</style>
