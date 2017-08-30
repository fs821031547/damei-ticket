import Block from "./block.vue";
import Padbox from "./pad-box.vue";
import Pad from "./pad.vue";
import bottom from "./bottom.vue";
import header from "./header.vue";
import footer from "./footer.vue";
import cell from "./cell.vue";


export default function(Vue){
    //注册自定义组件
    Vue.component(Block.name, Block);
    Vue.component(Padbox.name, Padbox);
    Vue.component(Pad.name, Pad);
    Vue.component(bottom.name, bottom);
    Vue.component(header.name, header);
    Vue.component(footer.name, footer);
    Vue.component(cell.name, cell);
}