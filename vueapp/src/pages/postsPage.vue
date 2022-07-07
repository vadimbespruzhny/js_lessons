<template>
	<div class="header">
		<div class="header-buttons">
			<post-button class="create-btn" @click="visible = true">Создать пост</post-button>
		</div>
		<my-select />
		<div>
			<search-form />
		</div>
	</div>

	<my-dialog v-model:show="visible">
		<post-form @submit="visible = false" />
	</my-dialog>

	<post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" />
	<div v-else>Идет загрузка...</div>
	<div class="pageWrapper">
		<div
			v-for="pageNumber in totalPages"
			:key="pageNumber"
			class="page"
			:class="{
				currentPage: page === pageNumber,
			}"
			@click="this.$store.commit('post/setPageNumber', pageNumber)"
		>
			{{ pageNumber }}
		</div>
	</div>
</template>

<script>
import postForm from "@/components/postForm.vue";
import postList from "@/components/postList.vue";
import MyDialog from "@/components/UI/myDialog.vue";
import PostButton from "@/components/UI/postButton.vue";
import mySelect from "@/components/UI/mySelect.vue";
import searchForm from "@/components/UI/searchForm.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
	name: "posts-page",
	components: {
		postForm,
		postList,
		MyDialog,
		PostButton,
		mySelect,
		searchForm,
	},
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		...mapActions("post", {
			fetchPosts: "fetchPosts",
			loadMorePosts: "loadMorePosts",
		}),
	},
	computed: {
		...mapState({
			isPostsLoading: (state) => state.post.isPostsLoading,
			totalPages: (state) => state.post.totalPages,
			page: (state) => state.post.page,
		}),
		...mapGetters("post", {
			sortedAndSearchedPosts: "searchGetter",
		}),
	},
	mounted() {
		this.fetchPosts();
	},
	watch: {
		page() {
			this.loadMorePosts();
		},
	},
};
</script>

<style scoped>
.link {
	text-decoration: none;
	color: black;
}
.header {
	width: 100%;
}
.header-buttons {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.pageWrapper {
	display: flex;
	margin: 15px;
}
.page {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 15px;
	height: 35px;
	width: 35px;
}
.currentPage {
	border: 2px solid rgb(79, 82, 250);
	border-radius: 100%;
	background-color: rgb(144, 146, 255);
}
</style>
