<template>
    <div class="app">
        <div class="header">
            <h1>Страница с постами</h1>
            <div class="app-buttons">
                <post-button class="create-btn" @click="visible = true">Создать пост</post-button>
                <my-select :options="sortOptions" v-model="selectedSort"></my-select>
            </div>
        </div>

        <my-dialog v-model:show="visible">
            <post-form @submit="visible = false" />
        </my-dialog>

        <post-list v-if="!isPostsLoading" :posts="postList"/>
        <div v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import postForm from "./components/postForm.vue";
import postList from "./components/postList.vue";
import MyDialog from "./components/UI/myDialog.vue";
import PostButton from "./components/UI/postButton.vue";
import mySelect from "./components/UI/mySelect.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    components: {
        postForm,
        postList,
        MyDialog,
        PostButton,
        mySelect,
    },
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        ...mapActions("post", {
            fetchPosts: "fetchPosts",
        }),
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters("post", {
            postList: "postList"
        }),
    },
    mounted() {
        this.fetchPosts();
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    width: 100%;
    border-bottom: 1px solid teal;
}

.app-buttons {
    display: flex;
    justify-content: space-between;
}
</style>
