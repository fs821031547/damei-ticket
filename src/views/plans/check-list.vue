<template>
  <div>
        <checklist title="aaaa" :options="commonList" v-model="checklist003" @on-change="change"></checklist>


  </div>
</template>
<script>
import { Checklist } from 'vux'
import _ from 'lodash'

export default {
  mounted () {
    setTimeout(() => {
      this.asyncList = ['A', 'B', 'C', 'D']
    }, 3000)
  },
  components: {
    Checklist,
  },
  methods: {
    change (val) {
      console.log('change', val)
    },
    onError (errors) {
      console.log(errors)
      this.error = errors
    },
    onNoError () {
      this.error = null
    },
    selectFirst () {
      this.checklist001 = ['China']
    },
    selectFirstTwo () {
      this.checklist001 = ['China', 'Japan']
    },
    selectLeft () {
      const left = _.without.apply(_, [this.commonList].concat(this.checklist001))
      this.checklist001 = left
    }
  },
  data () {
    return {
      labelPosition: '',
      error: '',
      commonList: [ 'China', 'Japan', 'America' ],
      checklist001: [],
      checklist0011: [],
      checklist002: [ 'China', 'Japan' ],
      checklist003: [ 'China', 'Japan' ],
      checklist005: [ '01', '02', '03' ],
      checklist005Value: [],
      objectList: [{key: '1', value: '001 value'}, {key: '2', value: '002 value'}, {key: '3', value: '003 value'}],
      objectListValue: ['1', '2'],
      inlineDescList: [
        {key: '1', value: 'tiger is good', inlineDesc: 'Tiger is the king of mountain'},
        {key: '2', value: 'lion is better', inlineDesc: 'Lion is the king of woods'},
        {key: '3', value: 'camel is best, no inline-desc'}
      ],
      inlineDescListValue: [1],
      asyncList: [],
      asyncListValue: []
    }
  }
}
</script>

<style scoped>
.error {
  padding-left: 15px;
  line-height: 28px;
  color: #888;
  font-size: 12px;
}
</style>
