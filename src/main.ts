import { createApp } from "vue";
import { createPinia } from "pinia";
import { auth0 } from "./plugins/auth0";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import "primevue/resources/themes/lara-light-green/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./assets/main.scss";
import Ripple from "primevue/ripple";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.use(auth0);

app.use(router);

app.use(PrimeVue, { ripple: true });

app.use(ToastService);

app.directive("ripple", Ripple);

app.mount("#app");
