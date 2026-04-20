import { createApp } from "vue";
import { MotionPlugin } from "@vueuse/motion";

import App from "./App.vue";
import router from "./router";

const app = createApp({ ...App, name: "InfonetApp" })
  .use(router)
  .use(MotionPlugin)
  .mount("#app-mount");

// This stuff is fooked
