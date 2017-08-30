<template>
    <div class="weui-msg__extra-area">
      <div class="weui-footer">
        <p class="weui-footer__text">※本产品由中信国旅提供，最终解释权归广东中信国旅所有。</p>
      </div>
    </div>  
</template>
<script>
  export default {
    name: 'my-footer',
    data() {
      return {
      }
    },
    created() {
    },
    props: {
    }
  }
</script>
<style>
  .weui-msg__extra-area {
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 100%;
    text-align: center;
  }

  .weui-msg__extra-area {
    margin-bottom: 15px;
    font-size: 10px;
    zoom:0.8;
    
    color: #999999;
    padding:0 20px;
    text-align: center;
  }
</style>