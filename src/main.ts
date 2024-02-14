import { createAuth0 } from "@auth0/auth0-vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import "primevue/resources/themes/lara-light-green/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./assets/main.scss";
import Ripple from "primevue/ripple";

const app = createApp(App);

app.use(
  createAuth0({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: process.env.VUE_APP_AUTH0_AUDIENCE,
    },
  })
);

app.use(router);

app.use(PrimeVue, { ripple: true });

app.use(ToastService);

app.directive("ripple", Ripple);

app.mount("#app");
