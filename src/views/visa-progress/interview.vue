<template>
  <div style="padding-bottom:50px;">
    <my-header>面谈通知书单列表</my-header>
    <div style="padding-top:46px">
      <my-pad height="20"></my-pad>
      <div class="bg-white" v-for="item in interview">
        <div v-for="itemi in item.persons">
          <cell :title="itemi.name" @click.native="fnSetBook(itemi,item.id)" is-link></cell>
        </div>
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
      interview() {
        return this.$store.getters["apply/interview"];
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
        let id = this.mine.id;
        let data = { id: id };
        // let data = { id: 106440 };  //暂用
        this.$store.dispatch('apply/interview', data).then(x => {
        })
      },
      fnSetBook(item, orderid) {
        let id = item.id;
        let data = { id: id };
        let now = DateFmt(new Date(), 'yyyy-MM-dd-hh-mm-ss');
        this.$store.dispatch("apply/interviewPerson", data).then(end => {
          // return;//http://dev.1.tontisa.cn/sys/api/1.0.0/
          let fileName = item.name + '-' + orderid + '-' + item.id + '-' + now + '.doc';
          let pdfData = {
            fileName: fileName,
            tplFile: 'plan_order_notice.doc',
            jsonData: JSON.stringify(end),
          };
          this.fnSetPdf(pdfData);
        });
      },
      fnSetPdf(pdfData) {
        this.$store.dispatch("apply/generatePdf", pdfData).then(end => {
          // return;//http://dev.1.tontisa.cn/sys/api/1.0.0/
          let endType = Object.prototype.toString.call(end).slice(8, -1);
          if (endType == 'Object' && !end.success) {
            Toast(end.msg);
            return;
          }
          window.location.href = '/sys/api/dm904/dm-activity/' + end + 1;
        });
      }
    },
    props: {
    }
  }

</script>
<style scoped>

</style>