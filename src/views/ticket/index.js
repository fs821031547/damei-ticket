
export default [
  {
    name: 'ticket',
    path: '/',
    component(resolve) {
      require.ensure(['./ticket.vue'], () => {
        resolve(require('./ticket.vue'))
      }, "ticket");
    },
  },
  {
    name: 'ticket-list',
    path: '/ticket-list',
    component(resolve) {
      require.ensure(['./ticket-list.vue'], () => {
        resolve(require('./ticket-list.vue'))
      }, "ticket-list");
    },
  },
  {
    name: 'pay-form',
    path: '/pay-form',
    component(resolve) {
      require.ensure(['./pay-form.vue'], () => {
        resolve(require('./pay-form.vue'))
      }, "pay-form");
    },
  },
  {
    name: 'pay-error',
    path: '/pay-error',
    component(resolve) {
      require.ensure(['./pay-error.vue'], () => {
        resolve(require('./pay-error.vue'))
      }, "pay-error");
    },
  },
  {
    name: 'pay-success',
    path: '/pay-success',
    component(resolve) {
      require.ensure(['./pay-success.vue'], () => {
        resolve(require('./pay-success.vue'))
      }, "pay-success");
    },
  },
  {
    name: 'ticket-complete',
    path: '/ticket-complete',
    component(resolve) {
      require.ensure(['./ticket-complete.vue'], () => {
        resolve(require('./ticket-complete.vue'))
      }, "ticket-complete");
    },
  },
]