// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueLodash from 'vue-lodash'

Vue.use(require('vue-moment'));

//const options = { name: 'lodash' } // customize the way you want to call it

Vue.use(VueLodash) // options is optional

library.add(faUserSecret, faSpinner, faEdit, faTrash, faComments)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios);

Vue.prototype.url_server = 'http://localhost:3001/';

Vue.config.productionTip = false;

window.axios = axios;

Vue.config.productionTip = false

window.axios.defaults.headers.common['Authorization'] = { 'Authorization': 'whatever-you-want' };
window.axios.defaults.baseURL = Vue.prototype.url_server;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
