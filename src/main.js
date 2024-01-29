import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index';
import './index.css'

// import BootstrapVue from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';


import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';


import store from './store';

import './styles.scss'

const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);


app.use(setupCalendar, {})

app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(router).use(vuetify).use(VueSidebarMenu).use(store).mount('#app');
