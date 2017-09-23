
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
  {
    name: 'check-list',
    path: '/check-list',
    component(resolve) {
      require.ensure(['./check-list.vue'], () => {
        resolve(require('./check-list.vue'))
      }, "check-list");
    },
  },
  {
    name: 'plan-info',
    path: '/plan-info',
    component(resolve) {
      require.ensure(['./plan-info.vue'], () => {
        resolve(require('./plan-info.vue'))
      }, "plan-info");
    },
  },

]
