<template>
    <div class="post">
        <div class="post-item">
            <div><strong> Название: </strong>{{ post.title }}</div>
            <div><strong> Описание: </strong>{{ post.body }}</div>
            <div>
                <post-comments :comments="comments"></post-comments>
            </div>
        </div>

        <div class="app-buttons">
            <post-button class="create-btn" @click="showDialog">
                Написать коментарий</post-button
            >
        </div>

        <my-dialog v-model:show="visible">
            <comments-form @createComment="createComment"></comments-form>
        </my-dialog>
        <div>
            <div>
                <post-button class="btn" @click="deletePost"
                    >Удалить</post-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import postComments from "../components/postComments.vue";
import commentsForm from "./UI/commentsForm.vue";
export default {
    components: { postComments, commentsForm },
    data() {
        return {
            visible: false,
            comments: [],
        };
    },
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    methods: {
        deletePost() {
            this.$emit("delete", this.post);
        },
        showDialog() {
            this.visible = true;
        },
        createComment(comment) {
            this.comments.push(comment);
            console.log(this.comments);
        },
    },
};
</script>

<style scoped>
.post {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    padding: 15px;
    border: 2px solid gray;
}

.post-item {
    width: 700px;
}
</style>
