import { createApp } from 'vue';
import App from './App.vue';
import './style.css'
import './assets/tailwind.css';

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add the imported icons to the library
library.add(faGithub, faLinkedin);

const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');