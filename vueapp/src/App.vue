<template>
    <div class="app">
        <div class="header">
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
        </div>

        <my-dialog v-model:show="visible">
            <post-form @create="createPost" />
        </my-dialog>

        <post-list
            v-if="!isPostsLoading"
            :posts="posts"
            @delete="deletePost"
            @createComment="createComment"
            @deleteComment="deleteComment"
            @editComment="editComment"
            @createCommentAnswer="createCommentAnswer"
        />
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
import { v4 as uuidv4 } from "uuid";

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
            posts: {},
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
            this.posts[post.id] = post;
            this.visible = false;
        },
        deletePost(postId) {
            delete this.posts[postId];
        },

        createComment(comment, postId) {
            this.posts[postId].comments[comment.id] = comment;
        },
        editComment(newCommentText, commentId, postId) {
            if (newCommentText) {
                this.posts[postId].comments[commentId].text = newCommentText;
            }
        },
        createCommentAnswer(commentAnswer, commentId, postId) {
            this.posts[postId].comments[commentId].subComments[commentAnswer.id] = commentAnswer;
        },

        deleteComment(commentId, postId) {
            delete this.posts[postId].comments[commentId];
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

                let data = response.data.reduce((acc, cur) => {
                    delete cur.userId;
                    cur.id = uuidv4();
                    acc[cur.id] = cur;
                    acc[cur.id]["comments"] = {};
                    return acc;
                }, {});
                this.posts = data;
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
