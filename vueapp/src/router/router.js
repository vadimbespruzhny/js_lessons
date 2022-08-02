import mainPage from "../pages/mainPage";
import postsPage from "../pages/postsPage";
import aboutPage from "../pages/aboutPage";
import postItemPage from "../pages/postItemPage";
import notFoundPage from "../pages/notFoundPage";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{ path: "/", component: mainPage },
	{ path: "/posts", component: postsPage },
	{ path: "/about", component: aboutPage },
	{ path: "/posts/:id", component: postItemPage, name: "postItemPage" },
	{ path: "/:pathMatch(.*)*", component: notFoundPage, name: "notFoundPage" },

];

const router = createRouter({
	routes,
	history: createWebHistory(),
});

export default router;
