<template>
  <div class="my-block" :style="blockStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'my-block',
  data () {
    return {
      blockStyle: "",
    }
  },
  created() {
    if (this.top) {
      this.blockStyle += "padding-top: 12px;"
    }
    if (this.left) {
      this.blockStyle += "padding-left: 12px;"
    }
    if (this.right) {
      this.blockStyle += "padding-right: 12px;"
    }
    if (this.bottom) {
      this.blockStyle += "padding-top: 14px;padding-bottom: 4px;"
    }
    if(this.fontSize){
      this.blockStyle +="font-size:"+this.fontSize;
    }
    if(this.lineHeight){
      this.blockStyle +="line-height:"+this.lineHeight;
    }
  },
  props: {
    top: {
      type: Boolean,
      default: true,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    fontSize:{
      type: String,
      default:''
    },
    lineHeight:{
      type: String,
      default:''
    }
  }
}
</script>

<style>
  .my-block {
    /*background-color: var(--background-color)*/
    color: #888;
    font-size: 0.8em;
  }
</style>
