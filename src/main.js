import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";

import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);
app.mount("#app");
