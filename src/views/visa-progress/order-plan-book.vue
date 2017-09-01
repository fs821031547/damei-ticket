<template>
  <div style="padding-bottom:50px;">
    <my-header>出团通知书列表</my-header>
    <div style="padding-top:46px">
      <my-pad height="20"></my-pad>
      <div class="bg-white" style="margin-bottom:10px;" v-for="item in orders">
        <cell :title="'订单：'+item.ordId" @click.native="fnSetBook(item)" is-link></cell>
      </div>
      <divider v-if="orders.length==0">我是有底线的</divider>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        orders: [],
      }
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
    },
    created() {
      if (!this.mine.id) {
        this.$store.dispatch("mine/mine_request").then(end => {
          this.fnInit();

        })
      } else {
        this.fnInit();
      }

    },
    methods: {
      fnInit() {
        let order_data = this.mine.order_data;
        let orders = [];
        order_data.forEach(x => {
          if (x.isOK == 1) {
            orders.push(x);
          }
        })
        this.orders = orders;
      },
      formWord(id) {
        var form = document.createElement('form');
        form.setAttribute('action', '/sys/api/dm904/dm-activity/generate-pdf-set');
        form.setAttribute("method", "post");
        form.setAttribute('target', '_blank');
        var input = document.createElement('input');
        input.setAttribute('name', 'ordID');
        input.setAttribute('type', 'hidden');
        input.setAttribute('value', id);
        form.style.display = 'none';
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        // form.remove();
        document.body.removeChild(form);
      },
      fnSetBook(item) {
        let data = { ordID: item.ordId };
        this.formWord(item.ordId);
        // this.$store.dispatch('apply/getNoticeData', data).then(end => {
        //   let jsonData = end;
        //   item.addTime = DateFmt(item.addTime, 'yyyy-MM-dd-hh-mm-ss');
        //   let fileName = item.lineName + '-' + item.ordId + '-' + item.addTime + '.doc';
        //   // let tplFile=this.planTemplateSelect.value;
        //   let pdfData = {
        //     fileName: fileName,
        //     tplFile: 'plan_order_notice.html',
        //     jsonData: JSON.stringify(jsonData),
        //   };
        // this.$store.dispatch("apply/generatePdf", data).then(end => {
        // return;//http://dev.1.tontisa.cn/sys/api/1.0.0/
        // let endType = Object.prototype.toString.call(end).slice(8, -1);
        // if (endType == 'Object' && !end.success) {
        //   Toast(end.msg);
        //   return;
        // }
        // window.location.href = '/sys/api/dm904/dm-activity/' + end + '/1';
        // });

        // });
      },
    },
    props: {
    }
  }

</script>
<style scoped>

</style>