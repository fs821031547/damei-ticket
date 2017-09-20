import ticket from './views/ticket'
import apply from './views/apply'
import visaProgress from './views/visa-progress';
import plans from './views/plans'
const routes = [
  {
    name: 'plan',
    path: '/plan',
    component(resolve) {
      require.ensure(['./views/plan.vue'], () => {
        resolve(require('./views/plan.vue'))
      }, "plan");
    },
  },
  // {
  //   name: 'me',
  //   path: '/me',
  //   component(resolve) {
  //       require.ensure(['./views/mine.vue'], () => {
  //         resolve(require('./views/mine.vue'))
  //       }, "mine");
  //   },
  // },
  {
    name: 'question',
    path: '/question',
    component(resolve) {
        require.ensure(['./views/common-question.vue'], () => {
          resolve(require('./views/common-question.vue'))
        }, "question");
    },
  },
  {
    name: 'pay-way',
    path: '/pay-way',
    component(resolve) {
        require.ensure(['./views/pay-way.vue'], () => {
          resolve(require('./views/pay-way.vue'))
        }, "pay-way");
    },
  },
  {
    name: 'sign-true',
    path: '/sign-true',
    component(resolve) {
        require.ensure(['./views/sign-true.vue'], () => {
          resolve(require('./views/sign-true.vue'))
        }, "sign-true");
    },
  },
  {
    name: 'sign-false',
    path: '/sign-false',
    component(resolve) {
        require.ensure(['./views/sign-false.vue'], () => {
          resolve(require('./views/sign-false.vue'))
        }, "sign-false");
    },
  },
  {
    name: 'refund',
    path: '/refund',
    component(resolve) {
        require.ensure(['./views/refund.vue'], () => {
          resolve(require('./views/refund.vue'))
        }, "refund");
    },
  },
  {
    name: 'push-notification',
    path: '/push-notification',
    component(resolve) {
        require.ensure(['./views/push-notification.vue'], () => {
          resolve(require('./views/push-notification.vue'))
        }, "push-notification");
    },
  },
  {
    name: 'pay-info',
    path: '/pay-info',
    component(resolve) {
      require.ensure(['./views/pay-info.vue'], () => {
        resolve(require('./views/pay-info.vue'))
      }, "pay-info");
    },
  },
  ...ticket,
  ...apply,
  ...visaProgress,
  ...plans,
]


export default routes;
