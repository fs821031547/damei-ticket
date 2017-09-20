<template>
  <div>
    <my-header>选择团期</my-header>
    <div style="padding-top:46px">
      <my-pad></my-pad>
      <inline-calendar ref="calendar" @on-change="onChange" @on-view-change="onViewChange" class="inline-calendar-demo" :show.sync="show"
        v-model="value" start-date="2016-04-01" end-date="2018-05-30" :range="range" :show-last-month="showLastMonth" :show-next-month="showNextMonth"
        :highlight-weekend="highlightWeekend" :return-six-rows="return6Rows" :hide-header="hideHeader" :hide-week-list="hideWeekList"
        :replace-text-list="replaceTextList" :weeks-list="weeksList" :render-function="buildSlotFn" :disable-past="disablePast"
        :disable-future="disableFuture" :marks="marks" >
      </inline-calendar>
    </div>
    <my-bottom-box>
      <x-button style="border-radius:0;" type="primary" @click.native="$router.push({name:'plan-select'})">下一步</x-button>
    </my-bottom-box>
  </div>
</template>
<script>
  import {
    InlineCalendar
  } from 'vux'
  export default {
    data() {
      return {
        show: true,
        value: '',
        listValue: '',
        range: false,
        showLastMonth: true,
        showNextMonth: true,
        highlightWeekend: false,
        return6Rows: true,
        hideHeader: false,
        hideWeekList: false,
        replaceTextList: {},
        replace: false,
        changeWeeksList: false,
        weeksList: [],
        useCustomFn: false,
        buildSlotFn: () => '',
        disablePast: false,
        disableFuture: false,
        marks:['2017-09-23','2017-09-21','2017-09-22']
      }
    },
    created() {
      this.$store.dispatch('plan/request_plan').then(end=>{
        // if(){}
      });

    },
    methods: {
      onChange() {

      },
      onViewChange() {

      }
    },
    components: {
      InlineCalendar,
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      plan() {
        return this.$store.getters["plan/plan"];
      },
    },
    props: {}
  }

</script>
<style>


</style>
