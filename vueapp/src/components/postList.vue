<template>
    <div>
        <div v-show="posts">
            <h3>Список постов</h3>
            <post-item
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @delete="$emit('delete', post)"
                @createComment="createComment"
                @deleteComment="deleteComment"
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
        createComment(comment, post) {
            this.$emit("createComment", comment, post);
        },
        deleteComment(comment, post) {
            this.$emit("deleteComment", comment, post)
        },
    },
};
</script>

<style scoped>
.post {
    margin-top: 15px;
    padding: 15px;
    border: 2px solid gray;
}
</style>
