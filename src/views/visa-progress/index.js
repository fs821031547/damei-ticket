
export default [
  {
    name: 'progress',
    path: '/progress',
    component(resolve) {
      require.ensure(['./progress-select.vue'], () => {
        resolve(require('./progress-select.vue'))
      }, "progress-select");
    },
  },
  {
    name: 'visa-progress',
    path: '/visa-progress',
    component(resolve) {
      require.ensure(['./visa-progress.vue'], () => {
        resolve(require('./visa-progress.vue'))
      }, "visa-progress");
    },
  },
  {
    name: 'order-plan-book',
    path: '/order-plan-book',
    component(resolve) {
      require.ensure(['./order-plan-book.vue'], () => {
        resolve(require('./order-plan-book.vue'))
      }, "order-plan-book");
    },
  },
  {
    name: 'interview',
    path: '/interview',
    component(resolve) {
      require.ensure(['./interview.vue'], () => {
        resolve(require('./interview.vue'))
      }, "interview");
    },
  },
  {
    name: 'visa-info',
    path: '/visa-info',
    component(resolve) {
      require.ensure(['./visa-info.vue'], () => {
        resolve(require('./visa-info.vue'))
      }, "visa-info");
    },
  },
]