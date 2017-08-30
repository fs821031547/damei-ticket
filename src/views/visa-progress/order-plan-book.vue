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
        orders:[],
      }
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
    },
    created() {
      let order_data= this.mine.order_data;
      let orders=[];
      order_data.forEach(x=>{
        if(x.isOK==1){
          orders.push(x);
        }
      })
      this.orders=orders;
    },
    methods:{
      fnSetBook(item){
        let data={ordID:item.ordId};
        this.$store.dispatch('apply/getNoticeData',data).then(end=>{
          let jsonData=end;
          item.addTime=DateFmt(item.addTime,'yyyy-MM-dd-hh-mm-ss');
          let fileName=item.lineName+'-'+item.ordId+'-' +item.addTime+'.doc';
          // let tplFile=this.planTemplateSelect.value;
          let pdfData={
                fileName:fileName,
                tplFile: '1/plan_order_notice_904.html',
                jsonData:JSON.stringify(jsonData),
              };
            this.$store.dispatch("apply/generatePdf",pdfData).then(end=>{
                // return;//http://dev.1.tontisa.cn/sys/api/1.0.0/
                let endType=Object.prototype.toString.call(end).slice(8,-1);
                if(endType=='Object'&&!end.success){
                  Toast(end.msg);
                  return;
                }
                window.location.href='/sys/api/dm904/dm-activity/'+end+'/1';
            });
             
        });
      },
    },
    props: {
    }
  }

</script>
<style scoped>

</style>