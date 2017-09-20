
export default [
  {
    name: 'order-list',
    path: '/order-list',
    component(resolve) {
      require.ensure(['./order-list.vue'], () => {
        resolve(require('./order-list.vue'))
      }, "order-list");
    },
  },
  {
    name: 'plan-select',
    path: '/plan-select',
    component(resolve) {
      require.ensure(['./plan-select.vue'], () => {
        resolve(require('./plan-select.vue'))
      }, "plan-select");
    },
  },

]
