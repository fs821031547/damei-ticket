// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
// import Home from './components/HelloFromVux'
import routes from './routes'
import vueComponents from './components'
import { ConfigPlugin , ConfirmPlugin , ToastPlugin , XButton,  XHeader, Panel, XInput, Cell, GroupTitle, Group, Radio, XSwitch, Toast, Popup ,Divider } from 'vux'
import VueResource from 'vue-resource'

vueComponents(Vue)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.6.0
})
Vue.component(XButton.name, XButton)
Vue.component(XHeader.name, XHeader)
Vue.component(Panel.name, Panel)
Vue.component(XInput.name, XInput)
Vue.component(Cell.name, Cell)
Vue.component(Group.name, Group)
Vue.component(GroupTitle.name, GroupTitle)
Vue.component(Radio.name, Radio)
Vue.component(XSwitch.name, XSwitch)
Vue.component(Toast.name, Toast)
Vue.component(Popup.name, Popup)
Vue.component(Divider.name, Divider)

// esPromise.polyfill()
Vue.http.options.root = '/sys/api/dm904/dm-activity/'

console.log(process.env.APP_HOST);
if (process.env.APP_HOST) {
  Vue.http.options.root = process.env.APP_HOST + Vue.http.options.root
}
// Vue.http.defaults.paramsSerializer=function(params) {
//     return qs.stringify(params, {arrayFormat: 'brackets'})
//   };
// Vue.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 

function DateFmt(date, fmt, fc) { //fc 进行加减操作，类似 M+1
  if (!date) return "";
  if (!fmt) fmt = "yyyy-MM-dd";
  if (toString.call(date) != "[object Date]") {
    if (toString.call(date) == "[object String]") {
      var arr = date.split(/[- :]/),
        date = new Date(arr[0] || "", (arr[1] - 1) || "", arr[2] || "", arr[3] || "", arr[4] || "", arr[5] || "");
      if (date == "Invalid Date") {
        return date;
      }
    } else {
      return date;
    }
  }
  //进行日期计算
  if (fc) {
    var dateNums = ["y", "M", "d", "h", "m", "s"];
    var dateGets = ["getFullYear", "getMonth", "getDate", "getHours", "getMinutes", "getSeconds"];
    var dateSets = ["setFullYear", "setMonth", "setDate", "setHours", "setMinutes", "setSeconds"];
    dateNums.forEach(function (v, i) {
      var tfc = fc.match(new RegExp(v + "[-+]+[0-9]*"))
      if (!tfc) return;
      tfc = tfc[0];
      var n = tfc.slice(tfc.indexOf(v) + 1, tfc.length);
      if (Number(n)) {
        date[dateSets[i]](date[dateGets[i]]() + Number(n));
      }
    })
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "S": date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function NumFmt(value, semi, spl) {
  if (typeof value != "number" || isNaN(Number(value))) {
    return value;
  }
  if (!spl && spl !== "") {
    spl = ","
  }
  var n = semi >= 0 && semi <= 20 ? semi : 0;
  var s = parseInt(value, 10) + '';
  if (n > 0) {
    s = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  }
  var l = s.split('.')[0].split('').reverse();
  var r = n > 0 ? '.' + s.split('.')[1] : '';
  var t = '';
  for (var i = 0; i < l.length; i++) {
    if (i == 2 && l[3] == '-') { t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? '' : ''); continue; }
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? spl : '');
  }
  return t.split('').reverse().join('') + r;
}

window.DateFmt = DateFmt;
window.NumFmt = NumFmt;

Date.prototype.add = function (part, value) {
  value *= 1;
  if (isNaN(value)) {
    value = 0;
  }
  switch (part) {
    case "y":
      this.setFullYear(this.getFullYear() + value);
      break;
    case "m":
      this.setMonth(this.getMonth() + value);
      break;
    case "d":
      this.setDate(this.getDate() + value);
      break;
    case "h":
      this.setHours(this.getHours() + value);
      break;
    case "n":
      this.setMinutes(this.getMinutes() + value);
      break;
    case "s":
      this.setSeconds(this.getSeconds() + value);
      break;
    default:

  }
}

Vue.prototype.DateFmt = DateFmt;
Vue.prototype.NumFmt = NumFmt;

if (process.env.NODE_ENV === 'production') {
  //修改控制台输出
  let log = console.log;
  console.log = function(){
    let iforce = arguments;
    if(arguments&&arguments[arguments.length-1]===true) {
      let slicedArgs = Array.prototype.slice.call(arguments, 0, arguments.length-1);
      log.apply(null, slicedArgs);
    }
  };
}


const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  store,
  router,
  render: h => h(App),

})
