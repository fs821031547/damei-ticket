<template>
  <div>
    <my-header>激活码激活须知及规范</my-header>
    <div class="question-content">
      1. 激活码由创科国际提供，属于其出售美容产品组成部分，请尽早激活，以防遗失。<br> 2. 激活码属于该美容产品的组成部分，一旦激活，即视为使用，无法退还激活费用。<br> 3. 激活码的激活须同时缴纳一定的激活费用，激活后即可获得一个“美国阳光西岸8天游”的免费参团旅游资格。该旅游产品的行程内容、服务标准、参团规则由创科国际和广东中信国际旅行社有限公司（优胜旅行）所签订的旅游合同与协议进行规范。<br>      4. 赴美旅游资格有效期截止至2018年4月28日，请尽早报名使用，保证您的权益。<br> 5. 使用赴美旅游资格后，请尽早提供出游旅客合同约束的个人资料并选择出发日期，以便我司尽快安排出游事宜。<br> 6. 一旦选择出发日期，即视为认可且遵守创科国际与广东中信国际旅行社有限公司（优胜旅行）签署的旅游合同。<br>      7. 激活码及赴美旅游资格的规则、赴北美旅游的签证及其他全部事项均受创科国际与广东中信国际旅行社有限公司（优胜旅行）签署的旅游合同的拘束，属该合同不可分割的一部分。<br> 8. 本促销活动的最终解释权归创科国际和广东中信国际旅行社有限公司（优胜旅行）所有。
    </div>
    <a class="baoming-btn" @click="fnNext">同意并确认付款</a>
  </div>
</template>
<script>
  import mixin from '../mixin.js'
  export default {
    created() {

    },
    mixins:[mixin],
    computed: {},
    methods: {
      fnNext() {
        this.fnReqPay(1);
        // this.$router.push({
        //   name: 'pay-way',
        //   query: {
        //     'names': 'ticket'
        //   },
        //   params: {
        //     refresh: true
        //   }
        // })
      },

    }
  }

</script>
<style>
  .question-content {
    color: #999;
    padding: 60px 10px 0;
  }

  h4 {
    font-weight: 500;
    color: #000;
    padding: 10px 0;
  }

  .baoming-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #f2f2f2;

    font-size: 16px;
    color: #000;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

</style>
