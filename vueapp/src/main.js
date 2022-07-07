import { createApp } from "vue";
import components from "./components/UI/index"
import store from "./store";
import router from "./router/router";
import VFocus from "@/directives/VFocus";
import App from "./App"

const app = createApp(App);

components.forEach(component => app.component(component.name, component))

app.directive("focus", VFocus);

app.use(store);
app.use(router);
app.mount("#app");
