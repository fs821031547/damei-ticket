<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: 'app',
        computed: {
            mine() {
                return this.$store.getters["mine/mine"];
            }
        },
        created() {

            let mine = this.$store.getters["mine/mine"];
            // console.log(process.env);
            // if(process.env.NODE_ENV=='development'){
            // this.$store.dispatch('mine/request_enter');
            // }

            let url;
            // console.log(this.$route);


        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    html {
        height: 100%;
        overflow-x: hidden;
    }
    
    body {
        background-color: #f2f2f2;
        height: 100%;
        position: relative;
    }
    
    #app {
        height: 100%;
    }
    
    div,
    p {
        box-sizing: border-box;
    }
    
    .my-pad {
        height: 40px;
    }
    /*color*/
    
    .red {
        color: #FF0000;
    }
    
    .green {
        color: #02B202;
    }
    
    .green1 {
        color: #03A203;
    }
    
    .blue {
        color: #006699;
    }
    
    .orange {
        color: #FF6600;
    }
    
    .yellow {
        color: #F5CC0A;
    }
    
    .gray {
        color: #8F8F8F;
    }
    
    .black {
        color: #000000;
    }
    
    .white {
        color: #FFFFFF;
    }
    
    .bg-white {
        background: #fff;
    }
    
    .my-title {
        text-align: center;
        font-size: 17px;
        margin-top: 10px;
        color: red;
        font-weight: 500
    }
    
    .ticket-form {
        padding: 10px 0px 30px;
        color: #666;
    }
    
    .tip {
        color: #666;
        text-align: center;
        font-size: 15px;
    }
    
    .ticket-form-head {
        font-size: 14px;
        color: #666;
        line-height: 20px;
        padding: 0 15px;
    }
    
    .ticket-form-body {
        /*padding: */
        padding: 10px 0;
    }
    
    .ticket-form-foot {
        padding: 0 15px;
        font-size: 13px;
    }
    
    .weui-footer {
        color: #999999;
        font-size: 12px;
        text-align: center;
    }
    /*.ticket-input*/
    
    .footer {
        width: 100%;
    }
    
    .footer-money {
        width: 50%;
        text-align: center;
        height: 42px;
        line-height: 42px;
        color: #666;
        font-size: 16px;
        background: #fff;
        float: left;
    }
    
    .vux-header {
        background-color: #fff!important;
    }
    
    .vux-header .vux-header-title {
        color: #000!important;
    }
</style>