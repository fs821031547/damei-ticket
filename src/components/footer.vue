<template>
    <div class="weui-msg__extra-area">
      <div class="weui-footer">
        <p class="weui-footer__text">本产品由广东中信优胜旅行提供<br>最终解释权由广东中信优胜旅行所有</p>
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

  .weui-msg__extra-area .weui-footer__text {
    margin-bottom: 15px;
    font-size: 10px;
    zoom:0.8;
    
    color: #999999;
    padding:0 20px;
    text-align: center;
    /*transform: scale(.6);*/
  }
</style>