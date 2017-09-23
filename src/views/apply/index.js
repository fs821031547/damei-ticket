
export default [
  {
    name: 'apply',
    path: '/apply',
    component(resolve) {
      require.ensure(['./apply.vue'], () => {
        resolve(require('./apply.vue'))
      }, "apply");
    },
  },
  {
    name: 'contract',
    path: '/contract',
    component(resolve) {
      require.ensure(['./contract.vue'], () => {
        resolve(require('./contract.vue'))
      }, "contract");
    },
  },
  {
    name: 'my-apply',
    path: '/my-apply',
    component(resolve) {
      require.ensure(['./my-apply.vue'], () => {
        resolve(require('./my-apply.vue'))
      }, "my-apply");
    },
  },
  {
    name: 'pay-confirm',
    path: '/pay-confirm',
    component(resolve) {
      require.ensure(['./pay-confirm.vue'], () => {
        resolve(require('./pay-confirm.vue'))
      }, "pay-confirm");
    },
  },

  {
    name: 'pay',
    path: '/pay',
    component(resolve) {
      require.ensure(['./pay.vue'], () => {
        resolve(require('./pay.vue'))
      }, "pay");
    },
  },
  {
    name: 'ticket-select',
    path: '/ticket-select',
    component(resolve) {
      require.ensure(['./ticket-select.vue'], () => {
        resolve(require('./ticket-select.vue'))
      }, "ticket-select");
    },
  },
  {
    name: 'visa',
    path: '/visa',
    component(resolve) {
      require.ensure(['./visa.vue'], () => {
        resolve(require('./visa.vue'))
      }, "visa");
    },
  },
  {
    name: 'visa-question',
    path: '/visa-question',
    component(resolve) {
      require.ensure(['./visa-question.vue'], () => {
        resolve(require('./visa-question.vue'))
      }, "visa-question");
    },
  },
  {
    name: 'visa-select',
    path: '/visa-select',
    component(resolve) {
      require.ensure(['./visa-select.vue'], () => {
        resolve(require('./visa-select.vue'))
      }, "visa-select");
    },
  },
  {
    name: 'visa-tip',
    path: '/visa-tip',
    component(resolve) {
      require.ensure(['./visa-tip.vue'], () => {
        resolve(require('./visa-tip.vue'))
      }, "visa-tip");
    },
  },
  {
    name: 'pay-no',
    path: '/pay-no',
    component(resolve) {
      require.ensure(['./pay-no.vue'], () => {
        resolve(require('./pay-no.vue'))
      }, "pay-no");
    },
  },
  {
    name: 'pay-complete',
    path: '/pay-complete',
    component(resolve) {
      require.ensure(['./pay-complete.vue'], () => {
        resolve(require('./pay-complete.vue'))
      }, "pay-complete");
    },
  },
  {
    name: 'file',
    path: '/file',
    component(resolve) {
      require.ensure(['./file.vue'], () => {
        resolve(require('./file.vue'))
      }, "file");
    },
  },

]
