<template>
  <my-pad-box>
    <div style="padding:0 20px">
      <h3 class="my-title">{{ title }}</h3>
      <div class="ticket-form">
        <p class="ticket-form-head">已得到{{ code_info.title || '欢乐美国阳光西岸8日精品游'}}资格！</p>
        <div class="ticket-form-body">
          <!--<x-input title="姓名" is-type="china-name" placeholder="请输入联系人姓名"></x-input>-->
          <group label-margin-right="2em"  class="my-cell">
            <cell title="姓名"  :value="mine.name || ''"  label-margin-right="2em"  value-align="left"></cell>
            <cell title="手机" :value="mine.phone || ''" value-align="left"></cell>
          </group>
          <!--<x-input title="手机" placeholder="请输入联系人手机号" keyboard="number" is-type="china-mobile"></x-input>-->
        </div>
      </div>
      <x-button type="primary" @click.native="$router.push({name:'sign-true'})">立即报名</x-button>
      <div class="my-pad"></div>  
      <div class="tip" @click="$router.push({name:'sign-true'})">
        查看线路详情
      </div>
      <my-footer>

      </my-footer>
    </div>
  </my-pad-box>
</template>

<script>
  import Vue from 'vue'
  import { Group, Cell } from 'vux'
  export default {
    data() {
      return {
        title: '恭喜您'
      }
    },
    created() {
      if(!this.mine.name){
        this.$store.dispatch("mine/mine_request")
      }
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      code_info(){
        return this.$store.getters["mine/code_info"]
      },
    },
    props: {
    },
    
    components: {
      Cell,
      Group
    },
  }

</script>

<style>
.my-cell .weui-cells:before{
  z-index:-1;
}
.my-cell .weui-cell:before{
  z-index:-1;
}
.my-cell .weui-cells:after{
  z-index:-1
}
</style>