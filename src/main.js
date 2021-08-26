import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import vuetify from './plugins/vuetify';

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
