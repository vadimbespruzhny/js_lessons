<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <div class="app-buttons">
            <post-button class="create-btn" @click="showDialog"
                >Создать пост</post-button
            >
            <my-select
                :options="sortOptions"
                v-model="selectedSort"
            ></my-select>
        </div>

        <my-dialog v-model:show="visible">
            <post-form @create="createPost" />
        </my-dialog>

        <post-list v-if="!isPostsLoading" :posts="posts" @delete="deletePost" />
        <div v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import postForm from "./components/postForm.vue";
import postList from "./components/postList.vue";
import MyDialog from "./components/UI/myDialog.vue";
import PostButton from "./components/UI/postButton.vue";
import mySelect from "./components/UI/mySelect.vue";
import axios from "axios";

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
            name: "",
            posts: [
                {
                    title: "",
                    body: "",
                },
            ],
            visible: false,
            isPostsLoading: false,
            selectedSort: "",
            sortOptions: [
                { value: "title", name: "По названию" },
                { value: "body", name: "По содержимому" },
            ],
        };
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.visible = false;
        },
        deletePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        showDialog() {
            this.visible = true;
        },

        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                let response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts?_limit=10"
                );

                this.posts = response.data;
            } catch (error) {
                alert("Ошибка");
            } finally {
                this.isPostsLoading = false;
            }
        },
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
}
.app-buttons {
    display: flex;
    justify-content: space-between;
}
</style>
