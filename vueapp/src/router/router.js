import mainPage from "../pages/mainPage";
import postPage from "../pages/postPage";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", component: mainPage },
    { path: "/posts", component: postPage },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
