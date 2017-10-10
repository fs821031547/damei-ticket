<template>
  <my-pad-box>
    <div style="padding:0 20px">
      <h3 class="my-title">精彩{{ title }}</h3>
      <div class="ticket-input-box">
        <input type="text" class="ticket-input" placeholder="请输入激活码" v-model="ticketCode">
        <p class="ticket-input-tip">
          <!--激活码激活及使用有效期至2018年4月28日逾期作废，请尽早激活使用。-->
        </p>
      </div>
      <div class="my-pad"></div>
      <x-button type="primary" @click.native="exChange">提交</x-button>
      <div class="my-pad"></div>
      <div class="tip" @click="$router.push({name:'ticket-list'})">
        查看激活记录
      </div>
    </div>
    <toast v-model="toastShow" type="text" is-show-mask :text="toastMsg" position="middle"></toast>
  </my-pad-box>

</template>

<script>
  import Vue from 'vue'
  import mixin from '../mixin.js'
  export default {
    data() {
      return {
        title: '美国游激活',
        ticketCode: '',
      }
    },
    mixins: [mixin],
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      status() {
        return this.$route.query.status;
      },
      query() {
        return {
          startDate: DateFmt(new Date(),"yyyy-MM-dd"), //开始日期
          endDate: DateFmt(new Date(), "yyyy-MM-dd", "M+1"), //结束日期
        }
      }
    },
    created() {
      if (!this.mine.id) {
        if (this.$route.name == 'apply') {
          return;
        }
        if (this.$route.name == 'sign-true') {
          return;
        }

        this.$store.dispatch("mine/mine_request").then(x => {
          // console.log(this.$route.name);
          // if (this.$route.name != 'ticket' && this.$route.name != 'pay-form') {
          //   return;
          // }

          if (!x.status) {
            this.$router.push({ name: 'ticket' })
            return;
          }

          if (x.status == 1) {  //激活未报名3或者报名未付款6
            let wechat_id = this.mine.id;
            let exchange_code = x.exchang_code;
            var data = {
              wechat_id,
              exchange_code,
            };
            if(x.islock==1){
              return;
            }
            this.$store.dispatch('mine/search_exchange_code', data).then(body => {
              if (body.success && !body.code_status) {
                this.$store.dispatch('mine/code_info', body.code_info);
              }
            });
            this.$router.push({ name: 'pay-form', query: { status: x.status, id: x.exchang_code } })
          } else {
            this.$router.push({ name: 'ticket', query: { status: x.status } })
          }
        });
      }
    },
    methods: {
      startDateClick() {
        let startDate=this.query.startDate;
        let _this=this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          yearRow: "{value}年",
          monthRow: "{value}月",
          dayRow: "{value}日",
          format: 'YYYY-MM-DD',
          value: startDate,
          onConfirm(val) {
            _this.query.startDate = val;
          },
        })
      },
      endDateClick() {
        let endDate=this.query.endDate;
        let _this=this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          yearRow: "{value}年",
          monthRow: "{value}月",
          dayRow: "{value}日",
          format: 'YYYY-MM-DD',
          value: endDate,
          onConfirm(val) {
            _this.query.endDate = val;
          },
        })
      },
      exChange() {
        let wechat_id = this.mine.id;
        console.log(wechat_id);
        let exchange_code = this.ticketCode;
        var data = {
          wechat_id,
          exchange_code,
        };
        if (!this.ticketCode) {
          this.toastFn('激活码未填写');
          return;
        }

        this.$store.dispatch('mine/search_exchange_code', data).then(body => {
          // console.log(body.code_status);
          let status = ['', '已激活', '已激活', '已激活', '已放弃', '已失效', '已使用'];
          if (body.success && !body.code_info.code_status) {
            this.toastFn('操作成功');
            this.$store.dispatch('mine/code_info', body.code_info);
            this.$router.push({ name: 'pay-form', query: { status: 0 } })
          } else {
            this.toastFn(body.msg);
          }
        });
        // Vue.http.post(
        //   "search-exchange-code",
        //   data,
        //   { emulateJSON: true }
        // ).then(res => {
        //   let body = res.body;
        //   if (!body) return;
        //   if (body.success && !body.code_status) {
        //     this.$store.dispatch('mine/code_info',body.code_info);
        //     this.toastFn('激活成功');
        //     this.$router.push({ name: 'pay-form',query:{status:0} })
        //   } else {
        //     this.toastFn(body.msg);
        //   }
        // })
      },
    },
    props: {
    }
  }

</script>

<style lang="less" scoped>
  .my-title {
    text-align: center;
    font-size: 17px;
    margin-top: 20px;
    color: #666;
    font-weight: 500
  }

  .ticket-input-box {
    margin: 60px 0 30px;
    padding: 0 30px;
  }

  .ticket-input {
    width: 100%;
    text-align: center;
    font-size: 22px;
    border: 0;
    border-bottom: 1px solid #ccc;
    line-height: 44px;
    outline: none;
  }

  .ticket-input-tip {
    color: #666;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    margin-top: 30px;
  }

  .tip {
    color: #666;
    text-align: center;
  }
  /*.ticket-input*/
</style>
