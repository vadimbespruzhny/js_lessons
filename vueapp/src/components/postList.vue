<template>
    <div>
        <div v-show="posts.length > 0">
            <h3>Список постов</h3>
            <post-item
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @delete="$emit('delete', post)"
            />
        </div>
        <h2 v-show="posts.length === 0" style="color: red">
            Список постов пуст
        </h2>
    </div>
</template>

<script>
import postItem from "./postItem.vue";

export default {
    components: { postItem },
    props: {
        posts: {
            type: Array,
            required: true,
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
