import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios  from 'axios';

import { IonicVue } from '@ionic/vue';
import { API_URL, userid, name, email, usertype, phonenumber } from './global.js';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/app.scss';
import './theme/custom.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
app.config.globalProperties.API_URL = API_URL;  
app.provide('API_URL', API_URL);
// app.config.globalProperties.userid = userid;  
// app.provide('userid', userid);
// app.config.globalProperties.name = name;  
// app.provide('username', name);
// app.config.globalProperties.email = email;  
// app.provide('email', email);
// app.config.globalProperties.usertype = usertype;  
// app.provide('usertype', usertype);
// app.config.globalProperties.phonenumber = phonenumber;  
// app.provide('phonenumber', phonenumber);

router.isReady().then(() => {
  app.mount('#app');
});