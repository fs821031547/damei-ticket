<template>
  <div
    class="weui-cell"
    :class="{
      'vux-tap-active': isLink || !!link,
      'weui-cell_access': isLink || !!link,
      'vux-cell-no-border-intent': !borderIntent,
      'vux-cell-disabled': disabled
    }"
    @click="onClick">
    <div class="weui-cell__hd">
      <slot name="icon"></slot>
    </div>
    <div class="vux-cell-bd" :class="{'vux-cell-primary': primary === 'title' && valueAlign !== 'left'}">
      <p>
        <label class="vux-label" :style="getLabelStyles()" :class="labelClass" v-if="title || hasTitleSlot">
          <slot name="title">{{ title }}</slot>
        </label>
        <slot name="after-title"></slot>
      </p>
      <!--<inline-desc>
        <slot name="inline-desc">{{ inlineDesc }}</slot>
      </inline-desc>-->
    </div>
    <div class="weui-cell__ft my-cell" v-html="value" :class="valueClass">
  
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
import { go } from './go.js'
export default {
  name: 'my-cell',
  // components: {
  //   InlineDesc
  // },
  props: {
    title: [String, Number],
    value: [String, Number, Array],
    isLink: Boolean,
    isLoading: Boolean,
    inlineDesc: [String, Number],
    primary: {
      type: String,
      default: 'title'
    },
    link: [String, Object],
    valueAlign: [String, Boolean, Number],
    borderIntent: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    arrowDirection: String // down or up
  },
  beforeMount () {
    this.hasTitleSlot = !!this.$slots.title
  },
  computed: {
    valueClass () {
      return {
        'vux-cell-primary': this.primary === 'content' || this.valueAlign === 'left',
        'vux-cell-align-left': this.valueAlign === 'left',
        'vux-cell-arrow-transition': !!this.arrowDirection,
        'vux-cell-arrow-up': this.arrowDirection === 'up',
        'vux-cell-arrow-down': this.arrowDirection === 'down'
      }
    },
    labelClass () {
      return {
        'vux-cell-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
      }
    }
  },
  methods: {
    getLabelStyles () {
      return {
        width: this.$parent.labelWidth || this.$parent.$parent.labelWidth,
        textAlign: this.$parent.labelAlign || this.$parent.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight || this.$parent.$parent.labelMarginRight
      }
    },
    onClick () {
      !this.disabled && go(this.link, this.$router)
    }
  },
  data () {
    return {
      hasTitleSlot: false
    }
  }
}
</script>

<style>
.weui-cell__ft.my-cell{
  width:72%
}
</style>