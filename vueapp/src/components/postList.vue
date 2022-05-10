<template>
    <div class="posts-list">
        <div v-show="posts">
            <h3>Список постов</h3>
            <post-item
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @delete="$emit('delete', post.id)"
                @createComment="createComment"
                @deleteComment="deleteComment"
                @editComment="editComment"
                @createCommentAnswer="createCommentAnswer"
            />
            <!-- почему для @createComment не работает emit в виде @delete="$emit('delete', post)",
             а нужно создавать отдельный метод? -->
        </div>
        <h2 v-show="!posts" style="color: red">Список постов пуст</h2>
    </div>
</template>

<script>
import postItem from "./postItem.vue";

export default {
    components: { postItem },
    props: {
        posts: {
            type: Object,
            required: true,
        },
    },
    methods: {
        createComment(comment, postId) {
            this.$emit("createComment", comment, postId);
        },
        deleteComment(commentId, postId) {
            this.$emit("deleteComment", commentId, postId);
        },
        editComment(newCommentText, commentId, postId) {
            this.$emit("editComment", newCommentText, commentId, postId);
        },
        createCommentAnswer(commentAnswer, commentId, postId) {
            this.$emit("createCommentAnswer", commentAnswer, commentId, postId);
        },
    },
};
</script>

<style scoped>
.posts-list {
    margin-top: 25px;
    width: 75%;
}
.post {
    margin-top: 15px;
    padding: 15px;
}
</style>
