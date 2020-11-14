import Vue from 'vue';
import App from './App.vue';
import vSelect from 'vue-select';
import Paginate from 'vuejs-paginate';
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;
Vue.component('paginate', Paginate);
Vue.component('v-select', vSelect);

new Vue({
	render: (h) => h(App),
}).$mount('#app');
