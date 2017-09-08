<template>
  <div>
    <div class="noknow-box">
       <img src="../../assets/visa.png">
    </div>
    <div class="question-btn" @click="$router.push('visa-question')">
      <div style="margin:5px 10px">签证常见问题</div>  
    </div>
  </div>
</template>
<script>
   export default {
    data() {
      return {
      }
    },
    created() {
    },

  }

</script>
<style scoped>
  .noknow-box{
    width:100%;
    overflow: hidden;
  }
  .noknow-box img{
    width: 100%;
  }
  .baoming-btn{
    position: fixed;
    bottom: 0;
    left:0;
    right: 0;
    width: 100%;
    background: #f2f2f2;
    text-align: center;
    font-size: 16px;
    color:#000;
    height:50px;
    line-height: 50px;
  }
  .question-btn{
    position:fixed;
    top:30%;
    right:0;
    width:54px;
    height:54px;
    border-radius: 100%;
    background: #f2f2f2;
    opacity: .8;
    font-size: 11px;
    text-align: center;
    color:#666;
    padding-top: 4px;
    /*border-radius: 2px;*/
  }
</style>